import { stableStringify } from "./crypto";
import type { SyncifySpicetifyConfig } from "../types/syncify";

// Only plain names are kept, the same rule the backup service applies to
// every backup.
const NAME_PATTERN = /^\w(?:[\w .()+@/-]{0,126}[\w.()+@/])?$/;
const MAX_ITEMS = 100;
const INSTALLED_EXTENSIONS_KEY = "marketplace:installed-extensions";

/**
 * What Spicetify's own config lists, minus the extensions Marketplace adds
 * to it while it loads them. Null when this Spicetify has no config to read.
 */
export function readSpicetifyConfig(
  marketplaceKeys: Record<string, string>,
): SyncifySpicetifyConfig | null {
  const config = Spicetify.Config as
    | Partial<Record<keyof SyncifySpicetifyConfig, unknown>>
    | undefined;
  if (!config) return null;

  const fromMarketplace = new Set(marketplaceExtensionFiles(marketplaceKeys));
  const extensions = Array.isArray(config.extensions)
    ? config.extensions.filter((name) => !fromMarketplace.has(name))
    : [];

  return normalizeSpicetifyConfig({ ...config, extensions });
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
// under the file name of its manifest's `main`.
function marketplaceExtensionFiles(keys: Record<string, string>): string[] {
  return parseList(keys[INSTALLED_EXTENSIONS_KEY]).flatMap((key) => {
    const manifest = parseObject(keys[key])?.manifest;
    const path =
      manifest && typeof manifest === "object"
        ? (manifest as { main?: unknown }).main
        : undefined;
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
