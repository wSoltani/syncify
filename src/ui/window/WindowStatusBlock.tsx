import { AlertIcon, Button, CheckIcon, Mark, Meta } from "../kit";
import type { StatusAction, WindowAlert, WindowStatus } from "./status";

const ACTION_LABELS: Record<StatusAction, string> = {
  "back-up": "Back up now",
  "try-again": "Try again",
  "sign-in": "Sign in",
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
  /** An answer to the alert is on its way. */
  answering: boolean;
  onAction(action: StatusAction): void;
  onNotMe(): void;
  onAnswerInstall(answer: "approve" | "reject"): void;
  onSupport(): void;
}) {
  const { status, alert } = props;
  const statusAction = status.action;
  const action = statusAction ? (
    <Button
      variant={statusAction === "back-up" || statusAction === "sign-in" ? "primary" : "secondary"}
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
          <span className="syncify-status-alert-mark">
            <Mark tone="warning" icon={<AlertIcon />} />
          </span>
          <div className="syncify-status-text">
            <h2 className="syncify-status-title">{alert.title}</h2>
            {alert.kind === "claim" && alert.text ? <p className="syncify-status-sentence">{alert.text}</p> : null}
          </div>
          {alert.kind === "claim" ? (
            alert.canAnswer ? (
              <Button variant="secondary" onClick={props.onNotMe} disabled={props.answering}>
                Not me
              </Button>
            ) : null
          ) : (
            <span className="syncify-status-answers">
              <Button
                variant="secondary"
                onClick={() => props.onAnswerInstall("reject")}
                disabled={props.answering}
              >
                Not mine
              </Button>
              <Button onClick={() => props.onAnswerInstall("approve")} disabled={props.answering}>
                Approve
              </Button>
            </span>
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
