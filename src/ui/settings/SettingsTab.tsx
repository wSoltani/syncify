import { useState } from "react";
import { loadConfig, saveConfig } from "../../core/config";
import type { SettingsSyncStatus } from "../../core/settingsSync";
import { applyEntryPoint, isMenuEntryPointAvailable } from "../../core/entryPoints";
import { applyShortcut, DEFAULT_SHORTCUT, formatShortcut } from "../../core/shortcut";
import type { SyncifyConfig, SyncifyEntryPoint, SyncifyShortcut } from "../../types/syncify";
import { Button, KeyButton, Menu, Notice, SettingGroup, SettingRow, SwitchRow, TabPanel, useStableId } from "../kit";
import { ExtensionSettingsSection, SyncItemsView } from "./ExtensionSettings";
import { useShortcutRecorder } from "./useShortcutRecorder";

const ENTRY_POINTS: { value: SyncifyEntryPoint; label: string }[] = [
  { value: "both", label: "Top bar and profile menu" },
  { value: "topbar", label: "Top bar" },
  { value: "menu", label: "Profile menu" },
];

/**
 * Automatic backup, where Syncify opens from, its keyboard shortcut, and
 * extension settings sync, whose Items list opens in place of the rest.
 */
export function SettingsTab(props: {
  idBase: string;
  config: SyncifyConfig;
  onConfigChange(config: SyncifyConfig): void;
  /** A backup or a restore is running. */
  busy: boolean;
  /** This version can't back up any more. */
  unsupported: boolean;
  syncStatus: SettingsSyncStatus;
  /** Signed in with this backup secured, so extension settings can sync. */
  secured: boolean;
  securing: boolean;
  onSecure(): void;
}) {
  const { config } = props;
  const [view, setView] = useState<"settings" | "items">("settings");
  const [menuAvailable] = useState(() => isMenuEntryPointAvailable());
  const keyId = useStableId("shortcut");
  const recorder = useShortcutRecorder(keyId, updateShortcut);
  const entryPoint = menuAvailable ? config.entryPoint : "topbar";
  const keys = recorder.recording ? "Press keys" : config.shortcut ? formatShortcut(config.shortcut) : "Off";

  function save(next: SyncifyConfig) {
    saveConfig(next);
    props.onConfigChange(next);
  }

  // Sync may have turned items off since this window read the config.
  function setItemOn(id: string, on: boolean) {
    const off = loadConfig().settingsSyncOff.filter((item) => item !== id);
    save({ ...config, settingsSyncOff: on ? off : [...off, id] });
  }

  if (view === "items") {
    return (
      <TabPanel idBase={props.idBase} id="settings">
        <SyncItemsView
          config={config}
          status={props.syncStatus}
          onItemChange={setItemOn}
          onBack={() => setView("settings")}
          onDeleted={() => props.onConfigChange(loadConfig())}
        />
      </TabPanel>
    );
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
              <Button variant="subtle" onClick={() => updateShortcut(null)}>
                Turn off
              </Button>
            ) : (
              <Button variant="subtle" onClick={() => updateShortcut(DEFAULT_SHORTCUT)}>
                Use default
              </Button>
            )}
            <KeyButton
              id={keyId}
              keys={keys}
              recording={recorder.recording}
              // Starts with what it shows, so it can be named by voice too.
              aria-label={recorder.recording ? `${keys} for a new keyboard shortcut` : `${keys}, change the keyboard shortcut`}
              onClick={recorder.toggle}
            />
          </span>
        </SettingRow>
      </SettingGroup>
      {recorder.error ? (
        <Notice tone="warning" live>
          {recorder.error}
        </Notice>
      ) : null}
      {!menuAvailable ? (
        <Notice tone="info">The profile menu isn't available in this Spicetify version.</Notice>
      ) : config.entryPoint === "menu" && !config.shortcut ? (
        <Notice tone="warning">Keep a shortcut in case a Spotify update breaks the profile menu.</Notice>
      ) : null}
      <ExtensionSettingsSection
        config={config}
        status={props.syncStatus}
        secured={props.secured}
        securing={props.securing}
        onSecure={props.onSecure}
        onEnabledChange={(enabled) => save({ ...config, settingsSyncEnabled: enabled, settingsSyncOff: loadConfig().settingsSyncOff })}
        onOpenItems={() => setView("items")}
        disabled={props.busy}
      />
    </TabPanel>
  );
}
