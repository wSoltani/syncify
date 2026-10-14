import { loadConfig, saveConfig } from "../core/config";
import { getProjectConfig } from "../core/projectConfig";
import {
  countInstalledItems,
  summarizeMarketplaceState,
} from "../core/marketplace";
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
  SyncifyStatus,
} from "../types/syncify";
import type {
  useEffect as useEffectType,
  useMemo as useMemoType,
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

  const [config, setConfig] = useState<SyncifyConfig>(() => loadConfig());
  const [status, setStatus] = useState<SyncifyStatus>("idle");
  const [message, setMessage] = useState<MessageState | null>(null);
  const [installedItemCount, setInstalledItemCount] = useState(0);
  const [marketplaceAvailable, setMarketplaceAvailable] = useState<
    boolean | null
  >(null);
  const [localHash, setLocalHash] = useState<string | null>(null);
  const [remotePayload, setRemotePayload] = useState<SyncifyPayload | null>(
    null,
  );
  const [remoteBackups, setRemoteBackups] = useState<SyncifyPayload[]>([]);
  const [selectedRestorePayload, setSelectedRestorePayload] =
    useState<SyncifyPayload | null>(null);
  const [remoteChecked, setRemoteChecked] = useState(false);
  const [isConfirmingRestore, setIsConfirmingRestore] = useState(false);
  const [isRecordingShortcut, setIsRecordingShortcut] = useState(false);
  const [shortcutError, setShortcutError] = useState<string | null>(null);

  const projectConfig = useMemo(() => getProjectConfig(), []);
  const menuAvailable = useMemo(() => isMenuEntryPointAvailable(), []);
  const isBusy = status === "loading";
  const alertMessage =
    message?.kind === "warning" || message?.kind === "error" ? message : null;
  const localDiffersFromBackup = Boolean(
    remotePayload && localHash && remotePayload.payload_hash !== localHash,
  );

  useEffect(() => {
    void refreshStatus({ silent: true });
  }, []);

  // Capture phase on window runs before Mousetrap (bubble phase on document),
  // so recording never triggers the current shortcut or Spotify's own ones.
  useEffect(() => {
    if (!isRecordingShortcut) return;

    const onKeyDown = (event: KeyboardEvent) => {
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
      const payload = await backupNow(config);
      setRemotePayload(payload);
      setRemoteBackups((backups) =>
        [
          payload,
          ...backups.filter(
            (backup) => backup.payload_hash !== payload.payload_hash,
          ),
        ].slice(0, 3),
      );
      setSelectedRestorePayload(payload);
      setRemoteChecked(true);
      await refreshLocalSummary();
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
    setIsConfirmingRestore(true);
  }

  async function runRestore() {
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
      setRemotePayload(payload);
      setSelectedRestorePayload(payload);
      setRemoteChecked(true);
      setStatus("success");
      setMessage({
        kind: "success",
        text: `Restored ${restoredCount} entries. Reloading Spotify…`,
      });
      Spicetify.showNotification("Syncify restore complete. Reloading…");
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      handleError(error);
    }
  }

  function openExternal(url: string) {
    if (url.startsWith("mailto:")) {
      window.location.href = url;
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  }

  function handleError(error: unknown) {
    const text = error instanceof Error ? error.message : String(error);
    setStatus("error");
    setMessage({ kind: "error", text });
    Spicetify.showNotification(text, true, 6000);
  }

  function keepModalOpen(event: { stopPropagation(): void }) {
    event.stopPropagation();
  }

  const statusTitle = !remoteChecked
    ? status === "error"
      ? "Couldn't check your backup"
      : "Checking your backup…"
    : !remotePayload
      ? "No backup yet"
      : localDiffersFromBackup
        ? "Changes since your last backup"
        : "Everything is backed up";

  const statusDetail = !remoteChecked
    ? null
    : remotePayload
      ? `Last backup ${formatBackupDate(remotePayload.metadata.last_sync_datetime)}`
      : "Save your extensions and themes so you can restore them after a reinstall or on another computer.";

  return (
    <div
      className="syncify-panel"
      onClick={keepModalOpen}
      onMouseDown={keepModalOpen}
      onPointerDown={keepModalOpen}
    >
      <section className="syncify-status" aria-live="polite">
        <div className="syncify-status-text">
          <h3 className="syncify-status-title">{statusTitle}</h3>
          <p className="syncify-muted">
            {statusDetail ? `${statusDetail} · ` : ""}
            {formatItemCount(installedItemCount)} on this device
          </p>
        </div>
        <button
          className="syncify-button"
          type="button"
          onClick={runBackup}
          disabled={isBusy}
        >
          {isBusy ? "Working…" : "Back up now"}
        </button>
      </section>

      {alertMessage ? (
        <div className="syncify-alert" data-kind={alertMessage.kind}>
          <span>{alertMessage.text}</span>
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
        </div>
      ) : null}

      {remoteBackups.length > 0 ? (
        <section className="syncify-section" aria-label="Backups">
          <h4 className="syncify-section-title">Backups</h4>
          <div className="syncify-backup-list" role="radiogroup">
            {remoteBackups.map((backup) => {
              const isSelected =
                selectedRestorePayload?.payload_hash === backup.payload_hash;
              const isOnDevice = backup.payload_hash === localHash;

              return (
                <button
                  className="syncify-backup"
                  role="radio"
                  aria-checked={isSelected}
                  data-selected={isSelected ? "true" : "false"}
                  type="button"
                  key={`${backup.payload_hash}-${backup.metadata.last_sync_datetime}`}
                  onClick={() => {
                    setSelectedRestorePayload(backup);
                    setIsConfirmingRestore(false);
                  }}
                  disabled={isBusy}
                >
                  <span className="syncify-radio" aria-hidden="true" />
                  <span className="syncify-backup-text">
                    <span className="syncify-backup-date">
                      {formatBackupDate(backup.metadata.last_sync_datetime)}
                    </span>
                    <span className="syncify-muted">
                      {formatItemCount(
                        countInstalledItems(backup.marketplace_data.keys),
                      )}{" "}
                      · {backup.metadata.device_info}
                    </span>
                  </span>
                  {isOnDevice ? (
                    <span className="syncify-tag">On this device</span>
                  ) : null}
                </button>
              );
            })}
          </div>

          {marketplaceAvailable === false ? (
            <p className="syncify-muted">
              Install Spicetify Marketplace to restore a backup.
            </p>
          ) : isConfirmingRestore ? (
            <div className="syncify-confirm">
              <p>
                Replace this device's extensions and themes with the backup
                from{" "}
                {selectedRestorePayload
                  ? formatBackupDate(
                      selectedRestorePayload.metadata.last_sync_datetime,
                    )
                  : "the cloud"}
                ? Spotify will reload.
              </p>
              <div className="syncify-actions">
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
              <button
                className="syncify-button secondary"
                type="button"
                onClick={() => requestRestoreConfirmation()}
                disabled={
                  isBusy ||
                  !selectedRestorePayload ||
                  selectedRestorePayload.payload_hash === localHash
                }
              >
                Restore selected backup
              </button>
            </div>
          )}
        </section>
      ) : null}

      <section className="syncify-section" aria-label="Settings">
        <h4 className="syncify-section-title">Settings</h4>

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
            checked={config.autoBackupEnabled}
            onChange={(event) => updateAutoBackup(event.currentTarget.checked)}
            disabled={isBusy}
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
            {shortcutError ? (
              <span className="syncify-muted" data-kind="warning">
                {shortcutError}
              </span>
            ) : isRecordingShortcut ? (
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
      </section>

      <footer className="syncify-footer">
        <span>Syncify {projectConfig.version}</span>
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

const ENTRY_POINT_OPTIONS: { value: SyncifyEntryPoint; label: string }[] = [
  { value: "both", label: "Top bar and profile menu" },
  { value: "topbar", label: "Top bar" },
  { value: "menu", label: "Profile menu" },
];

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
