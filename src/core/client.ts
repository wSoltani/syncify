import { DURABLE, openDatabase, retrying, STORE_NAME } from "./database";
import { getProjectConfig } from "./projectConfig";

// Sent with every request, so the backup service knows which version each
// install runs and can count activity in the user's local time.
const VERSION_HEADER = "x-syncify-version";
const INSTALL_HEADER = "x-syncify-install";
const TIMEZONE_HEADER = "x-syncify-timezone";

// Kept in Syncify's own database (see database.ts), which survives the Spotify
// profile resets that wipe localStorage. A device without IndexedDB keeps it
// in localStorage instead.
const INSTALL_ID_KEY = "install-id";
const INSTALL_ID_FALLBACK_KEY = "syncify:install-id";

/**
 * This install's ID, and whether it's kept in Syncify's database. Only an ID
 * kept there has a key of its own (installKey.ts), stored next to it.
 */
interface Install {
  id: string;
  inDatabase: boolean;
}

let install: Promise<Install> | null = null;

export async function getClientHeaders(): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    [VERSION_HEADER]: getProjectConfig().version,
    [INSTALL_HEADER]: (await getInstall()).id,
  };

  const timezone = getTimezone();
  if (timezone) headers[TIMEZONE_HEADER] = timezone;
  return headers;
}

/**
 * This install, read once per Spotify session. A slow database is waited for
 * and a failing one rejects: another ID would make this device a stranger to
 * its own Spotify account. A read that failed is tried again next time.
 */
export function getInstall(): Promise<Install> {
  if (!install) {
    const loading = loadInstall();
    install = loading;
    loading.catch(() => {
      if (install === loading) install = null;
    });
  }
  return install;
}

let replacing: Promise<void> | null = null;

/**
 * Starts this install over with a new ID, once its key no longer matches the
 * one the backup service bound to `staleId`. Requests that were refused
 * together share one new ID, and an ID already replaced isn't replaced again.
 */
export function replaceInstall(staleId: string): Promise<void> {
  replacing ??= (async () => {
    if ((await getInstall()).id !== staleId) return;
    const db = await openDatabase();
    if (!db) throw new Error("IndexedDB isn't available.");
    const id = createInstallId();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite", DURABLE);
      transaction.objectStore(STORE_NAME).put(id, INSTALL_ID_KEY);
      transaction.oncomplete = () => {
        db.close();
        resolve();
      };
      transaction.onerror = transaction.onabort = () => {
        db.close();
        reject(transaction.error ?? new Error("IndexedDB failed."));
      };
    });
    install = Promise.resolve({ id, inDatabase: true });
  })().finally(() => {
    replacing = null;
  });
  return replacing;
}

async function loadInstall(): Promise<Install> {
  const stored = await retrying(readOrCreateInDatabase);
  if (stored) return { id: stored, inDatabase: true };

  // No IndexedDB on this device: keep the ID in localStorage instead.
  const existing = readFallbackId();
  if (existing) return { id: existing, inDatabase: false };
  const created = createInstallId();
  try {
    window.localStorage.setItem(INSTALL_ID_FALLBACK_KEY, created);
  } catch {
    // Not kept: this Spotify session uses it anyway.
  }
  return { id: created, inDatabase: false };
}

/**
 * The ID in Syncify's database, or null on a device without IndexedDB. An ID
 * this device kept in localStorage before its database worked moves into the
 * database rather than being replaced, and once the database has an ID the
 * localStorage copy is removed, so no launch can use it again.
 */
async function readOrCreateInDatabase(): Promise<string | null> {
  const db = await openDatabase();
  if (!db) return null;

  const id = await new Promise<string>((resolve, reject) => {
    let found: string | null = null;

    try {
      const transaction = db.transaction(STORE_NAME, "readwrite", DURABLE);
      const store = transaction.objectStore(STORE_NAME);
      const read = store.get(INSTALL_ID_KEY);

      read.onsuccess = () => {
        if (typeof read.result === "string" && isInstallId(read.result)) {
          found = read.result;
          return;
        }

        found = readFallbackId() ?? createInstallId();
        store.put(found, INSTALL_ID_KEY);
      };
      transaction.oncomplete = () => {
        db.close();
        if (found) resolve(found);
        else reject(new Error("IndexedDB failed."));
      };
      transaction.onerror = transaction.onabort = () => {
        db.close();
        reject(transaction.error ?? new Error("IndexedDB failed."));
      };
    } catch (error) {
      db.close();
      reject(error);
    }
  });

  try {
    window.localStorage.removeItem(INSTALL_ID_FALLBACK_KEY);
  } catch {
    // Nothing to clear.
  }
  return id;
}

function readFallbackId(): string | null {
  try {
    const value = window.localStorage.getItem(INSTALL_ID_FALLBACK_KEY);
    return value && isInstallId(value) ? value : null;
  } catch {
    return null;
  }
}

function createInstallId(): string {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();

  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = [...bytes].map((byte) => byte.toString(16).padStart(2, "0"));
  return [
    hex.slice(0, 4).join(""),
    hex.slice(4, 6).join(""),
    hex.slice(6, 8).join(""),
    hex.slice(8, 10).join(""),
    hex.slice(10).join(""),
  ].join("-");
}

function isInstallId(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(
    value,
  );
}

function getTimezone(): string | null {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || null;
  } catch {
    return null;
  }
}
