import { useState } from "react";
import type { ItemType, ManualItem } from "../../core/restorePreview";
import { Button, Checkbox, List, ListDivider, ListRow, Meta, Pip, type Kind } from "../kit";
import type { ChangeList as Changes, ChangeRow, ItemRow } from "./listChanges";

const KINDS: Record<ItemType, Kind> = { extension: "extension", theme: "theme", snippet: "snippet" };
const MANUAL_KINDS: Record<ManualItem["type"], Kind> = {
  extension: "extension",
  custom_app: "app",
  theme: "theme",
};
const MANUAL_LABELS: Record<ManualItem["type"], string> = {
  extension: "extension",
  custom_app: "custom app",
  theme: "theme",
};

/**
 * What a restore or a share code changes, one row each: changes first, then
 * what's added by hand, then extension settings after a line, then the rest
 * folded into one row after another.
 */
export function ChangeList(props: {
  changes: Changes;
  /** Read out for the list. */
  label: string;
  /** Turns on the row's checkbox: "Restore Lyrics Plus". */
  includeLabel(name: string): string;
  onInclude(key: string, on: boolean): void;
  disabled: boolean;
}) {
  const { changes } = props;
  const [showUnchanged, setShowUnchanged] = useState(false);

  return (
    <List label={props.label}>
      {changes.changes.map((change) => (
        <ChangeItem
          key={change.key}
          change={change}
          includeLabel={props.includeLabel(change.name)}
          onInclude={(on) => props.onInclude(change.key, on)}
          disabled={props.disabled}
        />
      ))}
      {changes.manual.map((item) => (
        <ListRow
          key={`${item.type}:${item.name}`}
          leading={<Pip kind={MANUAL_KINDS[item.type]} />}
          name={item.name}
          meta={<Meta parts={[MANUAL_LABELS[item.type], item.scheme]} />}
          end={<span className="syncify-change-label syncify-cap">Add manually</span>}
        />
      ))}
      {changes.settings.length > 0 ? <ListDivider /> : null}
      {changes.settings.map((row) => (
        <ListRow
          key={`settings:${row.id}`}
          leading={<Pip kind={row.kind} />}
          name={row.name}
          end={
            <span className="syncify-change-label syncify-cap" data-change="Updates">
              Updates
            </span>
          }
        />
      ))}
      {changes.settings.length > 0 && changes.unchanged.length > 0 ? <ListDivider /> : null}
      {changes.unchanged.length > 0 ? (
        <ListRow
          name={<span className="syncify-change-fold">{changes.unchanged.length} more stay the same</span>}
          end={
            <Button variant="subtle" aria-expanded={showUnchanged} onClick={() => setShowUnchanged(!showUnchanged)}>
              {showUnchanged ? "Hide" : "Show"}
            </Button>
          }
        />
      ) : null}
      {showUnchanged ? changes.unchanged.map((item) => <UnchangedItem key={item.key} item={item} />) : null}
    </List>
  );
}

/** Adds, Updates or Removes, with a checkbox when it's left off unless turned on. */
function ChangeItem(props: {
  change: ChangeRow;
  includeLabel: string;
  onInclude(on: boolean): void;
  disabled: boolean;
}) {
  const { change } = props;
  return (
    <ListRow
      leading={<Pip kind={KINDS[change.type]} />}
      name={change.name}
      meta={change.note ? <Meta parts={[change.note]} /> : undefined}
      end={
        <>
          <span className="syncify-change-label syncify-cap" data-change={change.fixed ? undefined : change.change}>
            {change.fixed ? "Stays off" : change.change}
          </span>
          {change.optional && !change.fixed ? (
            <Checkbox
              checked={change.included}
              onChange={props.onInclude}
              label={props.includeLabel}
              disabled={props.disabled}
            />
          ) : null}
        </>
      }
    />
  );
}

function UnchangedItem(props: { item: ItemRow }) {
  return (
    <ListRow
      leading={<Pip kind={KINDS[props.item.type]} />}
      name={props.item.name}
      meta={props.item.note ? <Meta parts={[props.item.note]} /> : undefined}
    />
  );
}
