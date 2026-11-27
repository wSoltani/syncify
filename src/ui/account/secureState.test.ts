import { describe, expect, it } from "vitest";
import type { LinkedAccount } from "../../api/claimsApi";
import { accountTabStatus, describeSecureState, pendingSecureText } from "./secureState";

const session = { token: "t", email: "someone@example.com" };
const account = (changes: Partial<LinkedAccount>): LinkedAccount => ({
  hash: "h",
  status: "final",
  final_at: 0,
  held: false,
  cancelled_by: null,
  device_info: null,
  ...changes,
});

describe("describeSecureState", () => {
  it("reads a backup secured by this account, with its linked accounts", () => {
    const state = describeSecureState(
      { hash: "h", claim: { status: "final", mine: true }, accounts: [account({}), account({ hash: "h2" })] },
      false,
    );
    expect(state).toEqual({ kind: "secured", linkedCount: 2 });
  });

  it("tells another account's claim from an open backup", () => {
    expect(describeSecureState({ hash: "h", claim: { status: "final", mine: false }, accounts: [] }, false)).toEqual({
      kind: "other-account",
    });
    expect(describeSecureState(null, true)).toEqual({ kind: "other-claim" });
    expect(describeSecureState(null, false)).toEqual({ kind: "unknown" });
    expect(describeSecureState({ hash: "h", claim: null, accounts: [] }, false)).toEqual({ kind: "open" });
  });

  it("says how a claim on this backup ended lately", () => {
    const ended = (changes: Partial<LinkedAccount>) =>
      describeSecureState({ hash: "h", claim: null, accounts: [account(changes)] }, false);
    expect(ended({ status: "unlinked" })).toEqual({ kind: "ended", reason: "undone" });
    expect(ended({ status: "cancelled", cancelled_by: "owner" })).toEqual({ kind: "ended", reason: "owner" });
    expect(ended({ status: "cancelled", cancelled_by: null })).toEqual({ kind: "ended", reason: "admin" });
    expect(ended({ status: "cancelled", cancelled_by: "claimer" })).toEqual({ kind: "open" });
  });
});

describe("accountTabStatus", () => {
  it("shows a check when secured and a mark when something is needed", () => {
    expect(accountTabStatus(session, false, { kind: "secured", linkedCount: 1 })).toMatchObject({ kind: "ok" });
    expect(accountTabStatus(session, false, { kind: "open" })).toMatchObject({ kind: "warning" });
    expect(accountTabStatus(null, true, { kind: "unknown" })).toMatchObject({ kind: "warning" });
    expect(accountTabStatus(session, true, { kind: "other-account" })).toMatchObject({ kind: "ok" });
  });

  it("shows nothing signed out or while securing", () => {
    expect(accountTabStatus(null, false, { kind: "open" })).toBeNull();
    expect(accountTabStatus(session, false, { kind: "pending", finalAt: 0, held: false })).toBeNull();
  });
});

describe("pendingSecureText", () => {
  it("says when it's secured, or that it's being checked", () => {
    expect(pendingSecureText({ kind: "pending", finalAt: Date.now(), held: false })).toBe(
      "Your backup will be secured today",
    );
    expect(pendingSecureText({ kind: "pending", finalAt: 0, held: true })).toBe(
      "Syncify is checking your request to secure this backup",
    );
  });
});
