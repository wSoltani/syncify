import type { SyncifyPayload, SyncifyRemoteState } from "../types/syncify";

const USER_HASH_HEADER = "x-syncify-user-hash";

export async function uploadPayload(
  workerUrl: string,
  userHash: string,
  payload: SyncifyPayload,
): Promise<void> {
  const response = await fetch(workerUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      [USER_HASH_HEADER]: userHash,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Backup failed with HTTP ${response.status}.`);
  }
}

export async function downloadPayload(
  workerUrl: string,
  userHash: string,
): Promise<SyncifyRemoteState> {
  const response = await fetch(workerUrl, {
    method: "GET",
    headers: {
      [USER_HASH_HEADER]: userHash,
    },
  });

  if (response.status === 404) {
    return { exists: false, payload: null, backups: [] };
  }

  if (!response.ok) {
    throw new Error(`Restore failed with HTTP ${response.status}.`);
  }

  const payload = (await response.json()) as SyncifyPayload;
  const backups = [payload, ...(payload.backup_history ?? [])].slice(0, 3);

  return { exists: true, payload, backups };
}
