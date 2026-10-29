import { openDatabase, STORE_NAME } from "./database";
import { getProjectConfig } from "./projectConfig";

// Sent with every request, so the backup service knows which version each
// install runs and can count activity in the user's local time.
const VERSION_HEADER = "x-syncify-version";
const INSTALL_HEADER = "x-syncify-install";
const TIMEZONE_HEADER = "x-syncify-timezone";

// Kept in Syncify's own database (see database.ts), which survives the Spotify
// profile resets that wipe localStorage.
const INSTALL_ID_KEY = "install-id";
const INSTALL_ID_FALLBACK_KEY = "syncify:install-id";
// Every request waits for the install ID, so a stuck IndexedDB must not hold
// them up: past this, the localStorage copy is used instead.
const DATABASE_TIMEOUT_MS = 2000;

/**
 * This install's ID, and whether it's kept in Syncify's database. Only an ID
 * kept there has a key of its own (installKey.ts), stored next to it.
 */
export interface Install {
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

export function getInstall(): Promise<Install> {
  install ??= loadInstall().catch(() => ({
    id: createInstallId(),
    inDatabase: false,
  }));
  return install;
}

async function loadInstall(): Promise<Install> {
  const stored = await Promise.race([
    readOrCreateInDatabase(),
    new Promise<null>((resolve) =>
      setTimeout(() => resolve(null), DATABASE_TIMEOUT_MS),
    ),
  ]);
  if (stored) return { id: stored, inDatabase: true };

  // No usable IndexedDB: keep the ID in localStorage instead.
  try {
    const existing = window.localStorage.getItem(INSTALL_ID_FALLBACK_KEY);
    if (existing && isInstallId(existing)) {
      return { id: existing, inDatabase: false };
    }

    const created = createInstallId();
    window.localStorage.setItem(INSTALL_ID_FALLBACK_KEY, created);
    return { id: created, inDatabase: false };
  } catch {
    return { id: createInstallId(), inDatabase: false };
  }
}

async function readOrCreateInDatabase(): Promise<string | null> {
  const db = await openDatabase();
  if (!db) return null;

  return new Promise((resolve) => {
    let id: string | null = null;

    try {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const read = store.get(INSTALL_ID_KEY);

      read.onsuccess = () => {
        if (typeof read.result === "string" && isInstallId(read.result)) {
          id = read.result;
          return;
        }

        id = createInstallId();
        store.put(id, INSTALL_ID_KEY);
      };
      transaction.oncomplete = () => {
        db.close();
        resolve(id);
      };
      transaction.onerror = transaction.onabort = () => {
        db.close();
        resolve(null);
      };
    } catch {
      db.close();
      resolve(null);
    }
  });
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
