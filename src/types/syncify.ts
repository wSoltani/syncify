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
      /** Held: it won't become final on its own yet. */
      held: boolean;
      /**
       * Held only by installs that used this Spotify account without the
       * claimer signed in: it goes through once the claimer signs in there.
       */
      waiting?: true;
    }
  | { status: "final"; mine: boolean };

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
