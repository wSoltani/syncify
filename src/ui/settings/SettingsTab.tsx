import { useEffect, useRef, useState } from "react";
import { saveConfig } from "../../core/config";
import { applyEntryPoint, isMenuEntryPointAvailable } from "../../core/entryPoints";
import {
  applyShortcut,
  DEFAULT_SHORTCUT,
  formatShortcut,
  isShortcutTaken,
  shortcutFromEvent,
} from "../../core/shortcut";
import type { SyncifyConfig, SyncifyEntryPoint, SyncifyShortcut } from "../../types/syncify";
import { TabPanel } from "../kit";
import { ChevronIcon } from "../legacyIcons";

const ENTRY_POINT_OPTIONS: { value: SyncifyEntryPoint; label: string }[] = [
  { value: "both", label: "Top bar and profile menu" },
  { value: "topbar", label: "Top bar" },
  { value: "menu", label: "Profile menu" },
];

/** Automatic backup, where Syncify opens from, and its keyboard shortcut. */
export function SettingsTab(props: {
  idBase: string;
  config: SyncifyConfig;
  onConfigChange(config: SyncifyConfig): void;
  /** A backup or a restore is running. */
  busy: boolean;
  /** This version can't back up any more. */
  unsupported: boolean;
}) {
  const { config } = props;
  const isBusy = props.busy;
  const isUnsupported = props.unsupported;
  const [isRecordingShortcut, setIsRecordingShortcut] = useState(false);
  const [shortcutError, setShortcutError] = useState<string | null>(null);
  const [menuAvailable] = useState(() => isMenuEntryPointAvailable());
  const panelRef = useRef<HTMLDivElement>(null);

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

  function save(next: SyncifyConfig) {
    saveConfig(next);
    props.onConfigChange(next);
  }

  function updateAutoBackup(enabled: boolean) {
    save({ ...config, autoBackupEnabled: enabled });
  }

  function updateShortcut(shortcut: SyncifyShortcut | null) {
    save({ ...config, shortcut });
    applyShortcut(shortcut);
    setShortcutError(null);
  }

  function updateEntryPoint(entryPoint: SyncifyEntryPoint) {
    save({ ...config, entryPoint });
    applyEntryPoint(entryPoint);
  }

  function startRecordingShortcut() {
    setShortcutError(null);
    setIsRecordingShortcut(true);
  }

  return (
    <TabPanel idBase={props.idBase} id="settings">
      <div className="syncify-panel" ref={panelRef}>
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
      </div>
    </TabPanel>
  );
}
