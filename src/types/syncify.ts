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
   * "anchor" is the safety copy. "quarantined" came from an install this
   * Spotify account hasn't approved.
   */
  kind: "rolling" | "anchor" | "pinned" | "quarantined";
  /**
   * Given on the website, the only place backups are named. Shown here, never
   * set here. Null or missing when it has none (older Workers send none).
   */
  name?: string | null;
}

export interface SyncifyRemoteState {
  exists: boolean;
  payload: SyncifyPayload | null;
  /** The latest backups, newest first. */
  backups: SyncifyPayload[];
  /** An older backup kept aside and updated about once a week. */
  safetyCopy: SyncifyPayload | null;
  /** A pending claim on this Spotify account, sent with its backups. */
  claim: SyncifyClaim | null;
  /** Backups from installs this Spotify account hasn't approved, newest first. */
  unapproved: SyncifyPayload[];
  /** Whether this Spotify account trusts this install, and who's waiting. */
  install: SyncifyInstallState | null;
  /**
   * The backup service asks for the Secure nudge: this Spotify account has
   * backups, no account and no pending claim, and the nudge is open to it today.
   */
  nudge: boolean;
}

/**
 * How far this Spotify account trusts this install. Backups from an install
 * it doesn't trust yet are kept apart until it's approved from a trusted
 * install or signed in.
 */
export interface SyncifyInstallState {
  trusted: boolean;
  refused: boolean;
  /** New installs waiting for this one to approve them. Only sent to a trusted install. */
  waiting: SyncifyWaitingInstall[];
}

export interface SyncifyWaitingInstall {
  id: string;
  device: string | null;
  /** When it first backed up, in milliseconds. */
  first_seen_at: number;
}

/**
 * A claim on a Spotify account's backups. `mine` is true when it was made by
 * the signed-in account.
 */
export type SyncifyClaim =
  | {
      status: "pending";
      mine: boolean;
      /** The claimer's email, masked ("a***e@example.com"). */
      email: string | null;
      /** When it becomes final, in milliseconds, unless it's held. */
      final_at: number;
      /** Held: Syncify checks it before it becomes final. */
      held: boolean;
      /** This install pressed Not me, and Syncify is checking the claim. */
      not_me?: true;
    }
  | { status: "final"; mine: boolean }
  /**
   * An admin undid someone else's final claim on this Spotify account in the
   * last 30 days, and nobody claimed it since. Never sent to the claimer.
   */
  | {
      status: "undone";
      mine: false;
      /** The claimer's email, masked ("a***e@example.com"). */
      email: string | null;
      /** When it was undone, in milliseconds. */
      undone_at: number;
    };

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
