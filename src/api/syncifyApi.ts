import { getClientHeaders } from "../core/client";
import type { SyncifyPayload, SyncifyRemoteState } from "../types/syncify";

const USER_HASH_HEADER = "x-syncify-user-hash";
// The backup service keeps the 3 latest backups, then sends an older safety
// copy after them when the request carries Syncify's version.
const RECENT_BACKUPS = 3;

/** The backup service no longer accepts this version of Syncify (HTTP 426). */
export class UnsupportedVersionError extends Error {
  constructor() {
    super("This version of Syncify is no longer supported.");
    this.name = "UnsupportedVersionError";
  }
}

export async function uploadPayload(
  workerUrl: string,
  userHash: string,
  payload: SyncifyPayload,
): Promise<{ unchanged: boolean }> {
  const response = await request(workerUrl, userHash, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Backup failed with HTTP ${response.status}.`);
  }

  // The worker skips the write when the data matches its latest backup, so
  // nothing new was stored and the cloud copy keeps its original timestamp.
  const result = (await response.json().catch(() => null)) as {
    unchanged?: boolean;
  } | null;
  return { unchanged: result?.unchanged === true };
}

export async function downloadPayload(
  workerUrl: string,
  userHash: string,
): Promise<SyncifyRemoteState> {
  const response = await request(workerUrl, userHash, { method: "GET" });

  if (response.status === 404) {
    return { exists: false, payload: null, backups: [], safetyCopy: null };
  }

  if (!response.ok) {
    throw new Error(`Restore failed with HTTP ${response.status}.`);
  }

  const payload = (await response.json()) as SyncifyPayload;
  const all = [payload, ...(payload.backup_history ?? [])];

  return {
    exists: true,
    payload,
    backups: all.slice(0, RECENT_BACKUPS),
    safetyCopy: all[RECENT_BACKUPS] ?? null,
  };
}

async function request(
  workerUrl: string,
  userHash: string,
  init: RequestInit & { headers?: Record<string, string> },
): Promise<Response> {
  const response = await fetch(workerUrl, {
    ...init,
    headers: {
      ...init.headers,
      ...(await getClientHeaders()),
      [USER_HASH_HEADER]: userHash,
    },
  });

  if (response.status === 426) throw new UnsupportedVersionError();
  return response;
}
