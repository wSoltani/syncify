import type { useState as useStateType } from "react";
import { answerWaitingInstall } from "../core/syncService";
import { loadConfig } from "../core/config";
import type { SyncifyWaitingInstall } from "../types/syncify";

/** "A new install on Windows wants to back up this Spotify account." */
export function describeWaitingInstall(install: SyncifyWaitingInstall): string {
  return `A new install${install.device ? ` on ${install.device}` : ""} wants to back up this Spotify account.`;
}

/**
 * Shown when Spotify starts while a new install on this Spotify account waits
 * for this one to approve it, with Approve and Not mine.
 */
export function InstallNotice(props: {
  install: SyncifyWaitingInstall;
  onDone(action: "approve" | "reject"): void;
  onClose?(): void;
}) {
  const React = Spicetify.React;
  const useState = React.useState as typeof useStateType;
  const { install } = props;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function answer(action: "approve" | "reject") {
    setBusy(true);
    setError(null);
    try {
      await answerWaitingInstall(loadConfig(), install.id, action);
      Spicetify.showNotification(
        action === "approve" ? "Syncify: install approved" : "Syncify: install refused",
      );
      props.onDone(action);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : String(caught));
      setBusy(false);
    }
  }

  return (
    <>
      <p className="syncify-claim-notice">
        {describeWaitingInstall(install)} Approve it if it's yours.
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
          className="syncify-button secondary"
          type="button"
          onClick={() => void answer("reject")}
          disabled={busy}
        >
          Not mine
        </button>
        <button
          className="syncify-button"
          type="button"
          onClick={() => void answer("approve")}
          disabled={busy}
        >
          Approve
        </button>
      </div>
    </>
  );
}
