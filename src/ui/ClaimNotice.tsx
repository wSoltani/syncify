import type { useState as useStateType } from "react";
import { cancelPendingClaim } from "../core/syncService";
import { loadConfig } from "../core/config";
import type { SyncifyClaim } from "../types/syncify";
import { formatFinalDate } from "./SyncifyModal";

type PendingClaim = Extract<SyncifyClaim, { status: "pending" }>;

/**
 * Shown when Spotify starts while someone else's claim on this Spotify
 * account is pending: who is claiming it, with Not me and Close. Signed out,
 * it may be the claimer's own Spotify, so it also offers to sign in, which
 * settles this install for the claim.
 */
export function ClaimNotice(props: {
  claim: PendingClaim;
  signedIn: boolean;
  onSignIn(): void;
  onClose(): void;
}) {
  const React = Spicetify.React;
  const useState = React.useState as typeof useStateType;
  const { claim } = props;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function notMe() {
    setBusy(true);
    setError(null);
    try {
      await cancelPendingClaim(loadConfig());
      Spicetify.showNotification("Syncify: claim sent for review");
      props.onClose();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : String(caught));
      setBusy(false);
    }
  }

  return (
    <div className="syncify-panel">
      <p className="syncify-claim-notice">
        {claim.email ?? "Someone"} is claiming this backup.{" "}
        {!props.signedIn
          ? "If that's you, sign in to finish."
          : claim.held
            ? "Syncify is reviewing it."
            : `It goes through ${formatFinalDate(claim.final_at)} unless you stop it.`}
      </p>
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
          className={props.signedIn ? "syncify-button" : "syncify-button secondary"}
          type="button"
          onClick={() => void notMe()}
          disabled={busy}
        >
          Not me
        </button>
        {!props.signedIn ? (
          <button
            className="syncify-button"
            type="button"
            onClick={props.onSignIn}
            disabled={busy}
          >
            That's me, sign in
          </button>
        ) : null}
      </div>
    </div>
  );
}
