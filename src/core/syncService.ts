import { downloadPayload, uploadPayload } from "../api/syncifyApi";
import type {
  SyncifyConfig,
  SyncifyPayload,
  SyncifyRemoteState,
} from "../types/syncify";
import { hasWorkerUrl } from "./config";
import { getUserHash } from "./user";
import { createPayload, restoreMarketplaceKeys } from "./marketplace";

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
    throw new Error("Syncify will not back up an empty extension/theme state.");
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

  return downloadPayload(config.workerUrl, await getUserHash());
}

export async function restoreNow(
  config: SyncifyConfig,
): Promise<{ payload: SyncifyPayload; restoredCount: number }> {
  const remoteState = await fetchRemoteState(config);

  if (!remoteState.exists || !remoteState.payload) {
    throw new Error(
      "No Syncify cloud backup was found for this Spotify account.",
    );
  }

  const restoredCount = restoreMarketplaceKeys(remoteState.payload);
  return { payload: remoteState.payload, restoredCount };
}
