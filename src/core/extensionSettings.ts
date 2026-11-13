import { stableStringify } from "./crypto";
import { writeState } from "./database";
import {
  isSettingKey,
  loadRegistry,
  type RegistryItem,
  type SettingsRegistry,
} from "./settingsRegistry";
import type {
  SyncifyExtensionSettings,
  SyncifyItemSettings,
} from "../types/syncify";

// Extensions' own settings, for the items in the registry. A backup carries
// them next to the Marketplace keys, out of its hash, and a restore writes
// them back. Spotify reloads after a restore, which is when items read them.

// A stuck database must not hold a backup or a restore up.
const DATABASE_TIMEOUT_MS = 2000;
// The last restore that wrote extension settings, kept in Syncify's own
// database. Sync between devices reads it to know whether the restored
// values go to the account's other devices.
const RESTORED_SETTINGS_KEY = "restored-settings";

/** A restore that wrote extension settings. */
export interface RestoredSettings {
  at: number;
  /** Registry ids of the items it wrote. */
  ids: string[];
  /** The person chose to use them on their other devices too. */
  share: boolean;
}

/** Keeps the last restore that wrote settings. A failure doesn't undo the restore. */
export async function saveRestoredSettings(restored: RestoredSettings): Promise<void> {
  await writeState(RESTORED_SETTINGS_KEY, restored).catch(() => {});
}

/** What this device holds of each registered item's settings. */
export interface LocalSettings {
  settings: SyncifyExtensionSettings;
  /**
   * Items whose IndexedDB database or store isn't on this device yet: the
   * item hasn't run here, so a restore can't write its settings.
   */
  unavailable: Set<string>;
}

/** Each registered item's settings on this device. Items with none are left out. */
export async function readLocalSettings(registry: SettingsRegistry): Promise<LocalSettings> {
  const settings: SyncifyExtensionSettings = {};
  const unavailable = new Set<string>();

  for (const [key, item] of ownersOf(registry, listLocalStorageKeys())) {
    const value = window.localStorage.getItem(key);
    if (value === null) continue;
    settings[item.id] ??= { storage: "localStorage", values: {} };
    settings[item.id].values[key] = value;
  }

  await Promise.all(
    registry.items
      .filter((item) => item.storage.type === "indexedDB")
      .map(async (item) => {
        const values = await readStore(item);
        if (values === null) unavailable.add(item.id);
        else if (Object.keys(values).length > 0) settings[item.id] = { storage: "indexedDB", values };
      }),
  );

  return { settings, unavailable };
}

/**
 * The localStorage keys that are an item's settings, with their item. Exact
 * names are looked up and only prefixes are scanned, so this stays quick as
 * the registry and localStorage grow.
 */
function ownersOf(registry: SettingsRegistry, keys: string[]): Map<string, RegistryItem> {
  const exact = new Map<string, RegistryItem>();
  const prefixes: [string, RegistryItem][] = [];
  for (const item of registry.items) {
    if (item.storage.type !== "localStorage") continue;
    for (const pattern of item.keys) {
      if (pattern.endsWith("*")) prefixes.push([pattern.slice(0, -1), item]);
      else exact.set(pattern, item);
    }
  }

  const owners = new Map<string, RegistryItem>();
  for (const key of keys) {
    const item = exact.get(key) ?? prefixes.find(([prefix]) => key.startsWith(prefix))?.[1];
    if (item && isSettingKey(item, key)) owners.set(key, item);
  }
  return owners;
}

/**
 * Writes the backup's settings for the items in `ids`. Each item's
 * registered keys become exactly the backup's: keys the backup has are
 * written, the others removed. Only keys today's registry names for the
 * item, in the place it names, are touched, whatever the backup holds.
 */
export async function writeSettings(
  registry: SettingsRegistry,
  backup: SyncifyExtensionSettings,
  ids: string[],
): Promise<void> {
  const writes = ids.flatMap((id) => {
    const item = registry.items.find((entry) => entry.id === id);
    const saved = item ? usableSettings(item, backup[id]) : null;
    return item && saved ? [{ item, saved }] : [];
  });

  // The databases first: they're the writes that can fail, and a failure
  // stops the restore before anything in localStorage changed.
  for (const { item, saved } of writes) {
    if (item.storage.type === "indexedDB") await writeStore(item, saved);
  }

  const localKeys = listLocalStorageKeys();
  for (const { item, saved } of writes) {
    if (item.storage.type !== "localStorage") continue;
    for (const key of localKeys) {
      if (isSettingKey(item, key) && !(key in saved)) window.localStorage.removeItem(key);
    }
    for (const [key, value] of Object.entries(saved)) window.localStorage.setItem(key, value as string);
  }
}

/**
 * The registry ids of the items whose settings in a backup differ from this
 * device's, among those a restore can write.
 */
export function compareSettings(
  registry: SettingsRegistry,
  backup: SyncifyExtensionSettings | undefined,
  local: LocalSettings,
): string[] {
  if (!backup) return [];
  return registry.items.flatMap((item) => {
    const saved = usableSettings(item, backup[item.id]);
    if (!saved || local.unavailable.has(item.id)) return [];
    const here = local.settings[item.id]?.values ?? {};
    const keys = new Set([...Object.keys(saved), ...Object.keys(here)]);
    return [...keys].some((key) => !sameValue(item, saved[key], here[key])) ? [item.id] : [];
  });
}

/** What restoring a backup changes in the registered items' settings here. */
export async function previewSettings(backup: SyncifyExtensionSettings | undefined): Promise<string[]> {
  if (!backup) return [];
  const registry = await loadRegistry();
  return registry ? compareSettings(registry, backup, await readLocalSettings(registry)) : [];
}

/**
 * The settings that fit in a backup of `baseBytes` without passing the
 * backup service's limit. Smaller items go first, so one large list can't
 * push the rest out.
 */
export function fitSettings(
  settings: SyncifyExtensionSettings,
  baseBytes: number,
  limitBytes: number,
): SyncifyExtensionSettings {
  const encoder = new TextEncoder();
  // The field itself: ,"extension_settings":{}
  let total = baseBytes + encoder.encode(`,${JSON.stringify("extension_settings")}:{}`).byteLength;
  const sized = Object.entries(settings)
    .map(([id, entry]) => ({ id, entry, bytes: encoder.encode(`${JSON.stringify(id)}:${JSON.stringify(entry)}`).byteLength }))
    .sort((a, b) => a.bytes - b.bytes || a.id.localeCompare(b.id));

  const fitted: SyncifyExtensionSettings = {};
  let first = true;
  for (const { id, entry, bytes } of sized) {
    // Each item after the first adds a comma.
    const added = bytes + (first ? 0 : 1);
    if (total + added > limitBytes) break;
    total += added;
    fitted[id] = entry;
    first = false;
  }
  return fitted;
}

/**
 * A backed-up item's values when today's registry can write them: in the
 * place it names, under keys it names, with values that place holds.
 */
function usableSettings(item: RegistryItem, saved: SyncifyItemSettings | undefined): Record<string, unknown> | null {
  if (!saved || typeof saved !== "object" || saved.storage !== item.storage.type) return null;
  if (!saved.values || typeof saved.values !== "object" || Array.isArray(saved.values)) return null;
  const values: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(saved.values)) {
    if (!isSettingKey(item, key)) continue;
    if (item.storage.type === "localStorage" ? typeof value !== "string" : !isJsonValue(value)) continue;
    values[key] = value;
  }
  return Object.keys(values).length > 0 ? values : null;
}

// IndexedDB records can carry fields beside the value, such as when they
// were saved; only the value counts as a change.
function sameValue(item: RegistryItem, a: unknown, b: unknown): boolean {
  if (a === undefined || b === undefined) return a === b;
  const field = item.storage.type === "indexedDB" ? item.storage.valueField : undefined;
  const value = (record: unknown) =>
    field && record && typeof record === "object" && !Array.isArray(record)
      ? (record as Record<string, unknown>)[field]
      : record;
  return stableStringify(value(a)) === stableStringify(value(b));
}

/** Plain JSON data, the only kind a backup can carry. */
export function isJsonValue(value: unknown): boolean {
  if (value === null || typeof value === "string" || typeof value === "boolean") return true;
  if (typeof value === "number") return Number.isFinite(value);
  if (Array.isArray(value)) return value.every(isJsonValue);
  if (typeof value === "object" && Object.getPrototypeOf(value) === Object.prototype) {
    return Object.values(value as Record<string, unknown>).every(isJsonValue);
  }
  return false;
}

function listLocalStorageKeys(): string[] {
  const keys: string[] = [];
  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index);
    if (key !== null) keys.push(key);
  }
  return keys;
}

type IndexedDBStorage = Extract<RegistryItem["storage"], { type: "indexedDB" }>;

/** The item's registered records. Null when its database or store isn't there. */
async function readStore(item: RegistryItem): Promise<Record<string, unknown> | null> {
  const storage = item.storage as IndexedDBStorage;
  return inItemStore<Record<string, unknown>>(storage, "readonly", (store, done) => {
    const values: Record<string, unknown> = {};
    const request = store.openCursor();
    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) return done(values);
      const key = cursor.key;
      if (typeof key === "string" && isSettingKey(item, key) && isJsonValue(cursor.value)) values[key] = cursor.value;
      cursor.continue();
    };
  }).catch(() => null);
}

/** Makes the item's registered records the backup's, in one transaction. */
async function writeStore(item: RegistryItem, saved: Record<string, unknown>): Promise<void> {
  const storage = item.storage as IndexedDBStorage;
  const written = await inItemStore<true>(storage, "readwrite", (store, done) => {
    const request = store.openCursor();
    request.onsuccess = () => {
      const cursor = request.result;
      if (cursor) {
        const key = cursor.key;
        if (typeof key === "string" && isSettingKey(item, key) && !(key in saved)) cursor.delete();
        cursor.continue();
        return;
      }
      for (const [key, value] of Object.entries(saved)) store.put(value, key);
      done(true);
    };
  });
  if (written === null) throw new Error("Syncify couldn't write an extension's settings. Restart Spotify and try again.");
}

/**
 * Runs `run` in a transaction on the item's own store and resolves once the
 * transaction completes. Null when the database or store doesn't exist.
 *
 * The item owns the database: it's opened without a version so the item's
 * own version stands, never created when missing, and closed as soon as the
 * transaction ends or the item asks to upgrade it.
 */
function inItemStore<T>(
  storage: IndexedDBStorage,
  mode: IDBTransactionMode,
  run: (store: IDBObjectStore, done: (result: T) => void) => void,
): Promise<T | null> {
  let factory: IDBFactory | undefined;
  try {
    factory = window.indexedDB;
  } catch {
    return Promise.resolve(null);
  }
  if (!factory) return Promise.resolve(null);
  const idb = factory;

  const work = new Promise<T | null>((resolve, reject) => {
    let request: IDBOpenDBRequest;
    try {
      request = idb.open(storage.database);
    } catch {
      resolve(null);
      return;
    }

    // It doesn't exist on this device: cancel, so nothing is created.
    request.onupgradeneeded = () => request.transaction?.abort();
    request.onerror = () => {
      if (request.error?.name === "AbortError") resolve(null);
      else reject(request.error);
    };
    request.onblocked = () => reject(new Error("The extension's database is busy."));
    request.onsuccess = () => {
      const db = request.result;
      db.onversionchange = () => db.close();
      if (!db.objectStoreNames.contains(storage.store)) {
        db.close();
        resolve(null);
        return;
      }

      try {
        const transaction = db.transaction(storage.store, mode);
        let result: T | null = null;
        run(transaction.objectStore(storage.store), (value) => {
          result = value;
        });
        transaction.oncomplete = () => {
          db.close();
          resolve(result);
        };
        transaction.onerror = transaction.onabort = () => {
          db.close();
          reject(transaction.error ?? new Error("IndexedDB failed."));
        };
      } catch (error) {
        db.close();
        reject(error);
      }
    };
  });

  return Promise.race([
    work,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("The extension's database took too long.")), DATABASE_TIMEOUT_MS),
    ),
  ]);
}
