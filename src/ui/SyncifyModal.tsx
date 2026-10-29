import { loadConfig, saveConfig } from "../core/config";
import { getProjectConfig } from "../core/projectConfig";
import { summarizeMarketplaceState } from "../core/marketplace";
import {
  listItems,
  previewRestore,
  type ManualItem,
  type InstalledItem,
  type ItemChange,
  type ItemType,
} from "../core/restorePreview";
import {
  dismissManualItems,
  getRestoreResult,
  manualCommands,
  onRestoreResult,
  reloadAndCheck,
  savePendingRestore,
} from "../core/restoreSummary";
import {
  checkCatalog,
  checkSources,
  isWarning,
  type SourceCheck,
  type SourceChecks,
} from "../core/sourceChecks";
import { isSameSpicetifyConfig } from "../core/spicetifyConfig";
import {
  InstallRefusedError,
  LockedError,
  UnsupportedVersionError,
} from "../api/syncifyApi";
import { describeWaitingInstall } from "./InstallNotice";
import { ClaimError, type ClaimStatus } from "../api/claimsApi";
import {
  AccountError,
  createManageLink,
  describeAccountError,
  refreshSession,
  sendCode,
  signIn,
  signOut,
} from "../api/accountApi";
import {
  getSignInDraft,
  loadSession,
  saveSignInDraft,
  type AccountSession,
  type SignInDraft,
} from "../core/account";
import {
  compareVersions,
  fetchLatestVersion,
  getLoaderInfo,
  isReleaseVersion,
} from "../core/releases";
import {
  answerWaitingInstall,
  backupNow,
  cancelPendingClaim,
  fetchClaims,
  fetchRemoteState,
  restoreNow,
  secureBackup,
} from "../core/syncService";
import {
  applyShortcut,
  DEFAULT_SHORTCUT,
  formatShortcut,
  isShortcutTaken,
  shortcutFromEvent,
} from "../core/shortcut";
import {
  applyEntryPoint,
  isMenuEntryPointAvailable,
} from "../core/entryPoints";
import type {
  SyncifyClaim,
  SyncifyConfig,
  SyncifyInstallState,
  SyncifyEntryPoint,
  SyncifyPayload,
  SyncifyRemoteState,
  SyncifyShortcut,
  SyncifySpicetifyConfig,
  SyncifyStatus,
} from "../types/syncify";
import type {
  ReactNode,
  useEffect as useEffectType,
  useMemo as useMemoType,
  useRef as useRefType,
  useState as useStateType,
} from "react";

interface MessageState {
  kind: "info" | "success" | "error" | "warning";
  text: string;
}

/** section: the part to open with, as That's me, sign in opens Account. */
export function SyncifyModal(props: { section?: AccordionSectionId } = {}) {
  const React = Spicetify.React;
  const useEffect = React.useEffect as typeof useEffectType;
  const useMemo = React.useMemo as typeof useMemoType;
  const useState = React.useState as typeof useStateType;
  const useRef = React.useRef as typeof useRefType;

  const [config, setConfig] = useState<SyncifyConfig>(() => loadConfig());
  const [status, setStatus] = useState<SyncifyStatus>("idle");
  const [message, setMessage] = useState<MessageState | null>(null);
  const [installedItemCount, setInstalledItemCount] = useState(0);
  const [localItems, setLocalItems] = useState<string[]>([]);
  const [localItemDetails, setLocalItemDetails] = useState<InstalledItem[]>(
    [],
  );
  const [localConfig, setLocalConfig] =
    useState<SyncifySpicetifyConfig | null>(null);
  const [marketplaceAvailable, setMarketplaceAvailable] = useState<
    boolean | null
  >(null);
  const [localHash, setLocalHash] = useState<string | null>(null);
  const [remotePayload, setRemotePayload] = useState<SyncifyPayload | null>(
    null,
  );
  const [remoteBackups, setRemoteBackups] = useState<SyncifyPayload[]>([]);
  const [safetyCopy, setSafetyCopy] = useState<SyncifyPayload | null>(null);
  // Backups from installs this Spotify account hasn't approved.
  const [unapproved, setUnapproved] = useState<SyncifyPayload[]>([]);
  const [installState, setInstallState] =
    useState<SyncifyInstallState | null>(null);
  const [answering, setAnswering] = useState(false);
  // Items off by default in a restore that were turned on.
  const [allowed, setAllowed] = useState<Set<string>>(() => new Set());
  const [selectedRestorePayload, setSelectedRestorePayload] =
    useState<SyncifyPayload | null>(null);
  const [remoteChecked, setRemoteChecked] = useState(false);
  const [isConfirmingRestore, setIsConfirmingRestore] = useState(false);
  const [showChanges, setShowChanges] = useState(false);
  const [catalogChecks, setCatalogChecks] = useState<SourceChecks | null>(
    null,
  );
  const [isRecordingShortcut, setIsRecordingShortcut] = useState(false);
  const [shortcutError, setShortcutError] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<AccordionSectionId | null>(
    props.section ?? null,
  );
  const [showAllBackups, setShowAllBackups] = useState(false);
  // What loaded after the last restore, until Spotify restarts.
  const [restoreResult, setRestoreResult] = useState(() => getRestoreResult());
  const [copied, setCopied] = useState(false);
  // The backup service refused this version (HTTP 426).
  const [isUnsupported, setIsUnsupported] = useState(false);
  const [newerVersion, setNewerVersion] = useState<string | null>(null);
  // undefined until the stored session has been read.
  const [session, setSession] = useState<AccountSession | null | undefined>(
    undefined,
  );
  // A secured backup this device can't read: signed out, or another account.
  const [locked, setLocked] = useState<LockedError["code"] | null>(null);
  // A pending claim on this Spotify account, from its backups.
  const [remoteClaim, setRemoteClaim] = useState<SyncifyClaim | null>(null);
  // Signed in: the claim on this Spotify account and the account's claims.
  const [claims, setClaims] = useState<
    (ClaimStatus & { hash: string }) | null
  >(null);
  const [securing, setSecuring] = useState(false);
  const [secureError, setSecureError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);
  // The linked Spotify account whose backups are shown; null for this one.
  const [linkedHash, setLinkedHash] = useState<string | null>(null);
  const [linkedRemote, setLinkedRemote] = useState<SyncifyRemoteState | null>(
    null,
  );
  const panelRef = useRef<HTMLDivElement>(null);

  const projectConfig = useMemo(() => getProjectConfig(), []);
  const allBackups = useMemo(
    () => (safetyCopy ? [...remoteBackups, safetyCopy] : remoteBackups),
    [remoteBackups, safetyCopy],
  );
  // Unapproved backups are only this Spotify account's, never a linked one's.
  const shownUnapproved = linkedHash ? [] : unapproved;
  // The list shows this Spotify account's backups, or a linked one's.
  const shownBackups = linkedHash ? (linkedRemote?.backups ?? []) : remoteBackups;
  const shownSafetyCopy = linkedHash
    ? (linkedRemote?.safetyCopy ?? null)
    : safetyCopy;
  // Parsing a backup's item lists is the costly part of a row, so list each
  // backup's items once when the backups load instead of on every render.
  const backupItems = useMemo(
    () =>
      new Map(
        [
          ...allBackups,
          ...unapproved,
          ...(linkedRemote?.backups ?? []),
          ...(linkedRemote?.safetyCopy ? [linkedRemote.safetyCopy] : []),
        ].map((backup) => [backup, listItems(backup.marketplace_data.keys)]),
      ),
    [allBackups, unapproved, linkedRemote],
  );
  const getBackupItemDetails = (backup: SyncifyPayload) =>
    backupItems.get(backup) ?? listItems(backup.marketplace_data.keys);
  const getBackupItems = (backup: SyncifyPayload) =>
    getBackupItemDetails(backup).map((item) => item.key);
  const countBackupItems = (backup: SyncifyPayload) =>
    getBackupItemDetails(backup).length;
  const restorePreview = useMemo(
    () =>
      isConfirmingRestore && selectedRestorePayload
        ? previewRestore(
            getBackupItemDetails(selectedRestorePayload),
            selectedRestorePayload.spicetify_config,
            localItemDetails,
            localConfig,
          )
        : null,
    [
      isConfirmingRestore,
      selectedRestorePayload,
      backupItems,
      localItemDetails,
      localConfig,
    ],
  );
  // Where each item comes from, checked as soon as the preview opens; the
  // catalog lookups follow. The local checks win when both have something.
  const localChecks = useMemo(
    () => (restorePreview ? checkSources(restorePreview.items) : null),
    [restorePreview],
  );
  const sourceChecks = useMemo<SourceChecks>(
    () => new Map([...(catalogChecks ?? []), ...(localChecks ?? [])]),
    [catalogChecks, localChecks],
  );
  const selectedIsUnapproved =
    selectedRestorePayload?.backup?.kind === "quarantined";
  // Items a restore leaves off unless turned on: from a backup no approved
  // install made, or with a warning or a check that couldn't be done. Only
  // items whose code would come from the backup; the rest stay as they are.
  const offByDefault = useMemo(
    () =>
      new Set(
        (restorePreview?.items ?? [])
          .filter(
            (item) =>
              item.change !== "removed" &&
              item.isNew &&
              (selectedIsUnapproved ||
                isWarning(sourceChecks.get(item.key)) ||
                sourceChecks.get(item.key)?.kind === "unchecked"),
          )
          .map((item) => item.key),
      ),
    [restorePreview, sourceChecks, selectedIsUnapproved],
  );
  const skippedItems = [...offByDefault].filter((key) => !allowed.has(key));
  // Restore waits for the catalog checks, so nothing unchecked slips through.
  const checkingSources = restorePreview !== null && catalogChecks === null;
  const menuAvailable = useMemo(() => isMenuEntryPointAvailable(), []);
  // Only the loader fetches the latest release on reload. Older manual
  // copies and dev builds have to be replaced instead.
  const loadedByLoader = useMemo(() => getLoaderInfo() !== null, []);
  const isBusy = status === "loading";
  const alertMessage =
    message?.kind === "warning" || message?.kind === "error" ? message : null;
  const localDiffersFromBackup = Boolean(
    remotePayload && localHash && remotePayload.payload_hash !== localHash,
  );
  const isBackedUp = Boolean(
    remotePayload && localHash && remotePayload.payload_hash === localHash,
  );
  const selectedIsOnDevice = Boolean(
    selectedRestorePayload &&
      localHash &&
      selectedRestorePayload.payload_hash === localHash,
  );
  // With everything backed up, only the latest backup is shown until asked.
  // Otherwise the list stays open, so someone who came to restore sees it.
  // A linked account's backups are always shown in full.
  const backupsExpanded =
    linkedHash !== null ||
    showAllBackups ||
    !isBackedUp ||
    allBackups.length < 2;
  const visibleBackups = backupsExpanded
    ? shownBackups
    : shownBackups.slice(0, 1);
  // Someone else's claim on this Spotify account: the real owner can cancel it.
  const otherClaim =
    remoteClaim?.status === "pending" && !remoteClaim.mine ? remoteClaim : null;
  const secureState = describeSecureState(claims, locked, otherClaim !== null);
  // A new install waiting for this one to approve it, one at a time.
  const waitingInstall = installState?.waiting[0] ?? null;
  // This install's own backups are kept apart until it's approved or signs
  // in. A signed-in owner's install is trusted with its next backup.
  const installNotice =
    !installState || installState.trusted || locked || secureState.kind === "secured"
      ? null
      : installState.refused
        ? "This Spotify account refused backups from this install. Sign in to back up from it."
        : "This install isn't approved yet. Its backups are kept apart until you approve it from another install or sign in.";
  // The signed-in account's other Spotify accounts, numbered in the order
  // they were linked. Backups only ever go to this one.
  const linkedAccounts = session
    ? (claims?.accounts ?? []).filter((account) => account.status === "final")
    : [];
  const otherAccounts = linkedAccounts
    .map((account, index) => ({
      hash: account.hash,
      label: `Spotify account ${index + 1}${account.device_info ? ` · from ${account.device_info}` : ""}`,
    }))
    .filter((account) => account.hash !== claims?.hash);
  // Restoring overwrites this device, so warn when what's here now can't be
  // brought back from any backup.
  const localIsUnsaved = Boolean(
    localHash &&
      installedItemCount > 0 &&
      !allBackups.some((backup) => backup.payload_hash === localHash),
  );

  useEffect(() => {
    // Shown at once; the backup check below reads it again with the claims.
    void loadSession()
      .catch(() => null)
      .then((stored) => setSession((known) => known ?? stored));
    void refreshStatus({ silent: true });
    void checkForUpdate();
    return onRestoreResult(setRestoreResult);
  }, []);

  // Any warning opens the list, so the item can't be missed.
  useEffect(() => {
    setCatalogChecks(null);
    if (!restorePreview || !localChecks) return;
    if ([...localChecks.values()].some(isWarning)) setShowChanges(true);

    let current = true;
    void checkCatalog(restorePreview.items, localChecks).then((checks) => {
      if (!current) return;
      setCatalogChecks(checks);
      if ([...checks.values()].some(isWarning)) setShowChanges(true);
    });
    return () => {
      current = false;
    };
  }, [restorePreview, localChecks]);

  // Capture phase on window runs before Mousetrap (bubble phase on document),
  // so recording never triggers the current shortcut or Spotify's own ones.
  useEffect(() => {
    if (!isRecordingShortcut) return;

    const onKeyDown = (event: KeyboardEvent) => {
      // The window was closed while recording: stop, and let the key through.
      if (!panelRef.current?.isConnected) {
        setIsRecordingShortcut(false);
        setShortcutError(null);
        return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();

      const result = shortcutFromEvent(event);
      if (result.kind === "ignore") return;
      if (result.kind === "cancel") {
        setIsRecordingShortcut(false);
        setShortcutError(null);
        return;
      }
      if (result.kind === "error") {
        setShortcutError(result.message);
        return;
      }

      if (isShortcutTaken(result.shortcut)) {
        setShortcutError(
          `${formatShortcut(result.shortcut)} is already used by Spotify or another extension. Try a different combo.`,
        );
        return;
      }

      setIsRecordingShortcut(false);
      updateShortcut(result.shortcut);
    };

    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [isRecordingShortcut, config]);

  async function refreshLocalSummary() {
    const summary = await summarizeMarketplaceState();
    setLocalHash(summary.hash);
    setInstalledItemCount(summary.installedItemCount);
    setLocalItems(summary.installedItems);
    setLocalItemDetails(summary.items);
    setLocalConfig(summary.spicetifyConfig);
    setMarketplaceAvailable(summary.marketplaceAvailable);
    return summary;
  }

  async function refreshStatus(options?: { silent?: boolean }) {
    try {
      setIsConfirmingRestore(false);
      setStatus("loading");
      if (!options?.silent) {
        setMessage({ kind: "info", text: "Checking your Syncify backup…" });
      }

      await refreshLocalSummary();
      let remote: SyncifyRemoteState;
      let lockedBy: LockedError["code"] | null = null;
      try {
        remote = await fetchRemoteState(config);
      } catch (error) {
        if (!(error instanceof LockedError)) throw error;
        remote = NO_REMOTE_STATE;
        lockedBy = error.code;
      }
      // Signed in, the claim and linked accounts come from the claim status.
      // A refused session is forgotten along the way, so read it after.
      const signedIn = await loadSession().catch(() => null);
      const claimStatus = signedIn
        ? await fetchClaims(config).catch(() => null)
        : null;
      const current = signedIn ? await loadSession().catch(() => null) : null;

      setSession(current);
      setClaims(current ? claimStatus : null);
      setLocked(lockedBy);
      // A locked backup needs a sign-in: the Account section opens by itself.
      if (lockedBy) setOpenSection("account");
      setRemoteClaim(remote.claim);
      setLinkedHash(null);
      setLinkedRemote(null);
      setRemotePayload(remote.payload);
      setRemoteBackups(remote.backups);
      setSafetyCopy(remote.safetyCopy);
      setUnapproved(remote.unapproved);
      setInstallState(remote.install);
      setSelectedRestorePayload(remote.payload);
      setRemoteChecked(true);
      setStatus(remote.exists ? "success" : "idle");

      if (!options?.silent && !lockedBy) {
        setMessage(
          remote.exists && remote.payload
            ? {
                kind: "success",
                text: `Backup found from ${formatBackupDate(remote.payload.metadata.last_sync_datetime)}.`,
              }
            : {
                kind: "info",
                text: "No backup exists yet. Create one from this device when you're ready.",
              },
        );
      }
    } catch (error) {
      handleError(error);
    }
  }

  /** Claims this Spotify account for the signed-in account. */
  async function runSecure() {
    setSecuring(true);
    setSecureError(null);
    try {
      await secureBackup(config);
    } catch (error) {
      // Another claim or another owner show as the claim's state.
      const shownAsState =
        error instanceof ClaimError &&
        ["claim_pending", "claimed"].includes(error.code);
      if (!shownAsState) {
        setSecureError(error instanceof Error ? error.message : String(error));
      }
    } finally {
      await refreshStatus({ silent: true });
      setSecuring(false);
    }
  }

  // Signing in from "Secure your backup" claims it at once. Signing in to a
  // locked backup only unlocks it.
  function handleSignedIn(signedIn: AccountSession) {
    setSession(signedIn);
    if (!locked && remotePayload) {
      void runSecure();
    } else {
      void refreshStatus({ silent: true });
    }
  }

  function handleSignedOut() {
    setSession(null);
    setClaims(null);
    setSecureError(null);
    void refreshStatus({ silent: true });
  }

  /** "Not me": anyone on this Spotify account can send a claim to review. */
  async function cancelOtherClaim() {
    setCancelling(true);
    try {
      await cancelPendingClaim(config);
      Spicetify.showNotification("Syncify: claim sent for review");
      await refreshStatus({ silent: true });
    } catch (error) {
      setMessage({
        kind: "error",
        text: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setCancelling(false);
    }
  }

  /** Shows a linked Spotify account's backups, or this one's with null. */
  async function showBackupsOf(hash: string | null) {
    setIsConfirmingRestore(false);
    setLinkedHash(hash);
    setLinkedRemote(null);
    if (!hash) {
      setSelectedRestorePayload(remotePayload);
      return;
    }

    setSelectedRestorePayload(null);
    try {
      const remote = await fetchRemoteState(config, hash);
      setLinkedRemote(remote);
      setSelectedRestorePayload(remote.payload);
    } catch (error) {
      setLinkedHash(null);
      setSelectedRestorePayload(remotePayload);
      handleError(error);
    }
  }

  async function checkForUpdate() {
    const running = projectConfig.version;
    if (!isReleaseVersion(running)) return;

    const latest = await fetchLatestVersion(projectConfig.releasesUrl);
    if (latest && compareVersions(latest, running) > 0) setNewerVersion(latest);
  }

  function updateAutoBackup(enabled: boolean) {
    const nextConfig = { ...config, autoBackupEnabled: enabled };
    setConfig(nextConfig);
    saveConfig(nextConfig);
    setMessage({
      kind: "success",
      text: enabled
        ? "Automatic backups are on. Syncify will still protect larger cloud backups from being overwritten."
        : "Automatic backups are off. You can still back up manually.",
    });
  }

  function updateShortcut(shortcut: SyncifyShortcut | null) {
    const nextConfig = { ...config, shortcut };
    setConfig(nextConfig);
    saveConfig(nextConfig);
    applyShortcut(shortcut);
    setShortcutError(null);
    setMessage({
      kind: "success",
      text: shortcut
        ? `${formatShortcut(shortcut)} now opens Syncify.`
        : "Keyboard shortcut turned off.",
    });
  }

  function updateEntryPoint(entryPoint: SyncifyEntryPoint) {
    const nextConfig = { ...config, entryPoint };
    setConfig(nextConfig);
    saveConfig(nextConfig);
    applyEntryPoint(entryPoint);
  }

  function toggleSection(section: AccordionSectionId | null) {
    setOpenSection(section);
    // Recording keeps swallowing keys, so don't leave it running hidden.
    if (section !== "settings") setIsRecordingShortcut(false);
  }

  function startRecordingShortcut() {
    setShortcutError(null);
    setIsRecordingShortcut(true);
  }

  async function runBackup() {
    try {
      setIsConfirmingRestore(false);
      setStatus("loading");
      setMessage({
        kind: "info",
        text: "Backing up your extensions and themes…",
      });
      const { payload, unchanged, unapproved: keptApart } = await backupNow(config);
      await refreshLocalSummary();

      // Kept apart from the approved backups: show it with them on refresh.
      if (keptApart) {
        await refreshStatus({ silent: true });
        setMessage({
          kind: "warning",
          text: "Backed up, but kept apart until this install is approved.",
        });
        Spicetify.showNotification("Syncify: backed up, waiting for approval");
        return;
      }

      // Nothing was stored, so keep showing the existing backup and its
      // original time instead of a new entry that won't be there on reopen.
      if (unchanged) {
        setRemoteChecked(true);
        setStatus("success");
        setMessage({ kind: "success", text: "Everything is already backed up." });
        Spicetify.showNotification("Syncify: everything is already backed up");
        return;
      }

      setRemotePayload(payload);
      setRemoteBackups((backups) =>
        [
          payload,
          ...backups.filter(
            (backup) => backup.payload_hash !== payload.payload_hash,
          ),
        ].slice(0, MAX_BACKUPS),
      );
      // Same data as the safety copy: show it once, as the new backup. The
      // Worker may also move the safety copy; the next refresh shows that.
      setSafetyCopy((copy) =>
        copy?.payload_hash === payload.payload_hash ? null : copy,
      );
      setSelectedRestorePayload(payload);
      setRemoteChecked(true);
      setStatus("success");
      setMessage({
        kind: "success",
        text: `Backed up ${payload.metadata.marketplace_key_count} entries.`,
      });
      Spicetify.showNotification("Syncify backup complete");
    } catch (error) {
      handleError(error);
    }
  }

  async function answerInstall(action: "approve" | "reject") {
    if (!waitingInstall) return;
    setAnswering(true);
    try {
      await answerWaitingInstall(config, waitingInstall.id, action);
      Spicetify.showNotification(
        action === "approve" ? "Syncify: install approved" : "Syncify: install refused",
      );
      await refreshStatus({ silent: true });
    } catch (error) {
      handleError(error);
    } finally {
      setAnswering(false);
    }
  }

  function requestRestoreConfirmation(payload = selectedRestorePayload) {
    if (marketplaceAvailable === false) {
      const text =
        "Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";
      setMessage({ kind: "error", text });
      Spicetify.showNotification(text, true, 6000);
      return;
    }

    if (!payload) {
      const text =
        "No Syncify cloud backup was found for this Spotify account.";
      setMessage({ kind: "error", text });
      Spicetify.showNotification(text, true, 6000);
      return;
    }

    setSelectedRestorePayload(payload);
    setShowChanges(false);
    setAllowed(new Set());
    setIsConfirmingRestore(true);
  }

  async function runRestore() {
    // What to add manually is shown after the reload, with the commands.
    const manual = selectedRestorePayload
      ? previewRestore(
          getBackupItemDetails(selectedRestorePayload),
          selectedRestorePayload.spicetify_config,
          localItemDetails,
          localConfig,
        ).manual
      : [];

    try {
      setIsConfirmingRestore(false);
      setStatus("loading");
      setMessage({
        kind: "info",
        text: "Restoring your extensions and themes…",
      });
      const { payload, restoredCount } = await restoreNow(
        config,
        selectedRestorePayload ?? undefined,
        linkedHash ?? undefined,
        skippedItems,
      );
      setSelectedRestorePayload(payload);
      setStatus("success");
      setMessage({
        kind: "success",
        text: `Restored ${restoredCount} entries. Reloading Spotify…`,
      });
      Spicetify.showNotification("Syncify restore complete. Reloading…");
      savePendingRestore(manual);
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      handleError(error);
    }
  }

  async function copyCommands(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const clipboard = Spicetify.Platform?.ClipboardAPI as
        | { copy?: (text: string) => unknown }
        | undefined;
      if (!clipboard?.copy) return;
      await clipboard.copy(text);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function openExternal(url: string) {
    if (url.startsWith("mailto:")) {
      window.location.href = url;
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  }

  function handleError(error: unknown) {
    setStatus("error");

    // Shown as its own alert, which stays until Syncify is updated.
    if (error instanceof UnsupportedVersionError) {
      setIsUnsupported(true);
      setMessage(null);
      return;
    }

    // Refused by a trusted install: shown with this install's state.
    if (error instanceof InstallRefusedError) {
      setMessage({ kind: "error", text: error.message });
      void refreshStatus({ silent: true });
      return;
    }

    // Secured since the window opened, or the session ended: show the lock.
    if (error instanceof LockedError && error.code !== "not_linked") {
      setMessage(null);
      void refreshStatus({ silent: true });
      return;
    }

    const text = error instanceof Error ? error.message : String(error);
    setMessage({ kind: "error", text });
    Spicetify.showNotification(text, true, 6000);
  }

  function renderBackup(
    backup: SyncifyPayload,
    options?: { isSafetyCopy?: boolean; isUnapproved?: boolean },
  ) {
    const isSelected =
      selectedRestorePayload?.payload_hash === backup.payload_hash;
    const isOnDevice = backup.payload_hash === localHash;
    const date = formatBackupDate(backup.metadata.last_sync_datetime);
    const items = formatItemCount(countBackupItems(backup));

    return (
      <button
        className="syncify-backup"
        role="radio"
        aria-checked={isSelected}
        data-selected={isSelected ? "true" : "false"}
        type="button"
        key={`${backup.payload_hash}-${backup.metadata.last_sync_datetime}`}
        title={
          options?.isSafetyCopy
            ? "Kept aside and updated about once a week, so a burst of new backups can't replace it"
            : options?.isUnapproved
              ? "From an install this Spotify account hasn't approved"
              : undefined
        }
        onClick={() => {
          setSelectedRestorePayload(backup);
          setIsConfirmingRestore(false);
        }}
        disabled={isBusy}
      >
        <span className="syncify-radio" aria-hidden="true" />
        {options?.isSafetyCopy ? (
          <span className="syncify-backup-text">
            <span>
              Safety copy{" "}
              <span className="syncify-backup-note">· updated weekly</span>
            </span>
            <span className="syncify-muted">
              {date} · {items}
            </span>
          </span>
        ) : options?.isUnapproved ? (
          <span className="syncify-backup-text">
            <span>
              Not approved{" "}
              <span className="syncify-backup-note">· {date}</span>
            </span>
            <span className="syncify-muted">
              {items} · from {backup.metadata.device_info}
            </span>
          </span>
        ) : (
          <span className="syncify-backup-text">
            <span className="syncify-backup-date">{date}</span>
            <span className="syncify-muted">
              {items} · from {backup.metadata.device_info}
            </span>
          </span>
        )}
        {isOnDevice ? (
          <span className="syncify-tag" title="What's on this device now">
            Current
          </span>
        ) : null}
        {/* At the far end, across from the radio. */}
        {options?.isSafetyCopy ? <ShieldIcon /> : null}
        {options?.isUnapproved ? <WarningIcon /> : null}
      </button>
    );
  }

  function keepModalOpen(event: { stopPropagation(): void }) {
    event.stopPropagation();
  }

  const statusTitle = isUnsupported
    ? "Update Syncify to keep backing up"
    : locked
      ? "Sign in to restore"
      : !remoteChecked
        ? status === "error"
          ? "Couldn't check your backup"
          : "Checking your backup…"
        : !remotePayload
          ? "No backup yet"
          : localDiffersFromBackup
            ? "Changes since your last backup"
            : "Everything is backed up";

  const statusDetail = isUnsupported
    ? "Your backups are safe"
    : locked
      ? locked === "not_owner"
        ? "Secured by another account"
        : "This backup is secured"
      : !remoteChecked
        ? null
        : !remotePayload
          ? "Save your extensions and themes so you can restore them after a reinstall or on another computer."
          : localDiffersFromBackup
            ? describeChanges(
                remotePayload,
                getBackupItems(remotePayload),
                localItems,
                localConfig,
              )
            : `Last backup ${formatBackupDate(remotePayload.metadata.last_sync_datetime)}`;

  // The result of a restore stands in for the status for a while after it.
  const showResult = Boolean(
    restoreResult &&
      !isUnsupported &&
      Date.now() - restoreResult.at < RESULT_SHOWN_MS,
  );
  const allLoaded = Boolean(
    restoreResult && restoreResult.loaded === restoreResult.total,
  );
  const commands = manualCommands(restoreResult?.manual ?? []);

  return (
    <div
      className="syncify-panel"
      ref={panelRef}
      onClick={keepModalOpen}
      onMouseDown={keepModalOpen}
      onPointerDown={keepModalOpen}
    >
      {isUnsupported ? (
        <div className="syncify-alert" data-kind="error" role="alert">
          <span>This version of Syncify is no longer supported.</span>
          <button
            className="syncify-text-button"
            type="button"
            onClick={() => openExternal(`${projectConfig.githubUrl}#updating`)}
          >
            How to update
          </button>
        </div>
      ) : null}

      {otherClaim ? (
        <div className="syncify-alert" role="alert">
          <span>
            {otherClaim.email ?? "Someone"} is claiming this backup.
            {session === null
              ? " If that's you, sign in to finish."
              : otherClaim.held
                ? " Syncify is reviewing it."
                : null}
          </span>
          <span className="syncify-alert-actions">
            <button
              className="syncify-text-button"
              type="button"
              onClick={() => void cancelOtherClaim()}
              disabled={cancelling}
            >
              Not me
            </button>
            {session === null ? (
              <button
                className="syncify-text-button"
                type="button"
                onClick={() => toggleSection("account")}
              >
                That's me, sign in
              </button>
            ) : null}
          </span>
        </div>
      ) : null}

      {waitingInstall ? (
        <div className="syncify-alert" role="alert">
          <span>{describeWaitingInstall(waitingInstall)}</span>
          <span className="syncify-alert-actions">
            <button
              className="syncify-text-button"
              type="button"
              onClick={() => void answerInstall("reject")}
              disabled={answering}
            >
              Not mine
            </button>
            <button
              className="syncify-text-button"
              type="button"
              onClick={() => void answerInstall("approve")}
              disabled={answering}
            >
              Approve
            </button>
          </span>
        </div>
      ) : null}

      {installNotice ? (
        <div className="syncify-alert" role="status">
          <span>{installNotice}</span>
        </div>
      ) : null}

      {commands.length > 0 ? (
        <div className="syncify-alert syncify-manual" role="status">
          <span className="syncify-manual-header">
            <span>
              {restoreResult!.manual.length === 1
                ? "1 isn't from Marketplace. Add it in a terminal:"
                : `${restoreResult!.manual.length} aren't from Marketplace. Add them in a terminal:`}
            </span>
            <button
              className="syncify-icon-button"
              type="button"
              aria-label="Dismiss"
              title="Dismiss"
              onClick={dismissManualItems}
            >
              <CloseIcon />
            </button>
          </span>
          <span className="syncify-code">
            <code>{commands.join("\n")}</code>
            <button
              className="syncify-text-button"
              type="button"
              onClick={() => void copyCommands(commands.join("\n"))}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </span>
        </div>
      ) : null}

      {alertMessage ? (
        <div className="syncify-alert" data-kind={alertMessage.kind}>
          <span>{alertMessage.text}</span>
          <span className="syncify-alert-actions">
            {alertMessage.kind === "error" ? (
              <button
                className="syncify-text-button"
                type="button"
                onClick={() => void refreshStatus()}
                disabled={isBusy}
              >
                Try again
              </button>
            ) : null}
            <button
              className="syncify-icon-button"
              type="button"
              aria-label="Dismiss"
              title="Dismiss"
              onClick={() => setMessage(null)}
            >
              <CloseIcon />
            </button>
          </span>
        </div>
      ) : null}

      <section className="syncify-status" aria-live="polite">
        {showResult && restoreResult ? (
          <div className="syncify-status-text">
            <h3 className="syncify-status-title">
              {allLoaded
                ? "Backup restored"
                : `Restored ${restoreResult.loaded} of ${restoreResult.total}`}
            </h3>
            <p className="syncify-muted">
              {!allLoaded
                ? "Missing something? Reload Spotify once more."
                : restoreResult.total === 0
                  ? "Nothing from Marketplace to load"
                  : `${restoreResult.loaded} of ${restoreResult.total} loaded`}
            </p>
            {allLoaded ? (
              <p className="syncify-muted">
                Syncify saved your setup?{" "}
                <button
                  className="syncify-text-button syncify-inline-button"
                  type="button"
                  onClick={() => openExternal(projectConfig.kofiUrl)}
                >
                  Support it on Ko-fi
                </button>
              </p>
            ) : null}
          </div>
        ) : (
          <div className="syncify-status-text">
            <h3 className="syncify-status-title">{statusTitle}</h3>
            <p className="syncify-muted">
              {statusDetail ? `${statusDetail} · ` : ""}
              {formatItemCount(installedItemCount)} on this device
            </p>
          </div>
        )}
        {showResult && !allLoaded ? (
          <button
            className="syncify-button secondary"
            type="button"
            onClick={reloadAndCheck}
          >
            Reload
          </button>
        ) : (
          <button
            className="syncify-button"
            type="button"
            onClick={runBackup}
            disabled={isBusy || isBackedUp || isUnsupported || locked !== null}
            title={
              locked
                ? "Sign in to back up"
                : isBackedUp
                  ? "No changes since your last backup"
                  : undefined
            }
          >
            {isBusy ? "Working…" : isBackedUp ? "Backed up" : "Back up now"}
          </button>
        )}
      </section>

      {!remoteChecked ||
      locked ||
      remoteBackups.length > 0 ||
      unapproved.length > 0 ||
      otherAccounts.length > 0 ? (
        <section className="syncify-section" aria-label="Backups">
          <div className="syncify-section-header">
            <h4 className="syncify-section-title">Backups</h4>
            <span className="syncify-section-controls">
              {!linkedHash && isBackedUp && allBackups.length > 1 ? (
                <button
                  className="syncify-text-button syncify-disclosure"
                  type="button"
                  aria-expanded={showAllBackups}
                  aria-controls="syncify-backup-list"
                  onClick={() => {
                    setShowAllBackups(!showAllBackups);
                    setIsConfirmingRestore(false);
                  }}
                >
                  {showAllBackups
                    ? "Show less"
                    : `Show all ${allBackups.length}`}
                  <ChevronIcon />
                </button>
              ) : null}
              {!locked && otherAccounts.length > 0 ? (
                <span className="syncify-select-field">
                  <select
                    className="syncify-select"
                    aria-label="Show backups from"
                    value={linkedHash ?? ""}
                    onChange={(event) =>
                      void showBackupsOf(event.currentTarget.value || null)
                    }
                    disabled={isBusy}
                  >
                    <option value="">This Spotify account</option>
                    {otherAccounts.map((account) => (
                      <option key={account.hash} value={account.hash}>
                        {account.label}
                      </option>
                    ))}
                  </select>
                  <ChevronIcon />
                </span>
              ) : null}
            </span>
          </div>

          {!remoteChecked ? (
            <div className="syncify-backup-skeleton" aria-hidden="true">
              <span className="syncify-radio" />
              <span className="syncify-backup-text">
                <span className="syncify-skeleton-line" />
                <span className="syncify-skeleton-line wide" />
              </span>
            </div>
          ) : locked ? (
            <p className="syncify-locked">
              <LockIcon />
              <span>
                {locked === "not_owner"
                  ? "Sign in with the account that secured them"
                  : "Sign in to see and restore your backups"}
              </span>
            </p>
          ) : linkedHash && !linkedRemote ? (
            <p className="syncify-muted">Loading backups…</p>
          ) : shownBackups.length === 0 && shownUnapproved.length === 0 ? (
            <p className="syncify-muted">No backups yet.</p>
          ) : (
            <>
              <div
                className="syncify-backup-list"
                id="syncify-backup-list"
                role="radiogroup"
                aria-label="Choose a backup to restore"
              >
                {visibleBackups.map((backup) => renderBackup(backup))}
                {backupsExpanded && shownSafetyCopy ? (
                  <>
                    <div className="syncify-backup-divider" role="presentation" />
                    {renderBackup(shownSafetyCopy, { isSafetyCopy: true })}
                  </>
                ) : null}
                {backupsExpanded && shownUnapproved.length > 0 ? (
                  <>
                    <div className="syncify-backup-divider" role="presentation" />
                    {shownUnapproved.map((backup) =>
                      renderBackup(backup, { isUnapproved: true }),
                    )}
                  </>
                ) : null}
              </div>

              {!backupsExpanded ? null : marketplaceAvailable === false ? (
                <p className="syncify-muted">
                  Install Spicetify Marketplace to restore a backup.
                </p>
              ) : isConfirmingRestore ? (
                <div className="syncify-confirm">
                  <p className="syncify-confirm-title">
                    Restore{" "}
                    {selectedRestorePayload
                      ? formatBackupDate(
                          selectedRestorePayload.metadata.last_sync_datetime,
                        )
                      : "this backup"}
                    ?
                  </p>
                  {selectedIsUnapproved ? (
                    <div className="syncify-alert">
                      An install this Spotify account hasn't approved made this backup. Its items stay off unless you turn them on.
                    </div>
                  ) : null}
                  {restorePreview ? (
                    <RestoreChanges
                      preview={restorePreview}
                      checks={sourceChecks}
                      off={offByDefault}
                      allowed={allowed}
                      unapproved={selectedIsUnapproved}
                      onAllow={(key, on) => {
                        const next = new Set(allowed);
                        if (on) next.add(key);
                        else next.delete(key);
                        setAllowed(next);
                      }}
                      expanded={showChanges}
                      onToggle={() => setShowChanges(!showChanges)}
                    />
                  ) : null}
                  <div className="syncify-actions">
                    {localIsUnsaved ? (
                      <div className="syncify-alert syncify-actions-hint">
                        Your current setup isn't backed up.
                      </div>
                    ) : null}
                    <button
                      className="syncify-button secondary"
                      type="button"
                      onClick={() => setIsConfirmingRestore(false)}
                      disabled={isBusy}
                    >
                      Cancel
                    </button>
                    <button
                      className="syncify-button"
                      type="button"
                      onClick={runRestore}
                      disabled={isBusy || checkingSources}
                    >
                      {checkingSources ? "Checking…" : "Restore"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="syncify-actions">
                  {selectedIsOnDevice ? (
                    <span className="syncify-muted syncify-actions-hint">
                      This backup is already current.
                    </span>
                  ) : null}
                  <button
                    className="syncify-button secondary"
                    type="button"
                    onClick={() => requestRestoreConfirmation()}
                    disabled={isBusy || !selectedRestorePayload || selectedIsOnDevice}
                  >
                    Restore backup
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      ) : null}

      <div className="syncify-accordion">
        <AccordionSection
          id="account"
          title="Account"
          openSection={openSection}
          onToggle={toggleSection}
        >
          <AccountPanel
            session={session}
            locked={locked}
            secure={secureState}
            securing={securing}
            secureError={secureError}
            onSecure={() => void runSecure()}
            onSignedIn={handleSignedIn}
            onSignedOut={handleSignedOut}
            onOpenWebsite={openExternal}
          />
        </AccordionSection>
        <AccordionSection
          id="settings"
          title="Settings"
          openSection={openSection}
          onToggle={toggleSection}
        >

          <label className="syncify-setting">
            <span className="syncify-setting-text">
              <span>Back up automatically</span>
              <span className="syncify-muted">
                When Spotify starts and something has changed
              </span>
            </span>
            <input
              className="syncify-switch"
              type="checkbox"
              role="switch"
              checked={config.autoBackupEnabled && !isUnsupported}
              onChange={(event) => updateAutoBackup(event.currentTarget.checked)}
              disabled={isBusy || isUnsupported}
            />
          </label>

          <label className="syncify-setting">
            <span className="syncify-setting-text">
              <span>Open Syncify from</span>
              {!menuAvailable ? (
                <span className="syncify-muted">
                  The profile menu isn't available in this Spicetify version
                </span>
              ) : config.entryPoint === "menu" && !config.shortcut ? (
                <span className="syncify-muted">
                  Keep a shortcut in case a Spotify update breaks the menu
                </span>
              ) : null}
            </span>
            <span className="syncify-select-field">
              <select
                className="syncify-select"
                value={menuAvailable ? config.entryPoint : "topbar"}
                onChange={(event) =>
                  updateEntryPoint(
                    event.currentTarget.value as SyncifyEntryPoint,
                  )
                }
                disabled={!menuAvailable}
              >
                {ENTRY_POINT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronIcon />
            </span>
          </label>

          <div className="syncify-setting">
            <span className="syncify-setting-text">
              <span>Keyboard shortcut</span>
              {isRecordingShortcut && !shortcutError ? (
                <span className="syncify-muted">
                  Press a key combination, or Esc to cancel
                </span>
              ) : null}
            </span>
            <span className="syncify-shortcut">
              {config.shortcut && !isRecordingShortcut ? (
                <button
                  className="syncify-text-button"
                  type="button"
                  onClick={() => updateShortcut(null)}
                >
                  Turn off
                </button>
              ) : null}
              {!config.shortcut && !isRecordingShortcut ? (
                <button
                  className="syncify-text-button"
                  type="button"
                  onClick={() => updateShortcut(DEFAULT_SHORTCUT)}
                >
                  Use default
                </button>
              ) : null}
              <button
                className="syncify-key"
                type="button"
                data-recording={isRecordingShortcut ? "true" : "false"}
                onClick={() =>
                  isRecordingShortcut
                    ? setIsRecordingShortcut(false)
                    : startRecordingShortcut()
                }
                title="Click to change"
              >
                {isRecordingShortcut
                  ? "Press keys…"
                  : config.shortcut
                    ? formatShortcut(config.shortcut)
                    : "Off"}
              </button>
            </span>
          </div>
          {shortcutError ? (
            <div className="syncify-alert" role="alert">
              {shortcutError}
            </div>
          ) : null}
        </AccordionSection>
      </div>

      <footer className="syncify-footer">
        <span className="syncify-footer-version">
          <span>Syncify {projectConfig.version}</span>
          {newerVersion ? (
            <button
              className="syncify-text-button syncify-update"
              type="button"
              onClick={() =>
                loadedByLoader
                  ? window.location.reload()
                  : openExternal(`${projectConfig.githubUrl}#updating`)
              }
            >
              {newerVersion} is out · {loadedByLoader ? "Reload" : "How to update"}
            </button>
          ) : null}
        </span>
        <span className="syncify-footer-links">
          <button
            className="syncify-text-button"
            type="button"
            onClick={() => openExternal(projectConfig.issueUrl)}
          >
            Report an issue
          </button>
          <button
            className="syncify-text-button"
            type="button"
            onClick={() => openExternal(projectConfig.githubUrl)}
          >
            GitHub
          </button>
          <button
            className="syncify-text-button"
            type="button"
            onClick={() => openExternal(projectConfig.kofiUrl)}
          >
            Support on Ko-fi
          </button>
        </span>
      </footer>
    </div>
  );
}

const CHANGE_MARKS: Record<ItemChange, { mark: string; label: string }> = {
  added: { mark: "+", label: "Added" },
  removed: { mark: "−", label: "Removed" },
  unchanged: { mark: "=", label: "Unchanged" },
};
const ITEM_GROUPS: [ItemType, string][] = [
  ["extension", "Extensions"],
  ["theme", "Themes"],
  ["snippet", "Snippets"],
];
const MANUAL_LABELS: Record<ManualItem["type"], string> = {
  extension: "extension",
  custom_app: "custom app",
  theme: "theme",
};

/**
 * What a restore changes on this device: count chips, then the items grouped
 * by type behind "Show changes".
 */
function RestoreChanges(props: {
  preview: ReturnType<typeof previewRestore>;
  checks: SourceChecks;
  /** Items left off unless turned on, and those turned on. */
  off: Set<string>;
  allowed: Set<string>;
  /** The backup came from an install this Spotify account hasn't approved. */
  unapproved: boolean;
  onAllow(key: string, on: boolean): void;
  expanded: boolean;
  onToggle(): void;
}) {
  const React = Spicetify.React;
  const { items, counts, manual } = props.preview;
  const offCount = [...props.off].filter((key) => !props.allowed.has(key)).length;

  return (
    <>
      <div className="syncify-chips" aria-label="What changes on this device">
        {counts.added ? (
          <span className="syncify-chip" data-change="added">
            +{counts.added} added
          </span>
        ) : null}
        {counts.removed ? (
          <span className="syncify-chip" data-change="removed">
            −{counts.removed} removed
          </span>
        ) : null}
        {counts.unchanged ? (
          <span className="syncify-chip">{counts.unchanged} unchanged</span>
        ) : null}
        {manual.length ? (
          <span className="syncify-chip">
            {manual.length} to add manually
          </span>
        ) : null}
        {offCount ? (
          <span className="syncify-chip" data-change="off">
            {offCount} off
          </span>
        ) : null}
      </div>

      {items.length || manual.length ? (
        <button
          className="syncify-text-button syncify-disclosure"
          type="button"
          aria-expanded={props.expanded}
          aria-controls="syncify-restore-changes"
          onClick={props.onToggle}
        >
          {props.expanded ? "Hide changes" : "Show changes"}
          <ChevronIcon />
        </button>
      ) : null}

      {props.expanded ? (
        <div className="syncify-changes" id="syncify-restore-changes">
          {ITEM_GROUPS.map(([type, title]) => {
            const group = items.filter((item) => item.type === type);
            if (group.length === 0) return null;

            return (
              <section key={type} aria-label={title}>
                <h5 className="syncify-change-group">{title}</h5>
                <ul className="syncify-change-list">
                  {group.map((item) => (
                    <li className="syncify-change" key={item.key}>
                      <span
                        className="syncify-mark"
                        data-change={item.change}
                        role="img"
                        aria-label={CHANGE_MARKS[item.change].label}
                      >
                        {CHANGE_MARKS[item.change].mark}
                      </span>
                      <span className="syncify-change-name">
                        {item.name}
                        {item.repo ? (
                          <span className="syncify-change-detail">
                            {" "}
                            · {item.repo}
                          </span>
                        ) : null}
                      </span>
                      {props.checks.has(item.key) ? (
                        <SourceLabel check={props.checks.get(item.key)!} />
                      ) : props.unapproved && props.off.has(item.key) ? (
                        <span className="syncify-source" data-warning="true">
                          <WarningIcon />
                          Not approved
                        </span>
                      ) : null}
                      {props.off.has(item.key) ? (
                        <label className="syncify-item-switch">
                          <input
                            type="checkbox"
                            checked={props.allowed.has(item.key)}
                            onChange={(event) =>
                              props.onAllow(item.key, event.currentTarget.checked)
                            }
                          />
                          Restore
                        </label>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
          {manual.length ? (
            <section aria-label="Add manually">
              <h5 className="syncify-change-group">Add manually</h5>
              <ul className="syncify-change-list">
                {manual.map((item) => (
                  <li className="syncify-change" key={`${item.type}:${item.name}`}>
                    <span className="syncify-mark" aria-hidden="true" />
                    <span className="syncify-change-name">
                      {item.name}
                      <span className="syncify-change-detail">
                        {" "}
                        · {MANUAL_LABELS[item.type]}
                        {item.scheme ? `, ${item.scheme}` : ""}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

const SOURCE_TITLES: Record<SourceCheck["kind"], string> = {
  host: "Loads from outside GitHub",
  repo: "Its code is in a different repo than the one it names",
  blocked: "On Marketplace's block list",
  catalog: "Not in Marketplace's catalog",
  unchecked: "GitHub couldn't be reached to check it",
  custom: "A snippet made in Marketplace, not from its list",
};

/** A small label after an item: a muted warning, or a plain note. */
function SourceLabel(props: { check: SourceCheck }) {
  const React = Spicetify.React;
  const { check } = props;
  const warning = isWarning(check);
  const label =
    check.kind === "host"
      ? `Code from ${check.host}`
      : check.kind === "repo"
        ? `Code from ${check.repo}`
        : check.kind === "blocked"
          ? "Blocked by Marketplace"
          : check.kind === "catalog"
            ? "Not in Marketplace"
            : check.kind === "unchecked"
              ? "Not checked"
              : "Custom";

  return (
    <span
      className="syncify-source"
      data-warning={warning ? "true" : "false"}
      title={SOURCE_TITLES[check.kind]}
    >
      {warning ? <WarningIcon /> : null}
      {label}
    </span>
  );
}

/** Where securing this Spotify account's backup stands, signed in. */
type SecureState =
  // The claim status couldn't be read yet.
  | { kind: "unknown" }
  | { kind: "open" }
  | { kind: "pending"; finalAt: number; held: boolean; waiting: boolean }
  | { kind: "secured"; linkedCount: number }
  | { kind: "other-claim" }
  | { kind: "other-account" }
  | { kind: "cancelled" };

function describeSecureState(
  claims: (ClaimStatus & { hash: string }) | null,
  locked: LockedError["code"] | null,
  otherClaim: boolean,
): SecureState {
  if (locked === "not_owner") return { kind: "other-account" };
  if (!claims) return otherClaim ? { kind: "other-claim" } : { kind: "unknown" };

  const { claim } = claims;
  if (claim?.status === "final") {
    if (!claim.mine) return { kind: "other-account" };
    const linkedCount = (claims.accounts ?? []).filter(
      (account) => account.status === "final",
    ).length;
    return { kind: "secured", linkedCount: Math.max(linkedCount, 1) };
  }
  if (claim?.status === "pending") {
    return claim.mine
      ? { kind: "pending", finalAt: claim.final_at, held: claim.held, waiting: claim.waiting === true }
      : { kind: "other-claim" };
  }

  // Cancelled from this Spotify account lately, and not claimed again since.
  const own = (claims.accounts ?? []).filter(
    (account) => account.hash === claims.hash,
  );
  const latest = own[own.length - 1];
  if (latest?.status === "cancelled" && latest.cancelled_by === "owner") {
    return { kind: "cancelled" };
  }
  return { kind: "open" };
}

/**
 * The Account section: an email code to sign in, then the email, where
 * securing the backup stands, Manage and Sign out. The form's progress outlives the
 * section and the window while Spotify runs.
 */
function AccountPanel(props: {
  /** undefined until the stored session has been read. */
  session: AccountSession | null | undefined;
  locked: LockedError["code"] | null;
  secure: SecureState;
  securing: boolean;
  secureError: string | null;
  onSecure(): void;
  onSignedIn(session: AccountSession): void;
  onSignedOut(): void;
  onOpenWebsite(url: string): void;
}) {
  const React = Spicetify.React;
  const useEffect = React.useEffect as typeof useEffectType;
  const useState = React.useState as typeof useStateType;

  const { session, secure } = props;
  const [draft, setDraft] = useState<SignInDraft>(() => getSignInDraft());
  const [email, setEmail] = useState(() => getSignInDraft().email);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<MessageState | null>(null);
  const [now, setNow] = useState(() => Date.now());

  const codeSent = Boolean(
    draft.codeSentAt && now - draft.codeSentAt < CODE_VALID_MS,
  );
  const waitSeconds = Math.max(0, Math.ceil((draft.retryAt - now) / 1000));
  // Waits are per email, except after too many requests from this network.
  const emailWaitSeconds =
    draft.retryEmail === null ||
    draft.retryEmail === email.trim().toLowerCase()
      ? waitSeconds
      : 0;

  // Checks the stored session with the service, once per Spotify run.
  useEffect(() => {
    if (!session) return;
    let current = true;
    void refreshSession()
      .then((checked) => {
        if (!current || checked) return;
        setError({
          kind: "warning",
          text: describeAccountError(new AccountError("signed_out")),
        });
        props.onSignedOut();
      })
      .catch(() => {
        // Offline or refused for now: keep showing the stored session.
      });
    return () => {
      current = false;
    };
  }, [session?.token]);

  // Ticks while a countdown runs.
  useEffect(() => {
    if (draft.retryAt <= Date.now()) return;
    const timer = setInterval(() => {
      setNow(Date.now());
      if (draft.retryAt <= Date.now()) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [draft.retryAt]);

  function updateDraft(next: Partial<SignInDraft>) {
    const updated = { ...getSignInDraft(), ...next };
    saveSignInDraft(updated);
    setDraft(updated);
    setNow(Date.now());
  }

  async function requestCode(address: string) {
    const target = address.trim();
    if (!EMAIL_PATTERN.test(target)) {
      setError({ kind: "error", text: "Enter a valid email address." });
      return;
    }

    setBusy(true);
    setError(null);
    try {
      const resendIn = await sendCode(target);
      updateDraft({
        email: target,
        codeSentAt: Date.now(),
        retryAt: Date.now() + resendIn * 1000,
        retryEmail: target.toLowerCase(),
      });
      setCode("");
    } catch (failure) {
      const failed = failure instanceof AccountError ? failure : null;
      const retryAfter = failed?.retryAfter ?? null;
      const retryAt =
        retryAfter && retryAfter <= MAX_COUNTDOWN_SECONDS
          ? Date.now() + retryAfter * 1000
          : 0;
      const retryEmail =
        failed?.code === "too_many_requests" ? null : target.toLowerCase();

      // A code went to this email less than a minute ago, and it still works.
      if (failed?.code === "resend_wait") {
        updateDraft({
          email: target,
          codeSentAt:
            draft.email === target && draft.codeSentAt
              ? draft.codeSentAt
              : Date.now(),
          retryAt,
          retryEmail,
        });
        return;
      }

      if (retryAt) updateDraft({ retryAt, retryEmail });
      setError({ kind: "error", text: describeAccountError(failure) });
    } finally {
      setBusy(false);
    }
  }

  async function verify() {
    setBusy(true);
    setError(null);
    try {
      const signedIn = await signIn(draft.email, code);
      updateDraft({ codeSentAt: null });
      setCode("");
      props.onSignedIn(signedIn);
    } catch (failure) {
      setError({ kind: "error", text: describeAccountError(failure) });
      const failed = failure instanceof AccountError ? failure.code : null;
      if (failed === "too_many_attempts" || failed === "code_expired") {
        setCode("");
      }
    } finally {
      setBusy(false);
    }
  }

  async function runSignOut() {
    const lastEmail = session?.email ?? "";
    setBusy(true);
    setError(null);
    await signOut();
    // Signing in again starts from the same email.
    updateDraft({ email: lastEmail, codeSentAt: null });
    setEmail(lastEmail);
    setBusy(false);
    props.onSignedOut();
  }

  async function openManage() {
    setBusy(true);
    setError(null);
    try {
      props.onOpenWebsite(await createManageLink());
    } catch (failure) {
      const signedOut =
        failure instanceof AccountError && failure.code === "signed_out";
      setError({
        kind: signedOut ? "warning" : "error",
        text: describeAccountError(failure),
      });
      if (signedOut) props.onSignedOut();
    } finally {
      setBusy(false);
    }
  }

  const errorAlert = error ? (
    <div
      className="syncify-alert"
      data-kind={error.kind === "error" ? "error" : undefined}
      role="alert"
    >
      {error.text}
    </div>
  ) : null;

  if (session === undefined) return null;

  if (session) {
    const canSecure =
      secure.kind === "open" ||
      secure.kind === "other-claim" ||
      secure.kind === "cancelled";

    return (
      <>
        <div className="syncify-setting">
          <span className="syncify-setting-text">
            <span className="syncify-account-email">{session.email}</span>
            {secure.kind === "secured" ? (
              <span className="syncify-muted">
                Backup secured ·{" "}
                {secure.linkedCount === 1
                  ? "1 Spotify account linked"
                  : `${secure.linkedCount} Spotify accounts linked`}
              </span>
            ) : secure.kind === "pending" ? (
              <span className="syncify-muted syncify-account-state">
                <ClockIcon />
                <span>
                  Securing this backup ·{" "}
                  {secure.waiting
                    ? "waiting on sign-in"
                    : secure.held
                      ? "in review"
                      : `final ${formatFinalDate(secure.finalAt)}`}
                </span>
              </span>
            ) : secure.kind === "other-account" ? (
              <span className="syncify-muted">
                This backup is secured by another account
              </span>
            ) : (
              <span className="syncify-muted">Signed in</span>
            )}
          </span>
          <span className="syncify-account-actions">
            <button
              className="syncify-text-button syncify-disclosure"
              type="button"
              aria-label="Manage on the website"
              onClick={() => void openManage()}
              disabled={busy}
            >
              Manage
              <ExternalIcon />
            </button>
            <button
              className="syncify-text-button"
              type="button"
              onClick={() => void runSignOut()}
              disabled={busy}
            >
              Sign out
            </button>
          </span>
        </div>
        {canSecure ? (
          <div className="syncify-setting">
            <span className="syncify-setting-text">
              <span>Secure your backup</span>
              <span className="syncify-muted">So only you can restore it</span>
            </span>
            <button
              className="syncify-button"
              type="button"
              onClick={props.onSecure}
              disabled={
                busy ||
                props.securing ||
                secure.kind === "other-claim"
              }
            >
              {props.securing
                ? "Securing…"
                : secure.kind === "cancelled"
                  ? "Secure again"
                  : "Secure"}
            </button>
          </div>
        ) : null}
        {secure.kind === "other-claim" ? (
          <div className="syncify-alert" role="status">
            Another claim is pending. If it isn't yours, press Not me above and
            Syncify will review it.
          </div>
        ) : secure.kind === "cancelled" ? (
          <div className="syncify-alert" role="status">
            Your claim was cancelled from this Spotify account.
          </div>
        ) : secure.kind === "pending" && secure.waiting ? (
          <div className="syncify-alert" role="status">
            Syncify ran on this Spotify account without you signed in, maybe
            after a Spotify update or on another computer. Sign in to Syncify
            there to finish linking.
          </div>
        ) : null}
        {props.secureError ? (
          <div className="syncify-alert" data-kind="error" role="alert">
            {props.secureError}
          </div>
        ) : null}
        {errorAlert}
      </>
    );
  }

  return (
    <>
      <div className="syncify-setting">
        {props.locked ? (
          <span className="syncify-setting-text">
            <span>Sign in to restore</span>
            <span className="syncify-muted">
              With the email that secured this backup
            </span>
          </span>
        ) : (
          <span className="syncify-setting-text">
            <span>Secure your backup</span>
            <span className="syncify-muted">So only you can restore it</span>
          </span>
        )}
      </div>
      <form
        className="syncify-confirm"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          if (busy) return;
          if (codeSent) {
            if (code.length === CODE_LENGTH) void verify();
          } else if (!emailWaitSeconds) {
            void requestCode(email);
          }
        }}
      >
        {codeSent ? (
          <>
            <p className="syncify-muted">Code sent to {maskEmail(draft.email)}</p>
            <div className="syncify-field">
              <input
                className="syncify-input syncify-code-input"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                aria-label="6-digit code"
                placeholder="123456"
                maxLength={CODE_LENGTH}
                value={code}
                onChange={(event) =>
                  setCode(
                    event.currentTarget.value
                      .replace(/\D/g, "")
                      .slice(0, CODE_LENGTH),
                  )
                }
                autoFocus
              />
              <button
                className="syncify-button"
                type="submit"
                disabled={busy || code.length !== CODE_LENGTH}
              >
                {busy ? "Verifying…" : "Verify"}
              </button>
            </div>
            <p className="syncify-muted syncify-account-links">
              <button
                className="syncify-text-button"
                type="button"
                onClick={() => void requestCode(draft.email)}
                disabled={busy || waitSeconds > 0}
              >
                {waitSeconds > 0
                  ? `Resend in ${formatCountdown(waitSeconds)}`
                  : "Resend code"}
              </button>
              <button
                className="syncify-text-button"
                type="button"
                onClick={() => {
                  updateDraft({ codeSentAt: null });
                  setCode("");
                  setError(null);
                }}
                disabled={busy}
              >
                Use another email
              </button>
            </p>
          </>
        ) : (
          <>
            <div className="syncify-field">
              <input
                className="syncify-input"
                type="email"
                autoComplete="email"
                aria-label="Email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
                autoFocus
              />
              <button
                className="syncify-button"
                type="submit"
                disabled={busy || emailWaitSeconds > 0 || !email.trim()}
              >
                {busy ? "Sending…" : "Send code"}
              </button>
            </div>
            <p className="syncify-muted">
              {emailWaitSeconds > 0
                ? `Send another code in ${formatCountdown(emailWaitSeconds)}`
                : "We only email sign-in codes."}
            </p>
          </>
        )}
        {errorAlert}
      </form>
    </>
  );
}

// Codes are 6 digits and work for 10 minutes.
const CODE_LENGTH = 6;
const CODE_VALID_MS = 10 * 60 * 1000;
// Longer waits (until tomorrow) are only explained, not counted down.
const MAX_COUNTDOWN_SECONDS = 5 * 60;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** "a***@gmail.com" */
function maskEmail(email: string): string {
  const at = email.lastIndexOf("@");
  if (at < 1) return email;
  return `${email[0]}***${email.slice(at)}`;
}

/** "on Nov 1, 04:42 PM", or "today, 04:42 PM" */
export function formatFinalDate(at: number): string {
  const date = formatBackupDate(new Date(at).toISOString());
  return date.startsWith("today") ? date : `on ${date}`;
}

/** "0:45" */
function formatCountdown(seconds: number): string {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

type AccordionSectionId = "account" | "settings";

/**
 * One section of the accordion: an uppercase title with a chevron. Only one
 * section is open at a time, and all are closed when the window opens.
 */
function AccordionSection(props: {
  id: AccordionSectionId;
  title: string;
  openSection: AccordionSectionId | null;
  onToggle(section: AccordionSectionId | null): void;
  children?: ReactNode;
}) {
  const React = Spicetify.React;
  const isOpen = props.openSection === props.id;
  const bodyId = `syncify-section-${props.id}`;

  return (
    <section className="syncify-accordion-section" aria-label={props.title}>
      <button
        className="syncify-accordion-header"
        type="button"
        aria-expanded={isOpen}
        aria-controls={bodyId}
        onClick={() => props.onToggle(isOpen ? null : props.id)}
      >
        <span className="syncify-accordion-title">{props.title}</span>
        <ChevronIcon />
      </button>
      {isOpen ? (
        <div className="syncify-accordion-body" id={bodyId}>
          {props.children}
        </div>
      ) : null}
    </section>
  );
}

function ShieldIcon() {
  const React = Spicetify.React;
  return (
    <svg
      className="syncify-shield"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" />
    </svg>
  );
}

function WarningIcon() {
  const React = Spicetify.React;
  return (
    <svg
      className="syncify-warning-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 3 2 21h20z" />
      <path d="M12 10v5" />
      <path d="M12 18h.01" />
    </svg>
  );
}

function ChevronIcon() {
  const React = Spicetify.React;
  return (
    <svg
      className="syncify-chevron"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function LockIcon() {
  const React = Spicetify.React;
  return (
    <svg
      className="syncify-lock"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function ClockIcon() {
  const React = Spicetify.React;
  return (
    <svg
      className="syncify-clock"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function ExternalIcon() {
  const React = Spicetify.React;
  return (
    <svg
      className="syncify-external"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M14 4h6v6" />
      <path d="M20 4 10 14" />
      <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

function CloseIcon() {
  const React = Spicetify.React;
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

// How long after a restore its result replaces the status.
const RESULT_SHOWN_MS = 10 * 60 * 1000;

// Mirrors the worker's MAX_BACKUP_HISTORY.
const MAX_BACKUPS = 3;
// What a locked backup shows: nothing can be read without signing in.
const NO_REMOTE_STATE: SyncifyRemoteState = {
  exists: false,
  payload: null,
  backups: [],
  safetyCopy: null,
  claim: null,
  unapproved: [],
  install: null,
};

const ENTRY_POINT_OPTIONS: { value: SyncifyEntryPoint; label: string }[] = [
  { value: "both", label: "Top bar and profile menu" },
  { value: "topbar", label: "Top bar" },
  { value: "menu", label: "Profile menu" },
];

/**
 * "1 added, Spicetify config changed since today, 04:42 AM", or the last
 * backup's time. A backup from before the config was saved says so instead.
 */
function describeChanges(
  backup: SyncifyPayload,
  backupItems: string[],
  localItems: string[],
  localConfig: SyncifySpicetifyConfig | null,
): string {
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
  const changes = [
    added ? `${added} added` : null,
    removed ? `${removed} removed` : null,
    configChanged ? "Spicetify config changed" : null,
  ].filter(Boolean);

  const date = formatBackupDate(backup.metadata.last_sync_datetime);
  const summary = changes.length
    ? `${changes.join(", ")} since ${date}`
    : `Last backup ${date}`;
  return configUnsaved ? `${summary} · Spicetify config not saved yet` : summary;
}

function formatItemCount(count: number): string {
  return count === 1 ? "1 extension or theme" : `${count} extensions and themes`;
}

function formatBackupDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const time = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return `today, ${time}`;
  if (date.toDateString() === yesterday.toDateString()) {
    return `yesterday, ${time}`;
  }

  const day = date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year:
      date.getFullYear() === today.getFullYear() ? undefined : "numeric",
  });

  return `${day}, ${time}`;
}
