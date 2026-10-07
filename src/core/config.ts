import type { SyncifyConfig } from "../types/syncify";
import { getProjectConfig } from "./projectConfig";
import { DEFAULT_SHORTCUT, parseShortcut } from "./shortcut";
import { DEFAULT_ENTRY_POINT, parseEntryPoint } from "./entryPoints";

const CONFIG_STORAGE_KEY = "syncify:config";

const DEFAULT_CONFIG: SyncifyConfig = {
  workerUrl: getProjectConfig().workerUrl,
  autoBackupEnabled: false,
  shortcut: DEFAULT_SHORTCUT,
  entryPoint: DEFAULT_ENTRY_POINT,
};

export function loadConfig(): SyncifyConfig {
  const projectConfig = getProjectConfig();
  const raw =
    Spicetify.LocalStorage?.get(CONFIG_STORAGE_KEY) ??
    window.localStorage.getItem(CONFIG_STORAGE_KEY);
  if (!raw) return { ...DEFAULT_CONFIG, workerUrl: projectConfig.workerUrl };

  try {
    const parsed = JSON.parse(raw) as Partial<SyncifyConfig>;
    return {
      workerUrl: projectConfig.workerUrl,
      autoBackupEnabled:
        parsed.autoBackupEnabled === undefined
          ? DEFAULT_CONFIG.autoBackupEnabled
          : Boolean(parsed.autoBackupEnabled),
      shortcut:
        parsed.shortcut === undefined
          ? DEFAULT_CONFIG.shortcut
          : parseShortcut(parsed.shortcut),
      entryPoint: parseEntryPoint(parsed.entryPoint),
    };
  } catch {
    return { ...DEFAULT_CONFIG, workerUrl: projectConfig.workerUrl };
  }
}

export function saveConfig(config: SyncifyConfig): void {
  const serialized = JSON.stringify({
    workerUrl: getProjectConfig().workerUrl,
    autoBackupEnabled: config.autoBackupEnabled,
    shortcut: config.shortcut,
    entryPoint: config.entryPoint,
  } satisfies SyncifyConfig);

  if (Spicetify.LocalStorage?.set) {
    Spicetify.LocalStorage.set(CONFIG_STORAGE_KEY, serialized);
    return;
  }

  window.localStorage.setItem(CONFIG_STORAGE_KEY, serialized);
}

export function hasWorkerUrl(
  config: SyncifyConfig,
): config is SyncifyConfig & { workerUrl: string } {
  return typeof config.workerUrl === "string" && config.workerUrl.length > 0;
}
