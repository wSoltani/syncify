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
): Promise<SyncifyPayload> {
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

  await uploadPayload(config.workerUrl, userHash, payload);
  return payload;
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
  const backups = await Promise.all(remote.backups.map(withCurrentHash));
  return { ...remote, payload: backups[0] ?? null, backups };
}

async function withCurrentHash(
  payload: SyncifyPayload,
): Promise<SyncifyPayload> {
  const keys = payload.marketplace_data?.keys ?? {};
  return { ...payload, payload_hash: await hashMarketplaceKeys(keys) };
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
