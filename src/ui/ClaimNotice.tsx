import type { useState as useStateType } from "react";
import { cancelPendingClaim } from "../core/syncService";
import { loadConfig } from "../core/config";
import type { SyncifyClaim } from "../types/syncify";
import { notMeToast, otherClaimText } from "./SyncifyModal";

type PendingClaim = Extract<SyncifyClaim, { status: "pending" }>;

/**
 * Shown when Spotify starts while someone else's claim on this Spotify
 * account is pending: who is securing it, with Not me and Close. Not me from
 * an install this account trusts cancels it; from any other, Syncify checks
 * it.
 */
export function ClaimNotice(props: { claim: PendingClaim; onClose(): void }) {
  const React = Spicetify.React;
  const useState = React.useState as typeof useStateType;
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
