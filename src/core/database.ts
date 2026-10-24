// Syncify's own database, never Marketplace's. IndexedDB survives the Spotify
// profile resets that wipe localStorage, and it can keep a CryptoKeyPair whose
// private key can't be exported.
const DATABASE_NAME = "syncify";
export const STORE_NAME = "state";
// A stuck IndexedDB must not hold Syncify up.
const DATABASE_TIMEOUT_MS = 2000;

/** Opens Syncify's database, or resolves null when IndexedDB can't be used. */
export function openDatabase(): Promise<IDBDatabase | null> {
  let factory: IDBFactory | undefined;
  try {
    factory = window.indexedDB;
  } catch {
    return Promise.resolve(null);
  }
  if (!factory) return Promise.resolve(null);

  return new Promise((resolve) => {
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
    request.onerror = () => resolve(null);
    request.onblocked = () => resolve(null);
    request.onsuccess = () => resolve(request.result);
  });
}

/**
 * Runs one request in its own transaction and resolves with its result once
 * the transaction is done. Rejects when the database can't be used, so a
 * missing value (undefined) is never confused with one that couldn't be read.
 */
function runInStore<T>(
  mode: IDBTransactionMode,
  run: (store: IDBObjectStore) => IDBRequest,
): Promise<T> {
  const done = openDatabase().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        if (!db) {
          reject(new Error("IndexedDB isn't available."));
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

export function readState<T>(key: string): Promise<T | undefined> {
  return runInStore<T | undefined>("readonly", (store) => store.get(key));
}

export async function writeState(key: string, value: unknown): Promise<void> {
  await runInStore("readwrite", (store) => store.put(value, key));
}

export async function deleteState(key: string): Promise<void> {
  await runInStore("readwrite", (store) => store.delete(key));
}

