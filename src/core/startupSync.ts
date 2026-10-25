import { fetchRemoteState, backupNow } from "./syncService";
import { LockedError } from "../api/syncifyApi";
import { loadConfig } from "./config";
import { shouldBlockAutoBackup, summarizeMarketplaceState } from "./marketplace";

export async function runStartupSyncCheck(): Promise<void> {
  const config = loadConfig();
  if (!config.workerUrl || !config.autoBackupEnabled) return;

  try {
    const [localSummary, remoteState] = await Promise.all([summarizeMarketplaceState(), fetchRemoteState(config)]);
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
