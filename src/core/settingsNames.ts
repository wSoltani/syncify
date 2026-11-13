import { collectMarketplaceKeys } from "./marketplace";
import { listItems, type InstalledItem, type ItemType } from "./restorePreview";

const ENTRY_PREFIX = "marketplace:installed:";

/** The kinds of item that keep extension settings. */
export type SettingsKind = Exclude<ItemType, "snippet"> | "app";

/** A registry item as the person knows it. */
export interface NamedItem {
  id: string;
  /** Its Marketplace entry's key, which a restore can leave off. */
  key: string;
  name: string;
  kind: SettingsKind | "snippet";
}

/**
 * Names a registry item like the item: by Marketplace's title when one of
 * `items` has it, by its file's name otherwise, as for Spicetify's own
 * extensions.
 */
export function nameItem(id: string, items: InstalledItem[]): NamedItem {
  const key = `${ENTRY_PREFIX}${id}`;
  const item = items.find((entry) => entry.key === key);
  return { id, key, name: item?.name ?? nameFromPath(id), kind: item ? item.type : kindFromPath(id) };
}

/** Names registry items by this device's Marketplace items. */
export async function nameLocalItems(ids: string[]): Promise<Map<string, NamedItem>> {
  const items = listItems(await collectMarketplaceKeys().catch(() => ({})));
  return new Map(ids.map((id) => [id, nameItem(id, items)]));
}

// "spicetify/cli/Extensions/trashbin.js" is "Trashbin".
function nameFromPath(id: string): string {
  const file = id.split("/").pop() ?? id;
  const stem = file.replace(/\.[^.]+$/, "") || file;
  return stem.charAt(0).toUpperCase() + stem.slice(1);
}

// An extension is a script and a theme a stylesheet; anything else is a
// custom app, which the registry names by its folder.
function kindFromPath(id: string): SettingsKind {
  if (/\.(m?js)$/i.test(id)) return "extension";
  if (/\.css$/i.test(id)) return "theme";
  return "app";
}
