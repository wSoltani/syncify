import {
  answerInstall,
  downloadPayload,
  reportRestore,
  uploadPayload,
} from "../api/syncifyApi";
import { reportShareImport } from "../api/sharesApi";
import {
  cancelClaim,
  claimBackup,
  fetchClaimStatus,
  type ClaimStatus,
} from "../api/claimsApi";
import type {
  SyncifyConfig,
  SyncifyPayload,
  SyncifyRemoteState,
} from "../types/syncify";
import { hasWorkerUrl } from "./config";
import { getUserIdentity } from "./user";
import { cleanSpicetifyConfig } from "./spicetifyConfig";
import {
  createPayload,
  hashSnapshot,
  restoreMarketplaceKeys,
} from "./marketplace";
import { applyShare, type ShareFile, type ShareMode } from "./shareCodes";
import type { SnippetCatalog } from "./sourceChecks";

/**
 * `unapproved`: the backup is kept apart until this install is approved from
 * a trusted install of this Spotify account, or signs in.
 */
export async function backupNow(
  config: SyncifyConfig,
): Promise<{ payload: SyncifyPayload; unchanged: boolean; unapproved: boolean }> {
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

  const { unchanged, unapproved } = await uploadPayload(
    config.workerUrl,
    identity,
    payload,
  );
  return { payload, unchanged, unapproved };
}

/**
 * This Spotify account's backups, or with `linkedHash` those of another
 * Spotify account linked to the signed-in account.
 */
export async function fetchRemoteState(
  config: SyncifyConfig,
  linkedHash?: string,
): Promise<SyncifyRemoteState> {
  if (!hasWorkerUrl(config)) {
    throw new Error("Syncify backup service is not configured.");
  }

  const remote = await downloadPayload(
    config.workerUrl,
    await getUserIdentity(),
    linkedHash,
  );

  // Backups made by older versions carry a hash computed over every key, so
  // recompute it with the current rules. Otherwise updating Syncify alone would
  // make every unchanged install look different and re-upload.
  // Recomputing can also make older backups identical to each other, so keep
  // only the newest backup for each distinct set of data. The safety copy is
  // left out when it holds the same data as a recent backup.
  const [rehashed, safetyCopy, unapproved] = await Promise.all([
    Promise.all(remote.backups.map(withCurrentHash)),
    remote.safetyCopy ? withCurrentHash(remote.safetyCopy) : null,
    Promise.all(remote.unapproved.map(withCurrentHash)),
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
    // An unapproved backup with the same data as an approved one adds nothing.
    unapproved: unapproved.filter(
      (backup) =>
        !backups.some((other) => other.payload_hash === backup.payload_hash),
    ),
  };
}

// Current hashes by backup (its stored hash and time), so each backup is
// hashed once per session rather than every time Syncify's window opens.
const currentHashes = new Map<string, Promise<string>>();

// The saved config is cleaned with the current rules too, so backups saved
// before a rule changed still match the same setup.
async function withCurrentHash(
  payload: SyncifyPayload,
): Promise<SyncifyPayload> {
  const keys = payload.marketplace_data?.keys ?? {};
  const spicetifyConfig = payload.spicetify_config
    ? cleanSpicetifyConfig(payload.spicetify_config, keys)
    : undefined;
  const id = `${payload.payload_hash} ${payload.metadata?.last_sync_datetime}`;
  let hash = currentHashes.get(id);
  if (!hash) {
    hash = hashSnapshot(keys, spicetifyConfig);
    currentHashes.set(id, hash);
    hash.catch(() => currentHashes.delete(id));
  }

  return {
    ...payload,
    ...(spicetifyConfig ? { spicetify_config: spicetifyConfig } : {}),
    payload_hash: await hash,
  };
}

/**
 * The claim on this Spotify account and this install's state, read with its
 * backups but without rehashing them, for the daily launch check.
 */
export async function fetchLaunchNotices(
  config: SyncifyConfig,
): Promise<Pick<SyncifyRemoteState, "claim" | "install" | "nudge">> {
  const remote = await downloadPayload(
    requireWorkerUrl(config),
    await getUserIdentity(),
  );
  return { claim: remote.claim, install: remote.install, nudge: remote.nudge };
}

/**
 * With `linkedHash`, the backup is one of that linked Spotify account's.
 * `skipped`: item keys left as they are on this device.
 */
export async function restoreNow(
  config: SyncifyConfig,
  selectedPayload?: SyncifyPayload,
  linkedHash?: string,
  skipped: string[] = [],
): Promise<{ payload: SyncifyPayload; restoredCount: number }> {
  const payload = selectedPayload ?? (await fetchRemoteState(config)).payload;

  if (!payload) {
    throw new Error(
      "No Syncify cloud backup was found for this Spotify account.",
    );
  }

  const restoredCount = await restoreMarketplaceKeys(payload, skipped);

  // Counted by the backup service. Not awaited: it finishes on its own while
  // Spotify reloads, and a failure doesn't matter to the restore.
  const backupId = payload.backup?.id;
  if (backupId && hasWorkerUrl(config)) {
    void getUserIdentity()
      .then((identity) =>
        reportRestore(config.workerUrl, identity, backupId, linkedHash),
      )
      .catch(() => {});
  }

  return { payload, restoredCount };
}

/** A safety backup failed, so a code wasn't loaded. */
export class SafetyBackupError extends Error {
  constructor(readonly reason: unknown) {
    super("Couldn't back up your setup first, so nothing changed.");
    this.name = "SafetyBackupError";
  }
}

/**
 * Loads a share code: a backup of this setup first, then the code's items.
 * When the backup can't be made, nothing changes. A backup that's unchanged,
 * or kept apart until this install is approved, is saved all the same.
 * `pick`: it came from Syncify picks.
 */
export async function loadShare(
  config: SyncifyConfig,
  file: ShareFile,
  mode: ShareMode,
  skipped: string[],
  catalog: SnippetCatalog | null,
  pick = false,
): Promise<number> {
  try {
    await backupNow(config);
  } catch (error) {
    throw new SafetyBackupError(error);
  }

  const written = await applyShare(file, mode, skipped, catalog);

  // Counted by the service. Not awaited: it finishes on its own while
  // Spotify reloads, and a failure doesn't matter to the load.
  void getUserIdentity()
    .then((identity) => reportShareImport(file.code, identity, pick))
    .catch(() => {});
  return written;
}

/** The claim on this Spotify account, with its hash to find it in `accounts`. */
export async function fetchClaims(
  config: SyncifyConfig,
): Promise<ClaimStatus & { hash: string }> {
  const identity = await getUserIdentity();
  const status = await fetchClaimStatus(requireWorkerUrl(config), identity);
  return { ...status, hash: identity.hash };
}

/** Claims this Spotify account for the signed-in account. */
export async function secureBackup(config: SyncifyConfig): Promise<void> {
  await claimBackup(requireWorkerUrl(config), await getUserIdentity());
}

/** Approves or refuses a new install waiting on this Spotify account. */
export async function answerWaitingInstall(
  config: SyncifyConfig,
  installId: string,
  action: "approve" | "reject",
): Promise<void> {
  await answerInstall(requireWorkerUrl(config), await getUserIdentity(), installId, action);
}

/** Cancels the pending claim on this Spotify account. */
export async function cancelPendingClaim(config: SyncifyConfig): Promise<void> {
  await cancelClaim(requireWorkerUrl(config), await getUserIdentity());
}

function requireWorkerUrl(config: SyncifyConfig): string {
  if (!hasWorkerUrl(config)) {
    throw new Error("Syncify backup service is not configured.");
  }
  return config.workerUrl;
}
