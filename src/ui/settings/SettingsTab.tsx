import { useState } from "react";
import { saveConfig } from "../../core/config";
import { applyEntryPoint, isMenuEntryPointAvailable } from "../../core/entryPoints";
import { applyShortcut, DEFAULT_SHORTCUT, formatShortcut } from "../../core/shortcut";
import type { SyncifyConfig, SyncifyEntryPoint, SyncifyShortcut } from "../../types/syncify";
import { Button, KeyButton, Menu, Notice, SettingGroup, SettingRow, SwitchRow, TabPanel, useStableId } from "../kit";
import { useShortcutRecorder } from "./useShortcutRecorder";

const ENTRY_POINTS: { value: SyncifyEntryPoint; label: string }[] = [
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
  const [menuAvailable] = useState(() => isMenuEntryPointAvailable());
  const keyId = useStableId("shortcut");
  const recorder = useShortcutRecorder(keyId, updateShortcut);
  const entryPoint = menuAvailable ? config.entryPoint : "topbar";

  function save(next: SyncifyConfig) {
    saveConfig(next);
    props.onConfigChange(next);
  }

  function updateShortcut(shortcut: SyncifyShortcut | null) {
    save({ ...config, shortcut });
    applyShortcut(shortcut);
    recorder.clearError();
  }

  function updateEntryPoint(next: SyncifyEntryPoint) {
    save({ ...config, entryPoint: next });
    applyEntryPoint(next);
  }

  return (
    <TabPanel idBase={props.idBase} id="settings">
      <SettingGroup>
        <SwitchRow
          label="Automatic backup when Spotify starts"
          checked={config.autoBackupEnabled && !props.unsupported}
          onChange={(enabled) => save({ ...config, autoBackupEnabled: enabled })}
          disabled={props.busy || props.unsupported}
        />
        <SettingRow label="Open Syncify from">
          <Menu
            label="Open Syncify from"
            trigger={{ value: ENTRY_POINTS.find((option) => option.value === entryPoint)?.label ?? "" }}
            items={ENTRY_POINTS.map((option) => ({
              label: option.label,
              checked: option.value === entryPoint,
              onSelect: () => updateEntryPoint(option.value),
            }))}
            disabled={!menuAvailable}
          />
        </SettingRow>
        <SettingRow
          label="Keyboard shortcut"
          value={recorder.recording && !recorder.error ? "Press a key combination, or Esc to cancel" : undefined}
        >
          <span className="syncify-settings-shortcut">
            {recorder.recording ? null : config.shortcut ? (
              <Button variant="text" onClick={() => updateShortcut(null)}>
                Turn off
              </Button>
            ) : (
              <Button variant="text" onClick={() => updateShortcut(DEFAULT_SHORTCUT)}>
                Use default
              </Button>
            )}
            <KeyButton
              id={keyId}
              keys={recorder.recording ? "Press keys" : config.shortcut ? formatShortcut(config.shortcut) : "Off"}
              recording={recorder.recording}
              aria-label={
                recorder.recording
                  ? "Recording a keyboard shortcut"
                  : `Change the keyboard shortcut${config.shortcut ? `, now ${formatShortcut(config.shortcut)}` : ""}`
              }
              onClick={recorder.toggle}
            />
          </span>
        </SettingRow>
      </SettingGroup>
      {recorder.error ? <Notice tone="warning">{recorder.error}</Notice> : null}
      {!menuAvailable ? (
        <Notice tone="info">The profile menu isn't available in this Spicetify version.</Notice>
      ) : config.entryPoint === "menu" && !config.shortcut ? (
        <Notice tone="warning">Keep a shortcut in case a Spotify update breaks the profile menu.</Notice>
      ) : null}
    </TabPanel>
  );
}
