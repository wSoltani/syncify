import type { InstalledItem } from "../../core/restorePreview";
import type { Kind } from "../kit";

const ENTRY_PREFIX = "marketplace:installed:";

export interface DescribedSettings {
  id: string;
  /** The Marketplace item's key, which a restore can leave off. */
  key: string;
  name: string;
  kind: Kind;
}

/**
 * A row for each item whose extension settings a restore writes, named like
 * the item: by Marketplace's title when the backup or this device has it,
 * by its file's name otherwise, as for Spicetify's own extensions. Sorted
 * by name.
 */
export function describeSettings(
  ids: string[],
  backupItems: InstalledItem[],
  localItems: InstalledItem[],
): DescribedSettings[] {
  const items = new Map([...localItems, ...backupItems].map((item) => [item.key, item]));
  return ids
    .map((id) => {
      const key = `${ENTRY_PREFIX}${id}`;
      const item = items.get(key);
      const name = item?.name ?? nameFromPath(id);
      return { id, key, name: `${name} settings`, kind: item ? item.type : kindFromPath(id) };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

// "spicetify/cli/Extensions/trashbin.js" is "Trashbin".
function nameFromPath(id: string): string {
  const file = id.split("/").pop() ?? id;
  const stem = file.replace(/\.[^.]+$/, "") || file;
  return stem.charAt(0).toUpperCase() + stem.slice(1);
}

// An extension is a script and a theme a stylesheet; anything else is a
// custom app, which the registry names by its folder.
function kindFromPath(id: string): Kind {
  if (/\.(m?js)$/i.test(id)) return "extension";
  if (/\.css$/i.test(id)) return "theme";
  return "app";
}
