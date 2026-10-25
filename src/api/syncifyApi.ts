import { getClientHeaders } from "../core/client";
import {
  clearSession,
  getDeviceKey,
  getSalt,
  loadSession,
  saveSalt,
} from "../core/account";
import { signRequest } from "../core/requestSignature";
import type { UserIdentity } from "../core/user";
import type {
  SyncifyClaim,
  SyncifyPayload,
  SyncifyRemoteState,
} from "../types/syncify";
import { AccountError } from "./accountApi";

const USER_HASH_HEADER = "x-syncify-user-hash";
const IDENTITY_HEADER = "x-syncify-identity";
const SIGNATURE_HEADER = "x-syncify-signature";
const SALT_HEADER = "x-syncify-salt";
// Before the first response there's no salt yet. Signing with this one is
// refused as stale, with the day's salt to sign again with.
const NO_SALT = "none";
const RESTORES_PATH = "/restores";
// A linked Spotify account's backups are read and restored with ?hash=.
const LINKED_HASH_PARAM = "hash";
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

/**
 * The backup is secured with an account this device isn't signed in to
 * (HTTP 401): `claimed` when signed out, `not_owner` when signed in with
 * another account, `not_linked` for a linked account the session can't read.
 */
export class LockedError extends Error {
  constructor(readonly code: "claimed" | "not_owner" | "not_linked") {
    super(
      code === "not_linked"
        ? "Couldn't read that Spotify account's backups."
        : "Sign in to restore this backup.",
    );
    this.name = "LockedError";
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

/**
 * The backups of this Spotify account, or with `linkedHash` of another one
 * linked to the signed-in account.
 */
export async function downloadPayload(
  workerUrl: string,
  identity: UserIdentity,
  linkedHash?: string,
): Promise<SyncifyRemoteState> {
  const response = await request(
    workerUrl,
    identity,
    { method: "GET" },
    linkedPath("/", linkedHash),
  );

  if (response.status === 404) {
    const result = (await response.json().catch(() => null)) as {
      claim?: unknown;
    } | null;
    return {
      exists: false,
      payload: null,
      backups: [],
      safetyCopy: null,
      claim: readClaim(result?.claim),
    };
  }

  if (!response.ok) {
    throw new Error(`Restore failed with HTTP ${response.status}.`);
  }

  const payload = (await response.json()) as SyncifyPayload & {
    claim?: unknown;
  };
  // The notice of a pending claim comes with the backups.
  const claim = readClaim(payload.claim);
  delete payload.claim;
  const all = [payload, ...(payload.backup_history ?? [])];

  if (!all.every((backup) => backup.backup)) {
    return {
      exists: true,
      payload,
      backups: all.slice(0, RECENT_BACKUPS),
      safetyCopy: all[RECENT_BACKUPS] ?? null,
      claim,
    };
  }

  const backups = all.filter((backup) => backup.backup?.kind === "rolling");
  const safetyCopy =
    all.find((backup) => backup.backup?.kind === "anchor") ?? null;

  // Only the safety copy could be read: show it as the latest backup.
  if (backups.length === 0 && safetyCopy) {
    return {
      exists: true,
      payload,
      backups: [safetyCopy],
      safetyCopy: null,
      claim,
    };
  }

  return { exists: true, payload, backups, safetyCopy, claim };
}

/**
 * Lets the backup service count a restore. Sent as Spotify reloads, so it uses
 * keepalive, and it never fails the restore itself.
 */
export async function reportRestore(
  workerUrl: string,
  identity: UserIdentity,
  backupId: string,
  linkedHash?: string,
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
      linkedPath(RESTORES_PATH, linkedHash),
    );
  } catch {
    // Counting is best effort.
  }
}

/**
 * A request to the backup service. While signed in, it carries the session
 * and this device's signature over the path with its query and the body.
 */
export async function request(
  workerUrl: string,
  identity: UserIdentity,
  init: RequestInit & { headers?: Record<string, string>; body?: string },
  path = "",
  isRetry = false,
): Promise<Response> {
  const url = path ? `${workerUrl.replace(/\/+$/, "")}${path}` : workerUrl;
  const method = init.method ?? "GET";
  const session = await loadSession().catch(() => null);
  const keys = session ? await getDeviceKey(false).catch(() => null) : null;
  const signing: Record<string, string> = {};
  if (session && keys) {
    const salt = (await getSalt()) ?? NO_SALT;
    signing.authorization = `Bearer ${session.token}`;
    signing[SALT_HEADER] = salt;
    signing[SIGNATURE_HEADER] = await signRequest(
      keys.privateKey,
      salt,
      method,
      url,
      init.body ?? "",
    );
  }

  const response = await fetch(url, {
    ...init,
    headers: {
      ...init.headers,
      ...(await getClientHeaders()),
      [USER_HASH_HEADER]: identity.hash,
      [IDENTITY_HEADER]: identity.field,
      ...signing,
    },
  });

  const salt = response.headers.get(SALT_HEADER);
  if (salt) await saveSalt(salt);

  if (response.status === 426) throw new UnsupportedVersionError();
  if (response.status !== 401) return response;

  const code = (
    (await response
      .clone()
      .json()
      .catch(() => null)) as { code?: unknown } | null
  )?.code;
  if (!isRetry) {
    // Signed with a salt that has moved on: sign again with the new one.
    if (code === "stale_salt" && session) {
      return request(workerUrl, identity, init, path, true);
    }
    // The session ended: forget it, and ask again without it.
    if (code === "signed_out" && session) {
      await clearSession();
      return request(workerUrl, identity, init, path, true);
    }
  }
  if (code === "claimed" || code === "not_owner" || code === "not_linked") {
    throw new LockedError(code);
  }
  if (code === "signed_out") await clearSession();
  throw new AccountError(typeof code === "string" ? code : "failed");
}

function linkedPath(path: string, linkedHash?: string): string {
  return linkedHash
    ? `${path}?${LINKED_HASH_PARAM}=${encodeURIComponent(linkedHash)}`
    : path;
}

/** A claim as the backup service describes it, or null. */
export function readClaim(value: unknown): SyncifyClaim | null {
  const claim = value as Partial<SyncifyClaim> | null | undefined;
  if (!claim || typeof claim.mine !== "boolean") return null;
  if (claim.status === "final") return { status: "final", mine: claim.mine };
  if (claim.status !== "pending" || typeof claim.final_at !== "number") {
    return null;
  }

  return {
    status: "pending",
    mine: claim.mine,
    email: typeof claim.email === "string" ? claim.email : null,
    final_at: claim.final_at,
  };
}
