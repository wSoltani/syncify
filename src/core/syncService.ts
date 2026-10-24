import { downloadPayload, uploadPayload } from "../api/syncifyApi";
import type {
  SyncifyConfig,
  SyncifyPayload,
  SyncifyRemoteState,
} from "../types/syncify";
import { hasWorkerUrl } from "./config";
import { getUserHash } from "./user";
import {
  createPayload,
  hashMarketplaceKeys,
  restoreMarketplaceKeys,
} from "./marketplace";

export async function backupNow(
  config: SyncifyConfig,
): Promise<{ payload: SyncifyPayload; unchanged: boolean }> {
  if (!hasWorkerUrl(config)) {
    throw new Error("Syncify backup service is not configured.");
  }

  const [userHash, payload] = await Promise.all([
    getUserHash(),
    createPayload(),
  ]);

  if (payload.metadata.marketplace_key_count === 0) {
    throw new Error(
      "Syncify found no Marketplace data to back up. Open Marketplace once so it loads its state, then try again.",
    );
  }

  const { unchanged } = await uploadPayload(
    config.workerUrl,
    userHash,
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

  const remote = await downloadPayload(config.workerUrl, await getUserHash());

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
    hash = hashMarketplaceKeys(payload.marketplace_data?.keys ?? {});
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
  return { payload, restoredCount };
}
