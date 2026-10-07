export const SYNCIFY_SCHEMA_VERSION = 1 as const;

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
  schema_version: typeof SYNCIFY_SCHEMA_VERSION;
  metadata: SyncifyMetadata;
  payload_hash: string;
  marketplace_data: SyncifyMarketplaceData;
  backup_history?: SyncifyPayload[];
}

export interface SyncifyRemoteState {
  exists: boolean;
  payload: SyncifyPayload | null;
  backups: SyncifyPayload[];
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
}

export interface SyncifySnapshotSummary {
  keyCount: number;
  hash: string;
  installedItemCount: number;
  marketplaceAvailable: boolean;
}
