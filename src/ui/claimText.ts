import type { OtherClaim } from "../core/claimNotices";
import type { SyncifyClaim, SyncifyWaitingInstall } from "../types/syncify";

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
 * Someone else's claim on this Spotify username, as a title and a sentence.
 * Signed out, it can be this person's own: made on a computer they also use,
 * or before Syncify's data here was lost. Whatever the answer, the backups
 * this Syncify made stay its own.
 */
export function describeOtherClaim(claim: OtherClaim, signedIn: boolean): {
  title: string;
  text: string;
} {
  if (claim.status === "final") {
    return {
      title: claim.email ? `This backup is secured by ${claim.email}` : "This backup is secured",
      text: signedIn
        ? "You're signed in with a different email. The backups you make here stay yours."
        : "If that's your email, sign in to see your backups. If it isn't, the backups you make here stay yours.",
    };
  }
  const title = `${claim.email ?? "Someone"} is securing this backup`;
  if (claim.held) return { title, text: "Syncify is checking who is securing it." };
  // Only a Syncify that backed up here first can stop it.
  if (claim.can_cancel) {
    return {
      title,
      text: signedIn
        ? `If that isn't you, press Not me ${notMeBy(claim.final_at)} to stop them.`
        : `If that's your email, sign in. If it isn't, press Not me ${notMeBy(claim.final_at)} to stop them.`,
    };
  }
  return {
    title,
    text: signedIn
      ? "The backups you made here stay yours."
      : "If that's your email, sign in. If it isn't, the backups you made here stay yours.",
  };
}

/** What Syncify says on a Spotify account after an admin undid someone else's claim. */
export function undoneClaimTitle(claim: UndoneClaim): string {
  return claim.email ? `This backup is no longer secured by ${claim.email}` : "This backup is no longer secured";
}

/** The toast after a Not me that cancelled the claim. */
export function notMeToast(email: string | null): string {
  return email ? `Syncify: ${email} won't secure this backup` : "Syncify: this backup won't be secured";
}

// The systems Syncify names a device by. Anything else is a raw user agent.
const KNOWN_SYSTEMS = new Set(["Windows", "macOS", "Linux"]);

/**
 * Backups another Syncify made on this Spotify username, as a question: "Did
 * you back up from Windows on Nov 20?". A question, because only the person
 * knows whether that Syncify is theirs.
 */
export function waitingInstallTitle(install: SyncifyWaitingInstall, now = new Date()): string {
  const day = claimDay(install.first_seen_at, now);
  const when = day === "today" ? day : `on ${day}`;
  return install.device && KNOWN_SYSTEMS.has(install.device)
    ? `Did you back up from ${install.device} ${when}?`
    : `Did you back up with Syncify ${when}?`;
}

/** The sentence under that question. */
export const WAITING_INSTALL_TEXT =
  "Syncify keeps those backups apart from yours. If they're yours, press That's me to bring them together.";

/** That's me asks for the code of the Syncify that made those backups. */
export const INSTALL_CODE_TITLE = "Enter the code from that Syncify";
export const INSTALL_CODE_TEXT = "It's in Settings, in the Syncify that made those backups.";

/** The toast after That's me or Not me on those backups. */
export function installAnswerToast(action: "approve" | "reject"): string {
  return action === "approve" ? "Syncify: backups brought together" : "Syncify: backups kept apart";
}
