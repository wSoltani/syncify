import { afterEach, describe, expect, it, vi } from "vitest";
import { openDatabase, retrying } from "./database";

const OPENED_KEY = "syncify:database-opened";

/** An IndexedDB whose open fails, or succeeds, on the next turn. */
function stubIndexedDb(outcome: "error" | "success") {
  vi.stubGlobal("indexedDB", {
    open() {
      const request = {
        result: { close() {} },
        error: new Error("IndexedDB failed to open."),
        onerror: null as (() => void) | null,
        onsuccess: null as (() => void) | null,
        onupgradeneeded: null,
      };
      setTimeout(() => (outcome === "error" ? request.onerror?.() : request.onsuccess?.()));
      return request;
    },
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
  localStorage.clear();
});

describe("openDatabase", () => {
  it("takes a database that never opened on this device for none", async () => {
    stubIndexedDb("error");
    expect(await openDatabase()).toBeNull();
  });

  it("fails when a database that opened before fails to open", async () => {
    stubIndexedDb("success");
    await openDatabase();
    expect(localStorage.getItem(OPENED_KEY)).toBe("true");

    stubIndexedDb("error");
    await expect(openDatabase()).rejects.toThrow("IndexedDB failed to open.");
  });
});

describe("retrying", () => {
  it("tries again after a failure and gives up after the last try", async () => {
    vi.useFakeTimers();
    try {
      let calls = 0;
      const flaky = retrying(async () => {
        calls += 1;
        if (calls < 3) throw new Error("busy");
        return "id";
      });
      await vi.runAllTimersAsync();
      expect(await flaky).toBe("id");
      expect(calls).toBe(3);

      const broken = retrying(async () => {
        throw new Error("IndexedDB failed.");
      });
      const settled = expect(broken).rejects.toThrow("IndexedDB failed.");
      await vi.runAllTimersAsync();
      await settled;
    } finally {
      vi.useRealTimers();
    }
  });
});
