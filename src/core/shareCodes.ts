import {
  collectMarketplaceKeys,
  leftoverKeys,
  readActiveTheme,
  writeMarketplaceKeys,
} from "./marketplace";
import {
  isSyncify,
  keepsSyncify,
  listItems,
  previewRestore,
  type InstalledItem,
  type ItemChange,
  type ItemType,
  type PreviewItem,
  type RestorePreview,
} from "./restorePreview";
import {
  checkCatalog,
  checkSources,
  findSnippet,
  type SnippetCatalog,
  type SourceChecks,
} from "./sourceChecks";
import type { SyncifySpicetifyConfig } from "../types/syncify";

// Share codes: a snapshot of Marketplace items that a signed-in account makes
// here and anyone can load. The service publishes each code as a file on the
// share host, which Syncify reads to load it.

// 6 characters of Crockford's base32 (0-9 and A-Z without I, L, O and U),
// shown as SYN-7KQ2M9. Read the same way as the service reads them.
const CODE_PATTERN = /^[0-9A-HJKMNP-TV-Z]{6}$/;
const CODE_LENGTH = 6;
const PREFIX = "SYN-";
/** A code's optional name, which is public. */
export const NAME_MAX = 60;
/** The longest handle, the name an account's codes show. */
export const HANDLE_MAX = 20;

const LISTS: [string, ItemType][] = [
  ["marketplace:installed-extensions", "extension"],
  ["marketplace:installed-themes", "theme"],
  ["marketplace:installed-snippets", "snippet"],
];
const ENTRY_PREFIX = "marketplace:installed:";
const SNIPPET_PREFIX = `${ENTRY_PREFIX}snippet:`;
const THEME_KEY = "marketplace:theme-installed";
// What Spicetify's config says when Marketplace manages the theme.
const MARKETPLACE_THEME = "marketplace";
const CHANGE_ORDER: Record<ItemChange, number> = {
  added: 0,
  removed: 1,
  unchanged: 2,
};

/** A code's file on the share host. */
export interface ShareFile {
  code: string;
  name: string | null;
  /** Its owner's handle, null without one. */
  creator: string | null;
  updated_at: number;
  keys: Record<string, string>;
}

// A handle as the service stores them: lowercase, 3 to HANDLE_MAX
// characters.
const HANDLE_PATTERN = new RegExp(
  `^[a-z0-9][a-z0-9_-]{1,${HANDLE_MAX - 2}}[a-z0-9]$`,
);

/**
 * What's wrong with a handle as typed (an @ in front and its case don't
 * matter), so the field can say it before anything is sent. null when its
 * form is fine; the service still refuses taken and blocked ones.
 */
export function handleProblem(input: string): string | null {
  const handle = input.trim().replace(/^@/, "").toLowerCase();
  if (/[^a-z0-9_-]/.test(handle)) return "Only letters, digits, _ and -";
  if (handle.length < 3) return "At least 3 characters";
  if (!/^[a-z0-9]/.test(handle) || !/[a-z0-9]$/.test(handle)) {
    return "Start and end with a letter or digit";
  }
  return null;
}

/** "Add to my setup" keeps what's here; "Replace my setup" removes it. */
export type ShareMode = "add" | "replace";

export function displayCode(code: string): string {
  return `${PREFIX}${code}`;
}

/**
 * A code as typed or pasted: SYN-7KQ2M9, 7kq2m9 or a share link. Lower case,
 * O for 0, and I or L for 1 are read as meant. null when it isn't one.
 */
export function parseCode(input: string): string | null {
  let text = input.trim();
  if (text.length > 200) return null;
  if (text.includes("/")) {
    const path = text.split(/[?#]/)[0].replace(/\/+$/, "");
    text = path.slice(path.lastIndexOf("/") + 1).replace(/\.json$/i, "");
  }
  text = text.toUpperCase().replace(/[\s-]/g, "");
  if (text.length === CODE_LENGTH + 3 && text.startsWith("SYN")) {
    text = text.slice(3);
  }
  const code = text.replace(/O/g, "0").replace(/[IL]/g, "1");
  return CODE_PATTERN.test(code) ? code : null;
}

/** The file's own data, or null when it isn't a code's file. */
export function readShareFile(value: unknown): ShareFile | null {
  const file = value as Partial<ShareFile> | null;
  if (
    !file ||
    typeof file.code !== "string" ||
    !file.keys ||
    typeof file.keys !== "object" ||
    !Object.values(file.keys).every((entry) => typeof entry === "string")
  ) {
    return null;
  }
  return {
    code: file.code,
    name: typeof file.name === "string" && file.name ? file.name : null,
    creator:
      typeof file.creator === "string" && HANDLE_PATTERN.test(file.creator)
        ? file.creator
        : null,
    updated_at: typeof file.updated_at === "number" ? file.updated_at : 0,
    keys: file.keys,
  };
}

// ─── Sharing ────────────────────────────────────────────────────────────────

/**
 * What goes into a code from this device, checked the way a restore checks a
 * backup: every item as if it were new. Each item with a check in `leftOut`
 * stays out: code from outside GitHub or another repo than it names, on
 * Marketplace's block list, not in Marketplace's catalog, or a custom
 * snippet. An item that couldn't be checked goes in, since the service checks
 * its source and block list and everyone who loads the code checks it again.
 * Syncify's own entry stays out: anyone loading a code has it already.
 */
export async function checkShareItems(
  items: InstalledItem[],
  keys: Record<string, string>,
): Promise<{ items: InstalledItem[]; leftOut: SourceChecks }> {
  const shared = items
    .filter((item) => !isSyncify(item))
    .map((item): PreviewItem => ({ ...item, change: "added", isNew: true }));
  const local = checkSources(shared);
  // Marketplace always names an item's repo and its main file; an entry
  // without them isn't one of its items, and the service refuses it.
  for (const item of shared) {
    if (!local.has(item.key) && !isMarketplaceEntry(item, keys[item.key])) {
      local.set(item.key, { kind: "catalog" });
    }
  }
  const catalog = await checkCatalog(shared, local);
  const leftOut: SourceChecks = new Map();
  for (const [key, check] of [...catalog, ...local]) {
    if (check.kind !== "unchecked") leftOut.set(key, check);
  }
  return { items: shared, leftOut };
}

function isMarketplaceEntry(item: InstalledItem, raw: string | undefined): boolean {
  if (item.type === "snippet") return true;
  if (!item.repo) return false;
  const entry = parseObject(raw);
  return item.type === "extension"
    ? typeof entry?.extensionURL === "string" && entry.extensionURL !== ""
    : typeof entry?.cssURL === "string" && entry.cssURL !== "";
}

/**
 * The keys a code is made from: the installed lists with only the `included`
 * items, their entries, and the active theme when it's one of them.
 */
export function shareKeys(
  keys: Record<string, string>,
  included: InstalledItem[],
): Record<string, string> {
  const shared: Record<string, string> = {};
  for (const [listKey, type] of LISTS) {
    const list = included
      .filter((item) => item.type === type && keys[item.key] !== undefined)
      .map((item) => item.key);
    shared[listKey] = JSON.stringify(list);
    for (const key of list) shared[key] = keys[key];
  }
  const theme = readActiveTheme(keys[THEME_KEY]);
  if (theme && included.some((item) => item.key === theme)) {
    shared[THEME_KEY] = keys[THEME_KEY];
  }
  return shared;
}

// ─── Loading a code ─────────────────────────────────────────────────────────

/**
 * What loading a code does to this device. Adding keeps every item here,
 * with this device's copy of items in both. Replacing works like a restore:
 * items only here are removed, except Syncify itself. Either way the code's
 * theme becomes the active one, which shows only when Spicetify's config
 * uses Marketplace's theme; otherwise that's a step to do manually. The
 * preview says so when that theme isn't this device's active one
 * (localTheme).
 */
export function previewShare(
  file: ShareFile,
  codeItems: InstalledItem[],
  localItems: InstalledItem[],
  localConfig: SyncifySpicetifyConfig | null,
  localTheme: string | null,
  mode: ShareMode,
): RestorePreview {
  const preview =
    mode === "replace"
      ? previewRestore(codeItems, undefined, localItems, localConfig)
      : previewAdd(codeItems, localItems);
  const theme = readActiveTheme(file.keys[THEME_KEY]);
  const needsTheme =
    theme !== null &&
    codeItems.some((item) => item.key === theme) &&
    localConfig !== null &&
    localConfig.current_theme !== MARKETPLACE_THEME;
  const switching =
    theme !== null && theme !== localTheme
      ? codeItems.find((item) => item.key === theme)
      : undefined;
  return {
    ...preview,
    manual: needsTheme ? [{ type: "theme", name: MARKETPLACE_THEME }] : [],
    ...(switching ? { theme: { key: switching.key, name: switching.name } } : {}),
  };
}

function previewAdd(
  codeItems: InstalledItem[],
  localItems: InstalledItem[],
): RestorePreview {
  const onDevice = new Set(localItems.map((item) => item.key));
  const inCode = new Set(codeItems.map((item) => item.key));
  const items: PreviewItem[] = [
    ...codeItems.map((item) =>
      onDevice.has(item.key)
        ? { ...item, change: "unchanged" as const, isNew: false }
        : { ...item, change: "added" as const, isNew: true },
    ),
    ...localItems
      .filter((item) => !inCode.has(item.key))
      .map((item) => ({ ...item, change: "unchanged" as const, isNew: false })),
  ].sort(
    (a, b) =>
      CHANGE_ORDER[a.change] - CHANGE_ORDER[b.change] ||
      a.name.localeCompare(b.name),
  );

  const counts = { added: 0, removed: 0, unchanged: 0 };
  for (const item of items) counts[item.change] += 1;
  return { items, counts, manual: [] };
}

/**
 * Snippets in the code that can't be loaded: a snippet's CSS always comes
 * from Marketplace's current list, never from the code, so one that isn't
 * on this device needs the list to have its title.
 */
export function unloadableSnippets(
  preview: RestorePreview,
  catalog: SnippetCatalog | null,
): Set<string> {
  return new Set(
    preview.items
      .filter(
        (item) =>
          item.type === "snippet" &&
          item.change === "added" &&
          (!catalog || !findSnippet(catalog, item.name)),
      )
      .map((item) => item.key),
  );
}

/**
 * Writes a code into Marketplace's storage, as `previewShare` describes it.
 * Items in `skipped` stay as they are on this device. Only the installed
 * lists, their entries and the active theme are touched; replacing deletes
 * the entries of the items it removes. Returns how many keys were written.
 */
export async function applyShare(
  file: ShareFile,
  mode: ShareMode,
  skipped: string[],
  catalog: SnippetCatalog | null,
): Promise<number> {
  const local = await collectMarketplaceKeys();
  const localItems = listItems(local);
  const codeItems = listItems(file.keys);
  const writes: Record<string, string> = {};

  for (const [listKey, type] of LISTS) {
    const here = parseList(local[listKey]);
    const kept =
      mode === "add"
        ? here
        : here.filter(
            (key) =>
              skipped.includes(key) ||
              localItems.some(
                (item) => item.key === key && keepsSyncify(item, codeItems),
              ),
          );
    const list = [...kept];
    for (const item of codeItems) {
      if (item.type !== type || skipped.includes(item.key)) continue;
      const onDevice = here.includes(item.key);
      // Adding keeps this device's copy of what it has already.
      if (mode === "add" && onDevice) continue;
      const entry =
        type === "snippet"
          ? snippetEntry(item, catalog, local[item.key])
          : file.keys[item.key];
      if (entry === undefined) continue;
      writes[item.key] = entry;
      if (!list.includes(item.key)) list.push(item.key);
    }
    writes[listKey] = JSON.stringify(list);
  }

  const theme = readActiveTheme(file.keys[THEME_KEY]);
  const themes = parseList(writes["marketplace:installed-themes"]);
  if (theme && themes.includes(theme) && !skipped.includes(theme)) {
    writes[THEME_KEY] = file.keys[THEME_KEY];
  }
  // Replacing deletes the entries of what it removes, and the active theme
  // when it was one of them, as Marketplace does.
  const removed = leftoverKeys(local, writes);

  await writeMarketplaceKeys(writes, removed);
  return Object.keys(writes).length + removed.length;
}

// Marketplace's current CSS for the snippet's title, as Marketplace installs
// it. When the list can't be read or no longer has that title, this device's
// own copy, if it has one.
function snippetEntry(
  item: InstalledItem,
  catalog: SnippetCatalog | null,
  local: string | undefined,
): string | undefined {
  const listed = catalog ? findSnippet(catalog, item.name) : undefined;
  if (!listed) return local;
  return JSON.stringify({
    code: listed.code,
    title: listed.title,
    description: listed.description,
    ...(listed.imageURL ? { imageURL: listed.imageURL } : {}),
  });
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

function parseObject(raw: string | undefined): Record<string, unknown> | null {
  try {
    const value = raw ? JSON.parse(raw) : null;
    return value && typeof value === "object" && !Array.isArray(value)
      ? value
      : null;
  } catch {
    return null;
  }
}
