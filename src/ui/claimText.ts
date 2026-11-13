import type { SyncifyClaim, SyncifyWaitingInstall } from "../types/syncify";

type PendingClaim = Extract<SyncifyClaim, { status: "pending" }>;
type UndoneClaim = Extract<SyncifyClaim, { status: "undone" }>;

/** When a claim goes final, as a day: "today", or "Nov 16". */
export function claimDay(at: number, now = new Date()): string {
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

/** Someone else's claim on this Spotify account, as a title and a sentence. */
export function describeOtherClaim(claim: PendingClaim): {
  title: string;
  text: string | null;
} {
  if (claim.not_me) return { title: "Syncify is checking this claim", text: null };
  return {
    title: `${claim.email ?? "Someone"} is securing this backup`,
    text: claim.held
      ? "Syncify is checking it."
      : `If that isn't you, press Not me ${notMeBy(claim.final_at)}.`,
  };
}

/** The same claim as one or two sentences, for the notice when Spotify starts. */
export function otherClaimText(claim: PendingClaim): string {
  const { title, text } = describeOtherClaim(claim);
  return text ? `${title}. ${text}` : `${title}.`;
}

/** What Syncify says on a Spotify account after an admin undid someone else's claim. */
export function undoneClaimText(claim: UndoneClaim): string {
  return `This backup is no longer secured by ${claim.email ?? "another account"}.`;
}

/** The toast after Not me. */
export function notMeToast(result: "cancelled" | "checking"): string {
  return result === "cancelled" ? "Syncify: claim cancelled" : "Syncify: sent for a check";
}

/** "A new install on Windows wants to back up this Spotify account" */
export function waitingInstallTitle(install: SyncifyWaitingInstall): string {
  return `A new install${install.device ? ` on ${install.device}` : ""} wants to back up this Spotify account`;
}
