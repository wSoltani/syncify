import type { InstalledItem } from "../../core/restorePreview";
import { nameItem, type NamedItem } from "../../core/settingsNames";

/** A restore preview row for an item's extension settings. */
export type DescribedSettings = NamedItem;

/**
 * A row for each item whose extension settings a restore writes, named like
 * the item ("Shuffle+ settings"), from the backup's items or this device's.
 * Sorted by name.
 */
export function describeSettings(
  ids: string[],
  backupItems: InstalledItem[],
  localItems: InstalledItem[],
): DescribedSettings[] {
  const items = [...backupItems, ...localItems];
  return ids
    .map((id) => {
      const named = nameItem(id, items);
      return { ...named, name: `${named.name} settings` };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}
