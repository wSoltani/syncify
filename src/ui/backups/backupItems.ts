import { listItems, type InstalledItem } from "../../core/restorePreview";
import type { SyncifyPayload } from "../../types/syncify";

// Parsing a backup's item lists is the costly part of showing it, so each
// backup is read once, however often the window renders.
const itemsByBackup = new WeakMap<SyncifyPayload, InstalledItem[]>();

/** Every Marketplace item in a backup. */
export function backupItems(backup: SyncifyPayload): InstalledItem[] {
  let items = itemsByBackup.get(backup);
  if (!items) {
    items = listItems(backup.marketplace_data.keys);
    itemsByBackup.set(backup, items);
  }
  return items;
}
