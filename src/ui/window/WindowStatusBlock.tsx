import type { SyncifyWaitingInstall } from "../../types/syncify";
import { INSTALL_CODE_TITLE } from "../claimText";
import { AlertIcon, Button, CheckIcon, Dialog, Mark, Meta } from "../kit";
import { InstallCodeActions, InstallCodeStep, useInstallAnswer } from "../notices/InstallAnswer";
import type { StatusAction, WindowAlert, WindowStatus } from "./status";

const ACTION_LABELS: Record<StatusAction, string> = {
  "back-up": "Back up now",
  "try-again": "Try again",
  "how-to-update": "How to update",
  reload: "Reload",
};

/**
 * Where this device stands, pinned above the tabs, with the one main action
 * on its right. An alert that needs an answer takes its place, and the
 * status drops to one line under it.
 */
export function WindowStatusBlock(props: {
  status: WindowStatus;
  alert: WindowAlert | null;
  /** A backup is running: its button shows it in place. */
  backingUp: boolean;
  /** Something is running, so nothing else can start. */
  busy: boolean;
  /** Not me on a claim is on its way. */
  answering: boolean;
  onAction(action: StatusAction): void;
  onSignIn(): void;
  onNotMe(): void;
  /** That's me or Not me about another Syncify's backups went through. */
  onInstallAnswered(): Promise<void>;
  onError(error: unknown): void;
  onSupport(): void;
}) {
  const { status, alert } = props;
  const statusAction = status.action;
  const action = statusAction ? (
    <Button
      variant={statusAction === "back-up" ? "primary" : "secondary"}
      size={alert ? "small" : "regular"}
      onClick={() => props.onAction(statusAction)}
      disabled={props.busy}
    >
      {statusAction === "back-up" && props.backingUp ? "Backing up…" : ACTION_LABELS[statusAction]}
    </Button>
  ) : null;

  if (alert) {
    return (
      <section className="syncify-status" aria-label="Status">
        <div className="syncify-status-alert" role="alert">
          <div className="syncify-status-alert-body">
            <span className="syncify-status-alert-mark">
              <Mark tone="warning" icon={<AlertIcon />} />
            </span>
            <div className="syncify-status-text">
              <h2 className="syncify-status-title">{alert.title}</h2>
              {alert.text ? <p className="syncify-status-sentence">{alert.text}</p> : null}
            </div>
          </div>
          {alert.kind === "claim" ? (
            alert.signIn ? (
              <span className="syncify-status-answers">
                <Button variant="secondary" onClick={props.onNotMe} disabled={props.answering}>
                  Not me
                </Button>
                <Button onClick={props.onSignIn} disabled={props.answering}>
                  That's me, sign in
                </Button>
              </span>
            ) : (
              <Button variant="secondary" onClick={props.onNotMe} disabled={props.answering}>
                Not me
              </Button>
            )
          ) : (
            // Each Syncify asked about starts from the question.
            <InstallAnswers
              key={alert.install.id}
              install={alert.install}
              onDone={props.onInstallAnswered}
              onError={props.onError}
            />
          )}
        </div>
        <div className="syncify-status-line" aria-live="polite">
          {status.backedUp ? <CheckIcon className="syncify-status-check" /> : null}
          <Meta parts={status.line} />
          {action}
        </div>
      </section>
    );
  }

  return (
    <section className="syncify-status" aria-label="Status">
      <div className="syncify-status-main" aria-live="polite">
        <div className="syncify-status-text">
          <h2 className="syncify-status-title">{status.title}</h2>
          {status.detail.length > 0 ? <Meta parts={status.detail} /> : null}
          {status.supportAsk ? (
            <p className="syncify-status-ask">
              <span>{status.supportAsk}</span>
              <Button variant="text" onClick={props.onSupport}>
                Support it on Ko-fi
              </Button>
            </p>
          ) : null}
        </div>
        {action}
      </div>
    </section>
  );
}

/**
 * Not me and That's me about another Syncify's backups. That's me asks for
 * that Syncify's code in a dialog: nothing joins without it.
 */
function InstallAnswers(props: {
  install: SyncifyWaitingInstall;
  onDone(): Promise<void>;
  onError(error: unknown): void;
}) {
  const answer = useInstallAnswer(props.install, { onDone: props.onDone, onError: props.onError });
  return (
    <>
      <span className="syncify-status-answers">
        <Button variant="secondary" onClick={answer.notMe} disabled={answer.busy}>
          Not me
        </Button>
        <Button onClick={answer.askForCode} disabled={answer.busy}>
          That's me
        </Button>
      </span>
      <Dialog
        open={answer.step === "code"}
        title={INSTALL_CODE_TITLE}
        actions={<InstallCodeActions answer={answer} />}
        onClose={answer.back}
        onSubmit={answer.confirm}
      >
        <InstallCodeStep answer={answer} />
      </Dialog>
    </>
  );
}
