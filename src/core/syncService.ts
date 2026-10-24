import {
  downloadPayload,
  reportRestore,
  uploadPayload,
} from "../api/syncifyApi";
import type {
  SyncifyConfig,
  SyncifyPayload,
  SyncifyRemoteState,
} from "../types/syncify";
import { hasWorkerUrl } from "./config";
import { getUserIdentity } from "./user";
import {
  createPayload,
  hashSnapshot,
  restoreMarketplaceKeys,
} from "./marketplace";

export async function backupNow(
  config: SyncifyConfig,
): Promise<{ payload: SyncifyPayload; unchanged: boolean }> {
  if (!hasWorkerUrl(config)) {
    throw new Error("Syncify backup service is not configured.");
  }

  const [identity, payload] = await Promise.all([
    getUserIdentity(),
    createPayload(),
  ]);

  if (payload.metadata.marketplace_key_count === 0) {
    throw new Error(
      "Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.",
    );
  }

  const { unchanged } = await uploadPayload(
    config.workerUrl,
    identity,
    payload,
  );
  return { payload, unchanged };
}

export async function fetchRemoteState(
  config: SyncifyConfig,
): Promise<SyncifyRemoteState> {
  if (!hasWorkerUrl(config)) {
    throw new Error("Syncify backup service is not configured.");
  }

  const remote = await downloadPayload(
    config.workerUrl,
    await getUserIdentity(),
  );

  // Backups made by older versions carry a hash computed over every key, so
  // recompute it with the current rules. Otherwise updating Syncify alone would
  // make every unchanged install look different and re-upload.
  // Recomputing can also make older backups identical to each other, so keep
  // only the newest backup for each distinct set of data. The safety copy is
  // left out when it holds the same data as a recent backup.
  const [rehashed, safetyCopy] = await Promise.all([
    Promise.all(remote.backups.map(withCurrentHash)),
    remote.safetyCopy ? withCurrentHash(remote.safetyCopy) : null,
  ]);
  const backups = rehashed.filter(
    (backup, index) =>
      rehashed.findIndex((other) => other.payload_hash === backup.payload_hash) ===
      index,
  );
  return {
    ...remote,
    payload: backups[0] ?? null,
    backups,
    safetyCopy:
      safetyCopy &&
      !backups.some((backup) => backup.payload_hash === safetyCopy.payload_hash)
        ? safetyCopy
        : null,
  };
}

// Current hashes by backup (its stored hash and time), so each backup is
// hashed once per session rather than every time Syncify's window opens.
const currentHashes = new Map<string, Promise<string>>();

async function withCurrentHash(
  payload: SyncifyPayload,
): Promise<SyncifyPayload> {
  const id = `${payload.payload_hash} ${payload.metadata?.last_sync_datetime}`;
  let hash = currentHashes.get(id);
  if (!hash) {
    hash = hashSnapshot(
      payload.marketplace_data?.keys ?? {},
      payload.spicetify_config,
    );
    currentHashes.set(id, hash);
    hash.catch(() => currentHashes.delete(id));
  }

  return { ...payload, payload_hash: await hash };
}

export async function restoreNow(
  config: SyncifyConfig,
  selectedPayload?: SyncifyPayload,
): Promise<{ payload: SyncifyPayload; restoredCount: number }> {
  const payload = selectedPayload ?? (await fetchRemoteState(config)).payload;

  if (!payload) {
    throw new Error(
      "No Syncify cloud backup was found for this Spotify account.",
    );
  }

  const restoredCount = await restoreMarketplaceKeys(payload);

  // Counted by the backup service. Not awaited: it finishes on its own while
  // Spotify reloads, and a failure doesn't matter to the restore.
  const backupId = payload.backup?.id;
  if (backupId && hasWorkerUrl(config)) {
    void getUserIdentity()
      .then((identity) => reportRestore(config.workerUrl, identity, backupId))
      .catch(() => {});
  }

  return { payload, restoredCount };
}
