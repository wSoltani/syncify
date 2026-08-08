// Marketplace 1.0.9 moved its state from localStorage to IndexedDB
// (spicetify/marketplace#1181), because Spotify profile resets wipe
// localStorage but leave IndexedDB alone. Schema mirrors
// marketplace/src/logic/Storage.ts and must stay compatible with it.
const DATABASE_NAME = "spicetify-marketplace";
const DATABASE_VERSION = 1;
const STORE_NAME = "settings";

interface StoredRecord {
  key: string;
  value: string;
}

type OpenResult =
  | { kind: "ok"; db: IDBDatabase }
  | { kind: "missing" }
  | { kind: "unavailable" };

// "unavailable" means this Spotify build has no usable IndexedDB, which is the
// normal case for Marketplace < 1.0.9. "failed" means the store is there but
// the write did not land, so the caller must not report success.
export type MarketplaceWriteResult = "written" | "unavailable" | "failed";

export async function readMarketplaceStore(): Promise<Record<
  string,
  string
> | null> {
  const opened = await openExistingDatabase();
  if (opened.kind !== "ok") return null;

  try {
    const records = await runStoreRequest<StoredRecord[]>(
      opened.db,
      "readonly",
      (store) => store.getAll(),
    );
    if (!records) return null;

    const entries: Record<string, string> = {};
    for (const record of records) {
      if (typeof record?.key === "string" && typeof record.value === "string") {
        entries[record.key] = record.value;
      }
    }

    return entries;
  } finally {
    opened.db.close();
  }
}

export async function writeMarketplaceStore(
  entries: Record<string, string>,
): Promise<MarketplaceWriteResult> {
  const opened = await openExistingDatabase();
  if (opened.kind === "unavailable") return "unavailable";

  const db = opened.kind === "ok" ? opened.db : await createDatabase();
  if (!db) return "failed";

  try {
    const written = await runStoreRequest<IDBValidKey>(
      db,
      "readwrite",
      (store) => {
        let request: IDBRequest<IDBValidKey> | undefined;
        for (const [key, value] of Object.entries(entries)) {
          request = store.put({ key, value } satisfies StoredRecord);
        }
        return request;
      },
    );

    // null means the transaction failed. undefined means it had nothing to write.
    return written === null ? "failed" : "written";
  } finally {
    db.close();
  }
}

function getIndexedDB(): IDBFactory | null {
  try {
    return window.indexedDB ?? null;
  } catch {
    return null;
  }
}

// Opens without requesting a version so Syncify never triggers an upgrade on a
// database Marketplace owns. Bumping the version here would make Marketplace's
// own open(name, 1) fail with a VersionError.
async function openExistingDatabase(): Promise<OpenResult> {
  const factory = getIndexedDB();
  if (!factory) return { kind: "unavailable" };

  if (await isDatabaseMissing(factory)) return { kind: "missing" };

  return new Promise((resolve) => {
    let created = false;
    const request = factory.open(DATABASE_NAME);

    request.onupgradeneeded = () => {
      created = true;
    };
    request.onerror = () => {
      console.warn("Syncify could not open Marketplace storage", request.error);
      resolve({ kind: "unavailable" });
    };
    request.onblocked = () => resolve({ kind: "unavailable" });
    request.onsuccess = () => {
      const db = request.result;

      if (created) {
        // indexedDB.databases() was unavailable and this call created an empty
        // database. Marketplace would then find version 1 with no object store
        // and break, so drop it and report the database as missing.
        db.close();
        deleteDatabase(factory).then(() => resolve({ kind: "missing" }));
        return;
      }

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.close();
        resolve({ kind: "unavailable" });
        return;
      }

      resolve({ kind: "ok", db });
    };
  });
}

function createDatabase(): Promise<IDBDatabase | null> {
  const factory = getIndexedDB();
  if (!factory) return Promise.resolve(null);

  return new Promise((resolve) => {
    const request = factory.open(DATABASE_NAME, DATABASE_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "key" });
      }
    };
    request.onerror = () => {
      console.warn(
        "Syncify could not create Marketplace storage",
        request.error,
      );
      resolve(null);
    };
    request.onblocked = () => resolve(null);
    request.onsuccess = () => resolve(request.result);
  });
}

async function isDatabaseMissing(factory: IDBFactory): Promise<boolean> {
  if (typeof factory.databases !== "function") return false;

  try {
    const databases = await factory.databases();
    return !databases.some((database) => database.name === DATABASE_NAME);
  } catch {
    return false;
  }
}

function deleteDatabase(factory: IDBFactory): Promise<void> {
  return new Promise((resolve) => {
    const request = factory.deleteDatabase(DATABASE_NAME);
    request.onsuccess = () => resolve();
    request.onerror = () => resolve();
    request.onblocked = () => resolve();
  });
}

function runStoreRequest<T>(
  db: IDBDatabase,
  mode: IDBTransactionMode,
  run: (store: IDBObjectStore) => IDBRequest<T> | undefined,
): Promise<T | null | undefined> {
  return new Promise((resolve) => {
    let transaction: IDBTransaction;

    try {
      transaction = db.transaction(STORE_NAME, mode);
    } catch (error) {
      console.warn("Syncify could not open a Marketplace transaction", error);
      resolve(null);
      return;
    }

    let result: T | undefined;
    let settled = false;

    const settle = (value: T | null | undefined) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };

    transaction.oncomplete = () => settle(result);
    transaction.onerror = () => {
      console.warn("Syncify Marketplace transaction failed", transaction.error);
      settle(null);
    };
    transaction.onabort = () => {
      console.warn(
        "Syncify Marketplace transaction aborted",
        transaction.error,
      );
      settle(null);
    };

    let request: IDBRequest<T> | undefined;

    try {
      request = run(transaction.objectStore(STORE_NAME));
    } catch (error) {
      console.warn("Syncify Marketplace request could not be issued", error);
      settle(null);
      return;
    }

    if (!request) return;

    request.onsuccess = () => {
      result = request.result;
    };
    request.onerror = () => {
      console.warn("Syncify Marketplace request failed", request.error);
      settle(null);
    };
  });
}
