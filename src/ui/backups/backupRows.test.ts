import { describe, expect, it } from "vitest";
import { makeBackup } from "../../test/fixtures";
import { describeBackupRow } from "./backupRows";

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
