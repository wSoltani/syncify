import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { loadConfig, saveConfig } from "./config";
import { RESTORED_SETTINGS_KEY } from "./extensionSettings";
import { parseRegistry, type SettingsRegistry } from "./settingsRegistry";
import {
  arrivedText,
  chooseFirstSync,
  finishSettingsSync,
  prepareSettingsSync,
  readSyncStatus,
  type SettingsSync,
} from "./settingsSync";

const store = new Map<string, unknown>();
vi.mock("./database", () => ({
  readState: async (key: string) => structuredClone(store.get(key)),
  writeState: async (key: string, value: unknown) => void store.set(key, structuredClone(value)),
  deleteState: async (key: string) => void store.delete(key),
}));
vi.mock("./account", () => ({ loadSession: async () => ({ token: "t", email: "e" }) }));
const registry = parseRegistry({
  format: 1,
  sizes: { small: 64, medium: 65536, large: 131072 },
  accountLimit: 262144,
  items: [
    { id: "a/trash/trash.js", addedBy: "owner", keys: ["TrashSongList", "trash-on"], lists: { TrashSongList: { merge: "object" } } },
    { id: "a/loop/loop.js", addedBy: "owner", keys: ["loop:*"] },
    { id: "a/tiny/tiny.js", addedBy: "owner", keys: ["tiny"], size: "small" },
  ],
}) as SettingsRegistry;
vi.mock("./settingsRegistry", async (original) => ({
  ...(await original<typeof import("./settingsRegistry")>()),
  loadRegistry: async () => registry,
}));

const TRASH = "a/trash/trash.js";
const LOOP = "a/loop/loop.js";
const TINY = "a/tiny/tiny.js";
const config = () => loadConfig();
const ok = (items: unknown[] = [], extra: Record<string, unknown> = {}) => ({
  status: "ok",
  version: 1,
  bytes: 100,
  budget: "open",
  results: {},
  items,
  ...extra,
});
function sentPart(sync: SettingsSync | null) {
  if (!sync) throw new Error("Nothing was prepared");
  return JSON.parse(sync.part) as { since: number; changes?: Record<string, unknown> };
}

beforeEach(() => {
  vi.stubGlobal("Spicetify", {});
  store.clear();
  localStorage.clear();
  saveConfig({ ...loadConfig(), settingsSyncOff: [] });
});
afterEach(() => vi.unstubAllGlobals());

describe("the first sync", () => {
  it("sends nothing before the account's copy is read, then takes, matches or asks", async () => {
    localStorage.setItem("trash-on", "true");
    localStorage.setItem("loop:song", "{\"a\":1}");
    localStorage.setItem("tiny", "x");

    const first = await prepareSettingsSync(config());
    expect(sentPart(first)).toEqual({ since: 0, installed: [TRASH, LOOP, TINY] });

    const outcome = await finishSettingsSync(
      first,
      ok([
        { id: TRASH, size: 30, data: { "trash-on": { v: "true", t: 5 } } },
        { id: LOOP, size: 30, data: { "loop:song": { v: "{\"a\":2}", t: Date.parse("2026-11-10") } } },
      ]),
      [],
    );
    expect(outcome.choose).toBe(true);
    const status = readSyncStatus();
    expect(status.choices.map((choice) => choice.id)).toEqual([LOOP]);
    expect(status.choices[0].accountAt).toBe(Date.parse("2026-11-10"));

    // Only here: sent whole next time. The same on both: nothing to send.
    // Waiting for the choice: nothing either.
    const second = await prepareSettingsSync(config());
    expect(sentPart(second).changes).toEqual({ [TINY]: { set: { tiny: "x" } } });
  });

  it("writes the other devices' copy when picked", async () => {
    localStorage.setItem("loop:song", "{\"a\":1}");
    const sync = await prepareSettingsSync(config());
    await finishSettingsSync(sync, ok([{ id: LOOP, size: 30, data: { "loop:song": { v: "{\"a\":2}", t: 9 } } }]), []);

    await chooseFirstSync({ [LOOP]: "account" });
    expect(localStorage.getItem("loop:song")).toBe("{\"a\":2}");
    expect(readSyncStatus().choices).toEqual([]);
    expect(readSyncStatus().arrived?.ids).toEqual([LOOP]);
  });
});

describe("later syncs", () => {
  async function synced() {
    localStorage.setItem("TrashSongList", JSON.stringify({ one: 1, two: 2 }));
    localStorage.setItem("trash-on", "true");
    const sync = await prepareSettingsSync(config());
    await finishSettingsSync(
      sync,
      ok([{ id: TRASH, size: 60, data: { TrashSongList: { v: { one: 1, two: 2 }, t: 1 }, "trash-on": { v: "true", t: 1 } } }]),
      [],
    );
  }

  it("sends list members put and removed, and changed keys", async () => {
    await synced();
    localStorage.setItem("TrashSongList", JSON.stringify({ one: 1, three: 3 }));
    localStorage.removeItem("trash-on");
    const sync = await prepareSettingsSync(config());
    expect(sentPart(sync).changes).toEqual({
      [TRASH]: { set: { "trash-on": null }, lists: { TrashSongList: { put: { three: 3 }, remove: ["two"] } } },
    });
  });

  it("takes the account's change when nothing changed here, and says so", async () => {
    await synced();
    const sync = await prepareSettingsSync(config());
    const outcome = await finishSettingsSync(
      sync,
      ok([{ id: TRASH, size: 60, data: { TrashSongList: { v: { one: 1 }, t: 2 }, "trash-on": { v: "false", t: 2 } } }], { version: 2 }),
      [],
    );
    expect(localStorage.getItem("trash-on")).toBe("false");
    expect(JSON.parse(localStorage.getItem("TrashSongList") ?? "null")).toEqual({ one: 1 });
    expect(outcome.arrived).toEqual(["Trash"]);
  });

  it("holds an item over its tier: it says so once and sends nothing else", async () => {
    await synced();
    localStorage.setItem("tiny", "x".repeat(100));
    const sync = await prepareSettingsSync(config());
    expect(sentPart(sync).changes?.[TINY]).toEqual({ held: expect.any(Number) });
    await finishSettingsSync(sync, ok([], { results: { [TINY]: "held" }, version: 2 }), []);
    expect(readSyncStatus().items.find((item) => item.id === TINY)?.hold?.reason).toBe("too_big");
    expect(sentPart(await prepareSettingsSync(config())).changes).toBeUndefined();
  });

  it("turns an item deleted on another device off here", async () => {
    await synced();
    const sync = await prepareSettingsSync(config());
    await finishSettingsSync(sync, ok([{ id: TRASH, size: 0, off: true, data: null }], { version: 3 }), []);
    expect(loadConfig().settingsSyncOff).toEqual([TRASH]);
  });

  it("waits for the next UTC day once the budget is used up", async () => {
    await synced();
    localStorage.setItem("trash-on", "false");
    const sync = await prepareSettingsSync(config());
    await finishSettingsSync(sync, ok([], { budget: "used_up", results: { [TRASH]: "kept" }, version: 2 }), []);
    expect(sentPart(await prepareSettingsSync(config())).changes).toBeUndefined();
  });

  it("keeps restored settings here when they weren't shared", async () => {
    await synced();
    localStorage.setItem("trash-on", "false");
    store.set(RESTORED_SETTINGS_KEY, { at: 1, ids: [TRASH], share: false });
    expect(sentPart(await prepareSettingsSync(config())).changes).toBeUndefined();
  });

  it("sends nothing with this device's switch off", async () => {
    expect(await prepareSettingsSync({ ...config(), settingsSyncEnabled: false })).toBeNull();
  });
});

describe("arrivedText", () => {
  it("names two and counts the rest", () => {
    expect(arrivedText(["Shuffle+", "Comfy"])).toBe("Shuffle+ and Comfy have new extension settings");
    expect(arrivedText(["Shuffle+", "Comfy", "A", "B", "C", "D"])).toBe(
      "Shuffle+, Comfy and 4 more have new extension settings",
    );
  });
});
