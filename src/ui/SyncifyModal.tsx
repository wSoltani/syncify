import { loadConfig, saveConfig } from "../core/config";
import { getProjectConfig } from "../core/projectConfig";
import {
  getInstalledMarketplaceItemCount,
  isMarketplaceAvailable,
  summarizeMarketplaceState,
} from "../core/marketplace";
import { backupNow, fetchRemoteState, restoreNow } from "../core/syncService";
import type {
  SyncifyConfig,
  SyncifyPayload,
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
  const [localHash, setLocalHash] = useState<string | null>(null);
  const [remotePayload, setRemotePayload] = useState<SyncifyPayload | null>(
    null,
  );
  const [remoteChecked, setRemoteChecked] = useState(false);

  const projectConfig = useMemo(() => getProjectConfig(), []);
  const isBusy = status === "loading";
  const alertMessage =
    message?.kind === "warning" || message?.kind === "error" ? message : null;
  const marketplaceAvailable = useMemo(() => isMarketplaceAvailable(), []);
  const cloudKeyCount = remotePayload?.metadata.marketplace_key_count ?? 0;
  const cloudNewerThanLocal = Boolean(
    remotePayload && localHash && remotePayload.payload_hash !== localHash,
  );

  useEffect(() => {
    void refreshStatus({ silent: true });
  }, []);

  async function refreshLocalSummary() {
    const summary = await summarizeMarketplaceState();
    setLocalKeyCount(summary.keyCount);
    setLocalHash(summary.hash);
    setInstalledItemCount(getInstalledMarketplaceItemCount());
    return summary;
  }

  async function refreshStatus(options?: { silent?: boolean }) {
    try {
      setStatus("loading");
      if (!options?.silent) {
        setMessage({ kind: "info", text: "Checking your Syncify backup…" });
      }

      await refreshLocalSummary();
      const remote = await fetchRemoteState(config);
      setRemotePayload(remote.payload);
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

  async function runBackup() {
    try {
      setStatus("loading");
      setMessage({
        kind: "info",
        text: "Backing up your extensions and themes…",
      });
      const payload = await backupNow(config);
      setRemotePayload(payload);
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

  async function runRestore() {
    if (!marketplaceAvailable) {
      const text =
        "Spicetify Marketplace is required to restore extensions and themes. Install and enable it, then try again.";
      setMessage({ kind: "error", text });
      Spicetify.showNotification(text, true, 6000);
      return;
    }

    const confirmed = window.confirm(
      "Restore your Syncify backup? This will replace your saved extensions and themes on this device, then reload Spotify.",
    );
    if (!confirmed) return;

    try {
      setStatus("loading");
      setMessage({
        kind: "info",
        text: "Restoring your extensions and themes…",
      });
      const { payload, restoredCount } = await restoreNow(config);
      setRemotePayload(payload);
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
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function handleError(error: unknown) {
    const text = error instanceof Error ? error.message : String(error);
    setStatus("error");
    setMessage({ kind: "error", text });
    Spicetify.showNotification(text, true, 6000);
  }

  return (
    <div className="syncify-panel">
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
          value={marketplaceAvailable ? "Ready" : "Missing"}
          tone={marketplaceAvailable ? "success" : "warning"}
        />
      </section>

      {remotePayload ? (
        <section className="syncify-section syncify-backup-section">
          <div className="syncify-section-header">
            <h4 className="syncify-section-title">Latest backup</h4>
            <span className="syncify-backup-time">
              {formatBackupDateTime(remotePayload.metadata.last_sync_datetime)}
            </span>
          </div>
          <div className="syncify-backup-details">
            <span>{remotePayload.metadata.device_info}</span>
            <span>{remotePayload.metadata.marketplace_key_count} entries</span>
          </div>
          {cloudNewerThanLocal ? (
            <p className="syncify-message inline" data-kind="warning">
              This device differs from your backup. Restore to apply the saved
              extensions and themes here, or back up to replace it.
            </p>
          ) : null}
        </section>
      ) : null}

      <section className="syncify-section compact">
        <h4 className="syncify-section-title">Sync controls</h4>
        <div className="syncify-actions">
          <button
            className="syncify-button"
            type="button"
            onClick={runBackup}
            disabled={isBusy}
          >
            Back up now
          </button>
          <button
            className="syncify-button danger"
            type="button"
            onClick={runRestore}
            disabled={isBusy}
          >
            Restore backup
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

      <section className="syncify-footer" aria-label="Syncify links">
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
      </section>
    </div>
  );
}

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
