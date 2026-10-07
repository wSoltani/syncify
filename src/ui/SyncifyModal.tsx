import { loadConfig, saveConfig } from "../core/config";
import { getProjectConfig } from "../core/projectConfig";
import { summarizeMarketplaceState } from "../core/marketplace";
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
  const [localKeyCount, setLocalKeyCount] = useState(0);
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
  const cloudKeyCount = remotePayload?.metadata.marketplace_key_count ?? 0;
  const cloudNewerThanLocal = Boolean(
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
    setLocalKeyCount(summary.keyCount);
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
                text: `Backup found from ${formatBackupDateTime(remote.payload.metadata.last_sync_datetime)}.`,
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

  return (
    <div
      className="syncify-panel"
      onClick={keepModalOpen}
      onMouseDown={keepModalOpen}
      onPointerDown={keepModalOpen}
    >
      <section className="syncify-hero" aria-label="Syncify status">
        <p className="syncify-description">
          Back up your installed extensions and themes, then restore them
          whenever Spotify or Spicetify needs a fresh setup.
        </p>
        <div className="syncify-status-row">
          <h3 className="syncify-heading">
            {getStatusTitle(status, remoteChecked)}
          </h3>
          <span
            className="syncify-status-pill"
            data-kind={getStatusKind(status)}
          >
            {getStatusLabel(status, remoteChecked)}
          </span>
        </div>
        {alertMessage ? (
          <p className="syncify-message" data-kind={alertMessage.kind}>
            {alertMessage.text}
          </p>
        ) : null}
      </section>

      <section className="syncify-grid" aria-label="Syncify backup details">
        <StatusCard label="Backup entries" value={localKeyCount} />
        <StatusCard label="Extensions/themes" value={installedItemCount} />
        <StatusCard
          label="Backup"
          value={
            remotePayload
              ? `${cloudKeyCount} entries`
              : remoteChecked
                ? "None"
                : "Checking"
          }
          tone={
            remotePayload ? "success" : remoteChecked ? "warning" : "neutral"
          }
        />
        <StatusCard
          label="Restore"
          value={
            marketplaceAvailable === null
              ? "Checking"
              : marketplaceAvailable
                ? "Ready"
                : "Missing"
          }
          tone={
            marketplaceAvailable === null
              ? "neutral"
              : marketplaceAvailable
                ? "success"
                : "warning"
          }
        />
      </section>

      {remotePayload ? (
        <section className="syncify-section syncify-backup-section">
          <div className="syncify-section-header">
            <h4 className="syncify-section-title">Version history</h4>
            <span className="syncify-backup-time">
              {remoteBackups.length} saved
            </span>
          </div>
          <div className="syncify-backup-list">
            {remoteBackups.map((backup, index) => {
              const isSelected =
                selectedRestorePayload?.payload_hash === backup.payload_hash;

              return (
                <button
                  className="syncify-backup-version"
                  data-selected={isSelected ? "true" : "false"}
                  type="button"
                  key={`${backup.payload_hash}-${backup.metadata.last_sync_datetime}`}
                  onClick={() => setSelectedRestorePayload(backup)}
                  disabled={isBusy}
                >
                  <span className="syncify-backup-version-main">
                    <strong>
                      {index === 0 ? "Latest" : `Backup ${index + 1}`}
                    </strong>
                    <span>
                      {formatBackupDateTime(backup.metadata.last_sync_datetime)}
                    </span>
                  </span>
                  <span className="syncify-backup-details">
                    <span>{backup.metadata.device_info}</span>
                    <span>{backup.metadata.marketplace_key_count} entries</span>
                  </span>
                </button>
              );
            })}
          </div>
          {cloudNewerThanLocal ? (
            <p className="syncify-message inline" data-kind="warning">
              This device differs from your latest backup. Select any saved
              version to restore it, or back up to add a new version.
            </p>
          ) : null}
        </section>
      ) : null}

      <section className="syncify-section compact">
        <h4 className="syncify-section-title">Sync controls</h4>
        {isConfirmingRestore ? (
          <div className="syncify-confirm-restore">
            <p className="syncify-message inline" data-kind="warning">
              Restore will replace this device's saved extensions and themes
              with the selected backup, then reload Spotify.
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
                className="syncify-button danger"
                type="button"
                onClick={runRestore}
                disabled={isBusy}
              >
                Confirm restore
              </button>
            </div>
          </div>
        ) : (
          <div className="syncify-actions">
            <button
              className="syncify-button"
              type="button"
              onClick={runBackup}
              disabled={isBusy}
            >
              Back up
            </button>
            <button
              className="syncify-button danger"
              type="button"
              onClick={() => requestRestoreConfirmation()}
              disabled={isBusy || !selectedRestorePayload}
            >
              Restore selected
            </button>
            <button
              className="syncify-button secondary"
              type="button"
              onClick={() => void refreshStatus()}
              disabled={isBusy}
            >
              Refresh status
            </button>
          </div>
        )}
        <label className="syncify-toggle">
          <input
            type="checkbox"
            checked={config.autoBackupEnabled}
            onChange={(event) => updateAutoBackup(event.currentTarget.checked)}
            disabled={isBusy}
          />
          <span>
            Auto-backup extensions and themes after startup safety checks
          </span>
        </label>
      </section>

      <section className="syncify-section compact">
        <h4 className="syncify-section-title">Show Syncify in</h4>
        <div
          className="syncify-choice-group"
          role="radiogroup"
          aria-label="Where Syncify appears"
        >
          {ENTRY_POINT_OPTIONS.map((option) => {
            const needsMenu = option.value !== "topbar";
            return (
              <label className="syncify-toggle" key={option.value}>
                <input
                  type="radio"
                  name="syncify-entry-point"
                  value={option.value}
                  checked={config.entryPoint === option.value}
                  onChange={() => updateEntryPoint(option.value)}
                  disabled={needsMenu && !menuAvailable}
                />
                <span>{option.label}</span>
              </label>
            );
          })}
        </div>
        {!menuAvailable ? (
          <p className="syncify-message inline" data-kind="warning">
            The profile menu isn't available in this Spicetify version, so
            Syncify stays in the top bar.
          </p>
        ) : config.entryPoint === "menu" && !config.shortcut ? (
          <p className="syncify-message inline" data-kind="warning">
            If the profile menu breaks after a Spotify update, turn the
            keyboard shortcut back on so you can still open Syncify.
          </p>
        ) : null}
      </section>

      <section className="syncify-section compact">
        <h4 className="syncify-section-title">Keyboard shortcut</h4>
        <div className="syncify-shortcut-row">
          <kbd
            className="syncify-shortcut-key"
            data-recording={isRecordingShortcut ? "true" : "false"}
          >
            {isRecordingShortcut
              ? "Press keys…"
              : formatShortcut(config.shortcut)}
          </kbd>
          <div className="syncify-actions">
            {isRecordingShortcut ? (
              <button
                className="syncify-button secondary"
                type="button"
                onClick={() => {
                  setIsRecordingShortcut(false);
                  setShortcutError(null);
                }}
              >
                Cancel
              </button>
            ) : (
              <button
                className="syncify-button secondary"
                type="button"
                onClick={startRecordingShortcut}
              >
                Change
              </button>
            )}
            <button
              className="syncify-button secondary"
              type="button"
              onClick={() => updateShortcut(DEFAULT_SHORTCUT)}
              disabled={
                isRecordingShortcut ||
                formatShortcut(config.shortcut) ===
                  formatShortcut(DEFAULT_SHORTCUT)
              }
            >
              Reset
            </button>
            <button
              className="syncify-button secondary"
              type="button"
              onClick={() => updateShortcut(null)}
              disabled={isRecordingShortcut || !config.shortcut}
            >
              Turn off
            </button>
          </div>
        </div>
        {shortcutError ? (
          <p className="syncify-message inline" data-kind="warning">
            {shortcutError}
          </p>
        ) : null}
      </section>

      <section className="syncify-footer" aria-label="Syncify links">
        <span className="syncify-version">v{projectConfig.version}</span>
        <div className="syncify-footer-actions">
          <button
            className="syncify-link-button"
            type="button"
            onClick={() => openExternal(projectConfig.issueUrl)}
          >
            Report an issue
          </button>
          <button
            className="syncify-link-button"
            type="button"
            onClick={() => openExternal(projectConfig.githubUrl)}
          >
            GitHub
          </button>
          <button
            className="syncify-link-button"
            type="button"
            onClick={() => openExternal(projectConfig.kofiUrl)}
          >
            Ko-fi
          </button>
        </div>
      </section>
    </div>
  );
}

const ENTRY_POINT_OPTIONS: { value: SyncifyEntryPoint; label: string }[] = [
  { value: "both", label: "Top bar and profile menu" },
  { value: "topbar", label: "Top bar only" },
  { value: "menu", label: "Profile menu only" },
];

function StatusCard({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string | number;
  tone?: "neutral" | "success" | "warning";
}) {
  const React = Spicetify.React;

  return (
    <div className="syncify-card" data-tone={tone}>
      <span className="syncify-card-label">{label}</span>
      <strong className="syncify-card-value">{value}</strong>
    </div>
  );
}

function getStatusTitle(status: SyncifyStatus, remoteChecked: boolean): string {
  if (status === "loading") return "Checking status…";
  if (status === "error") return "Sync needs attention";
  if (status === "success") return "Backup available";
  if (status === "needs-restore") return "Restore recommended";
  return remoteChecked ? "Ready to back up" : "Loading Syncify";
}

function getStatusLabel(status: SyncifyStatus, remoteChecked: boolean): string {
  if (status === "loading") return "Checking";
  if (status === "error") return "Error";
  if (status === "success") return "Synced";
  if (status === "needs-restore") return "Restore";
  return remoteChecked ? "Ready" : "Starting";
}

function getStatusKind(
  status: SyncifyStatus,
): "neutral" | "success" | "error" | "warning" {
  if (status === "success") return "success";
  if (status === "error") return "error";
  if (status === "needs-restore") return "warning";
  return "neutral";
}

function formatBackupDateTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const day = date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  const time = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${day}, ${time}`;
}
