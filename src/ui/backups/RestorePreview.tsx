import { useEffect, useState } from "react";
import type { ItemType, ManualItem } from "../../core/restorePreview";
import type { SyncifySnapshotSummary } from "../../types/syncify";
import {
  Button,
  Checkbox,
  List,
  ListRow,
  Meta,
  Notice,
  Pip,
  SectionHeader,
  TabPanel,
  useStableId,
  type Kind,
} from "../kit";
import type { BackupRowModel } from "./backupRows";
import { restoreLabel, type ChangeRow, type ItemRow } from "./restoreChanges";
import { useRestorePreview } from "./useRestorePreview";

export interface RestoreRequest {
  row: BackupRowModel;
  /** Optional items left off. */
  skipped: string[];
  /** Added in a terminal after the reload. */
  manual: ManualItem[];
}

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
 * What restoring a backup changes, in place of the list: changes first, the
 * rest folded, warnings written out, and the actions kept in view.
 */
export function RestorePreview(props: {
  idBase: string;
  row: BackupRowModel;
  local: SyncifySnapshotSummary;
  /** Restoring overwrites what's here, and no backup holds it. */
  localIsUnsaved: boolean;
  /** Something is running, so nothing else can start. */
  busy: boolean;
  restoring: boolean;
  onCancel(): void;
  onRestore(request: RestoreRequest): void;
}) {
  const { row, local } = props;
  const headingId = useStableId("restore-heading");
  const restore = useRestorePreview(row.backup, local.items, local.spicetifyConfig);
  const { changes } = restore;
  const [showUnchanged, setShowUnchanged] = useState(false);
  const marketplaceMissing = !local.marketplaceAvailable;

  // Opened from a row that's gone now: focus moves to what took its place.
  useEffect(() => {
    document.getElementById(headingId)?.focus();
  }, [headingId]);

  const actions = (
    <>
      <Button variant="secondary" onClick={props.onCancel} disabled={props.restoring}>
        Cancel
      </Button>
      <Button
        onClick={() => props.onRestore({ row, skipped: restore.skipped, manual: restore.preview.manual })}
        disabled={props.busy || restore.checking || marketplaceMissing}
      >
        {props.restoring ? "Restoring…" : restore.checking ? "Checking…" : restoreLabel(changes.count)}
      </Button>
    </>
  );

  return (
    <TabPanel idBase={props.idBase} id="backups" actions={actions}>
      <SectionHeader title={`Restore ${row.title}`} id={headingId} focusable />
      {marketplaceMissing ? (
        <Notice tone="warning">Install Spicetify Marketplace to restore a backup.</Notice>
      ) : null}
      {restore.unapproved ? (
        <Notice tone="warning">
          An install this Spotify account hasn't approved made this backup. Its items stay off unless you
          turn them on.
        </Notice>
      ) : null}
      <List label="What this restore changes">
        {changes.changes.map((change) => (
          <ChangeItem
            key={change.key}
            change={change}
            onInclude={(on) => restore.allow(change.key, on)}
            disabled={props.busy}
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
        {changes.unchanged.length > 0 ? (
          <ListRow
            name={<span className="syncify-restore-fold">{changes.unchanged.length} more stay the same</span>}
            end={
              <Button
                variant="text"
                aria-expanded={showUnchanged}
                onClick={() => setShowUnchanged(!showUnchanged)}
              >
                {showUnchanged ? "Hide" : "Show"}
              </Button>
            }
          />
        ) : null}
        {showUnchanged
          ? changes.unchanged.map((item) => <UnchangedItem key={item.key} item={item} />)
          : null}
      </List>
      {changes.warnings.map((warning) => (
        <Notice tone="warning" key={warning}>
          {warning}
        </Notice>
      ))}
      {props.localIsUnsaved ? <Notice tone="warning">Your current setup isn't backed up.</Notice> : null}
    </TabPanel>
  );
}

/** Adds, Updates or Removes, with a checkbox when it's left off unless turned on. */
function ChangeItem(props: { change: ChangeRow; onInclude(on: boolean): void; disabled: boolean }) {
  const { change } = props;
  return (
    <ListRow
      leading={<Pip kind={KINDS[change.type]} />}
      name={change.name}
      meta={change.note ? <Meta parts={[change.note]} /> : undefined}
      end={
        <>
          <span className="syncify-change-label syncify-cap" data-change={change.change}>
            {change.change}
          </span>
          {change.optional ? (
            <Checkbox
              checked={change.included}
              onChange={props.onInclude}
              label={`Restore ${change.name}`}
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
