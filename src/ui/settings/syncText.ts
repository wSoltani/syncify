import type { SettingsSyncStatus, SyncItem } from "../../core/settingsSync";
import { formatBytes } from "../kit";

export type HeldItem = SyncItem & { hold: NonNullable<SyncItem["hold"]> };

/** Items on this device with a hold, among those syncing here. */
export function heldItems(status: SettingsSyncStatus, off: string[]): HeldItem[] {
  return status.items.filter((item): item is HeldItem => item.hold !== null && !off.includes(item.id));
}

/** Why a held item isn't syncing, and what brings it back. */
export function holdText(item: HeldItem, accountLimit: number): string {
  const { hold } = item;
  if (hold.reason === "account_full") {
    return `${item.name} is held because your extension settings are over ${formatBytes(accountLimit)}. Your other devices keep the last copy that fit. To sync it again, turn off an item or delete a synced copy in Items.`;
  }
  const sizes = `${formatBytes(hold.size)} of its ${formatBytes(item.limit)}`;
  return item.list
    ? `${item.name}'s list is too big to sync, ${sizes}. Your other devices keep the last list that fit. It syncs again once the list is smaller.`
    : `${item.name}'s extension settings are too big to sync, ${sizes}. Your other devices keep the last copy that fit. They sync again once they're smaller.`;
}

/** The row's status: "9 KB", or "131 KB, too big to sync". */
export function sizeText(item: SyncItem): string {
  return item.hold ? `${formatBytes(item.hold.size)}, too big to sync` : formatBytes(item.size);
}

/**
 * The space the account uses, and what a held item would add: the meter fills
 * past the limit while the account holds an item for being over it.
 */
export function spaceUsed(status: SettingsSyncStatus, off: string[]): { used: number; over: boolean } {
  const over = heldItems(status, off).filter((item) => item.hold.reason === "account_full");
  return {
    used: status.bytes + over.reduce((sum, item) => sum + Math.max(item.hold.size - item.accountSize, 0), 0),
    over: over.length > 0,
  };
}

/** The Items row's counts: syncing, too big and off. A count of 0 is left out. */
export function itemCounts(status: SettingsSyncStatus, off: string[]): { syncing: number; held: number; off: number } {
  const here = status.items;
  const offHere = here.filter((item) => off.includes(item.id)).length;
  const held = heldItems(status, off).length;
  return { syncing: here.length - offHere - held, held, off: offHere };
}
