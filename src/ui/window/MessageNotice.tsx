import { Button, Notice } from "../kit";
import type { WindowMessage } from "./message";

/** What an action ran into, under the status, until it's dismissed. */
export function MessageNotice(props: {
  message: WindowMessage;
  /** Something is running, so Try again waits. */
  busy: boolean;
  onTryAgain(): void;
  onDismiss(): void;
}) {
  const { message } = props;
  return (
    <Notice
      tone={message.kind}
      actions={
        <>
          {message.kind === "error" ? (
            <Button variant="text" onClick={props.onTryAgain} disabled={props.busy}>
              Try again
            </Button>
          ) : null}
          <Button variant="subtle" onClick={props.onDismiss}>
            Dismiss
          </Button>
        </>
      }
    >
      {message.text}
    </Notice>
  );
}
