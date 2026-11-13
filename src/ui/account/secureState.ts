import type { ClaimStatus } from "../../api/claimsApi";
import type { LockedError } from "../../api/syncifyApi";
import type { AccountSession } from "../../core/account";
import { securedOn } from "../claimText";

/** Where securing this Spotify account's backup stands, signed in. */
export type SecureState =
  // The claim status couldn't be read yet.
  | { kind: "unknown" }
  | { kind: "open" }
  | { kind: "pending"; finalAt: number; held: boolean }
  | { kind: "secured"; linkedCount: number }
  | { kind: "other-claim" }
  | { kind: "other-account" }
  // Ended lately: cancelled from this Spotify account or by an admin, or
  // undone by an admin, which keeps this account from securing it again.
  | { kind: "ended"; reason: "owner" | "admin" | "undone" };

export function describeSecureState(
  claims: (ClaimStatus & { hash: string }) | null,
  locked: LockedError["code"] | null,
  otherClaim: boolean,
): SecureState {
  if (locked === "not_owner") return { kind: "other-account" };
  if (!claims) return otherClaim ? { kind: "other-claim" } : { kind: "unknown" };

  const { claim } = claims;
  if (claim?.status === "final") {
    if (!claim.mine) return { kind: "other-account" };
    const linkedCount = (claims.accounts ?? []).filter(
      (account) => account.status === "final",
    ).length;
    return { kind: "secured", linkedCount: Math.max(linkedCount, 1) };
  }
  if (claim?.status === "pending") {
    return claim.mine
      ? { kind: "pending", finalAt: claim.final_at, held: claim.held }
      : { kind: "other-claim" };
  }

  // Ended lately, and not claimed again since (the list keeps only those).
  const own = (claims.accounts ?? []).filter(
    (account) => account.hash === claims.hash,
  );
  const latest = own[own.length - 1];
  if (latest?.status === "unlinked") return { kind: "ended", reason: "undone" };
  if (latest?.status === "cancelled" && latest.cancelled_by !== "claimer") {
    return { kind: "ended", reason: latest.cancelled_by === "owner" ? "owner" : "admin" };
  }
  return { kind: "open" };
}

/** What the Account tab's label shows: a check, or a mark that asks for something. */
export interface AccountTabStatus {
  kind: "ok" | "warning";
  label: string;
}

/**
 * A check when signed in with this backup secured, a mark when something
 * needs a sign-in or securing, nothing while it's being secured.
 */
export function accountTabStatus(
  session: AccountSession | null | undefined,
  locked: LockedError["code"] | null,
  secure: SecureState,
): AccountTabStatus | null {
  if (locked) return { kind: "warning", label: "Sign in to see your backups" };
  if (!session) return null;
  if (secure.kind === "secured") return { kind: "ok", label: "Signed in, backup secured" };
  if (secure.kind === "pending") return null;
  if (secure.kind === "open") return { kind: "warning", label: "Backup not secured yet" };
  if (secure.kind === "ended") return { kind: "warning", label: "Backup not secured" };
  return { kind: "ok", label: "Signed in" };
}

/** "Your backup will be secured on Nov 16" */
export function pendingSecureText(secure: Extract<SecureState, { kind: "pending" }>): string {
  return secure.held
    ? "Syncify is checking your request to secure this backup"
    : `Your backup will be secured ${securedOn(secure.finalAt)}`;
}
