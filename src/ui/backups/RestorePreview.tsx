import { useEffect } from "react";
import type { ManualItem } from "../../core/restorePreview";
import type { SettingsRestore } from "../../core/syncService";
import type { SyncifySnapshotSummary } from "../../types/syncify";
import { ChangeList } from "../changes/ChangeList";
import { changesLabel } from "../changes/listChanges";
import { Button, CheckboxRow, Notice, SectionHeader, TabPanel, useStableId } from "../kit";
import type { BackupRowModel } from "./backupRows";
import { useRestorePreview } from "./useRestorePreview";

export interface RestoreRequest {
  row: BackupRowModel;
  /** Optional items left off. */
  skipped: string[];
  /** Added in a terminal after the reload. */
  manual: ManualItem[];
  /** The extension settings it writes. */
  settings: SettingsRestore;
}

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
  /**
   * The backup is secured and this device syncs extension settings, so the
   * restored ones can go to the other devices too.
   */
  canShareSettings: boolean;
  /** The remembered choice to share them. */
  shareSettings: boolean;
  onShareSettingsChange(share: boolean): void;
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
  const marketplaceMissing = !local.marketplaceAvailable;
  const showShare = props.canShareSettings && restore.settingsIds.length > 0;

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
        onClick={() =>
          props.onRestore({
            row,
            skipped: restore.skipped,
            manual: restore.preview.manual,
            settings: { ids: restore.settingsIds, share: showShare && props.shareSettings },
          })
        }
        disabled={props.busy || restore.checking || marketplaceMissing}
      >
        {props.restoring ? "Restoring…" : restore.checking ? "Checking…" : changesLabel("Restore", changes.count)}
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
      <ChangeList
        changes={changes}
        label="What this restore changes"
        includeLabel={(name) => `Restore ${name}`}
        onInclude={restore.allow}
        disabled={props.busy}
      />
      {changes.warnings.map((warning) => (
        <Notice tone="warning" key={warning}>
          {warning}
        </Notice>
      ))}
      {props.localIsUnsaved ? <Notice tone="warning">Your current setup isn't backed up.</Notice> : null}
      {showShare ? (
        <CheckboxRow
          label="Use these extension settings on my other devices too"
          checked={props.shareSettings}
          onChange={props.onShareSettingsChange}
          disabled={props.busy}
        />
      ) : null}
    </TabPanel>
  );
}
