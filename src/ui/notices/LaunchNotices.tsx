import { useState, type ReactNode } from "react";
import { rememberNotMe, type OtherClaim } from "../../core/claimNotices";
import { loadConfig } from "../../core/config";
import { cancelPendingClaim } from "../../core/syncService";
import type { SyncifyClaim, SyncifyWaitingInstall } from "../../types/syncify";
import {
  INSTALL_CODE_TITLE,
  WAITING_INSTALL_TEXT,
  describeOtherClaim,
  notMeToast,
  undoneClaimTitle,
  waitingInstallTitle,
} from "../claimText";
import { Button, DialogContent, Notice } from "../kit";
import { InstallCodeActions, InstallCodeStep, useInstallAnswer } from "./InstallAnswer";

type UndoneClaim = Extract<SyncifyClaim, { status: "undone" }>;

/**
 * What Syncify shows in Spotify's popup when Spotify starts: one dialog
 * layout for each, a title, the facts, the safe button first and the action
 * last. Spotify's close button dismisses any of them.
 */
function LaunchNotice(props: {
  title: string;
  /** A sentence, or the parts of a step. */
  children?: ReactNode;
  error?: string | null;
  actions: ReactNode;
  /** The notice holds a field: Enter sends it. */
  onSubmit?(): void;
}) {
  return (
    <div className="syncify-ui syncify-launch-notice">
      <DialogContent title={props.title} actions={props.actions} onSubmit={props.onSubmit}>
        {typeof props.children === "string" ? <p>{props.children}</p> : props.children}
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
 * Someone else is securing this backup, or secured it with an email this
 * Syncify isn't signed in with. Signed out, it can be this person's own, so
 * signing in comes first. Not me cancels a pending claim from a Syncify that
 * backed up here before the claimer's did; from any other, and once the
 * backup is secured, it only stops the notice here.
 */
export function ClaimNotice(props: { claim: OtherClaim; signedIn: boolean; onSignIn(): void; onClose(): void }) {
  const { claim } = props;
  const { title, text } = describeOtherClaim(claim, props.signedIn);
  const answer = useAnswer();
  const notMe = () =>
    void answer.run(async () => {
      const cancelled =
        claim.status === "pending" && claim.can_cancel && (await cancelPendingClaim(loadConfig())) === "cancelled";
      if (cancelled) Spicetify.showNotification(notMeToast(claim.email));
      else rememberNotMe(claim);
      props.onClose();
    });
  return (
    <LaunchNotice
      title={title}
      error={answer.error}
      actions={
        props.signedIn ? (
          <>
            <Button variant="secondary" onClick={props.onClose} disabled={answer.busy}>
              Close
            </Button>
            <Button onClick={notMe} disabled={answer.busy}>
              Not me
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={notMe} disabled={answer.busy}>
              Not me
            </Button>
            <Button onClick={props.onSignIn} disabled={answer.busy}>
              That's me, sign in
            </Button>
          </>
        )
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

/**
 * Another Syncify backed up on this Spotify username: Not me, or That's me,
 * which asks for that Syncify's code in place of the question.
 */
export function InstallNotice(props: { install: SyncifyWaitingInstall; onDone(): void }) {
  const answer = useInstallAnswer(props.install, { onDone: props.onDone });

  if (answer.step === "code") {
    return (
      <LaunchNotice
        title={INSTALL_CODE_TITLE}
        error={answer.error}
        actions={<InstallCodeActions answer={answer} />}
        onSubmit={answer.confirm}
      >
        <InstallCodeStep answer={answer} />
      </LaunchNotice>
    );
  }

  return (
    <LaunchNotice
      title={waitingInstallTitle(props.install)}
      error={answer.error}
      actions={
        <>
          <Button variant="secondary" onClick={answer.notMe} disabled={answer.busy}>
            Not me
          </Button>
          <Button onClick={answer.askForCode} disabled={answer.busy}>
            That's me
          </Button>
        </>
      }
    >
      {WAITING_INSTALL_TEXT}
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
