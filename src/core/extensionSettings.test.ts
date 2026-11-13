import { afterEach, describe, expect, it } from "vitest";
import { compareSettings, fitSettings, readLocalSettings, writeSettings } from "./extensionSettings";
import { parseRegistry, type SettingsRegistry } from "./settingsRegistry";

const registry = parseRegistry({
  format: 1,
  sizes: { small: 16384, medium: 65536, large: 131072 },
  accountLimit: 262144,
  items: [
    {
      id: "someone/trash/trash.js",
      addedBy: "owner",
      keys: ["TrashSongList", "trash-enabled"],
      lists: { TrashSongList: { merge: "object" } },
    },
    { id: "someone/loop/loop.js", addedBy: "owner", keys: ["loop:*"], exclude: ["loop:token"] },
    {
      id: "someone/sort/sort.mjs",
      addedBy: "owner",
      keys: ["sort-*"],
      storage: { type: "indexedDB", database: "SortDB", store: "settings", valueField: "val" },
    },
  ],
}) as SettingsRegistry;

afterEach(() => localStorage.clear());

describe("parseRegistry", () => {
  it("skips a format it doesn't know", () => {
    expect(parseRegistry({ format: 2, items: [] })).toBeNull();
  });

  it("drops entries that name keys Spicetify, Marketplace or Syncify keep", () => {
    const parsed = parseRegistry({
      format: 1,
      items: [
        { id: "a/b/c.js", addedBy: "owner", keys: ["marketplace:installed-extensions"] },
        { id: "a/b/d.js", addedBy: "owner", keys: ["sync*"] },
        { id: "a/b/e.js", addedBy: "owner", keys: ["x"], storage: { type: "indexedDB", database: "syncify", store: "state" } },
        { id: "a/b/f.js", addedBy: "owner", keys: ["fine"] },
      ],
    });
    expect(parsed?.items.map((item) => item.id)).toEqual(["a/b/f.js"]);
  });
});

describe("readLocalSettings", () => {
  it("reads registered keys and never excluded ones", async () => {
    localStorage.setItem("trash-enabled", "true");
    localStorage.setItem("loop:song1", "{\"start\":1}");
    localStorage.setItem("loop:token", "secret");
    localStorage.setItem("unrelated", "x");

    const { settings } = await readLocalSettings({ items: registry.items.slice(0, 2) });
    expect(settings).toEqual({
      "someone/trash/trash.js": { storage: "localStorage", values: { "trash-enabled": "true" } },
      "someone/loop/loop.js": { storage: "localStorage", values: { "loop:song1": "{\"start\":1}" } },
    });
  });
});

describe("writeSettings", () => {
  it("makes an item's keys the backup's, touching only keys the registry names", async () => {
    localStorage.setItem("loop:song1", "old");
    localStorage.setItem("loop:song2", "gone after");
    localStorage.setItem("loop:token", "kept");

    await writeSettings(
      registry,
      {
        "someone/loop/loop.js": {
          storage: "localStorage",
          values: { "loop:song1": "new", "loop:token": "forged", "syncify:config": "forged" },
        },
      },
      ["someone/loop/loop.js"],
    );

    expect(localStorage.getItem("loop:song1")).toBe("new");
    expect(localStorage.getItem("loop:song2")).toBeNull();
    expect(localStorage.getItem("loop:token")).toBe("kept");
    expect(localStorage.getItem("syncify:config")).toBeNull();
  });

  it("leaves items out of the restore alone, and items saved in another place", async () => {
    localStorage.setItem("trash-enabled", "true");
    await writeSettings(
      registry,
      {
        "someone/trash/trash.js": { storage: "indexedDB", values: { "trash-enabled": "false" } },
        "someone/loop/loop.js": { storage: "localStorage", values: { "loop:a": "1" } },
      },
      ["someone/trash/trash.js"],
    );
    expect(localStorage.getItem("trash-enabled")).toBe("true");
    expect(localStorage.getItem("loop:a")).toBeNull();
  });
});

describe("compareSettings", () => {
  it("lists items whose settings differ, and whether only lists do", () => {
    const changes = compareSettings(
      registry,
      {
        "someone/trash/trash.js": { storage: "localStorage", values: { TrashSongList: "{\"a\":1}", "trash-enabled": "true" } },
        "someone/loop/loop.js": { storage: "localStorage", values: { "loop:a": "1" } },
      },
      {
        settings: {
          "someone/trash/trash.js": { storage: "localStorage", values: { TrashSongList: "{}", "trash-enabled": "true" } },
          "someone/loop/loop.js": { storage: "localStorage", values: { "loop:a": "1" } },
        },
        unavailable: new Set(),
      },
    );
    expect(changes).toEqual([{ id: "someone/trash/trash.js", listsOnly: true }]);
  });

  it("compares only the value of an IndexedDB record, and skips stores not on this device", () => {
    const backup = {
      "someone/sort/sort.mjs": { storage: "indexedDB" as const, values: { "sort-mode": { val: "a", ts: 1 } } },
    };
    const local = {
      settings: { "someone/sort/sort.mjs": { storage: "indexedDB" as const, values: { "sort-mode": { val: "a", ts: 2 } } } },
      unavailable: new Set<string>(),
    };
    expect(compareSettings(registry, backup, local)).toEqual([]);
    expect(compareSettings(registry, backup, { settings: {}, unavailable: new Set(["someone/sort/sort.mjs"]) })).toEqual([]);
  });
});

describe("fitSettings", () => {
  const settings = {
    big: { storage: "localStorage" as const, values: { k: "x".repeat(100) } },
    small: { storage: "localStorage" as const, values: { k: "x" } },
  };

  it("adds the smallest items first and stops at the limit, to the byte", () => {
    const base = { a: 1 };
    const baseBytes = JSON.stringify(base).length;
    const both = JSON.stringify({ ...base, extension_settings: { small: settings.small, big: settings.big } }).length;

    expect(Object.keys(fitSettings(settings, baseBytes, both))).toEqual(["small", "big"]);
    expect(Object.keys(fitSettings(settings, baseBytes, both - 1))).toEqual(["small"]);
  });
});
