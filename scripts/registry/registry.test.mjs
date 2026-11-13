import { describe, expect, it } from "vitest";
import { checkRegistry, keysOverlap, readJson, registryPath, schemaPath } from "./check.mjs";
import { checkPullRequest, diffItems, manifestPaths } from "./owners.mjs";

const schema = await readJson(schemaPath);

const registry = (items, extra = {}) => ({
  format: 1,
  sizes: { small: 16384, medium: 65536, large: 131072 },
  accountLimit: 262144,
  items,
  ...extra,
});

const item = (id, fields = {}) => ({ id, addedBy: "owner", keys: [`${id.split("/")[1]}:*`], ...fields });

describe("checkRegistry", () => {
  it("accepts the registry in the repo", async () => {
    expect(checkRegistry(await readJson(registryPath), schema)).toEqual([]);
  });

  it("refuses fields the schema doesn't know", () => {
    expect(checkRegistry(registry([item("a/b/c.js", { extra: 1 })]), schema)).not.toEqual([]);
  });

  it("needs a reason for a large placeholder but not for an owner's large entry", () => {
    const placeholder = item("a/b/c.js", { addedBy: "syncify", size: "large" });
    expect(checkRegistry(registry([placeholder]), schema)).not.toEqual([]);
    expect(checkRegistry(registry([{ ...placeholder, addedBy: "owner" }]), schema)).toEqual([]);
  });

  it("lets only owners list on Discover, with or without keys", () => {
    expect(checkRegistry(registry([item("a/b/c.js", { keys: [], discover: true })]), schema)).toEqual([]);
    expect(
      checkRegistry(registry([item("a/b/c.js", { addedBy: "syncify", discover: true })]), schema),
    ).not.toEqual([]);
    expect(checkRegistry(registry([item("a/b/c.js", { keys: [] })]), schema)).not.toEqual([]);
  });

  it("refuses ids that don't name a repo", () => {
    for (const id of ["a/c.js", "a/../c.js", "-a/b/c.js", "a/b/c d.js"]) {
      expect(checkRegistry(registry([item(id, { keys: ["k"] })]), schema)).not.toEqual([]);
    }
  });

  it("refuses duplicate and unsorted ids", () => {
    expect(checkRegistry(registry([item("a/b/c.js"), item("a/b/c.js")]), schema)).toEqual([
      "a/b/c.js is listed twice",
    ]);
    expect(
      checkRegistry(registry([item("z/y/x.js", { keys: ["x"] }), item("a/b/c.js")]), schema),
    ).toEqual(["a/b/c.js must come before z/y/x.js: items are sorted by id"]);
  });

  it("refuses size tiers out of order or over the account limit", () => {
    expect(
      checkRegistry(registry([], { sizes: { small: 2, medium: 1, large: 3 } }), schema),
    ).toEqual(["sizes must grow from small to medium to large"]);
    expect(checkRegistry(registry([], { accountLimit: 100000 }), schema)).toEqual([
      "sizes.large can't be more than accountLimit",
    ]);
  });

  it("refuses a key that its own exclude list removes", () => {
    expect(
      checkRegistry(registry([item("a/b/c.js", { keys: ["b:token"], exclude: ["b:*"] })]), schema),
    ).toEqual(["a/b/c.js: b:token is in keys but b:* excludes it"]);
    expect(
      checkRegistry(registry([item("a/b/c.js", { keys: ["b:*"], exclude: ["b:token"] })]), schema),
    ).toEqual([]);
  });

  it("needs every list in keys, by its exact name", () => {
    expect(
      checkRegistry(
        registry([item("a/b/c.js", { keys: ["b:*"], lists: { "b:list": { merge: "object" } } })]),
        schema,
      ),
    ).toEqual(["a/b/c.js: list b:list must also be in keys"]);
  });

  it("keeps items off keys and databases Spicetify, Marketplace and Syncify use", () => {
    expect(checkRegistry(registry([item("a/b/c.js", { keys: ["syncify:config"] })]), schema)).toEqual([
      "a/b/c.js: syncify:config belongs to Spicetify, Marketplace or Syncify",
    ]);
    expect(checkRegistry(registry([item("a/b/c.js", { keys: ["market*"] })]), schema)).toEqual([
      "a/b/c.js: market* belongs to Spicetify, Marketplace or Syncify",
    ]);
    const indexedDB = { type: "indexedDB", database: "spicetify-marketplace", store: "settings" };
    expect(
      checkRegistry(registry([item("a/b/c.js", { keys: ["marketplace:x"], storage: indexedDB })]), schema),
    ).toEqual(["a/b/c.js: database spicetify-marketplace belongs to Spicetify, Marketplace or Syncify"]);
  });

  it("refuses two items claiming the same keys in the same place only", () => {
    const one = item("a/b/one.js", { keys: ["shared:*"] });
    const two = item("a/b/two.js", { keys: ["shared:x"] });
    expect(checkRegistry(registry([one, two]), schema)).toEqual([
      "a/b/one.js and a/b/two.js both claim shared:* and shared:x in localStorage",
    ]);
    const exact = item("a/b/three.js", { keys: ["shared:"] });
    expect(checkRegistry(registry([one, exact]), schema)).toEqual([
      "a/b/one.js and a/b/three.js both claim shared:* and shared: in localStorage",
    ]);
    const elsewhere = { ...two, storage: { type: "indexedDB", database: "two", store: "settings" } };
    expect(checkRegistry(registry([one, elsewhere]), schema)).toEqual([]);
  });
});

describe("keysOverlap", () => {
  it("compares exact keys and prefixes", () => {
    expect(keysOverlap("a", "a")).toBe(true);
    expect(keysOverlap("a", "b")).toBe(false);
    expect(keysOverlap("a:*", "a:b")).toBe(true);
    expect(keysOverlap("a:b", "a:*")).toBe(true);
    expect(keysOverlap("a:*", "a:b:*")).toBe(true);
    expect(keysOverlap("a:*", "b:*")).toBe(false);
  });
});

describe("manifestPaths", () => {
  it("gives the ids Marketplace builds for extensions, themes and apps", () => {
    expect(
      manifestPaths([
        { name: "One", main: "dist/one.js" },
        { name: "Theme", usercss: "user.css" },
        { name: "My App" },
      ]),
    ).toEqual(["dist/one.js", "One", "user.css", "Theme", "My-App"]);
  });
});

describe("diffItems", () => {
  it("finds added, changed and removed entries and top-level changes", () => {
    const base = registry([item("a/b/one.js"), item("a/b/two.js")]);
    const head = registry([item("a/b/one.js", { size: "small" }), item("a/b/three.js")]);
    const diff = diffItems(base, head);
    expect(diff.changed.map((change) => change.id)).toEqual(["a/b/one.js", "a/b/three.js"]);
    expect(diff.removed).toEqual(["a/b/two.js"]);
    expect(diff.settingsChanged).toBe(false);
    expect(diffItems(base, { ...head, accountLimit: 1 }).settingsChanged).toBe(true);
  });
});

describe("checkPullRequest", () => {
  const github = ({ ownerType = "User", owner = "alice", members = [], manifest } = {}) => ({
    repo: async (user, repo) =>
      user.toLowerCase() === owner.toLowerCase()
        ? { full_name: `${owner}/${repo}`, default_branch: "main", owner: { login: owner, type: ownerType } }
        : null,
    isPublicMember: async (_org, login) => members.includes(login),
    manifest: async () => manifest ?? [{ name: "Ext", main: "ext.js" }],
  });
  const base = registry([]);
  const head = registry([item("alice/repo/ext.js")]);
  const run = (fields) =>
    checkPullRequest({ base, head, author: "alice", maintainer: "wSoltani", github: github(), ...fields });

  it("accepts the repo's owner", async () => {
    expect(await run()).toEqual([]);
  });

  it("accepts a public member of the organization that owns the repo", async () => {
    expect(
      await run({ author: "bob", github: github({ ownerType: "Organization", members: ["bob"] }) }),
    ).toEqual([]);
    expect(await run({ author: "bob", github: github({ ownerType: "Organization" }) })).toEqual([
      "alice/repo/ext.js: only the owner of alice/repo can add or change this entry",
    ]);
  });

  it("refuses anyone else, and placeholders from anyone but Syncify", async () => {
    expect(await run({ author: "mallory" })).toEqual([
      "alice/repo/ext.js: only the owner of alice/repo can add or change this entry",
    ]);
    const placeholder = registry([item("alice/repo/ext.js", { addedBy: "syncify" })]);
    expect(await run({ head: placeholder })).toEqual([
      'alice/repo/ext.js: entries submitted by an owner use "addedBy": "owner"',
    ]);
    expect(await run({ head: placeholder, author: "wsoltani" })).toEqual([]);
  });

  it("checks the id against the repo's name and manifest, even for Syncify", async () => {
    expect(await run({ author: "wSoltani", head: registry([item("ALICE/repo/ext.js")]) })).toEqual([
      "ALICE/repo/ext.js: the repo is alice/repo, so the id must start with alice/repo/",
    ]);
    expect(await run({ author: "wSoltani", head: registry([item("alice/repo/other.js")]) })).toEqual([
      "alice/repo/other.js: alice/repo's manifest.json has no item at other.js",
    ]);
    expect(await run({ author: "wSoltani", head: registry([item("carol/repo/ext.js")]) })).toEqual([
      "carol/repo/ext.js: no public GitHub repo carol/repo",
    ]);
  });

  it("lets only the owner remove an entry, and only Syncify change the limits", async () => {
    expect(await run({ base: head, head: base, author: "mallory" })).toEqual([
      "alice/repo/ext.js: only the owner of its repo can remove this entry",
    ]);
    expect(await run({ base: head, head: base })).toEqual([]);
    expect(await run({ base: head, head: { ...head, accountLimit: 300000 } })).toEqual([
      "Only Syncify changes the format, sizes and account limit",
    ]);
  });
});
