import { sha256Hex, stableStringify } from "./crypto";
import { getDeviceInfo } from "./device";
import {
  readMarketplaceStore,
  writeMarketplaceStore,
} from "./marketplaceStorage";
import {
  SYNCIFY_SCHEMA_VERSION,
  type SyncifyPayload,
  type SyncifySnapshotSummary,
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

export async function summarizeMarketplaceState(): Promise<SyncifySnapshotSummary> {
  const keys = await collectMarketplaceKeys();

  return {
    keyCount: Object.keys(keys).length,
    hash: await sha256Hex(stableStringify(keys)),
    installedItemCount: countInstalledItems(keys),
    marketplaceAvailable: isMarketplaceAvailable(keys),
  };
}

export async function createPayload(): Promise<SyncifyPayload> {
  const keys = await collectMarketplaceKeys();

  return {
    schema_version: SYNCIFY_SCHEMA_VERSION,
    metadata: {
      last_sync_datetime: new Date().toISOString(),
      device_info: getDeviceInfo(),
      marketplace_key_count: Object.keys(keys).length,
    },
    payload_hash: await sha256Hex(stableStringify(keys)),
    marketplace_data: { keys },
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

  const restoredKeys = Object.keys(restored);
  if (restoredKeys.length === 0) return 0;

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

function countInstalledItems(keys: Record<string, string>): number {
  return INSTALLED_LIST_KEYS.reduce(
    (count, key) => count + parseStoredArrayLength(keys[key]),
    0,
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

function parseStoredArrayLength(raw: string | undefined): number {
  if (!raw) return 0;

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    return 0;
  }
}
