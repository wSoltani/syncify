import { fetchRemoteState, backupNow, fetchLaunchNotices } from "./syncService";
import { InstallRefusedError, LockedError } from "../api/syncifyApi";
import { loadConfig } from "./config";
import { shouldBlockAutoBackup, summarizeMarketplaceState } from "./marketplace";
import { wasNudgePanelShown } from "./nudge";
import type { SyncifyClaim, SyncifyRemoteState, SyncifyWaitingInstall } from "../types/syncify";

type PendingClaim = Extract<SyncifyClaim, { status: "pending" }>;
type UndoneClaim = Extract<SyncifyClaim, { status: "undone" }>;

/**
 * What a launch can open: someone else's claim, or else that an admin undid
 * one, once, or else a new install waiting for approval, or else the Secure
 * nudge's panel, once per install. `onUndone` says whether it opened.
 */
interface LaunchNotices {
  onClaim(claim: PendingClaim): void;
  onUndone(claim: UndoneClaim): boolean;
  onInstall(install: SyncifyWaitingInstall): void;
  onNudge(): void;
}

// The local day of the last launch check made with auto-backup off.
const CLAIM_CHECK_KEY = "syncify:claim-check-day";
// When the last undone claim shown was undone: each opens once.
const UNDONE_SHOWN_KEY = "syncify:undone-claim-shown";

/**
 * At launch: with auto-backup on, the backup check, and the backup when
 * something changed. With it off, a check for claims on the first launch of
 * each day. Either way someone else's pending claim opens `onClaim`, or
 * without one someone else's claim an admin undid opens `onUndone`, once, or
 * without either a new install waiting for this one's approval opens `onInstall`,
 * or without either the Secure nudge opens `onNudge`, once per install.
 */
export async function runStartupSyncCheck(notices: LaunchNotices): Promise<void> {
  const config = loadConfig();
  if (!config.workerUrl) return;
  if (!config.autoBackupEnabled) return checkClaimOncePerDay(notices);

  try {
    const [localSummary, remoteState] = await Promise.all([summarizeMarketplaceState(), fetchRemoteState(config)]);
    openNotice(remoteState, notices);
    const cloudKeyCount = remoteState.payload?.metadata.marketplace_key_count ?? 0;

    if (remoteState.exists && shouldBlockAutoBackup(localSummary.keyCount, cloudKeyCount)) {
      Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.", true, 8000);
      return;
    }

    // Already in a backup, such as one just restored: nothing new to save.
    if (remoteState.backups.some((backup) => backup.payload_hash === localSummary.hash)) return;
    if (localSummary.keyCount === 0) return;

    const { unapproved } = await backupNow(config);
    Spicetify.showNotification(unapproved ? "Syncify: backed up, waiting for approval" : "Syncify auto-backup complete");
  } catch (error) {
    // A secured backup refuses backups from a device that isn't signed in.
    if (error instanceof LockedError || error instanceof InstallRefusedError) {
      Spicetify.showNotification("Syncify: sign in to keep backing up", true, 8000);
      return;
    }

    const message = error instanceof Error ? error.message : String(error);
    console.warn("Syncify startup sync failed:", error);
    Spicetify.showNotification(`Syncify auto-sync skipped: ${message}`, true, 8000);
  }
}

async function checkClaimOncePerDay(notices: LaunchNotices): Promise<void> {
  const today = new Date().toLocaleDateString("en-CA");
  if (read(CLAIM_CHECK_KEY) === today) return;

  try {
    const found = await fetchLaunchNotices(loadConfig());
    write(CLAIM_CHECK_KEY, today);
    openNotice(found, notices);
  } catch (error) {
    // A secured backup refuses a device that isn't signed in: it has no claim
    // to show. Anything else is tried again on the next launch.
    if (error instanceof LockedError) {
      write(CLAIM_CHECK_KEY, today);
      return;
    }
    console.warn("Syncify claim check failed:", error);
  }
}

function openNotice(remote: Pick<SyncifyRemoteState, "claim" | "install" | "nudge">, notices: LaunchNotices): void {
  const claim = otherClaim(remote.claim);
  const undone = newUndone(remote.claim);
  const waiting = remote.install?.waiting[0];
  if (claim) notices.onClaim(claim);
  else if (undone) {
    if (notices.onUndone(undone)) write(UNDONE_SHOWN_KEY, String(undone.undone_at));
  } else if (waiting) notices.onInstall(waiting);
  else if (remote.nudge && !wasNudgePanelShown()) notices.onNudge();
}

// Someone else's claim, unless this install already pressed Not me on it.
function otherClaim(claim: SyncifyClaim | null): PendingClaim | null {
  return claim?.status === "pending" && !claim.mine && !claim.not_me ? claim : null;
}

// An admin undid someone else's claim, and this install hasn't shown it yet.
function newUndone(claim: SyncifyClaim | null): UndoneClaim | null {
  return claim?.status === "undone" && read(UNDONE_SHOWN_KEY) !== String(claim.undone_at) ? claim : null;
}

function read(key: string): string | null {
  return Spicetify.LocalStorage?.get(key) ?? window.localStorage.getItem(key);
}

function write(key: string, value: string): void {
  if (Spicetify.LocalStorage?.set) Spicetify.LocalStorage.set(key, value);
  else window.localStorage.setItem(key, value);
}
