import { describe, expect, it } from "vitest";
import { makeBackup, makePreviewItem } from "../../test/fixtures";
import { describeBackupRow } from "./backupRows";
import { listRestoreChanges, restoreLabel } from "./restoreChanges";
import type { SourceCheck } from "../../core/sourceChecks";
import type { RestorePreview } from "../../core/restorePreview";

const extensions = ["marketplace:installed:a/b/one.js", "marketplace:installed:a/b/two.js"];

describe("describeBackupRow", () => {
  it("names a backup by its date, with a capital", () => {
    const row = describeBackupRow(makeBackup("h1", extensions, { at: new Date().toISOString() }), "backup", null);
    expect(row.name).toMatch(/^Today, /);
    expect(row.meta).toEqual(["2 items", "from Windows"]);
    expect(row.title).toMatch(/^today, /);
    expect(row.current).toBe(false);
  });

  it("puts a name given on the website first, and the date in the meta", () => {
    const row = describeBackupRow(makeBackup("h1", extensions, { name: "Before reinstall" }), "backup", "h1");
    expect(row.name).toBe("Before reinstall");
    expect(row.meta).toHaveLength(3);
    expect(row.meta.slice(1)).toEqual(["2 items", "from Windows"]);
    expect(row.title).toBe("Before reinstall");
    expect(row.current).toBe(true);
  });

  it("names the safety copy and says it's updated weekly", () => {
    const row = describeBackupRow(makeBackup("h2", extensions), "safety-copy", null);
    expect(row.name).toBe("Safety copy");
    expect(row.meta.slice(1)).toEqual(["2 items", "updated weekly"]);
    expect(row.title).toMatch(/^the safety copy from /);
  });

  it("marks a backup from an install not approved", () => {
    const row = describeBackupRow(makeBackup("h3", extensions, { device: "Linux" }), "unapproved", null);
    expect(row.name).toBe("Not approved");
    expect(row.meta.slice(1)).toEqual(["2 items", "from Linux"]);
  });
});

describe("listRestoreChanges", () => {
  const preview: RestorePreview = {
    items: [
      makePreviewItem("Zoom", "removed"),
      makePreviewItem("Comfy", "unchanged"),
      makePreviewItem("Beautiful Lyrics", "unchanged", true),
      makePreviewItem("Lyrics Plus", "added"),
      makePreviewItem("Shuffle+", "added"),
    ],
    counts: { added: 2, removed: 1, unchanged: 2 },
    manual: [],
  };
  const key = (name: string) => `marketplace:installed:${name}`;
  const none = new Set<string>();

  it("lists Adds, then Updates, then Removes, and folds the rest", () => {
    const list = listRestoreChanges(preview, new Map(), none, none, false);
    expect(list.changes.map((row) => [row.name, row.change])).toEqual([
      ["Lyrics Plus", "Adds"],
      ["Shuffle+", "Adds"],
      ["Beautiful Lyrics", "Updates"],
      ["Zoom", "Removes"],
    ]);
    expect(list.unchanged.map((row) => row.name)).toEqual(["Comfy"]);
    expect(list.count).toBe(4);
    expect(list.warnings).toEqual([]);
  });

  it("leaves optional items out of the count until they're turned on", () => {
    const optional = new Set([key("Lyrics Plus")]);
    const off = listRestoreChanges(preview, new Map(), optional, none, false);
    expect(off.changes[0]).toMatchObject({ optional: true, included: false });
    expect(off.count).toBe(3);
    expect(listRestoreChanges(preview, new Map(), optional, optional, false).count).toBe(4);
  });

  it("notes items not approved", () => {
    const optional = new Set([key("Shuffle+")]);
    const list = listRestoreChanges(preview, new Map(), optional, none, true);
    expect(list.changes.find((row) => row.name === "Shuffle+")?.note).toBe("Not approved");
  });

  it("writes out each kind of warning once, naming its items", () => {
    const checks = new Map<string, SourceCheck>([
      [key("Lyrics Plus"), { kind: "host", host: "lyrics.example.dev" }],
      [key("Shuffle+"), { kind: "host", host: "cdn.example.dev" }],
      [key("Beautiful Lyrics"), { kind: "blocked" }],
      // Removing an item needs no warning.
      [key("Zoom"), { kind: "catalog" }],
    ]);
    const list = listRestoreChanges(preview, checks, none, none, false);
    expect(list.warnings).toEqual([
      "Beautiful Lyrics is on Marketplace's block list. Restore it only if you trust it.",
      "Lyrics Plus and Shuffle+ load from sites outside GitHub. Restore them only if you trust them.",
    ]);
    expect(list.changes[0].note).toBe("Code from lyrics.example.dev");
  });
});

describe("restoreLabel", () => {
  it("counts the changes", () => {
    expect(restoreLabel(0)).toBe("Restore");
    expect(restoreLabel(1)).toBe("Restore 1 change");
    expect(restoreLabel(4)).toBe("Restore 4 changes");
  });
});
