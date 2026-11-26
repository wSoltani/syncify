import { getClientHeaders, replaceInstall } from "../core/client";
import {
  clearSession,
  getDeviceKey,
  getSalt,
  loadSession,
  saveSalt,
} from "../core/account";
import { getInstallKey } from "../core/installKey";
import { DatabaseUnavailableError } from "../core/database";
import { signRequest } from "../core/requestSignature";
import type { UserIdentity } from "../core/user";
import type {
  SyncifyClaim,
  SyncifyInstallState,
  SyncifyPayload,
  SyncifyRemoteState,
} from "../types/syncify";
import { AccountError } from "./accountApi";

const USER_HASH_HEADER = "x-syncify-user-hash";
const IDENTITY_HEADER = "x-syncify-identity";
const SIGNATURE_HEADER = "x-syncify-signature";
const INSTALL_HEADER = "x-syncify-install";
const INSTALL_KEY_HEADER = "x-syncify-install-key";
const INSTALL_SIGNATURE_HEADER = "x-syncify-install-signature";
const SALT_HEADER = "x-syncify-salt";
// Before the first response there's no salt yet. Signing with this one is
// refused as stale, with the day's salt to sign again with.
const NO_SALT = "none";
const RESTORES_PATH = "/restores";
// The launch check of a Syncify that syncs extension settings: the same read
// as GET /, with the settings part as its body, which a GET can't carry.
const SYNC_PATH = "/sync";
// Delete synced copy: the account's copy of one item's extension settings.
const DELETE_SETTINGS_PATH = "/settings/delete";
// A backup with the settings part ahead of it: how many bytes that part takes.
const SETTINGS_BYTES_HEADER = "x-syncify-settings-bytes";
const INSTALLS_PATH = "/installs";
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

/** The code typed for That's me isn't the other Syncify's (HTTP 403). */
export class PairingCodeError extends Error {
  constructor() {
    super("That code doesn't match. Check it in that Syncify's Settings and try again.");
    this.name = "PairingCodeError";
  }
}

export async function uploadPayload(
  workerUrl: string,
  identity: UserIdentity,
  payload: SyncifyPayload,
  /** The extension settings part, sent ahead of the backup in the same body. */
  settingsPart?: string,
): Promise<{ unchanged: boolean; settings: unknown }> {
  const backup = JSON.stringify(payload);
  const response = await request(workerUrl, identity, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(settingsPart !== undefined
        ? { [SETTINGS_BYTES_HEADER]: String(new TextEncoder().encode(settingsPart).byteLength) }
        : {}),
    },
    body: settingsPart !== undefined ? settingsPart + backup : backup,
  });

  if (!response.ok) {
    throw new Error(`Backup failed with HTTP ${response.status}.`);
  }

  // The worker skips the write when the data matches its latest backup, so
  // nothing new was stored and the cloud copy keeps its original timestamp.
  // A backup kept apart on this Syncify's first day is still its own, so
  // it's told apart nowhere here.
  const result = (await response.json().catch(() => null)) as {
    unchanged?: boolean;
    settings?: unknown;
  } | null;
  return {
    unchanged: result?.unchanged === true,
    settings: result?.settings ?? null,
  };
}

/**
 * This Syncify's answer about another one on this Spotify username. That's
 * me ("approve") sends the other Syncify's code, read off its Settings.
 */
export async function answerInstall(
  workerUrl: string,
  identity: UserIdentity,
  installId: string,
  answer: { action: "approve"; code: string } | { action: "reject" },
): Promise<void> {
  const response = await request(
    workerUrl,
    identity,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ install: installId, ...answer }),
    },
    INSTALLS_PATH,
  );
  if (response.ok) return;
  const error = (await response.json().catch(() => null)) as {
    code?: unknown;
  } | null;
  // Already answered, or it signed in since.
  if (error?.code === "not_pending") return;
  if (error?.code === "code_mismatch") throw new PairingCodeError();
  throw new Error(
    response.status === 429
      ? "Too many tries. Wait a minute and try again."
      : `Couldn't answer with HTTP ${response.status}.`,
  );
}

/**
 * The backups of this Spotify account, or with `linkedHash` of another one
 * linked to the signed-in account. With `settingsPart`, this device's
 * extension settings go with the read, and the answer carries the account's.
 */
export async function downloadPayload(
  workerUrl: string,
  identity: UserIdentity,
  linkedHash?: string,
  settingsPart?: string,
): Promise<SyncifyRemoteState> {
  const response = await request(
    workerUrl,
    identity,
    settingsPart !== undefined && !linkedHash
      ? { method: "POST", headers: { "content-type": "application/json" }, body: settingsPart }
      : { method: "GET" },
    settingsPart !== undefined && !linkedHash ? SYNC_PATH : linkedPath("/", linkedHash),
  );

  if (response.status === 404) {
    const result = (await response.json().catch(() => null)) as {
      claim?: unknown;
      install?: unknown;
      settings?: unknown;
    } | null;
    return {
      settings: result?.settings ?? null,
      exists: false,
      payload: null,
      backups: [],
      safetyCopy: null,
      pinned: [],
      borrowed: false,
      others: [],
      claim: readClaim(result?.claim),
      unapproved: [],
      install: readInstall(result?.install),
      nudge: false,
    };
  }

  if (!response.ok) {
    throw new Error(`Restore failed with HTTP ${response.status}.`);
  }

  const body = (await response.json()) as SyncifyPayload & {
    claim?: unknown;
    install?: unknown;
    nudge?: unknown;
    settings?: unknown;
  };
  // The notice of a pending claim, this install's state and the Secure nudge
  // come with the backups.
  const claim = readClaim(body.claim);
  const install = readInstall(body.install);
  const nudge = body.nudge === true;
  const settings = body.settings ?? null;
  delete body.claim;
  delete body.install;
  delete body.nudge;
  delete body.settings;
  const all = [body, ...(body.backup_history ?? [])];
  const state = { claim, install, nudge, settings };

  // A Worker from before backups were marked lists them in order.
  if (!all.every((backup) => backup.backup)) {
    return {
      ...state,
      exists: true,
      payload: body,
      backups: all.slice(0, RECENT_BACKUPS),
      safetyCopy: all[RECENT_BACKUPS] ?? null,
      pinned: [],
      borrowed: false,
      others: [],
      unapproved: [],
    };
  }

  const unapproved = all.filter(isUnapproved);
  const own = sortBackups(all.filter((backup) => !backup.backup?.other && !isUnapproved(backup)));
  const others = all.filter((backup) => backup.backup?.other === true);
  // Until this Syncify has a backup of its own, the others stand in for
  // them: after Spotify was reinstalled, say, what it backed up before is
  // what it restores.
  const borrowed = own.backups.length + own.pinned.length === 0 && !own.safetyCopy && others.length > 0;
  const shown = borrowed ? sortBackups(others) : own;
  // The latest backup is the newest of those; an unconfirmed one never is.
  const payload = shown.backups[0] ?? shown.safetyCopy;

  if (!payload) {
    return {
      ...state,
      exists: false,
      payload: null,
      backups: [],
      safetyCopy: null,
      pinned: shown.pinned,
      borrowed,
      others: [],
      unapproved,
    };
  }

  return {
    ...state,
    exists: true,
    payload,
    // Only the safety copy could be read: it's shown as the latest backup.
    backups: shown.backups.length > 0 ? shown.backups : [payload],
    safetyCopy: shown.backups.length > 0 ? shown.safetyCopy : null,
    pinned: shown.pinned,
    borrowed,
    others: borrowed ? [] : others.sort(newestFirst),
    unapproved,
  };
}

const newestFirst = (a: SyncifyPayload, b: SyncifyPayload) =>
  Date.parse(b.metadata.last_sync_datetime) - Date.parse(a.metadata.last_sync_datetime);

/**
 * Backups as the window lists them: the latest newest first, the safety
 * copy, the pinned ones. Backups of several Syncifys can hold a safety copy
 * each: the newest is shown as the one, the rest with the latest.
 */
function sortBackups(all: SyncifyPayload[]): {
  backups: SyncifyPayload[];
  safetyCopy: SyncifyPayload | null;
  pinned: SyncifyPayload[];
} {
  const isSafetyCopy = (backup: SyncifyPayload) =>
    backup.backup?.kind === "anchor" || backup.backup?.safety_copy === true;
  const safetyCopy = all.filter(isSafetyCopy).sort(newestFirst)[0] ?? null;
  return {
    // This install's own backups count as its latest while they're still
    // kept apart, on its first day.
    backups: all
      .filter(
        (backup) =>
          backup.backup?.kind === "rolling" ||
          backup.backup?.kind === "quarantined" ||
          (isSafetyCopy(backup) && backup !== safetyCopy && backup.backup?.kind === "anchor"),
      )
      .sort(newestFirst),
    safetyCopy,
    pinned: all.filter((backup) => backup.backup?.kind === "pinned" && backup !== safetyCopy),
  };
}

/**
 * Deletes the account's copy of an item's extension settings: it's marked
 * off, so every device turns it off. `version`: the account version the
 * delete made.
 */
export async function deleteSettingsCopy(
  workerUrl: string,
  identity: UserIdentity,
  item: string,
): Promise<{ version: number }> {
  const response = await request(
    workerUrl,
    identity,
    { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ item }) },
    DELETE_SETTINGS_PATH,
  );
  const result = (await response.json().catch(() => null)) as { version?: unknown; code?: unknown } | null;
  if (!response.ok || typeof result?.version !== "number") {
    throw new Error(
      response.status === 429
        ? "Syncify can't delete more synced copies today. Try again tomorrow."
        : `Couldn't delete the synced copy with HTTP ${response.status}.`,
    );
  }
  return { version: result.version };
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
  // What this device is signed in as is never guessed: a read that failed
  // rejects rather than sending the request as a stranger's. Only a device
  // without IndexedDB has nothing stored.
  const session = await loadSession().catch(withoutDatabase);
  const keys = session ? await getDeviceKey(false).catch(withoutDatabase) : null;
  const installKey = await getInstallKey();
  const signing: Record<string, string> = {};
  const salt = (await getSalt()) ?? NO_SALT;
  if (session && keys) {
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
  // Every request is also signed with this install's own key.
  if (installKey) {
    signing[SALT_HEADER] = salt;
    signing[INSTALL_KEY_HEADER] = installKey.publicKey;
    signing[INSTALL_SIGNATURE_HEADER] = await signRequest(
      installKey.privateKey,
      salt,
      method,
      url,
      init.body ?? "",
    );
  }

  const clientHeaders = await getClientHeaders();
  const sentInstall = clientHeaders[INSTALL_HEADER];
  const response = await fetch(url, {
    ...init,
    headers: {
      ...init.headers,
      ...clientHeaders,
      [USER_HASH_HEADER]: identity.hash,
      [IDENTITY_HEADER]: identity.field,
      ...signing,
    },
  });

  const nextSalt = response.headers.get(SALT_HEADER);
  if (nextSalt) await saveSalt(nextSalt);

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
    if (code === "stale_salt" && (session || installKey)) {
      return request(workerUrl, identity, init, path, true);
    }
    // The session ended: forget it, and ask again without it.
    if (code === "signed_out" && session) {
      await clearSession();
      return request(workerUrl, identity, init, path, true);
    }
    // This install's key no longer matches the one bound to its ID, such as
    // when the key stored next to the ID was lost and made again: start over
    // as a new install, once.
    if (code === "install_key_mismatch" && installKey) {
      await replaceInstall(sentInstall);
      return request(workerUrl, identity, init, path, true);
    }
  }
  // A linked Spotify account the session can't read.
  if (code === "not_linked") throw new Error("Couldn't read that Spotify account's backups.");
  if (code === "signed_out") await clearSession();
  throw new AccountError(typeof code === "string" ? code : "failed");
}

function linkedPath(path: string, linkedHash?: string): string {
  return linkedHash
    ? `${path}?${LINKED_HASH_PARAM}=${encodeURIComponent(linkedHash)}`
    : path;
}

/** The Syncifys this one is asked about, as the backup service lists them, or null. */
function readInstall(value: unknown): SyncifyInstallState | null {
  const install = value as { trust?: unknown; waiting?: unknown } | null | undefined;
  if (!install || typeof install.trust !== "string") return null;
  const waiting = Array.isArray(install.waiting) ? install.waiting : [];
  return {
    waiting: waiting.flatMap((entry) => {
      const item = entry as { id?: unknown; device?: unknown; first_seen_at?: unknown } | null;
      return item && typeof item.id === "string" && typeof item.first_seen_at === "number"
        ? [{ id: item.id, device: typeof item.device === "string" ? item.device : null, first_seen_at: item.first_seen_at }]
        : [];
    }),
  };
}

/** A claim as the backup service describes it, or null. */
export function readClaim(value: unknown): SyncifyClaim | null {
  const claim = value as
    | { status?: unknown; mine?: unknown; email?: unknown; final_at?: unknown; held?: unknown; can_cancel?: unknown; undone_at?: unknown }
    | null
    | undefined;
  if (!claim || typeof claim.mine !== "boolean") return null;
  const email = typeof claim.email === "string" ? claim.email : null;
  if (claim.status === "final") {
    return { status: "final", mine: claim.mine, ...(claim.mine ? {} : { email }) };
  }
  if (claim.status === "undone") {
    return typeof claim.undone_at === "number"
      ? { status: "undone", mine: false, email, undone_at: claim.undone_at }
      : null;
  }
  if (claim.status !== "pending" || typeof claim.final_at !== "number") {
    return null;
  }

  return {
    status: "pending",
    mine: claim.mine,
    email,
    final_at: claim.final_at,
    held: claim.held === true,
    can_cancel: claim.can_cancel === true,
  };
}

/** Nothing stored on a device without IndexedDB; any other failure stands. */
function withoutDatabase(error: unknown): null {
  if (error instanceof DatabaseUnavailableError) return null;
  throw error;
}

/**
 * From a Syncify nobody confirmed, other than this one: its new items are
 * left off in a restore.
 */
export function isUnapproved(backup: SyncifyPayload): boolean {
  return backup.backup?.kind === "quarantined" && backup.backup.mine !== true;
}
