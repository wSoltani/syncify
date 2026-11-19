import type { NamedItem } from "../../core/settingsNames";

/** A restore preview row for an item's extension settings. */
export type DescribedSettings = NamedItem;

/**
 * A row for each item whose extension settings a restore writes, named like
 * the item ("Shuffle+ settings"). Sorted by name.
 */
export function describeSettings(items: NamedItem[]): DescribedSettings[] {
  return items
    .map((item) => ({ ...item, name: `${item.name} settings` }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
