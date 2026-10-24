import { normalizeSpicetifyConfig } from "./spicetifyConfig";
import type { SyncifySpicetifyConfig } from "../types/syncify";

export type ItemType = "extension" | "theme" | "snippet";

/** One installed Marketplace item, as Marketplace stores it. */
export interface InstalledItem {
  key: string;
  type: ItemType;
  name: string;
  /** "owner/repo", or null for snippets and entries without one. */
  repo: string | null;
}

/** What restoring a backup does to this device's Marketplace items. */
export type ItemChange = "added" | "removed" | "unchanged";

export interface PreviewItem extends InstalledItem {
  change: ItemChange;
}

/** An item from Spicetify's config that only a terminal command can add. */
export interface ByHandItem {
  type: "extension" | "custom_app" | "theme";
  name: string;
  /** The theme's color scheme, when it has one. */
  scheme?: string;
}

export interface RestorePreview {
  items: PreviewItem[];
  counts: Record<ItemChange, number>;
  /** In the backup's Spicetify config but not this device's. */
  byHand: ByHandItem[];
}

const LISTS: [string, ItemType][] = [
  ["marketplace:installed-extensions", "extension"],
  ["marketplace:installed-themes", "theme"],
  ["marketplace:installed-snippets", "snippet"],
];
const ENTRY_PREFIX = "marketplace:installed:";
const SNIPPET_PREFIX = `${ENTRY_PREFIX}snippet:`;
// Marketplace sets this theme when it manages the theme itself.
const MARKETPLACE_THEME = "marketplace";
const CHANGE_ORDER: Record<ItemChange, number> = {
  added: 0,
  removed: 1,
  unchanged: 2,
};

/** Every installed item in a set of Marketplace keys, with its name and repo. */
export function listItems(keys: Record<string, string>): InstalledItem[] {
  const items = new Map<string, InstalledItem>();

  for (const [listKey, type] of LISTS) {
    for (const key of parseList(keys[listKey])) {
      if (!items.has(key)) items.set(key, describeItem(key, type, keys[key]));
    }
  }

  return [...items.values()];
}

/**
 * Compares a backup with this device. Restoring writes the backup's items,
 * so items only in the backup are added and items only here are removed.
 */
export function previewRestore(
  backupItems: InstalledItem[],
  backupConfig: SyncifySpicetifyConfig | undefined,
  localItems: InstalledItem[],
  localConfig: SyncifySpicetifyConfig | null,
): RestorePreview {
  const inBackup = new Set(backupItems.map((item) => item.key));
  const onDevice = new Set(localItems.map((item) => item.key));
  const items: PreviewItem[] = [
    ...backupItems.map((item) => ({
      ...item,
      change: onDevice.has(item.key)
        ? ("unchanged" as const)
        : ("added" as const),
    })),
    ...localItems
      .filter((item) => !inBackup.has(item.key))
      .map((item) => ({ ...item, change: "removed" as const })),
  ].sort(
    (a, b) =>
      CHANGE_ORDER[a.change] - CHANGE_ORDER[b.change] ||
      a.name.localeCompare(b.name),
  );

  const counts = { added: 0, removed: 0, unchanged: 0 };
  for (const item of items) counts[item.change] += 1;

  return { items, counts, byHand: listByHand(backupConfig, localConfig) };
}

function listByHand(
  backupConfig: SyncifySpicetifyConfig | undefined,
  localConfig: SyncifySpicetifyConfig | null,
): ByHandItem[] {
  if (!backupConfig) return [];
  const backup = normalizeSpicetifyConfig(backupConfig);
  const local = normalizeSpicetifyConfig(localConfig);

  const byHand: ByHandItem[] = [
    ...backup.extensions
      .filter((name) => !local.extensions.includes(name))
      .map((name) => ({ type: "extension" as const, name })),
    ...backup.custom_apps
      .filter((name) => !local.custom_apps.includes(name))
      .map((name) => ({ type: "custom_app" as const, name })),
  ];

  const theme = backup.current_theme;
  if (
    theme &&
    theme !== MARKETPLACE_THEME &&
    (theme !== local.current_theme || backup.color_scheme !== local.color_scheme)
  ) {
    byHand.push({
      type: "theme",
      name: theme,
      ...(backup.color_scheme ? { scheme: backup.color_scheme } : {}),
    });
  }

  return byHand;
}

function describeItem(
  key: string,
  type: ItemType,
  raw: string | undefined,
): InstalledItem {
  const entry = parseObject(raw);
  const manifest = parseObject(entry?.manifest);
  const user = text(entry?.user);
  const repo = text(entry?.repo);
  const name =
    text(entry?.title) ??
    text(manifest?.name) ??
    (key.startsWith(SNIPPET_PREFIX)
      ? key.slice(SNIPPET_PREFIX.length)
      : key.split("/").pop() || key);

  return {
    key,
    type,
    name,
    repo: type !== "snippet" && user && repo ? `${user}/${repo}` : null,
  };
}

function text(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function parseList(raw: string | undefined): string[] {
  try {
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list)
      ? list.filter((key): key is string => typeof key === "string")
      : [];
  } catch {
    return [];
  }
}

function parseObject(value: unknown): Record<string, unknown> | null {
  let parsed = value;
  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value);
    } catch {
      return null;
    }
  }
  return parsed && typeof parsed === "object" && !Array.isArray(parsed)
    ? (parsed as Record<string, unknown>)
    : null;
}
