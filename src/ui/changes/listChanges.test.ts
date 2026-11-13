import { describe, expect, it } from "vitest";
import type { RestorePreview } from "../../core/restorePreview";
import type { SourceCheck } from "../../core/sourceChecks";
import { makePreviewItem } from "../../test/fixtures";
import { changesLabel, listChanges } from "./listChanges";

describe("listChanges", () => {
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
    const list = listChanges(preview, new Map(), { optional: none, allowed: none });
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
    const off = listChanges(preview, new Map(), { optional, allowed: none });
    expect(off.changes[0]).toMatchObject({ optional: true, included: false });
    expect(off.count).toBe(3);
    expect(listChanges(preview, new Map(), { optional, allowed: optional }).count).toBe(4);
  });

  it("notes items not approved", () => {
    const optional = new Set([key("Shuffle+")]);
    const list = listChanges(preview, new Map(), { optional, allowed: none, unapproved: true });
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
    const list = listChanges(preview, checks, { optional: none, allowed: none });
    expect(list.warnings).toEqual([
      "Beautiful Lyrics is on Marketplace's block list. Restore it only if you trust it.",
      "Lyrics Plus and Shuffle+ load from sites outside GitHub. Restore them only if you trust them.",
    ]);
    expect(list.changes[0].note).toBe("Code from lyrics.example.dev");
    const load = listChanges(preview, checks, { optional: none, allowed: none, verb: "Load" });
    expect(load.warnings[0]).toBe("Beautiful Lyrics is on Marketplace's block list. Load it only if you trust it.");
  });

  it("keeps snippets Marketplace's list lost off for good, without a trust warning", () => {
    const fixed = new Set([key("Shuffle+")]);
    const checks = new Map<string, SourceCheck>([[key("Shuffle+"), { kind: "unchecked" }]]);
    const list = listChanges(preview, checks, { optional: none, allowed: fixed, fixed });
    expect(list.changes.find((row) => row.name === "Shuffle+")).toMatchObject({
      optional: true,
      fixed: true,
      included: false,
    });
    expect(list.count).toBe(3);
    expect(list.warnings).toEqual(["Shuffle+ isn't in Marketplace's list anymore, so it stays off."]);
  });
});

describe("changesLabel", () => {
  it("counts the changes", () => {
    expect(changesLabel("Restore", 0)).toBe("Restore");
    expect(changesLabel("Restore", 1)).toBe("Restore 1 change");
    expect(changesLabel("Load", 4)).toBe("Load 4 changes");
  });
});
