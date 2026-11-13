import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { saveConfig } from "../../core/config";
import { applyEntryPoint, isMenuEntryPointAvailable } from "../../core/entryPoints";
import { applyShortcut, DEFAULT_SHORTCUT, isShortcutTaken } from "../../core/shortcut";
import type { SettingsSyncStatus } from "../../core/settingsSync";
import type { SyncifyConfig } from "../../types/syncify";
import { SettingsTab } from "./SettingsTab";

vi.mock("../../core/config", () => ({ saveConfig: vi.fn(), loadConfig: vi.fn(() => ({ settingsSyncOff: [] })) }));
vi.mock("../../core/entryPoints", () => ({ applyEntryPoint: vi.fn(), isMenuEntryPointAvailable: vi.fn() }));
vi.mock("../../core/shortcut", async (original) => ({
  ...(await original<typeof import("../../core/shortcut")>()),
  applyShortcut: vi.fn(),
  isShortcutTaken: vi.fn(),
}));

const config: SyncifyConfig = {
  workerUrl: null,
  autoBackupEnabled: true,
  entryPoint: "both",
  shortcut: DEFAULT_SHORTCUT,
  settingsSyncEnabled: true,
  settingsSyncOff: [],
  shareRestoredSettings: true,
};

type TabProps = Parameters<typeof SettingsTab>[0];

const syncStatus: SettingsSyncStatus = { bytes: 0, limit: 262144, items: [], choices: [], arrived: null, budgetDay: null };
const baseProps: TabProps = {
  idBase: "t",
  config,
  onConfigChange: () => {},
  busy: false,
  unsupported: false,
  syncStatus,
  secured: false,
  securing: false,
  onSecure: () => {},
};

const renderTab = (changes: Partial<TabProps> = {}) =>
  render(<SettingsTab {...baseProps} {...changes} />);

const keyButton = () => screen.getByRole("button", { name: /keyboard shortcut/i });

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(isMenuEntryPointAvailable).mockReturnValue(true);
  vi.mocked(isShortcutTaken).mockReturnValue(false);
});

describe("SettingsTab", () => {
  it("saves automatic backup at once", () => {
    const onConfigChange = vi.fn();
    renderTab({ onConfigChange });
    fireEvent.click(screen.getByRole("switch", { name: "Automatic backup when Spotify starts" }));
    expect(saveConfig).toHaveBeenCalledWith({ ...config, autoBackupEnabled: false });
    expect(onConfigChange).toHaveBeenCalledWith({ ...config, autoBackupEnabled: false });
  });

  it("moves where Syncify opens from", () => {
    renderTab();
    fireEvent.click(screen.getByRole("button", { name: "Open Syncify from: Top bar and profile menu" }));
    fireEvent.click(screen.getByRole("menuitemradio", { name: "Top bar" }));
    expect(applyEntryPoint).toHaveBeenCalledWith("topbar");
    expect(saveConfig).toHaveBeenCalledWith({ ...config, entryPoint: "topbar" });
  });

  it("keeps the top bar when the profile menu isn't available", () => {
    vi.mocked(isMenuEntryPointAvailable).mockReturnValue(false);
    renderTab();
    expect(screen.getByRole("button", { name: "Open Syncify from: Top bar" })).toHaveProperty("disabled", true);
    expect(screen.getByText("The profile menu isn't available in this Spicetify version.")).toBeTruthy();
  });

  it("turns the shortcut off, and back to the default", () => {
    const { rerender } = renderTab();
    fireEvent.click(screen.getByRole("button", { name: "Turn off" }));
    expect(applyShortcut).toHaveBeenCalledWith(null);

    const off = { ...config, shortcut: null };
    rerender(<SettingsTab {...baseProps} config={off} />);
    expect(screen.getByRole("button", { name: "Off, change the keyboard shortcut" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Use default" }));
    expect(applyShortcut).toHaveBeenLastCalledWith(DEFAULT_SHORTCUT);
  });

  it("warns when only the profile menu opens Syncify and there's no shortcut", () => {
    renderTab({ config: { ...config, entryPoint: "menu", shortcut: null } });
    expect(screen.getByText("Keep a shortcut in case a Spotify update breaks the profile menu.")).toBeTruthy();
  });
});

describe("Recording a shortcut", () => {
  it("saves the next combination pressed", () => {
    renderTab();
    fireEvent.click(keyButton());
    expect(screen.getByText("Press a key combination, or Esc to cancel")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Press keys for a new keyboard shortcut" })).toBeTruthy();
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", code: "KeyK", ctrlKey: true, altKey: true }));
    });
    expect(applyShortcut).toHaveBeenCalledWith(expect.objectContaining({ key: "k", alt: true }));
    expect(screen.queryByText("Press a key combination, or Esc to cancel")).toBeNull();
  });

  it("explains a combination it can't use, and stops on Escape", () => {
    renderTab();
    fireEvent.click(keyButton());
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", code: "KeyK" }));
    });
    expect(screen.getByText(/so the shortcut doesn't fire while typing/)).toBeTruthy();
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", code: "Escape" }));
    });
    expect(screen.queryByText(/so the shortcut doesn't fire while typing/)).toBeNull();
    expect(applyShortcut).not.toHaveBeenCalled();
  });

  it("refuses a combination something else already uses", () => {
    vi.mocked(isShortcutTaken).mockReturnValue(true);
    renderTab();
    fireEvent.click(keyButton());
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", code: "KeyK", altKey: true }));
    });
    expect(screen.getByRole("status").textContent).toMatch(/is already used by Spotify or another extension/);
    expect(applyShortcut).not.toHaveBeenCalled();
  });
});
