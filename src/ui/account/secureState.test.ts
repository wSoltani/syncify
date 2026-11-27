import { describe, expect, it } from "vitest";
import type { LinkedAccount } from "../../api/claimsApi";
import { accountTabStatus, describeSecureState } from "./secureState";

const session = { token: "t", email: "someone@example.com" };
const account = (changes: Partial<LinkedAccount>): LinkedAccount => ({
  hash: "h",
  status: "final",
  device_info: null,
  ...changes,
});
const elsewhere = { status: "final", mine: false, emails: ["j***n@example.com"] } as const;

describe("describeSecureState", () => {
  it("reads a backup secured by this account, with its linked usernames", () => {
    const state = describeSecureState({
      hash: "h",
      claim: { status: "final", mine: true },
      accounts: [account({}), account({ hash: "h2" })],
    });
    expect(state).toEqual({ kind: "secured", linkedCount: 2 });
  });

  it("leaves a backup open to this account when only other accounts secured it", () => {
    expect(describeSecureState({ hash: "h", claim: { ...elsewhere, emails: [...elsewhere.emails] }, accounts: [] })).toEqual({ kind: "open" });
    expect(describeSecureState({ hash: "h", claim: null, accounts: [account({ hash: "h2" })] })).toEqual({ kind: "open" });
    expect(describeSecureState(null)).toEqual({ kind: "unknown" });
  });

  it("says when Syncify undid securing this backup, whoever else secured it since", () => {
    const accounts = [account({ status: "unlinked" })];
    expect(describeSecureState({ hash: "h", claim: null, accounts })).toEqual({ kind: "undone" });
    expect(describeSecureState({ hash: "h", claim: { ...elsewhere, emails: [...elsewhere.emails] }, accounts })).toEqual({ kind: "undone" });
    // Undone on another username: this one is open.
    expect(describeSecureState({ hash: "h2", claim: null, accounts })).toEqual({ kind: "open" });
  });
});

describe("accountTabStatus", () => {
  it("shows a check when secured and a mark when something is needed", () => {
    expect(accountTabStatus(session, false, { kind: "secured", linkedCount: 1 })).toMatchObject({ kind: "ok" });
    expect(accountTabStatus(session, true, { kind: "open" })).toMatchObject({ kind: "warning" });
    expect(accountTabStatus(session, false, { kind: "undone" })).toMatchObject({ kind: "warning" });
    expect(accountTabStatus(null, true, { kind: "unknown" })).toMatchObject({ kind: "warning" });
    expect(accountTabStatus(session, false, { kind: "unknown" })).toMatchObject({ kind: "ok" });
  });

  it("shows nothing signed out on a backup nobody secured", () => {
    expect(accountTabStatus(null, false, { kind: "open" })).toBeNull();
  });
});
