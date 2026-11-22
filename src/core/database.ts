// Syncify's own database, never Marketplace's. IndexedDB survives the Spotify
// profile resets that wipe localStorage, and it can keep a CryptoKeyPair whose
// private key can't be exported.
const DATABASE_NAME = "syncify";
export const STORE_NAME = "state";
// A stuck IndexedDB must not hold Syncify up, except where giving up would
// change who this device is (readState's wait).
const DATABASE_TIMEOUT_MS = 2000;

/** This device can't use IndexedDB: nothing is or can be stored in it. */
export class DatabaseUnavailableError extends Error {
  constructor() {
    super("IndexedDB isn't available.");
    this.name = "DatabaseUnavailableError";
  }
}

// Set once Syncify's database has opened on this device, so a later failure
// to open is a failure, not a device without IndexedDB.
const OPENED_KEY = "syncify:database-opened";

/**
 * Opens Syncify's database, or resolves null when this device can't use
 * IndexedDB: none at all, or one that has never opened here. A database that
 * opened before and fails now rejects, so this device is never taken for one
 * without its stored ID and keys. A blocked open waits for the other
 * connection to close (each of Syncify's closes after its transaction).
 */
export function openDatabase(): Promise<IDBDatabase | null> {
  let factory: IDBFactory | undefined;
  try {
    factory = window.indexedDB;
  } catch {
    return Promise.resolve(null);
  }
  if (!factory) return Promise.resolve(null);

  return new Promise((resolve, reject) => {
    let request: IDBOpenDBRequest;
    try {
      request = factory.open(DATABASE_NAME, 1);
    } catch {
      resolve(null);
      return;
    }

    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME);
    };
    request.onerror = () => {
      if (hasOpened()) reject(request.error ?? new Error("IndexedDB failed to open."));
      else resolve(null);
    };
    request.onsuccess = () => {
      markOpened();
      resolve(request.result);
    };
  });
}

function hasOpened(): boolean {
  try {
    return window.localStorage.getItem(OPENED_KEY) === "true";
  } catch {
    return false;
  }
}

function markOpened(): void {
  try {
    if (!hasOpened()) window.localStorage.setItem(OPENED_KEY, "true");
  } catch {
    // Not kept: a later failure to open counts as no database, as before.
  }
}

/**
 * Runs one request in its own transaction and resolves with its result once
 * the transaction is done. Rejects when the database can't be used, so a
 * missing value (undefined) is never confused with one that couldn't be read.
 */
function runInStore<T>(
  mode: IDBTransactionMode,
  run: (store: IDBObjectStore) => IDBRequest,
  wait = false,
): Promise<T> {
  const done = openDatabase().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        if (!db) {
          reject(new DatabaseUnavailableError());
          return;
        }

        try {
          const transaction = db.transaction(STORE_NAME, mode);
          const request = run(transaction.objectStore(STORE_NAME));
          transaction.oncomplete = () => {
            db.close();
            resolve(request.result as T);
          };
          transaction.onerror = transaction.onabort = () => {
            db.close();
            reject(transaction.error ?? new Error("IndexedDB failed."));
          };
        } catch (error) {
          db.close();
          reject(error);
        }
      }),
  );

  if (wait) return done;
  return Promise.race([
    done,
    new Promise<never>((_, reject) =>
      setTimeout(
        () => reject(new Error("IndexedDB took too long.")),
        DATABASE_TIMEOUT_MS,
      ),
    ),
  ]);
}

/**
 * With `wait`, the read waits for a slow database instead of giving up: for
 * what says who this device is (its install, its keys, its session), where
 * giving up would send a request as someone else.
 */
export function readState<T>(key: string, options: { wait?: boolean } = {}): Promise<T | undefined> {
  return runInStore<T | undefined>("readonly", (store) => store.get(key), options.wait);
}

export async function writeState(key: string, value: unknown): Promise<void> {
  await runInStore("readwrite", (store) => store.put(value, key));
}

export async function deleteState(key: string): Promise<void> {
  await runInStore("readwrite", (store) => store.delete(key));
}

