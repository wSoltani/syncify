import { useState } from "react";
import { cancelPendingClaim } from "../core/syncService";
import { loadConfig } from "../core/config";
import type { SyncifyClaim } from "../types/syncify";
import { notMeToast, otherClaimText, undoneClaimText } from "./claimText";

type PendingClaim = Extract<SyncifyClaim, { status: "pending" }>;
type UndoneClaim = Extract<SyncifyClaim, { status: "undone" }>;

/**
 * Shown when Spotify starts while someone else's claim on this Spotify
 * account is pending: who is securing it, with Not me and Close. Not me from
 * an install this account trusts cancels it; from any other, Syncify checks
 * it.
 */
export function ClaimNotice(props: { claim: PendingClaim; onClose(): void }) {
  const { claim } = props;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function notMe() {
    setBusy(true);
    setError(null);
    try {
      Spicetify.showNotification(notMeToast(await cancelPendingClaim(loadConfig())));
      props.onClose();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : String(caught));
      setBusy(false);
    }
  }

  return (
    <div className="syncify-panel">
      <p className="syncify-claim-notice">{otherClaimText(claim)}</p>
      {error ? (
        <div className="syncify-alert" data-kind="error" role="alert">
          {error}
        </div>
      ) : null}
      <div className="syncify-actions">
        <button
          className="syncify-text-button"
          type="button"
          onClick={props.onClose}
          disabled={busy}
        >
          Close
        </button>
        <button
          className="syncify-button"
          type="button"
          onClick={() => void notMe()}
          disabled={busy}
        >
          Not me
        </button>
      </div>
    </div>
  );
}

/**
 * Shown once when Spotify starts after an admin undid someone else's final
 * claim on this Spotify account: that account no longer secures its backup.
 */
export function UndoneClaimNotice(props: { claim: UndoneClaim; onClose(): void }) {
  return (
    <div className="syncify-panel">
      <p className="syncify-claim-notice">{undoneClaimText(props.claim)}</p>
      <div className="syncify-actions">
        <button className="syncify-button" type="button" onClick={props.onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
