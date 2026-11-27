import type { ReactNode } from "react";
import { rememberNotMe, type SecuredElsewhere } from "../../core/claimNotices";
import type { SyncifyWaitingInstall } from "../../types/syncify";
import { INSTALL_CODE_TITLE, WAITING_INSTALL_TEXT, describeSecuredElsewhere, waitingInstallTitle } from "../claimText";
import { Button, DialogContent, Notice } from "../kit";
import { InstallCodeActions, InstallCodeStep, useInstallAnswer } from "./InstallAnswer";

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

/**
 * This backup is secured with emails this Syncify isn't signed in with.
 * Signed out, one can be this person's own, so signing in comes first. Not
 * me stops the notice here and changes nothing else.
 */
export function SecuredElsewhereNotice(props: {
  claim: SecuredElsewhere;
  signedIn: boolean;
  onSignIn(): void;
  onClose(): void;
}) {
  const { title, text } = describeSecuredElsewhere(props.claim, props.signedIn);
  const notMe = () => {
    rememberNotMe(props.claim);
    props.onClose();
  };
  return (
    <LaunchNotice
      title={title}
      actions={
        props.signedIn ? (
          <>
            <Button variant="secondary" onClick={props.onClose}>
              Close
            </Button>
            <Button onClick={notMe}>Not me</Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={notMe}>
              Not me
            </Button>
            <Button onClick={props.onSignIn}>That's me, sign in</Button>
          </>
        )
      }
    >
      {text}
    </LaunchNotice>
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
