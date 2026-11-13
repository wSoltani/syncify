import type { SyncifyPayload } from "../../types/syncify";
import { formatBackupDate, formatItemCount } from "../format";
import { backupItems } from "./backupItems";

/** A rolling backup, the weekly safety copy, or one from an install not approved yet. */
export type BackupKind = "backup" | "safety-copy" | "unapproved";

export interface BackupRowModel {
  backup: SyncifyPayload;
  kind: BackupKind;
  /** The row's name: a name given on the website, or the backup's date. */
  name: string;
  meta: string[];
  /** What's on this device now: shown as Current, and can't be restored. */
  current: boolean;
  /** Names the backup in the preview's heading and for screen readers. */
  title: string;
}

/** What one backup row says. */
export function describeBackupRow(
  backup: SyncifyPayload,
  kind: BackupKind,
  localHash: string | null,
): BackupRowModel {
  const date = formatBackupDate(backup.metadata.last_sync_datetime);
  const items = formatItemCount(backupItems(backup).length);
  const from = `from ${backup.metadata.device_info}`;
  // Named on the website; Syncify shows names but doesn't set them.
  const given = backup.backup?.name ?? null;
  const current = backup.payload_hash === localHash;

  if (kind === "safety-copy") {
    return {
      backup,
      kind,
      name: "Safety copy",
      meta: [given, date, items, "updated weekly"].filter(isText),
      current,
      title: `the safety copy from ${date}`,
    };
  }
  if (kind === "unapproved") {
    return { backup, kind, name: "Not approved", meta: [date, items, from], current, title: date };
  }
  return {
    backup,
    kind,
    // A date as a name starts with a capital: "Today, 06:56 PM".
    name: given ?? date.charAt(0).toUpperCase() + date.slice(1),
    meta: given ? [date, items, from] : [items, from],
    current,
    title: given ?? date,
  };
}

function isText(value: string | null): value is string {
  return value !== null;
}
