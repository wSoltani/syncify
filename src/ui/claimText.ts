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
        ? `If that isn't you, press Not me ${notMeBy(claim.final_at)} or only they'll be able to restore it.`
        : `If that's your email, sign in. If it isn't, press Not me ${notMeBy(claim.final_at)} or only they'll be able to restore it.`,
  };
}

/** What Syncify says on a Spotify account after an admin undid someone else's claim. */
export function undoneClaimTitle(claim: UndoneClaim): string {
  return claim.email ? `This backup is no longer secured by ${claim.email}` : "This backup is no longer secured";
}

/** The toast after Not me. */
export function notMeToast(result: "cancelled" | "checking", email: string | null): string {
  if (result === "checking") return "Syncify: we'll check who's securing it";
  return email ? `Syncify: ${email} won't secure this backup` : "Syncify: this backup won't be secured";
}

// The systems Syncify names a device by. Anything else is a raw user agent.
const KNOWN_SYSTEMS = new Set(["Windows", "macOS", "Linux"]);

/**
 * Backups this Syncify can't place, as a question: "Did you back up from
 * Windows on Nov 20?". A question, because the same computer can show up as
 * a new one after Spotify is reinstalled, and "yes" is then the right answer.
 */
export function waitingInstallTitle(install: SyncifyWaitingInstall, now = new Date()): string {
  const day = claimDay(install.first_seen_at, now);
  const when = day === "today" ? day : `on ${day}`;
  return install.device && KNOWN_SYSTEMS.has(install.device)
    ? `Did you back up from ${install.device} ${when}?`
    : `Did you back up with Syncify ${when}?`;
}

/** The sentence under that question. */
export const WAITING_INSTALL_TEXT = "Syncify can't tell who made those backups. Not me deletes them and blocks new ones.";

/** The toast after That's me or Not me on those backups. */
export function installAnswerToast(action: "approve" | "reject"): string {
  return action === "approve" ? "Syncify: backups kept" : "Syncify: backups deleted";
}
