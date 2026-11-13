import { readState, writeState } from "./database";
import { getProjectConfig } from "./projectConfig";

// The list of which saved keys hold each item's settings
// (registry/registry.json). Fetched once per session from the releases host,
// where a merged entry lands within minutes, and kept so a session that can't
// reach it still uses the last copy.

const REGISTRY_FILE = "registry.json";
const REGISTRY_STATE_KEY = "settings-registry";
// The only format this version reads. A newer one is skipped, not misread.
const REGISTRY_FORMAT = 1;
const REGISTRY_TIMEOUT_MS = 3000;

// Keys and databases Spicetify, Marketplace and Syncify keep for themselves.
// The registry's checks refuse them too; Syncify never touches them even if
// a copy it reads names them.
const RESERVED_KEY_PREFIXES = ["marketplace:", "spicetify", "syncify"];
const RESERVED_DATABASE_PREFIXES = ["spicetify", "syncify"];

export type SettingsStorage =
  | { type: "localStorage" }
  | { type: "indexedDB"; database: string; store: string; valueField?: string };

/** How a list key merges between devices, as the registry names it. */
export type ListRule = { merge: "object" } | { merge: "array"; id: string };

type Tier = "small" | "medium" | "large";
// The tier an entry gets when it names none (registry.schema.json's default).
const DEFAULT_TIER: Tier = "medium";

export interface RegistryItem {
  /** {user}/{repo}/{path}, as in the item's marketplace:installed: key. */
  id: string;
  /** Exact names, or a prefix ending in "*". */
  keys: string[];
  /** Never leave the device. They win over keys. */
  exclude: string[];
  storage: SettingsStorage;
  /** Keys whose value is a list that merges between devices. */
  lists: Record<string, ListRule>;
  /** Bytes the item's synced copy may hold, from its size tier. */
  limit: number;
}

export interface SettingsRegistry {
  items: RegistryItem[];
  /** Bytes one account's synced extension settings may hold. */
  accountLimit: number;
}

let session: Promise<SettingsRegistry | null> | null = null;

/**
 * The registry: fetched on first use each session, or the last copy kept
 * when it can't be. Null when neither is there.
 */
export function loadRegistry(): Promise<SettingsRegistry | null> {
  if (!session) {
    session = fetchRegistry().then(async (fetched) => {
      if (fetched) {
        await writeState(REGISTRY_STATE_KEY, fetched).catch(() => {});
        return fetched;
      }
      return parseRegistry(await readState<unknown>(REGISTRY_STATE_KEY).catch(() => undefined));
    });
  }
  return session;
}

async function fetchRegistry(): Promise<SettingsRegistry | null> {
  const controller = typeof AbortController === "function" ? new AbortController() : null;
  const timer = setTimeout(() => controller?.abort(), REGISTRY_TIMEOUT_MS);
  try {
    const response = await fetch(`${getProjectConfig().releasesUrl}/${REGISTRY_FILE}`, {
      signal: controller?.signal,
    });
    return response.ok ? parseRegistry(await response.json()) : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Reads a registry, keeping only the entries this version can use safely.
 * Null when it isn't one, or its format is one this version doesn't know.
 */
export function parseRegistry(value: unknown): SettingsRegistry | null {
  if (!isRecord(value) || value.format !== REGISTRY_FORMAT || !Array.isArray(value.items)) return null;
  // The bytes per tier and per account, read as the backup service reads them.
  if (!isRecord(value.sizes)) return null;
  const tiers: Record<Tier, number> = {
    small: Number(value.sizes.small),
    medium: Number(value.sizes.medium),
    large: Number(value.sizes.large),
  };
  const accountLimit = Number(value.accountLimit);
  if (![...Object.values(tiers), accountLimit].every((bytes) => Number.isSafeInteger(bytes) && bytes > 0)) return null;

  const items = value.items.flatMap((raw) => {
    const item = parseItem(raw, tiers);
    return item ? [item] : [];
  });
  return { items, accountLimit };
}

function parseItem(raw: unknown, tiers: Record<Tier, number>): RegistryItem | null {
  if (!isRecord(raw) || typeof raw.id !== "string" || !raw.id) return null;
  const keys = parseKeys(raw.keys);
  const exclude = parseKeys(raw.exclude ?? []);
  const storage = parseStorage(raw.storage);
  const lists = parseLists(raw.lists);
  const tier = raw.size ?? DEFAULT_TIER;
  if (tier !== "small" && tier !== "medium" && tier !== "large") return null;
  if (!keys || !exclude || !storage || !lists || keys.length === 0) return null;
  // A key Syncify keeps for itself, Spicetify or Marketplace is never read
  // or written, so an entry naming one is dropped whole.
  if (storage.type === "localStorage" && keys.some(isReservedKey)) return null;
  if (storage.type === "indexedDB" && RESERVED_DATABASE_PREFIXES.some((name) => storage.database.startsWith(name))) {
    return null;
  }

  return { id: raw.id, keys, exclude, storage, lists, limit: tiers[tier] };
}

function parseLists(raw: unknown): Record<string, ListRule> | null {
  if (raw === undefined) return {};
  if (!isRecord(raw)) return null;
  const lists: Record<string, ListRule> = {};
  for (const [key, rule] of Object.entries(raw)) {
    if (isRecord(rule) && rule.merge === "object") lists[key] = { merge: "object" };
    else if (isRecord(rule) && rule.merge === "array" && isText(rule.id)) lists[key] = { merge: "array", id: rule.id };
    else return null;
  }
  return lists;
}

function parseStorage(raw: unknown): SettingsStorage | null {
  if (raw === undefined) return { type: "localStorage" };
  if (!isRecord(raw)) return null;
  if (raw.type === "localStorage") return { type: "localStorage" };
  if (raw.type !== "indexedDB" || !isText(raw.database) || !isText(raw.store)) return null;
  if (raw.valueField !== undefined && !isText(raw.valueField)) return null;
  return {
    type: "indexedDB",
    database: raw.database,
    store: raw.store,
    ...(raw.valueField !== undefined ? { valueField: raw.valueField as string } : {}),
  };
}

function parseKeys(raw: unknown): string[] | null {
  if (!Array.isArray(raw)) return null;
  return raw.every((key) => isText(key) && /^[^*\s]+\*?$/.test(key))
    ? (raw as string[])
    : null;
}

/** Whether a key is one of the item's settings: named in keys and not excluded. */
export function isSettingKey(item: RegistryItem, key: string): boolean {
  return item.keys.some((pattern) => matches(pattern, key)) && !item.exclude.some((pattern) => matches(pattern, key));
}

function matches(pattern: string, key: string): boolean {
  return pattern.endsWith("*") ? key.startsWith(pattern.slice(0, -1)) : key === pattern;
}

// As the registry's own check decides it (scripts/registry/check.mjs).
function isReservedKey(pattern: string): boolean {
  const stem = pattern.endsWith("*") ? pattern.slice(0, -1) : pattern;
  // A prefix that covers a reserved name ("market*") would reach it too.
  return RESERVED_KEY_PREFIXES.some(
    (reserved) => stem.startsWith(reserved) || (pattern.endsWith("*") && reserved.startsWith(stem)),
  );
}

function isText(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
