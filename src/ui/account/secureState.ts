import type { ClaimStatus } from "../../api/claimsApi";
import type { AccountSession } from "../../core/account";

/** Where securing this Spotify username's backup stands, signed in. */
export type SecureState =
  // The status couldn't be read yet.
  | { kind: "unknown" }
  | { kind: "open" }
  | { kind: "secured"; linkedCount: number }
  // Syncify undid it lately, which keeps this account from securing it again.
  | { kind: "undone" };

export function describeSecureState(claims: (ClaimStatus & { hash: string }) | null): SecureState {
  if (!claims) return { kind: "unknown" };

  const accounts = claims.accounts ?? [];
  if (claims.claim?.mine) {
    const linkedCount = accounts.filter((account) => account.status === "final").length;
    return { kind: "secured", linkedCount: Math.max(linkedCount, 1) };
  }
  // Other accounts securing it take nothing from this one, which still can.
  const undone = accounts.some((account) => account.hash === claims.hash && account.status === "unlinked");
  return { kind: undone ? "undone" : "open" };
}

/** What the Account tab's label shows: a check, or a mark that asks for something. */
export interface AccountTabStatus {
  kind: "ok" | "warning";
  label: string;
}

/**
 * A check when signed in with this backup secured, a mark when something
 * needs a sign-in or securing. `securedElsewhere`: it's secured with emails
 * this Syncify isn't signed in with, and Not me wasn't answered.
 */
export function accountTabStatus(
  session: AccountSession | null | undefined,
  securedElsewhere: boolean,
  secure: SecureState,
): AccountTabStatus | null {
  if (!session) return securedElsewhere ? { kind: "warning", label: "Sign in to see your backups" } : null;
  if (secure.kind === "secured") return { kind: "ok", label: "Signed in, backup secured" };
  if (secure.kind === "open") return { kind: "warning", label: "Backup not secured yet" };
  if (secure.kind === "undone") return { kind: "warning", label: "Backup not secured" };
  return { kind: "ok", label: "Signed in" };
}
