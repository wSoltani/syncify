import type { SyncifyClaim, SyncifyWaitingInstall } from "../types/syncify";

type PendingClaim = Extract<SyncifyClaim, { status: "pending" }>;
type UndoneClaim = Extract<SyncifyClaim, { status: "undone" }>;

/** When a claim goes final, as a day: "today", or "Nov 16". */
function claimDay(at: number, now = new Date()): string {
  const date = new Date(at);
  if (date.toDateString() === now.toDateString()) return "today";
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: date.getFullYear() === now.getFullYear() ? undefined : "numeric",
  });
}

/** "on Nov 16", or "today". */
export function securedOn(at: number): string {
  const day = claimDay(at);
  return day === "today" ? day : `on ${day}`;
}

/** "by Nov 16", or "today". */
export function notMeBy(at: number): string {
  const day = claimDay(at);
  return day === "today" ? day : `by ${day}`;
}

/**
 * Someone else's claim on this Spotify account, as a title and a sentence.
 * Signed out, it can be this person's own: from another computer, or after
 * Syncify's data here was lost.
 */
export function describeOtherClaim(claim: PendingClaim, signedIn: boolean): {
  title: string;
  text: string | null;
} {
  if (claim.not_me) return { title: "Syncify is checking who is securing this backup", text: null };
  return {
    title: `${claim.email ?? "Someone"} is securing this backup`,
    text: claim.held
      ? "Syncify is checking who is securing it."
      : signedIn
        ? `If that isn't you, press Not me ${notMeBy(claim.final_at)}.`
        : `If that's your email, sign in to Syncify here. If it isn't, press Not me ${notMeBy(claim.final_at)}.`,
  };
}

/** What Syncify says on a Spotify account after an admin undid someone else's claim. */
export function undoneClaimTitle(claim: UndoneClaim): string {
  return `This backup is no longer secured by ${claim.email ?? "another account"}`;
}

/** The toast after Not me. */
export function notMeToast(result: "cancelled" | "checking", email: string | null): string {
  if (result === "checking") return "Syncify: sent for a check";
  return email ? `Syncify: ${email} won't secure this backup` : "Syncify: this backup won't be secured";
}

/** "Syncify on Windows wants to back up this Spotify account" */
export function waitingInstallTitle(install: SyncifyWaitingInstall): string {
  return install.device
    ? `Syncify on ${install.device} wants to back up this Spotify account`
    : "Another device wants to back up this Spotify account";
}

/** The toast after answering a waiting device. */
export function installAnswerToast(action: "approve" | "reject"): string {
  return action === "approve" ? "Syncify: device approved" : "Syncify: device refused";
}
