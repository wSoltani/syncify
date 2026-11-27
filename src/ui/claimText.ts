import type { SecuredElsewhere } from "../core/claimNotices";
import type { SyncifyWaitingInstall } from "../types/syncify";

/** A day: "today", or "Nov 16". */
function shortDay(at: number, now = new Date()): string {
  const date = new Date(at);
  if (date.toDateString() === now.toDateString()) return "today";
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: date.getFullYear() === now.getFullYear() ? undefined : "numeric",
  });
}

/** "a", "a and b", "a, b and c". */
function listed(parts: string[]): string {
  const last = parts[parts.length - 1];
  return parts.length === 1 ? last : `${parts.slice(0, -1).join(", ")} and ${last}`;
}

/**
 * That the backup is secured with emails this Syncify isn't signed in with,
 * as a title and a sentence. Signed out, one can be this person's own: an
 * account they made on a computer they also use, or before Syncify's data
 * here was lost. Whatever the answer, the backups this Syncify makes stay
 * its own.
 */
export function describeSecuredElsewhere(claim: SecuredElsewhere, signedIn: boolean): {
  title: string;
  text: string;
} {
  const several = claim.emails.length > 1;
  return {
    title: `This backup is secured by ${listed(claim.emails)}`,
    text: signedIn
      ? "You're signed in with a different email. The backups you make here stay yours."
      : several
        ? "If one of them is your email, sign in to see your backups. If none is, the backups you make here stay yours."
        : "If that's your email, sign in to see your backups. If it isn't, the backups you make here stay yours.",
  };
}

// The systems Syncify names a device by. Anything else is a raw user agent.
const KNOWN_SYSTEMS = new Set(["Windows", "macOS", "Linux"]);

/**
 * Backups another Syncify made on this Spotify username, as a question: "Did
 * you back up from Windows on Nov 20?". A question, because only the person
 * knows whether that Syncify is theirs.
 */
export function waitingInstallTitle(install: SyncifyWaitingInstall, now = new Date()): string {
  const day = shortDay(install.first_seen_at, now);
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
