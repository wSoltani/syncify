import { useEffect, useState } from "react";
import { dismissManualItems, manualCommands, type RestoreResult } from "../../core/restoreSummary";
import { copyToClipboard } from "../clipboard";
import { Button, Notice } from "../kit";

// How long Copy says Copied.
const COPIED_SHOWN_MS = 2000;

/** What's worth knowing about this device's backups, above the list. */
export function BackupNotices(props: {
  /** The Secure nudge: this backup isn't secured. */
  nudge: boolean;
  securing: boolean;
  onSecure(): void;
  onHideNudge(): void;
  restoreResult: RestoreResult | null;
}) {
  return (
    <>
      {props.nudge ? (
        <Notice
          tone="warning"
          actions={
            <>
              <Button variant="subtle" size="small" onClick={props.onHideNudge} disabled={props.securing}>
                Not now
              </Button>
              <Button size="small" onClick={props.onSecure} disabled={props.securing}>
                {props.securing ? "Securing…" : "Secure"}
              </Button>
            </>
          }
        >
          Your backup isn't secured. Anyone who knows your Spotify username can restore it.
        </Notice>
      ) : null}
      {props.restoreResult ? <ManualCommands manual={props.restoreResult.manual} /> : null}
    </>
  );
}

/** What a restore couldn't add from Marketplace, as commands to copy. */
function ManualCommands(props: { manual: RestoreResult["manual"] }) {
  const [copied, setCopied] = useState(false);
  const commands = manualCommands(props.manual).join("\n");

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), COPIED_SHOWN_MS);
    return () => clearTimeout(timer);
  }, [copied]);

  if (!commands) return null;
  const count = props.manual.length;
  return (
    <Notice
      tone="info"
      actions={
        <>
          <Button variant="text" onClick={() => void copyToClipboard(commands).then(setCopied)}>
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button variant="subtle" onClick={dismissManualItems}>
            Dismiss
          </Button>
        </>
      }
    >
      {count === 1
        ? "1 isn't from Marketplace. Add it in a terminal:"
        : `${count} aren't from Marketplace. Add them in a terminal:`}
      <pre className="syncify-commands">
        <code>{commands}</code>
      </pre>
    </Notice>
  );
}
