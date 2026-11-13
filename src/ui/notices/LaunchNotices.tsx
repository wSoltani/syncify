import { useState, type ReactNode } from "react";
import { loadConfig } from "../../core/config";
import { answerWaitingInstall, cancelPendingClaim } from "../../core/syncService";
import type { SyncifyClaim, SyncifyWaitingInstall } from "../../types/syncify";
import { describeOtherClaim, notMeToast, undoneClaimTitle, waitingInstallTitle } from "../claimText";
import { Button, DialogContent, Notice } from "../kit";

type PendingClaim = Extract<SyncifyClaim, { status: "pending" }>;
type UndoneClaim = Extract<SyncifyClaim, { status: "undone" }>;

/**
 * What Syncify shows in Spotify's popup when Spotify starts: one dialog
 * layout for each, a title, the facts, the safe button first and the action
 * last. Spotify's close button dismisses any of them.
 */
function LaunchNotice(props: { title: string; children?: ReactNode; error?: string | null; actions: ReactNode }) {
  return (
    <div className="syncify-ui syncify-launch-notice">
      <DialogContent title={props.title} actions={props.actions}>
        {props.children ? <p>{props.children}</p> : null}
        {props.error ? <Notice tone="error">{props.error}</Notice> : null}
      </DialogContent>
    </div>
  );
}

/** Runs an answer, keeping its error in view; the notice closes once it's done. */
function useAnswer() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function run(answer: () => Promise<void>) {
    setBusy(true);
    setError(null);
    try {
      await answer();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : String(caught));
      setBusy(false);
    }
  }
  return { busy, error, run };
}

/**
 * Someone else's claim on this Spotify account is pending. Not me from an
 * install this account trusts cancels it; from any other, Syncify checks it.
 */
export function ClaimNotice(props: { claim: PendingClaim; onClose(): void }) {
  const { title, text } = describeOtherClaim(props.claim);
  const answer = useAnswer();
  return (
    <LaunchNotice
      title={title}
      error={answer.error}
      actions={
        <>
          <Button variant="secondary" onClick={props.onClose} disabled={answer.busy}>
            Close
          </Button>
          <Button
            onClick={() =>
              void answer.run(async () => {
                Spicetify.showNotification(notMeToast(await cancelPendingClaim(loadConfig())));
                props.onClose();
              })
            }
            disabled={answer.busy}
          >
            Not me
          </Button>
        </>
      }
    >
      {text}
    </LaunchNotice>
  );
}

/** Once, after an admin undid someone else's claim on this Spotify account. */
export function UndoneClaimNotice(props: { claim: UndoneClaim; onClose(): void }) {
  return (
    <LaunchNotice title={undoneClaimTitle(props.claim)} actions={<Button onClick={props.onClose}>Close</Button>} />
  );
}

/** A new install on this Spotify account waits for this one to approve it. */
export function InstallNotice(props: { install: SyncifyWaitingInstall; onDone(): void }) {
  const answer = useAnswer();
  const reply = (action: "approve" | "reject") =>
    void answer.run(async () => {
      await answerWaitingInstall(loadConfig(), props.install.id, action);
      Spicetify.showNotification(action === "approve" ? "Syncify: install approved" : "Syncify: install refused");
      props.onDone();
    });

  return (
    <LaunchNotice
      title={waitingInstallTitle(props.install)}
      error={answer.error}
      actions={
        <>
          <Button variant="secondary" onClick={() => reply("reject")} disabled={answer.busy}>
            Not mine
          </Button>
          <Button onClick={() => reply("approve")} disabled={answer.busy}>
            Approve
          </Button>
        </>
      }
    >
      Approve it if it's yours.
    </LaunchNotice>
  );
}

/** The Secure nudge, once per install, on a backup with no account. */
export function NudgeNotice(props: { onSecure(): void; onClose(): void }) {
  return (
    <LaunchNotice
      title="Your backup isn't secured"
      actions={
        <>
          <Button variant="secondary" onClick={props.onClose}>
            Not now
          </Button>
          <Button
            onClick={(event) => {
              // Secure swaps this notice for Syncify's window in the same popup.
              // Spicetify's popup closes on a click outside it, and this button
              // is gone by then, so the click must stop here.
              event.stopPropagation();
              props.onSecure();
            }}
          >
            Secure
          </Button>
        </>
      }
    >
      Anyone who knows your Spotify username can restore it.
    </LaunchNotice>
  );
}
