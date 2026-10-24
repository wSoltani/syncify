// 2 adds spicetify_config. Older backups are version 1.
import type { InstalledItem } from "../core/restorePreview";

export const SYNCIFY_SCHEMA_VERSION = 2;

export type SyncifyStatus =
  | "idle"
  | "loading"
  | "success"
  | "error"
  | "needs-restore";

export interface SyncifyMetadata {
  last_sync_datetime: string;
  device_info: string;
  marketplace_key_count: number;
}

export interface SyncifyMarketplaceData {
  keys: Record<string, string>;
}

export interface SyncifyPayload {
  schema_version: number;
  metadata: SyncifyMetadata;
  payload_hash: string;
  marketplace_data: SyncifyMarketplaceData;
  /** What Spicetify's config lists outside Marketplace. From version 2. */
  spicetify_config?: SyncifySpicetifyConfig;
  backup_history?: SyncifyPayload[];
  /** Added by the backup service to each backup it sends. */
  backup?: SyncifyBackupInfo;
}

/** Spicetify's config, without the extensions Marketplace adds to it. */
export interface SyncifySpicetifyConfig {
  /** Empty when none is set. */
  current_theme: string;
  color_scheme: string;
  extensions: string[];
  custom_apps: string[];
}

export interface SyncifyBackupInfo {
  id: string;
  /** "anchor" is the safety copy. */
  kind: "rolling" | "anchor" | "pinned";
}

export interface SyncifyRemoteState {
  exists: boolean;
  payload: SyncifyPayload | null;
  /** The latest backups, newest first. */
  backups: SyncifyPayload[];
  /** An older backup kept aside and updated about once a week. */
  safetyCopy: SyncifyPayload | null;
}

export interface SyncifyConfig {
  workerUrl: string | null;
  autoBackupEnabled: boolean;
  /** `null` means the shortcut is turned off. */
  shortcut: SyncifyShortcut | null;
  entryPoint: SyncifyEntryPoint;
}

/** Where Syncify's "open" button appears: top bar, profile menu, or both. */
export type SyncifyEntryPoint = "both" | "topbar" | "menu";

export interface SyncifyShortcut {
  key: string;
  ctrl: boolean;
  alt: boolean;
  shift: boolean;
  meta: boolean;
}

export interface SyncifyProjectConfig {
  extensionName: string;
  version: string;
  workerUrl: string;
  githubUrl: string;
  kofiUrl: string;
  issueUrl: string;
  /** Where the release pointers (latest.json) are served. */
  releasesUrl: string;
}

export interface SyncifySnapshotSummary {
  keyCount: number;
  hash: string;
  installedItemCount: number;
  /** Keys of the installed extensions, themes and snippets. */
  installedItems: string[];
  /** The same items, with their names and repos. */
  items: InstalledItem[];
  /** Null when this Spicetify has no config to read. */
  spicetifyConfig: SyncifySpicetifyConfig | null;
  marketplaceAvailable: boolean;
}
