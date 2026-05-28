import { sha256Hex, stableStringify } from "./crypto";
import { getDeviceInfo } from "./device";
import { SYNCIFY_SCHEMA_VERSION, type SyncifyPayload, type SyncifySnapshotSummary } from "../types/syncify";

const MARKETPLACE_PREFIX = "marketplace:";
const INSTALLED_LIST_KEYS = [
  "marketplace:installed-extensions",
  "marketplace:installed-snippets",
  "marketplace:installed-themes"
];

export function collectMarketplaceKeys(): Record<string, string> {
  const keys: Record<string, string> = {};

  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index);
    if (!key?.startsWith(MARKETPLACE_PREFIX)) continue;

    const value = window.localStorage.getItem(key);
    if (value !== null) keys[key] = value;
  }

  return keys;
}

export async function summarizeMarketplaceState(): Promise<SyncifySnapshotSummary> {
  const keys = collectMarketplaceKeys();
  return {
    keyCount: Object.keys(keys).length,
    hash: await sha256Hex(stableStringify(keys))
  };
}

export async function createPayload(): Promise<SyncifyPayload> {
  const keys = collectMarketplaceKeys();

  return {
    schema_version: SYNCIFY_SCHEMA_VERSION,
    metadata: {
      last_sync_datetime: new Date().toISOString(),
      device_info: getDeviceInfo(),
      marketplace_key_count: Object.keys(keys).length
    },
    payload_hash: await sha256Hex(stableStringify(keys)),
    marketplace_data: { keys }
  };
}

export function restoreMarketplaceKeys(payload: SyncifyPayload): number {
  const keys = payload.marketplace_data?.keys ?? {};
  let restoredCount = 0;

  for (const [key, value] of Object.entries(keys)) {
    if (!key.startsWith(MARKETPLACE_PREFIX)) continue;
    window.localStorage.setItem(key, value);
    restoredCount += 1;
  }

  return restoredCount;
}

export function hasMarketplaceState(): boolean {
  return Object.keys(collectMarketplaceKeys()).length > 0;
}

export function getInstalledMarketplaceItemCount(): number {
  return INSTALLED_LIST_KEYS.reduce((count, key) => count + parseStoredArrayLength(window.localStorage.getItem(key)), 0);
}

export function isMarketplaceAvailable(): boolean {
  const maybeWindow = window as Window & { Marketplace?: unknown };

  return Boolean(
    maybeWindow.Marketplace ||
      INSTALLED_LIST_KEYS.some((key) => window.localStorage.getItem(key) !== null) ||
      window.localStorage.getItem("marketplace:tabs") !== null
  );
}

export function shouldBlockAutoBackup(localKeyCount: number, cloudKeyCount: number): boolean {
  if (cloudKeyCount === 0) return false;
  if (localKeyCount === 0) return true;

  return localKeyCount < Math.max(2, Math.floor(cloudKeyCount * 0.5));
}

function parseStoredArrayLength(raw: string | null): number {
  if (!raw) return 0;

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    return 0;
  }
}
