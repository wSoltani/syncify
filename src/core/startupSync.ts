import { fetchRemoteState, backupNow, fetchLaunchNotices } from "./syncService";
import { otherClaim, type OtherClaim } from "./claimNotices";
import { loadConfig } from "./config";
import { readStored, writeStored } from "./localStore";
import { shouldBlockAutoBackup, summarizeMarketplaceState } from "./marketplace";
import { wasNudgePanelShown } from "./nudge";
import { arrivedText, clearArrived, finishSettingsSync, prepareSettingsSync, type SettingsSync } from "./settingsSync";
import type { SyncifyClaim, SyncifyPayload, SyncifyRemoteState, SyncifyWaitingInstall } from "../types/syncify";

type UndoneClaim = Extract<SyncifyClaim, { status: "undone" }>;

/**
 * What a launch can open: someone else's claim on this backup, pending or
 * final, until Not me is answered here, or else that an admin undid one,
 * once, or else another Syncify's backups to answer about, or else the
 * Secure nudge's panel, once per install, or else the first-sync choice of
 * extension settings. `onUndone` says whether it opened.
 */
interface LaunchNotices {
  onClaim(claim: OtherClaim): void;
  onUndone(claim: UndoneClaim): boolean;
  onInstall(install: SyncifyWaitingInstall): void;
  onNudge(): void;
  onFirstSync(): void;
}

// The local day of the last launch check made with auto-backup off.
const CLAIM_CHECK_KEY = "syncify:claim-check-day";
// When the last undone claim shown was undone: each opens once.
const UNDONE_SHOWN_KEY = "syncify:undone-claim-shown";

/**
 * At launch: with auto-backup on, the backup check, and the backup when
 * something changed. With it off, a check for claims on the first launch of
 * each day. Either way someone else's claim opens `onClaim`, or without one
 * someone else's claim an admin undid opens `onUndone`, once, or without
 * either another Syncify's backups open `onInstall`, or without either the
 * Secure nudge opens `onNudge`, once per install.
 */
export async function runStartupSyncCheck(notices: LaunchNotices): Promise<void> {
  const config = loadConfig();
  // Spotify just started, so extension settings that arrived before are in use.
  clearArrived();
  if (!config.workerUrl) return;
  if (!config.autoBackupEnabled) return checkClaimOncePerDay(notices);

  try {
    // This device's extension settings ride the launch check.
    const sync = await prepareSettingsSync(config).catch(() => null);
    const [localSummary, remoteState] = await Promise.all([
      summarizeMarketplaceState(),
      fetchRemoteState(config, undefined, sync),
    ]);
    const choose = await settleSettings(sync, remoteState);
    openNotice(remoteState, notices, choose);
    // Secured with an email this Syncify isn't signed in with, and nothing
    // backed up here yet: the notice asks first. Signing in brings that
    // account's backups, and a backup made before would count as its latest.
    if (otherClaim(remoteState.claim)?.status === "final" && !remoteState.exists) return;
    const cloudKeyCount = remoteState.payload?.metadata.marketplace_key_count ?? 0;

    // Already in a backup, such as one just restored: nothing new to save.
    if (remoteState.backups.some((backup) => backup.payload_hash === localSummary.hash)) return;

    // Much smaller than the latest backup, as after Spotify was reset: wait for
    // a restore. Not when it's the safety copy or a pinned backup, which
    // only a restore brings back: that's backed up as the latest.
    const restored = [remoteState.safetyCopy, ...remoteState.pinned].some(
      (backup) => backup?.payload_hash === localSummary.hash,
    );
    if (remoteState.exists && !restored && shouldBlockAutoBackup(localSummary.keyCount, cloudKeyCount)) {
      Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.", true, 8000);
      return;
    }

    if (localSummary.keyCount === 0) return;

    await backupNow(config);
    Spicetify.showNotification("Syncify auto-backup complete");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn("Syncify startup sync failed:", error);
    Spicetify.showNotification(`Syncify auto-sync skipped: ${message}`, true, 8000);
  }
}

async function checkClaimOncePerDay(notices: LaunchNotices): Promise<void> {
  const today = new Date().toLocaleDateString("en-CA");
  if (readStored(CLAIM_CHECK_KEY) === today) return;

  try {
    const config = loadConfig();
    // Extension settings ride this check too: no request of their own.
    const sync = await prepareSettingsSync(config).catch(() => null);
    const found = await fetchLaunchNotices(config, sync);
    writeStored(CLAIM_CHECK_KEY, today);
    const choose = await settleSettings(sync, found);
    openNotice(found, notices, choose);
  } catch (error) {
    // Tried again on the next launch.
    console.warn("Syncify claim check failed:", error);
  }
}

/**
 * Takes the account's extension settings from the answer. New ones get one
 * Spotify toast. True when the first-sync choice is waiting. A failure here
 * never stops the launch check.
 */
async function settleSettings(
  sync: SettingsSync | null,
  remote: { settings?: unknown; backups: SyncifyPayload[] },
): Promise<boolean> {
  if (!sync) return false;
  try {
    const outcome = await finishSettingsSync(sync, remote.settings, remote.backups);
    if (outcome.arrived.length > 0) Spicetify.showNotification(arrivedText(outcome.arrived));
    return outcome.choose;
  } catch (error) {
    console.warn("Syncify extension settings sync failed:", error);
    return false;
  }
}

function openNotice(
  remote: Pick<SyncifyRemoteState, "claim" | "install" | "nudge">,
  notices: LaunchNotices,
  choose: boolean,
): void {
  const claim = otherClaim(remote.claim);
  const undone = newUndone(remote.claim);
  const waiting = remote.install?.waiting[0];
  if (claim) notices.onClaim(claim);
  else if (undone) {
    if (notices.onUndone(undone)) writeStored(UNDONE_SHOWN_KEY, String(undone.undone_at));
  } else if (waiting) notices.onInstall(waiting);
  else if (remote.nudge && !wasNudgePanelShown()) notices.onNudge();
  else if (choose) notices.onFirstSync();
}

// An admin undid someone else's claim, and this install hasn't shown it yet.
function newUndone(claim: SyncifyClaim | null): UndoneClaim | null {
  return claim?.status === "undone" && readStored(UNDONE_SHOWN_KEY) !== String(claim.undone_at) ? claim : null;
}
