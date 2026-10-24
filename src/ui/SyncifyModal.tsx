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
import { UnsupportedVersionError } from "../api/syncifyApi";
import {
  compareVersions,
  fetchLatestVersion,
  getLoaderInfo,
  isReleaseVersion,
} from "../core/releases";
import { backupNow, fetchRemoteState, restoreNow } from "../core/syncService";
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
  SyncifyConfig,
  SyncifyEntryPoint,
  SyncifyPayload,
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

export function SyncifyModal() {
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
    null,
  );
  const [showAllBackups, setShowAllBackups] = useState(false);
  // What loaded after the last restore, until Spotify restarts.
  const [restoreResult, setRestoreResult] = useState(() => getRestoreResult());
  const [copied, setCopied] = useState(false);
  // The backup service refused this version (HTTP 426).
  const [isUnsupported, setIsUnsupported] = useState(false);
  const [newerVersion, setNewerVersion] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const projectConfig = useMemo(() => getProjectConfig(), []);
  const allBackups = useMemo(
    () => (safetyCopy ? [...remoteBackups, safetyCopy] : remoteBackups),
    [remoteBackups, safetyCopy],
  );
  // Parsing a backup's item lists is the costly part of a row, so list each
  // backup's items once when the backups load instead of on every render.
  const backupItems = useMemo(
    () =>
      new Map(
        allBackups.map((backup) => [
          backup,
          listItems(backup.marketplace_data.keys),
        ]),
      ),
    [allBackups],
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
  const backupsExpanded =
    showAllBackups || !isBackedUp || allBackups.length < 2;
  const visibleBackups = backupsExpanded
    ? remoteBackups
    : remoteBackups.slice(0, 1);
  // Restoring overwrites this device, so warn when what's here now can't be
  // brought back from any backup.
  const localIsUnsaved = Boolean(
    localHash &&
      installedItemCount > 0 &&
      !allBackups.some((backup) => backup.payload_hash === localHash),
  );

  useEffect(() => {
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
      const remote = await fetchRemoteState(config);
      setRemotePayload(remote.payload);
      setRemoteBackups(remote.backups);
      setSafetyCopy(remote.safetyCopy);
      setSelectedRestorePayload(remote.payload);
      setRemoteChecked(true);
      setStatus(remote.exists ? "success" : "idle");

      if (!options?.silent) {
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
      const { payload, unchanged } = await backupNow(config);
      await refreshLocalSummary();

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

    const text = error instanceof Error ? error.message : String(error);
    setMessage({ kind: "error", text });
    Spicetify.showNotification(text, true, 6000);
  }

  function renderBackup(
    backup: SyncifyPayload,
    options?: { isSafetyCopy?: boolean },
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
      </button>
    );
  }

  function keepModalOpen(event: { stopPropagation(): void }) {
    event.stopPropagation();
  }

  const statusTitle = isUnsupported
    ? "Update Syncify to keep backing up"
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
            disabled={isBusy || isBackedUp || isUnsupported}
            title={isBackedUp ? "No changes since your last backup" : undefined}
          >
            {isBusy ? "Working…" : isBackedUp ? "Backed up" : "Back up now"}
          </button>
        )}
      </section>

      {remoteBackups.length > 0 ? (
        <section className="syncify-section" aria-label="Backups">
          <div className="syncify-section-header">
            <h4 className="syncify-section-title">Backups</h4>
            {isBackedUp && allBackups.length > 1 ? (
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
          </div>
          <div
            className="syncify-backup-list"
            id="syncify-backup-list"
            role="radiogroup"
            aria-label="Choose a backup to restore"
          >
            {visibleBackups.map((backup) => renderBackup(backup))}
            {backupsExpanded && safetyCopy ? (
              <>
                <div className="syncify-backup-divider" role="presentation" />
                {renderBackup(safetyCopy, { isSafetyCopy: true })}
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
              {restorePreview ? (
                <RestoreChanges
                  preview={restorePreview}
                  checks={sourceChecks}
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
                  disabled={isBusy}
                >
                  Restore
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
        </section>
      ) : null}

      <div className="syncify-accordion">
        <AccordionSection
          id="settings"
          title="Settings"
          openSection={openSection}
          onToggle={(section) => {
            setOpenSection(section);
            // Recording keeps swallowing keys, so don't leave it running hidden.
            if (section !== "settings") setIsRecordingShortcut(false);
          }}
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
            <select
              className="syncify-select"
              value={menuAvailable ? config.entryPoint : "topbar"}
              onChange={(event) =>
                updateEntryPoint(event.currentTarget.value as SyncifyEntryPoint)
              }
              disabled={!menuAvailable}
            >
              {ENTRY_POINT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
  expanded: boolean;
  onToggle(): void;
}) {
  const React = Spicetify.React;
  const { items, counts, manual } = props.preview;

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

type AccordionSectionId = "settings";

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
