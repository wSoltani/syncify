import { sha256Hex, stableStringify } from "./crypto";
import { getDeviceInfo } from "./device";
import { keepsSyncify, listItems } from "./restorePreview";
import {
  normalizeSpicetifyConfig,
  readSpicetifyConfig,
} from "./spicetifyConfig";
import {
  readMarketplaceStore,
  writeMarketplaceStore,
} from "./marketplaceStorage";
import {
  SYNCIFY_SCHEMA_VERSION,
  type SyncifyPayload,
  type SyncifySnapshotSummary,
  type SyncifySpicetifyConfig,
} from "../types/syncify";

const MARKETPLACE_PREFIX = "marketplace:";
const INSTALLED_LIST_KEYS = [
  "marketplace:installed-extensions",
  "marketplace:installed-snippets",
  "marketplace:installed-themes",
];

// Marketplace >= 1.0.9 reads IndexedDB first and only falls back to
// localStorage keys it has not migrated yet, so mirror that precedence here.
// Older versions keep everything in localStorage and leave IndexedDB empty.
export async function collectMarketplaceKeys(): Promise<
  Record<string, string>
> {
  const keys = collectLocalStorageKeys();
  const stored = await readMarketplaceStore();

  if (stored) {
    for (const [key, value] of Object.entries(stored)) {
      if (key.startsWith(MARKETPLACE_PREFIX)) keys[key] = value;
    }
  }

  return keys;
}

// Marketplace rewrites these while you browse it, without anything you have
// installed changing. They are still backed up, but leaving them out of the
// hash stops them from triggering a new upload on their own.
const UI_STATE_KEYS = new Set(["marketplace:active-tab", "marketplace:sort"]);
const INSTALLED_ITEM_PREFIX = "marketplace:installed:";
const REFRESHED_ITEM_FIELDS = ["stars", "tags", "lastUpdated", "created"];

// The Spicetify config counts too, when there is one. Backups from before it
// was saved hash the same as they always did.
export async function hashSnapshot(
  keys: Record<string, string>,
  spicetifyConfig?: SyncifySpicetifyConfig | null,
): Promise<string> {
  const significant: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(keys)) {
    if (UI_STATE_KEYS.has(key)) continue;
    significant[key] = key.startsWith(INSTALLED_ITEM_PREFIX)
      ? withoutRefreshedFields(value)
      : value;
  }

  // Not a marketplace: key, so it can't clash with one.
  if (spicetifyConfig) {
    significant["spicetify_config"] = normalizeSpicetifyConfig(spicetifyConfig);
  }

  return sha256Hex(stableStringify(significant));
}

function withoutRefreshedFields(raw: string): unknown {
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return raw;
    }

    for (const field of REFRESHED_ITEM_FIELDS) delete parsed[field];
    return parsed;
  } catch {
    return raw;
  }
}

export async function summarizeMarketplaceState(): Promise<SyncifySnapshotSummary> {
  const keys = await collectMarketplaceKeys();
  const spicetifyConfig = readSpicetifyConfig(keys);

  return {
    keyCount: Object.keys(keys).length,
    hash: await hashSnapshot(keys, spicetifyConfig),
    installedItemCount: countInstalledItems(keys),
    installedItems: listInstalledItems(keys),
    items: listItems(keys),
    spicetifyConfig,
    marketplaceAvailable: isMarketplaceAvailable(keys),
  };
}

export async function createPayload(): Promise<SyncifyPayload> {
  const keys = await collectMarketplaceKeys();
  const spicetifyConfig = readSpicetifyConfig(keys);

  return {
    schema_version: SYNCIFY_SCHEMA_VERSION,
    metadata: {
      last_sync_datetime: new Date().toISOString(),
      device_info: getDeviceInfo(),
      marketplace_key_count: Object.keys(keys).length,
    },
    payload_hash: await hashSnapshot(keys, spicetifyConfig),
    marketplace_data: { keys },
    ...(spicetifyConfig ? { spicetify_config: spicetifyConfig } : {}),
  };
}

export async function restoreMarketplaceKeys(
  payload: SyncifyPayload,
): Promise<number> {
  const restored: Record<string, string> = {};
  const backedUpKeys = payload.marketplace_data?.keys ?? {};

  for (const [key, value] of Object.entries(backedUpKeys)) {
    if (key.startsWith(MARKETPLACE_PREFIX)) restored[key] = value;
  }

  if (Object.keys(restored).length === 0) return 0;
  await keepOwnEntry(restored);
  const restoredKeys = Object.keys(restored);

  // Write both stores: IndexedDB is what Marketplace >= 1.0.9 reads, and
  // localStorage is the only store older versions know about.
  for (const key of restoredKeys) {
    window.localStorage.setItem(key, restored[key]);
  }

  const written = await writeMarketplaceStore(restored);

  if (written === "failed") {
    throw new Error(
      "Syncify could not write to Marketplace storage. Restart Spotify and try the restore again.",
    );
  }

  return restoredKeys.length;
}

// Restoring replaces Marketplace's list of installed extensions, so a backup
// made where Syncify wasn't installed from Marketplace would remove it.
async function keepOwnEntry(restored: Record<string, string>): Promise<void> {
  const local = await collectMarketplaceKeys();
  const backupItems = listItems(restored);
  const kept = listItems(local).filter((item) =>
    keepsSyncify(item, backupItems),
  );
  if (kept.length === 0) return;

  const listKey = "marketplace:installed-extensions";
  const list = parseStoredArray(restored[listKey]).map(String);
  for (const item of kept) {
    if (!list.includes(item.key)) list.push(item.key);
    restored[item.key] = local[item.key];
  }
  restored[listKey] = JSON.stringify(list);
}

export function countInstalledItems(keys: Record<string, string>): number {
  return listInstalledItems(keys).length;
}

/** Keys of the installed extensions, themes and snippets. */
export function listInstalledItems(keys: Record<string, string>): string[] {
  return INSTALLED_LIST_KEYS.flatMap((key) =>
    parseStoredArray(keys[key]).map(String),
  );
}

function isMarketplaceAvailable(keys: Record<string, string>): boolean {
  const maybeWindow = window as Window & { Marketplace?: unknown };

  return Boolean(
    maybeWindow.Marketplace ||
      INSTALLED_LIST_KEYS.some((key) => keys[key] !== undefined) ||
      keys["marketplace:tabs"] !== undefined,
  );
}

export function shouldBlockAutoBackup(
  localKeyCount: number,
  cloudKeyCount: number,
): boolean {
  if (cloudKeyCount === 0) return false;
  if (localKeyCount === 0) return true;

  return localKeyCount < Math.max(2, Math.floor(cloudKeyCount * 0.5));
}

function collectLocalStorageKeys(): Record<string, string> {
  const keys: Record<string, string> = {};

  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index);
    if (!key?.startsWith(MARKETPLACE_PREFIX)) continue;

    const value = window.localStorage.getItem(key);
    if (value !== null) keys[key] = value;
  }

  return keys;
}

function parseStoredArray(raw: string | undefined): unknown[] {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
