import { getClientHeaders } from "../core/client";
import type { UserIdentity } from "../core/user";
import type { SyncifyPayload, SyncifyRemoteState } from "../types/syncify";

const USER_HASH_HEADER = "x-syncify-user-hash";
const IDENTITY_HEADER = "x-syncify-identity";
const RESTORES_PATH = "/restores";
// The backup service keeps the 3 latest backups and an older safety copy.
// It marks each backup's kind; a response without marks lists them in order.
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
  identity: UserIdentity,
  payload: SyncifyPayload,
): Promise<{ unchanged: boolean }> {
  const response = await request(workerUrl, identity, {
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
  identity: UserIdentity,
): Promise<SyncifyRemoteState> {
  const response = await request(workerUrl, identity, { method: "GET" });

  if (response.status === 404) {
    return { exists: false, payload: null, backups: [], safetyCopy: null };
  }

  if (!response.ok) {
    throw new Error(`Restore failed with HTTP ${response.status}.`);
  }

  const payload = (await response.json()) as SyncifyPayload;
  const all = [payload, ...(payload.backup_history ?? [])];

  if (!all.every((backup) => backup.backup)) {
    return {
      exists: true,
      payload,
      backups: all.slice(0, RECENT_BACKUPS),
      safetyCopy: all[RECENT_BACKUPS] ?? null,
    };
  }

  const backups = all.filter((backup) => backup.backup?.kind === "rolling");
  const safetyCopy =
    all.find((backup) => backup.backup?.kind === "anchor") ?? null;

  // Only the safety copy could be read: show it as the latest backup.
  if (backups.length === 0 && safetyCopy) {
    return { exists: true, payload, backups: [safetyCopy], safetyCopy: null };
  }

  return { exists: true, payload, backups, safetyCopy };
}

/**
 * Lets the backup service count a restore. Sent as Spotify reloads, so it uses
 * keepalive, and it never fails the restore itself.
 */
export async function reportRestore(
  workerUrl: string,
  identity: UserIdentity,
  backupId: string,
): Promise<void> {
  try {
    await request(
      workerUrl,
      identity,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ backup_id: backupId }),
        keepalive: true,
      },
      RESTORES_PATH,
    );
  } catch {
    // Counting is best effort.
  }
}

async function request(
  workerUrl: string,
  identity: UserIdentity,
  init: RequestInit & { headers?: Record<string, string> },
  path = "",
): Promise<Response> {
  const url = path ? `${workerUrl.replace(/\/+$/, "")}${path}` : workerUrl;
  const response = await fetch(url, {
    ...init,
    headers: {
      ...init.headers,
      ...(await getClientHeaders()),
      [USER_HASH_HEADER]: identity.hash,
      [IDENTITY_HEADER]: identity.field,
    },
  });

  if (response.status === 426) throw new UnsupportedVersionError();
  return response;
}
