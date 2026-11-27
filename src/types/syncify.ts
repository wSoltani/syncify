// 2 adds spicetify_config, 3 adds extension_settings. Older backups are
// version 1.
import type { InstalledItem } from "../core/restorePreview";

export const SYNCIFY_SCHEMA_VERSION = 3;

interface SyncifyMetadata {
  last_sync_datetime: string;
  device_info: string;
  marketplace_key_count: number;
}

interface SyncifyMarketplaceData {
  keys: Record<string, string>;
}

export interface SyncifyPayload {
  schema_version: number;
  metadata: SyncifyMetadata;
  payload_hash: string;
  marketplace_data: SyncifyMarketplaceData;
  /** What Spicetify's config lists outside Marketplace. From version 2. */
  spicetify_config?: SyncifySpicetifyConfig;
  /**
   * The settings of the items in the settings registry, by registry id.
   * Left out of payload_hash, so a settings change alone never makes a new
   * backup. From version 3.
   */
  extension_settings?: SyncifyExtensionSettings;
  backup_history?: SyncifyPayload[];
  /** Added by the backup service to each backup it sends. */
  backup?: SyncifyBackupInfo;
}

export type SyncifyExtensionSettings = Record<string, SyncifyItemSettings>;

/** One item's settings, where it keeps them. */
export interface SyncifyItemSettings {
  storage: "localStorage" | "indexedDB";
  /**
   * Each key's stored value: its text in localStorage, or its whole record
   * in IndexedDB. Keys the registry excludes are never here.
   */
  values: Record<string, unknown>;
}

/** Spicetify's config, without the extensions Marketplace adds to it. */
export interface SyncifySpicetifyConfig {
  /** Empty when none is set. */
  current_theme: string;
  color_scheme: string;
  extensions: string[];
  custom_apps: string[];
}

interface SyncifyBackupInfo {
  id: string;
  /**
   * "anchor" is the safety copy. "quarantined" isn't one of this Syncify's
   * backups: nobody confirmed the Syncify that made it, or it's kept apart
   * for now.
   */
  kind: "rolling" | "anchor" | "pinned" | "quarantined";
  /**
   * A pinned backup that is also the safety copy. Missing on every other
   * backup, and from Workers that can't pin the safety copy.
   */
  safety_copy?: boolean;
  /**
   * Given on the website, the only place backups are named. Shown here, never
   * set here. Null or missing when it has none (older Workers send none).
   */
  name?: string | null;
  /**
   * On a "quarantined" backup: this install made it, signed with its own key,
   * so it's shown as this Syncify's own (after Spotify was reinstalled, say).
   */
  mine?: boolean;
  /**
   * A backup another Syncify on this Spotify username made, sent as it is so
   * a Syncify that lost its data can restore what it backed up before.
   */
  other?: boolean;
}

export interface SyncifyRemoteState {
  exists: boolean;
  payload: SyncifyPayload | null;
  /**
   * This Syncify's latest backups, newest first. While it has none of its
   * own, the other backups on this Spotify username stand in for them.
   */
  backups: SyncifyPayload[];
  /**
   * An older backup kept aside and updated about once a week. It can also be
   * pinned; it's then here and not in `pinned`.
   */
  safetyCopy: SyncifyPayload | null;
  /** Backups pinned on the website, kept until unpinned there, newest first. */
  pinned: SyncifyPayload[];
  /** Who secured backups on this Spotify username, sent with its backups. */
  claim: SyncifyClaim | null;
  /**
   * `backups`, `safetyCopy` and `pinned` are other Syncifys': this one has
   * none of its own yet.
   */
  borrowed: boolean;
  /**
   * Backups other Syncifys on this Spotify username made, newest first,
   * while this one has backups of its own. Restored as they are.
   */
  others: SyncifyPayload[];
  /**
   * Backups from a Syncify nobody confirmed, newest first: a restore leaves
   * their new items off. This install's own are in `backups`.
   */
  unapproved: SyncifyPayload[];
  /** The Syncifys on this Spotify username this one is asked about. */
  install: SyncifyInstallState | null;
  /**
   * The backup service asks for the Secure nudge: this Spotify account has
   * backups and no account, and the nudge is open to it today.
   */
  nudge: boolean;
  /**
   * The account's extension settings, as the launch check or a backup
   * answers them when this device sent its own. Read by settingsSync.
   */
  settings?: unknown;
}

/**
 * Each Syncify keeps the backups it made. One that started backing up on a
 * Spotify username where this one already did is asked about here: That's
 * me, with that Syncify's code, brings their backups together, and Not me
 * leaves each with its own.
 */
export interface SyncifyInstallState {
  waiting: SyncifyWaitingInstall[];
}

export interface SyncifyWaitingInstall {
  id: string;
  device: string | null;
  /** When it first backed up, in milliseconds. */
  first_seen_at: number;
}

/**
 * Who secured backups on this Spotify username: `mine` when the signed-in
 * account is one of them, or else the emails it's secured with, at least
 * one, masked ("a***e@example.com"). Each account secures only its own
 * backups, so several can.
 */
export type SyncifyClaim = { status: "final"; mine: true } | { status: "final"; mine: false; emails: string[] };

export interface SyncifyConfig {
  workerUrl: string | null;
  autoBackupEnabled: boolean;
  /** `null` means the shortcut is turned off. */
  shortcut: SyncifyShortcut | null;
  entryPoint: SyncifyEntryPoint;
  /** This device syncs extension settings with the account's other devices. */
  settingsSyncEnabled: boolean;
  /** Registry ids of the items whose switch is off on this device. */
  settingsSyncOff: string[];
  /** The restore preview's choice to use restored extension settings on the other devices too. */
  shareRestoredSettings: boolean;
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
  /** Where sign-in is served (the website's address). */
  webUrl: string;
  githubUrl: string;
  kofiUrl: string;
  /** The Syncify Discord, through the website's /discord redirect. */
  discordUrl: string;
  issueUrl: string;
  /** Where the release pointers (latest.json) are served. */
  releasesUrl: string;
  /** Where share codes' pages and items are served (the share host). */
  shareUrl: string;
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
  /** Marketplace's active theme's key, null when none is set. */
  activeTheme: string | null;
}
