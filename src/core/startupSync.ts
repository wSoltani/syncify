import { fetchRemoteState, backupNow, fetchPendingClaim } from "./syncService";
import { LockedError } from "../api/syncifyApi";
import { loadConfig } from "./config";
import { shouldBlockAutoBackup, summarizeMarketplaceState } from "./marketplace";
import type { SyncifyClaim } from "../types/syncify";

type PendingClaim = Extract<SyncifyClaim, { status: "pending" }>;

// The local day of the last launch check made with auto-backup off.
const CLAIM_CHECK_KEY = "syncify:claim-check-day";

/**
 * At launch: with auto-backup on, the backup check, and the backup when
 * something changed. With it off, a check for claims on the first launch of
 * each day. Either way someone else's pending claim opens `onClaim`.
 */
export async function runStartupSyncCheck(onClaim: (claim: PendingClaim) => void): Promise<void> {
  const config = loadConfig();
  if (!config.workerUrl) return;
  if (!config.autoBackupEnabled) return checkClaimOncePerDay(onClaim);

  try {
    const [localSummary, remoteState] = await Promise.all([summarizeMarketplaceState(), fetchRemoteState(config)]);
    const claim = otherClaim(remoteState.claim);
    if (claim) onClaim(claim);
    const cloudKeyCount = remoteState.payload?.metadata.marketplace_key_count ?? 0;

    if (remoteState.exists && shouldBlockAutoBackup(localSummary.keyCount, cloudKeyCount)) {
      Spicetify.showNotification("Syncify found a larger cloud backup. Open Syncify to restore before backing up.", true, 8000);
      return;
    }

    if (remoteState.payload?.payload_hash === localSummary.hash) return;
    if (localSummary.keyCount === 0) return;

    await backupNow(config);
    Spicetify.showNotification("Syncify auto-backup complete");
  } catch (error) {
    // A secured backup refuses backups from a device that isn't signed in.
    if (error instanceof LockedError) {
      Spicetify.showNotification("Syncify: sign in to keep backing up", true, 8000);
      return;
    }

    const message = error instanceof Error ? error.message : String(error);
    console.warn("Syncify startup sync failed:", error);
    Spicetify.showNotification(`Syncify auto-sync skipped: ${message}`, true, 8000);
  }
}

async function checkClaimOncePerDay(onClaim: (claim: PendingClaim) => void): Promise<void> {
  const today = new Date().toLocaleDateString("en-CA");
  if (readCheckDay() === today) return;

  try {
    const claim = otherClaim(await fetchPendingClaim(loadConfig()));
    writeCheckDay(today);
    if (claim) onClaim(claim);
  } catch (error) {
    // A secured backup refuses a device that isn't signed in: it has no claim
    // to show. Anything else is tried again on the next launch.
    if (error instanceof LockedError) {
      writeCheckDay(today);
      return;
    }
    console.warn("Syncify claim check failed:", error);
  }
}

function otherClaim(claim: SyncifyClaim | null): PendingClaim | null {
  return claim?.status === "pending" && !claim.mine ? claim : null;
}

function readCheckDay(): string | null {
  return Spicetify.LocalStorage?.get(CLAIM_CHECK_KEY) ?? window.localStorage.getItem(CLAIM_CHECK_KEY);
}

function writeCheckDay(day: string): void {
  if (Spicetify.LocalStorage?.set) Spicetify.LocalStorage.set(CLAIM_CHECK_KEY, day);
  else window.localStorage.setItem(CLAIM_CHECK_KEY, day);
}
