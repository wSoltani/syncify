import { useCallback, useState } from "react";
import type { ClaimStatus } from "../../api/claimsApi";
import { LockedError } from "../../api/syncifyApi";
import { loadSession, type AccountSession } from "../../core/account";
import { fetchClaims, fetchRemoteState } from "../../core/syncService";
import type { SyncifyConfig, SyncifyPayload, SyncifyRemoteState } from "../../types/syncify";

// Mirrors the worker's MAX_BACKUP_HISTORY.
const MAX_BACKUPS = 3;

type Claims = ClaimStatus & { hash: string };

/** One read of this Spotify account's backups and, signed in, its claims. */
interface BackupCheck {
  remote: SyncifyRemoteState;
  /** A secured backup this device can't read: signed out, or another account. */
  lockedBy: LockedError["code"] | null;
  claims: Claims | null;
}

// What a locked backup shows: nothing can be read without signing in.
const NO_REMOTE_STATE: SyncifyRemoteState = {
  exists: false,
  payload: null,
  backups: [],
  safetyCopy: null,
  claim: null,
  unapproved: [],
  install: null,
  nudge: false,
};

// The last check of this Spotify account's backups, kept until Spotify
// restarts, so reopening Syncify shows them at once while a quiet check
// brings them up to date.
let lastCheck: BackupCheck | null = null;

/**
 * This Spotify account's backups, its claim and the signed-in session. A
 * failed check throws, so the window can say why.
 */
export function useBackupCheck(config: SyncifyConfig) {
  const [check, setCheck] = useState<BackupCheck | null>(() => lastCheck);
  // undefined until the stored session has been read.
  const [session, setSession] = useState<AccountSession | null | undefined>(undefined);

  const remember = useCallback((next: BackupCheck) => {
    lastCheck = next;
    setCheck(next);
  }, []);

  const refresh = useCallback(async () => {
    let remote: SyncifyRemoteState;
    let lockedBy: LockedError["code"] | null = null;
    try {
      remote = await fetchRemoteState(config);
    } catch (error) {
      if (!(error instanceof LockedError)) throw error;
      remote = NO_REMOTE_STATE;
      lockedBy = error.code;
    }
    // Signed in, the claim and linked accounts come from the claim status.
    // A refused session is forgotten along the way, so read it after.
    const signedIn = await loadSession().catch(() => null);
    const claims = signedIn ? await fetchClaims(config).catch(() => null) : null;
    const current = signedIn ? await loadSession().catch(() => null) : null;

    remember({ remote, lockedBy, claims: current ? claims : null });
    setSession(current);
    return lockedBy;
  }, [config, remember]);

  /** Reads the stored session, shown at once; the next check reads it again. */
  const readSession = useCallback(() => {
    void loadSession()
      .catch(() => null)
      .then((stored) => setSession((known) => known ?? stored));
  }, []);

  /** A backup just made: shown as the latest without asking the service again. */
  const addBackup = useCallback(
    (payload: SyncifyPayload) => {
      const base = lastCheck ?? { remote: NO_REMOTE_STATE, lockedBy: null, claims: null };
      const { remote } = base;
      remember({
        ...base,
        remote: {
          ...remote,
          exists: true,
          payload,
          backups: [
            payload,
            ...remote.backups.filter((backup) => backup.payload_hash !== payload.payload_hash),
          ].slice(0, MAX_BACKUPS),
          // Same data as the safety copy: show it once, as the new backup.
          // The Worker may also move the safety copy; the next check shows that.
          safetyCopy:
            remote.safetyCopy?.payload_hash === payload.payload_hash ? null : remote.safetyCopy,
        },
      });
    },
    [remember],
  );

  /** Signed out: forget the claims until the next check. */
  const forgetClaims = useCallback(() => {
    setSession(null);
    if (lastCheck) remember({ ...lastCheck, claims: null });
  }, [remember]);

  return {
    /** null until the backups were read once since Spotify started. */
    check,
    remote: check?.remote ?? NO_REMOTE_STATE,
    lockedBy: check?.lockedBy ?? null,
    claims: check?.claims ?? null,
    session,
    setSession,
    refresh,
    readSession,
    addBackup,
    forgetClaims,
  };
}
