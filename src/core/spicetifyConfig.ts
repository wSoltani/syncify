import { stableStringify } from "./crypto";
import type { SyncifySpicetifyConfig } from "../types/syncify";

// Only plain names are kept, the same rule the backup service applies to
// every backup.
const NAME_PATTERN = /^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/;
const MAX_ITEMS = 100;
const INSTALLED_EXTENSIONS_KEY = "marketplace:installed-extensions";
const INSTALLED_THEMES_KEY = "marketplace:installed-themes";
const ACTIVE_THEME_KEY = "marketplace:theme-installed";
const ENTRY_PREFIX = "marketplace:installed:";
// What Spicetify's config says when Marketplace manages the theme.
const MARKETPLACE_THEME = "marketplace";

/**
 * What Spicetify's own config lists, without what Marketplace adds to it
 * while it loads. Null when this Spicetify has no config to read.
 */
export function readSpicetifyConfig(
  marketplaceKeys: Record<string, string>,
): SyncifySpicetifyConfig | null {
  if (!Spicetify.Config) return null;
  return cleanSpicetifyConfig(Spicetify.Config, marketplaceKeys);
}

/**
 * A config without what Marketplace adds to Spicetify.Config at runtime,
 * judged by the Marketplace data saved with it: each extension it loads and
 * each script of its theme go into `extensions`, and an active Marketplace
 * theme replaces `current_theme` and `color_scheme`. Otherwise the same
 * setup reads differently depending on whether Marketplace had loaded yet.
 */
export function cleanSpicetifyConfig(
  value: unknown,
  marketplaceKeys: Record<string, string>,
): SyncifySpicetifyConfig {
  const config = normalizeSpicetifyConfig(value);
  const fromMarketplace = new Set(marketplaceScriptFiles(marketplaceKeys));
  const themeFromMarketplace =
    marketplaceKeys[ACTIVE_THEME_KEY]?.includes(ENTRY_PREFIX) === true;

  return {
    current_theme: themeFromMarketplace
      ? MARKETPLACE_THEME
      : config.current_theme,
    color_scheme: themeFromMarketplace ? "" : config.color_scheme,
    extensions: config.extensions.filter((name) => !fromMarketplace.has(name)),
    custom_apps: config.custom_apps,
  };
}

/**
 * Plain names only, each list sorted and without duplicates, so the same
 * setup always gives the same config. Anything else counts as empty.
 */
export function normalizeSpicetifyConfig(
  value: unknown,
): SyncifySpicetifyConfig {
  const config = (value && typeof value === "object" ? value : {}) as Record<
    string,
    unknown
  >;

  return {
    current_theme: isName(config.current_theme) ? config.current_theme : "",
    color_scheme: isName(config.color_scheme) ? config.color_scheme : "",
    extensions: normalizeList(config.extensions),
    custom_apps: normalizeList(config.custom_apps),
  };
}

export function isSameSpicetifyConfig(
  a: SyncifySpicetifyConfig,
  b: SyncifySpicetifyConfig,
): boolean {
  return (
    stableStringify(normalizeSpicetifyConfig(a)) ===
    stableStringify(normalizeSpicetifyConfig(b))
  );
}

function normalizeList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter(isName))].sort().slice(0, MAX_ITEMS);
}

function isName(value: unknown): value is string {
  return typeof value === "string" && NAME_PATTERN.test(value);
}

// Marketplace adds each extension it loads to Spicetify.Config.extensions,
// under the file name of its manifest's `main`, and each script a theme
// includes, under the last part of its address.
function marketplaceScriptFiles(keys: Record<string, string>): string[] {
  const extensions = parseList(keys[INSTALLED_EXTENSIONS_KEY]).map((key) => {
    const manifest = parseObject(keys[key])?.manifest;
    return manifest && typeof manifest === "object"
      ? (manifest as { main?: unknown }).main
      : undefined;
  });
  const themeScripts = parseList(keys[INSTALLED_THEMES_KEY]).flatMap((key) => {
    const include = parseObject(keys[key])?.include;
    return Array.isArray(include) ? include : [];
  });

  return [...extensions, ...themeScripts].flatMap((path) => {
    const file = typeof path === "string" ? path.split("/").pop() : undefined;
    return file ? [file] : [];
  });
}

function parseList(raw: string | undefined): string[] {
  try {
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list.filter((key) => typeof key === "string") : [];
  } catch {
    return [];
  }
}

function parseObject(raw: string | undefined): Record<string, unknown> | null {
  try {
    const value = raw ? JSON.parse(raw) : null;
    return value && typeof value === "object" && !Array.isArray(value)
      ? value
      : null;
  } catch {
    return null;
  }
}
