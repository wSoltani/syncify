import type { ItemType } from "./restorePreview";
import type { RegistryItem } from "./settingsRegistry";

const ENTRY_PREFIX = "marketplace:installed:";

/** The kinds of item that keep extension settings. */
export type SettingsKind = Exclude<ItemType, "snippet"> | "app";

/** A registry item as the person knows it. */
export interface NamedItem {
  id: string;
  /** Its Marketplace entry's key, which a restore can leave off. */
  key: string;
  name: string;
  kind: SettingsKind;
}

/** A registry item, by the name its entry gives it and the kind its id says. */
export function nameItem(item: Pick<RegistryItem, "id" | "name">): NamedItem {
  return { id: item.id, key: `${ENTRY_PREFIX}${item.id}`, name: item.name, kind: kindFromPath(item.id) };
}

/** Every registry item, named, by id. */
export function nameItems(items: Pick<RegistryItem, "id" | "name">[]): Map<string, NamedItem> {
  return new Map(items.map((item) => [item.id, nameItem(item)]));
}

// An extension is a script and a theme a stylesheet; anything else is a
// custom app, which the registry names by its folder.
function kindFromPath(id: string): SettingsKind {
  if (/\.(m?js)$/i.test(id)) return "extension";
  if (/\.css$/i.test(id)) return "theme";
  return "app";
}
