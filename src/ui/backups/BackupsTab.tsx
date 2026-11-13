import { useEffect, useRef, useState, type ReactNode } from "react";
import type { LockedError } from "../../api/syncifyApi";
import { fetchRemoteState } from "../../core/syncService";
import type {
  SyncifyConfig,
  SyncifyPayload,
  SyncifyRemoteState,
  SyncifySnapshotSummary,
} from "../../types/syncify";
import {
  List,
  ListDivider,
  ListRow,
  Mark,
  Menu,
  Meta,
  Notice,
  SettingRow,
  ShieldIcon,
  SkeletonRow,
  TabPanel,
  useStableId,
} from "../kit";
import { describeBackupRow, type BackupKind, type BackupRowModel } from "./backupRows";
import { RestorePreview, type RestoreRequest } from "./RestorePreview";

/** Another Spotify account linked to the signed-in account. */
interface OtherAccount {
  hash: string;
  label: string;
}

/**
 * Every backup, newest first, then the safety copy and backups waiting for
 * approval. A row opens its restore preview in place of the list.
 */
export function BackupsTab(props: {
  idBase: string;
  config: SyncifyConfig;
  /** null until the backups were read once. */
  remote: SyncifyRemoteState | null;
  /**
   * The backups or this device's setup couldn't be read: the status or the
   * message above says why and offers Try again.
   */
  failed: boolean;
  lockedBy: LockedError["code"] | null;
  /** null until read once: the rows wait for it to know which backup is current. */
  local: SyncifySnapshotSummary | null;
  otherAccounts: OtherAccount[];
  /** Notices about this device's backups, shown above the list. */
  notices?: ReactNode;
  /** The backup is secured and this device syncs extension settings. */
  canShareSettings: boolean;
  shareSettings: boolean;
  onShareSettingsChange(share: boolean): void;
  busy: boolean;
  restoring: boolean;
  onRestore(request: RestoreRequest & { linkedHash: string | null }): void;
  onError(error: unknown): void;
}) {
  const { remote, local } = props;
  const rowIdBase = useStableId("backup");
  // The linked Spotify account whose backups are shown; null for this one.
  const [linked, setLinked] = useState<{ hash: string; remote: SyncifyRemoteState | null } | null>(
    null,
  );
  const [previewing, setPreviewing] = useState<BackupRowModel | null>(null);
  const reopenedFrom = useRef<string | null>(null);

  // Back from a preview: focus goes to the row that opened it.
  useEffect(() => {
    if (previewing || !reopenedFrom.current) return;
    document.getElementById(reopenedFrom.current)?.focus();
    reopenedFrom.current = null;
  }, [previewing]);

  if (previewing && local) {
    return (
      <RestorePreview
        key={previewing.backup.payload_hash}
        idBase={props.idBase}
        row={previewing}
        local={local}
        localIsUnsaved={
          local.installedItemCount > 0 && !isInBackups(local.hash, remote)
        }
        canShareSettings={props.canShareSettings}
        shareSettings={props.shareSettings}
        onShareSettingsChange={props.onShareSettingsChange}
        busy={props.busy}
        restoring={props.restoring}
        onCancel={() => setPreviewing(null)}
        onRestore={(request) => props.onRestore({ ...request, linkedHash: linked?.hash ?? null })}
      />
    );
  }

  async function showBackupsOf(hash: string | null) {
    if (!hash) {
      setLinked(null);
      return;
    }
    setLinked({ hash, remote: null });
    try {
      const linkedRemote = await fetchRemoteState(props.config, hash);
      setLinked({ hash, remote: linkedRemote });
    } catch (error) {
      setLinked(null);
      props.onError(error);
    }
  }

  // Backups waiting for approval are only this Spotify account's.
  const shown = linked ? linked.remote : remote;
  const localHash = local?.hash ?? null;
  const rowId = (row: BackupRowModel) => `${rowIdBase}-${row.backup.payload_hash}`;
  const rowsOf = (backups: SyncifyPayload[], kind: BackupKind) =>
    backups.map((backup) => describeBackupRow(backup, kind, localHash));
  const backups = rowsOf(shown?.backups ?? [], "backup");
  const safetyCopy = rowsOf(shown?.safetyCopy ? [shown.safetyCopy] : [], "safety-copy");
  const unapproved = linked ? [] : rowsOf(remote?.unapproved ?? [], "unapproved");

  function renderRow(row: BackupRowModel) {
    return (
      <ListRow
        key={`${row.kind}-${row.backup.payload_hash}-${row.backup.metadata.last_sync_datetime}`}
        id={rowId(row)}
        name={row.name}
        nameMark={
          row.kind === "safety-copy" ? (
            <ShieldIcon className="syncify-safety-mark" />
          ) : row.kind === "unapproved" ? (
            <Mark tone="warning" />
          ) : undefined
        }
        meta={<Meta parts={row.meta} />}
        end={row.current ? <span className="syncify-row-status syncify-cap">Current</span> : undefined}
        onOpen={
          row.current
            ? undefined
            : () => {
                reopenedFrom.current = rowId(row);
                setPreviewing(row);
              }
        }
        openLabel={`Preview restore of ${row.title}`}
        disabled={props.busy}
      />
    );
  }

  return (
    <TabPanel idBase={props.idBase} id="backups">
      {props.notices}
      {local && !local.marketplaceAvailable ? (
        <Notice tone="warning">Install Spicetify Marketplace to restore a backup.</Notice>
      ) : null}
      {!props.lockedBy && props.otherAccounts.length > 0 ? (
        <SettingRow label="Show backups from">
          <Menu
            label="Show backups from"
            trigger={{
              value:
                props.otherAccounts.find((account) => account.hash === linked?.hash)?.label ??
                "This Spotify account",
            }}
            items={[{ hash: null, label: "This Spotify account" }, ...props.otherAccounts].map(
              (account) => ({
                label: account.label,
                checked: (linked?.hash ?? null) === account.hash,
                onSelect: () => void showBackupsOf(account.hash),
              }),
            )}
            disabled={props.busy}
          />
        </SettingRow>
      ) : null}
      {props.lockedBy ? (
        <p className="syncify-tab-text">
          {props.lockedBy === "not_owner"
            ? "Sign in with the account that secured them"
            : "Sign in to see and restore your backups"}
        </p>
      ) : (!remote || !local) && props.failed ? null : !remote || !local || (linked && !linked.remote) ? (
        <List label="Loading backups">
          <SkeletonRow />
          <SkeletonRow />
        </List>
      ) : backups.length + safetyCopy.length + unapproved.length === 0 ? (
        linked ? <p className="syncify-tab-text">No backups yet.</p> : null
      ) : (
        <List label="Backups">
          {backups.map(renderRow)}
          {safetyCopy.length > 0 ? <ListDivider /> : null}
          {safetyCopy.map(renderRow)}
          {unapproved.length > 0 ? <ListDivider /> : null}
          {unapproved.map(renderRow)}
        </List>
      )}
    </TabPanel>
  );
}

/** Some backup, the safety copy included, holds what's on this device. */
function isInBackups(hash: string, remote: SyncifyRemoteState | null): boolean {
  if (!remote) return false;
  return [...remote.backups, ...(remote.safetyCopy ? [remote.safetyCopy] : [])].some(
    (backup) => backup.payload_hash === hash,
  );
}
