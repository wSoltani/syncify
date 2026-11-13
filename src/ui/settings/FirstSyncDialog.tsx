import { useState } from "react";
import { chooseFirstSync, type SyncChoice } from "../../core/settingsSync";
import { formatDay } from "../format";
import { Button, Dialog, List, ListRow, Notice, Pip, RadioRow, useStableId } from "../kit";

type Pick = "here" | "account";

/**
 * Once per device, at its first sync: for each item whose settings differ
 * between this Spotify and the other devices, which copy to keep. Each says
 * when it last changed, and the newer one is picked. Ask me later leaves
 * those items unsynced until the next launch.
 */
export function FirstSyncDialog(props: { choices: SyncChoice[]; open: boolean; onClose(): void }) {
  const name = useStableId("first-sync");
  const [picks, setPicks] = useState<Record<string, Pick>>(() =>
    Object.fromEntries(props.choices.map((choice) => [choice.id, choice.localAt > choice.accountAt ? "here" : "account"])),
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pickOf = (choice: SyncChoice): Pick => picks[choice.id] ?? (choice.localAt > choice.accountAt ? "here" : "account");

  async function keep() {
    setSaving(true);
    setError(null);
    try {
      await chooseFirstSync(Object.fromEntries(props.choices.map((choice) => [choice.id, pickOf(choice)])));
      props.onClose();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : String(caught));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog
      open={props.open}
      wide
      onClose={props.onClose}
      title="Which extension settings do you want to keep?"
      actions={
        <>
          <Button variant="secondary" onClick={props.onClose} disabled={saving}>
            Ask me later
          </Button>
          <Button onClick={() => void keep()} disabled={saving}>
            Keep these
          </Button>
        </>
      }
    >
      <p>
        These items have different settings in this Spotify than on your other devices. Choose the settings to keep for
        each item. All your devices will then use them.
      </p>
      <List wrap>
        {props.choices.map((choice) => (
          <ListRow
            key={choice.id}
            leading={<Pip kind={choice.kind} />}
            name={choice.name}
            end={
              <span className="syncify-first-sync-picks" role="radiogroup" aria-label={choice.name}>
                <RadioRow
                  name={`${name}-${choice.id}`}
                  label={`This Spotify, ${formatDay(choice.localAt)}`}
                  checked={pickOf(choice) === "here"}
                  onChange={() => setPicks((current) => ({ ...current, [choice.id]: "here" }))}
                  disabled={saving}
                />
                <RadioRow
                  name={`${name}-${choice.id}`}
                  label={`Other devices, ${formatDay(choice.accountAt)}`}
                  checked={pickOf(choice) === "account"}
                  onChange={() => setPicks((current) => ({ ...current, [choice.id]: "account" }))}
                  disabled={saving}
                />
              </span>
            }
          />
        ))}
      </List>
      {error ? <Notice tone="error">{error}</Notice> : null}
    </Dialog>
  );
}
