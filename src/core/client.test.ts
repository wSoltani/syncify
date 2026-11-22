import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { openDatabase } from "./database";

vi.mock("./database", () => ({ openDatabase: vi.fn(), STORE_NAME: "state" }));
vi.mock("./projectConfig", () => ({ getProjectConfig: () => ({ version: "1.0.0" }) }));

const DATABASE_ID = "11111111-1111-4111-8111-111111111111";
const STORAGE_ID = "22222222-2222-4222-8222-222222222222";
const FALLBACK_KEY = "syncify:install-id";

/** Syncify's database with one store, answering on the next turn as IndexedDB does. */
function fakeDatabase(values: Map<string, unknown>) {
  return {
    close() {},
    transaction() {
      const transaction = {
        oncomplete: null as (() => void) | null,
        onerror: null as (() => void) | null,
        onabort: null as (() => void) | null,
        error: null,
        objectStore: () => ({
          get(key: string) {
            const request = { result: undefined as unknown, onsuccess: null as (() => void) | null };
            setTimeout(() => {
              request.result = values.get(key);
              request.onsuccess?.();
              setTimeout(() => transaction.oncomplete?.());
            });
            return request;
          },
          put(value: unknown, key: string) {
            values.set(key, value);
          },
        }),
      };
      return transaction;
    },
  } as unknown as IDBDatabase;
}

async function loadClient() {
  vi.resetModules();
  return import("./client");
}

beforeEach(() => localStorage.clear());
afterEach(() => vi.mocked(openDatabase).mockReset());

describe("getInstall", () => {
  it("keeps the ID in the database and clears one a slow launch left in localStorage", async () => {
    vi.mocked(openDatabase).mockResolvedValue(fakeDatabase(new Map([["install-id", DATABASE_ID]])));
    localStorage.setItem(FALLBACK_KEY, STORAGE_ID);
    const { getInstall } = await loadClient();
    expect(await getInstall()).toEqual({ id: DATABASE_ID, inDatabase: true });
    expect(localStorage.getItem(FALLBACK_KEY)).toBeNull();
  });

  it("moves an ID kept in localStorage into a database that has none", async () => {
    const values = new Map<string, unknown>();
    vi.mocked(openDatabase).mockResolvedValue(fakeDatabase(values));
    localStorage.setItem(FALLBACK_KEY, STORAGE_ID);
    const { getInstall } = await loadClient();
    expect(await getInstall()).toEqual({ id: STORAGE_ID, inDatabase: true });
    expect(values.get("install-id")).toBe(STORAGE_ID);
    expect(localStorage.getItem(FALLBACK_KEY)).toBeNull();
  });

  it("never makes up another ID when the database fails, and tries again next time", async () => {
    vi.mocked(openDatabase).mockRejectedValueOnce(new Error("IndexedDB is blocked."));
    const { getInstall } = await loadClient();
    await expect(getInstall()).rejects.toThrow("IndexedDB is blocked.");
    expect(localStorage.getItem(FALLBACK_KEY)).toBeNull();

    vi.mocked(openDatabase).mockResolvedValue(fakeDatabase(new Map([["install-id", DATABASE_ID]])));
    expect(await getInstall()).toEqual({ id: DATABASE_ID, inDatabase: true });
  });

  it("keeps the ID in localStorage on a device without IndexedDB", async () => {
    vi.mocked(openDatabase).mockResolvedValue(null);
    const { getInstall } = await loadClient();
    const install = await getInstall();
    expect(install.inDatabase).toBe(false);
    expect(localStorage.getItem(FALLBACK_KEY)).toBe(install.id);
  });
});
