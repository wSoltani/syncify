import { describe, expect, it } from "vitest";
import type { RestoreResult } from "../../core/restoreSummary";
import { makeBackup } from "../../test/fixtures";
import type { SyncifyClaim, SyncifySpicetifyConfig } from "../../types/syncify";
import { describeAlert, describeChanges, describeRestoreResult, describeStatus, type StatusFacts } from "./status";

const backup = makeBackup("abc", ["marketplace:installed:a/b/one.js", "marketplace:installed:a/b/two.js"]);

const facts = (changes: Partial<StatusFacts> = {}): StatusFacts => ({
  activity: "idle",
  checked: true,
  checkError: null,
  unsupported: false,
  locked: null,
  latest: backup,
  latestItems: ["one", "two"],
  backedUp: true,
  localHash: "abc",
  localItems: ["one", "two"],
  localItemCount: 2,
  localConfig: null,
  restoreResult: null,
  ...changes,
});

const config: SyncifySpicetifyConfig = {
  current_theme: "",
  color_scheme: "",
  extensions: ["fullAppDisplay.js"],
  custom_apps: [],
};

const result = (loaded: number, total: number, kind: RestoreResult["kind"] = "restore"): RestoreResult => ({
  kind,
  at: 0,
  loaded,
  total,
  manual: [],
});

describe("describeStatus", () => {
  it("says everything is backed up, with no action", () => {
    const status = describeStatus(facts());
    expect(status.title).toBe("Everything is backed up");
    expect(status.action).toBeNull();
    expect(status.backedUp).toBe(true);
    expect(status.detail[0]).toMatch(/^Last backup /);
    expect(status.detail[1]).toBe("2 items on this device");
    // Under an alert, the line drops the title for the facts.
    expect(status.line[0]).toBe("Backed up " + status.detail[0].slice("Last backup ".length));
  });

  it("offers Back up now when this device changed", () => {
    const status = describeStatus(
      facts({ backedUp: false, localHash: "new", localItems: ["one", "two", "three"], localItemCount: 3 }),
    );
    expect(status.title).toBe("Changes since your last backup");
    expect(status.action).toBe("back-up");
    expect(status.detail[0]).toBe("1 added");
    expect(status.line[0]).toBe("Changes since your last backup");
  });

  it("offers the first backup", () => {
    const status = describeStatus(facts({ latest: null, backedUp: false }));
    expect(status.title).toBe("No backup yet");
    expect(status.action).toBe("back-up");
  });

  it("says it's checking until the first check, and what failed after", () => {
    expect(describeStatus(facts({ checked: false, activity: "checking" }))).toMatchObject({
      title: "Checking your backup…",
      action: null,
    });
    expect(describeStatus(facts({ checked: false, checkError: "Couldn't reach Syncify." }))).toMatchObject({
      title: "Couldn't check your backup",
      detail: ["Couldn't reach Syncify."],
      action: "try-again",
    });
  });

  it("shows a backup in progress in place", () => {
    expect(describeStatus(facts({ activity: "backing-up" }))).toMatchObject({
      title: "Backing up…",
      action: "back-up",
    });
  });

  it("asks for a sign-in when the backup is locked", () => {
    expect(describeStatus(facts({ locked: "claimed" }))).toMatchObject({
      title: "Sign in to restore",
      detail: ["This backup is secured"],
      action: "sign-in",
    });
    expect(describeStatus(facts({ locked: "not_owner" })).detail).toEqual(["Secured by another account"]);
  });

  it("puts a version too old before a lock and a backup", () => {
    expect(describeStatus(facts({ unsupported: true, locked: "claimed", activity: "backing-up" }))).toMatchObject({
      title: "Update Syncify to keep backing up",
      action: "how-to-update",
    });
  });

  it("puts a restore's result before everything else", () => {
    expect(describeStatus(facts({ restoreResult: result(11, 13), locked: "claimed" }))).toMatchObject({
      title: "Restored 11 of 13",
      action: "reload",
    });
    expect(describeStatus(facts({ restoreResult: result(1, 1), unsupported: true })).title).toBe(
      "Update Syncify to keep backing up",
    );
  });
});

describe("describeRestoreResult", () => {
  it("asks for support only when everything loaded", () => {
    expect(describeRestoreResult(result(13, 13))).toMatchObject({
      title: "Backup restored",
      detail: ["13 of 13 loaded"],
      action: null,
      supportAsk: "Syncify saved your setup?",
    });
    expect(describeRestoreResult(result(2, 3, "share"))).toMatchObject({
      title: "Loaded 2 of 3",
      detail: ["Missing something? Reload Spotify once more."],
      supportAsk: null,
    });
    expect(describeRestoreResult(result(0, 0, "share"))).toMatchObject({
      title: "Setup loaded",
      detail: ["Nothing from Marketplace to load"],
    });
  });
});

describe("describeChanges", () => {
  it("counts added and removed items, then the last backup", () => {
    const parts = describeChanges(backup, ["one", "two"], ["two", "three", "four"], null);
    expect(parts.slice(0, 2)).toEqual(["2 added", "1 removed"]);
    expect(parts[2]).toMatch(/^Last backup /);
  });

  it("says when the Spicetify config changed or was never saved", () => {
    expect(describeChanges({ ...backup, spicetify_config: config }, [], [], { ...config, extensions: [] })[0]).toBe(
      "Spicetify config changed",
    );
    expect(describeChanges(backup, [], [], config)[0]).toBe("Spicetify config not saved yet");
    expect(describeChanges({ ...backup, spicetify_config: config }, [], [], { ...config })).toHaveLength(1);
  });
});

describe("describeAlert", () => {
  const pending = (changes: Partial<Extract<SyncifyClaim, { status: "pending" }>> = {}): SyncifyClaim => ({
    status: "pending",
    mine: false,
    email: "j***n@example.com",
    final_at: new Date(2026, 10, 19).getTime(),
    held: false,
    ...changes,
  });
  const waiting = { id: "w1", device: "Windows", first_seen_at: 0 };

  it("puts someone else's claim before a waiting install", () => {
    const alert = describeAlert(pending(), waiting);
    expect(alert).toMatchObject({ kind: "claim", title: "j***n@example.com is securing this backup", canAnswer: true });
  });

  it("can't answer a claim already sent for a check", () => {
    expect(describeAlert(pending({ not_me: true }), null)).toMatchObject({
      kind: "claim",
      title: "Syncify is checking this claim",
      text: null,
      canAnswer: false,
    });
  });

  it("shows a waiting install when no one else is claiming", () => {
    expect(describeAlert(pending({ mine: true }), waiting)).toMatchObject({
      kind: "install",
      title: "A new install on Windows wants to back up this Spotify account",
    });
    expect(describeAlert(null, null)).toBeNull();
  });
});
