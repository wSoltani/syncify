import { isSameSpicetifyConfig } from "../../core/spicetifyConfig";
import type { RestoreResult } from "../../core/restoreSummary";
import type { LockedError } from "../../api/syncifyApi";
import type {
  SyncifyClaim,
  SyncifyPayload,
  SyncifySpicetifyConfig,
  SyncifyWaitingInstall,
} from "../../types/syncify";
import { describeOtherClaim, waitingInstallTitle } from "../claimText";
import { formatBackupDate, formatItemCount } from "../format";

/** What the window is doing right now. */
export type Activity = "idle" | "checking" | "backing-up" | "restoring";

/** The one main action on the status's right, when there is one. */
export type StatusAction = "back-up" | "try-again" | "sign-in" | "how-to-update" | "reload";

export interface WindowStatus {
  title: string;
  /** Facts under the title, a drawn dot between each. */
  detail: string[];
  /** The status in one line, under an alert that took its place. */
  line: string[];
  action: StatusAction | null;
  /** Everything on this device is in a backup: drawn with a check under an alert. */
  backedUp: boolean;
  /** After a restore: a line that asks for support. */
  supportAsk: string | null;
}

export interface StatusFacts {
  activity: Activity;
  /** The backups were read at least once since Spotify started. */
  checked: boolean;
  /** Why the first check failed. */
  checkError: string | null;
  unsupported: boolean;
  locked: LockedError["code"] | null;
  latest: SyncifyPayload | null;
  latestItems: string[];
  /** What's on this device is in one of the backups. */
  backedUp: boolean;
  localHash: string | null;
  localItems: string[];
  localItemCount: number;
  localConfig: SyncifySpicetifyConfig | null;
  /** The last restore's result, while it stands in for the status. */
  restoreResult: RestoreResult | null;
}

/** The status at the top of the window, from where this device stands. */
export function describeStatus(facts: StatusFacts): WindowStatus {
  const status = describeStatusOnly(facts);
  if (status.backedUp && facts.latest) {
    return {
      ...status,
      line: [
        `Backed up ${formatBackupDate(facts.latest.metadata.last_sync_datetime)}`,
        `${formatItemCount(facts.localItemCount)} on this device`,
      ],
    };
  }
  return { ...status, line: [status.title, ...status.detail] };
}

function describeStatusOnly(facts: StatusFacts): Omit<WindowStatus, "line"> {
  const plain = { backedUp: false, supportAsk: null };
  const itemsHere = `${formatItemCount(facts.localItemCount)} on this device`;

  if (facts.restoreResult && !facts.unsupported) return describeRestoreResult(facts.restoreResult);
  if (facts.unsupported) {
    return { ...plain, title: "Update Syncify to keep backing up", detail: ["Your backups are safe"], action: "how-to-update" };
  }
  if (facts.locked) {
    return {
      ...plain,
      title: "Sign in to restore",
      detail: [facts.locked === "not_owner" ? "Secured by another account" : "This backup is secured"],
      action: "sign-in",
    };
  }
  if (facts.activity === "backing-up") {
    return { ...plain, title: "Backing up…", detail: [], action: "back-up" };
  }
  if (!facts.checked) {
    return facts.checkError
      ? { ...plain, title: "Couldn't check your backup", detail: [facts.checkError], action: "try-again" }
      : { ...plain, title: "Checking your backup…", detail: [], action: null };
  }
  if (!facts.latest) {
    return {
      ...plain,
      title: "No backup yet",
      detail: ["Save your extensions and themes to restore them after a reinstall or on another computer."],
      action: "back-up",
    };
  }
  if (facts.localHash && !facts.backedUp) {
    return {
      ...plain,
      title: "Changes since your last backup",
      detail: describeChanges(facts.latest, facts.latestItems, facts.localItems, facts.localConfig),
      action: "back-up",
    };
  }
  return {
    ...plain,
    title: "Everything is backed up",
    detail: [`Last backup ${formatBackupDate(facts.latest.metadata.last_sync_datetime)}`, itemsHere],
    action: null,
    backedUp: true,
  };
}

/** What loaded after the last restore or share code, until it's old news. */
export function describeRestoreResult(result: RestoreResult): Omit<WindowStatus, "line"> {
  const allLoaded = result.loaded === result.total;
  const share = result.kind === "share";
  return {
    title: allLoaded
      ? share ? "Setup loaded" : "Backup restored"
      : `${share ? "Loaded" : "Restored"} ${result.loaded} of ${result.total}`,
    detail: [
      !allLoaded
        ? "Missing something? Reload Spotify once more."
        : result.total === 0
          ? "Nothing from Marketplace to load"
          : `${result.loaded} of ${result.total} loaded`,
    ],
    action: allLoaded ? null : "reload",
    backedUp: false,
    supportAsk: allLoaded ? (share ? "Syncify set it up for you?" : "Syncify saved your setup?") : null,
  };
}

/**
 * "2 added", "1 removed", "Spicetify config changed", then the last backup's
 * time. A backup from before the config was saved says so instead.
 */
export function describeChanges(
  backup: SyncifyPayload,
  backupItems: string[],
  localItems: string[],
  localConfig: SyncifySpicetifyConfig | null,
): string[] {
  const inBackup = new Set(backupItems);
  const onDevice = new Set(localItems);
  const added = localItems.filter((item) => !inBackup.has(item)).length;
  const removed = backupItems.filter((item) => !onDevice.has(item)).length;
  const backupConfig = backup.spicetify_config ?? null;
  const configUnsaved = Boolean(localConfig && !backupConfig);
  const configChanged =
    !configUnsaved &&
    (localConfig && backupConfig
      ? !isSameSpicetifyConfig(localConfig, backupConfig)
      : localConfig !== backupConfig);

  return [
    added ? `${added} added` : null,
    removed ? `${removed} removed` : null,
    configChanged ? "Spicetify config changed" : null,
    configUnsaved ? "Spicetify config not saved yet" : null,
    `Last backup ${formatBackupDate(backup.metadata.last_sync_datetime)}`,
  ].filter((part): part is string => part !== null);
}

/** An alert that needs an answer, shown as the status. */
export type WindowAlert =
  | { kind: "claim"; title: string; text: string | null; canAnswer: boolean }
  | { kind: "install"; title: string; install: SyncifyWaitingInstall };

/** Someone else securing this backup comes first, then a new install. */
export function describeAlert(
  claim: SyncifyClaim | null,
  waiting: SyncifyWaitingInstall | null,
): WindowAlert | null {
  if (claim?.status === "pending" && !claim.mine) {
    return { kind: "claim", ...describeOtherClaim(claim), canAnswer: !claim.not_me };
  }
  if (waiting) {
    return {
      kind: "install",
      title: waitingInstallTitle(waiting),
      install: waiting,
    };
  }
  return null;
}
