import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { deleteSyncedCopy, loadSyncItems, type SettingsSyncStatus, type SyncItem } from "../../core/settingsSync";
import type { SyncifyConfig } from "../../types/syncify";
import { ExtensionSettingsSection, SyncItemsView } from "./ExtensionSettings";

vi.mock("../../core/config", () => ({ loadConfig: vi.fn(() => ({ settingsSyncOff: [] })) }));
vi.mock("../../core/settingsSync", async (original) => ({
  ...(await original<typeof import("../../core/settingsSync")>()),
  loadSyncItems: vi.fn(),
  deleteSyncedCopy: vi.fn(async () => {}),
}));

const config: SyncifyConfig = {
  workerUrl: "https://w",
  autoBackupEnabled: true,
  entryPoint: "both",
  shortcut: null,
  settingsSyncEnabled: true,
  settingsSyncOff: ["c"],
  shareRestoredSettings: true,
};
const item = (id: string, name: string, extra: Partial<SyncItem> = {}): SyncItem => ({
  id,
  key: `marketplace:installed:${id}`,
  name,
  kind: "extension",
  size: 9 * 1024,
  limit: 131072,
  list: false,
  accountSize: 9 * 1024,
  hold: null,
  ...extra,
});
const trash = item("t", "Trashbin", { size: 134144, list: true, hold: { size: 134144, reason: "too_big" } });
const status: SettingsSyncStatus = {
  bytes: 144 * 1024,
  limit: 262144,
  items: [trash, item("a", "Comfy"), item("c", "Hide Podcasts")],
  choices: [],
  arrived: null,
  budgetDay: null,
};
const section = (changes: Partial<Parameters<typeof ExtensionSettingsSection>[0]> = {}) =>
  render(
    <ExtensionSettingsSection
      config={config}
      status={status}
      secured
      onSecure={() => {}}
      securing={false}
      onEnabledChange={() => {}}
      onOpenItems={() => {}}
      disabled={false}
      {...changes}
    />,
  );

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal("Spicetify", { showNotification: vi.fn() });
  Element.prototype.scrollIntoView = vi.fn();
});

describe("ExtensionSettingsSection", () => {
  it("asks to secure the backup first, and shows nothing else", () => {
    section({ secured: false });
    expect(screen.getByText("Secure your backup to sync extension settings between your devices.")).toBeTruthy();
    expect(screen.queryByRole("switch")).toBeNull();
  });

  it("shows only the switch while this device doesn't sync", () => {
    section({ config: { ...config, settingsSyncEnabled: false } });
    expect(screen.getByRole("switch", { name: "Syncing on this device" })).toHaveProperty("checked", false);
    expect(screen.queryByRole("meter")).toBeNull();
    expect(screen.queryByText("Items")).toBeNull();
  });

  it("counts syncing, too big and off, says why one is held, and opens Items", () => {
    const onOpenItems = vi.fn();
    section({ onOpenItems });
    expect(screen.getByRole("meter", { name: "Space used" }).getAttribute("aria-valuetext")).toBe("144 KB of 256 KB");
    expect(
      screen.getByText(
        "Trashbin's list is too big to sync, 131 KB of its 128 KB. Your other devices keep the last list that fit. It syncs again once the list is smaller.",
      ),
    ).toBeTruthy();
    const row = screen.getByRole("button", { name: /Items/ });
    expect(row.textContent).toContain("1 syncing");
    expect(row.textContent).toContain("1 too big to sync");
    expect(row.textContent).toContain("1 off");
    expect(row.textContent).not.toContain("·");
    fireEvent.click(row);
    expect(onOpenItems).toHaveBeenCalled();
  });

  it("says when no item has settings to sync", () => {
    section({ status: { ...status, items: [] } });
    expect(screen.getByText("None of your items have settings Syncify can sync")).toBeTruthy();
    expect(screen.queryByRole("button", { name: /Items/ })).toBeNull();
  });
});

describe("SyncItemsView", () => {
  async function open(onBack = vi.fn()) {
    vi.mocked(loadSyncItems).mockResolvedValue(status.items);
    const view = render(
      <SyncItemsView config={config} status={status} onItemChange={() => {}} onBack={onBack} onDeleted={() => {}} />,
    );
    await act(async () => {});
    return view;
  }

  it("lists problems first with each size, and the switch alone shows an item that's off", async () => {
    await open();
    const rows = screen.getAllByRole("listitem");
    expect(rows[0].textContent).toContain("131 KB, too big to sync");
    expect(screen.getByRole("switch", { name: "Sync Hide Podcasts" })).toHaveProperty("checked", false);
    expect(rows[2].textContent).toContain("9 KB");
  });

  it("holds a delete with Undo until the list is left", async () => {
    const view = await open();
    fireEvent.click(screen.getByRole("button", { name: "More for Comfy" }));
    fireEvent.click(screen.getByRole("menuitem", { name: "Delete synced copy" }));
    expect(screen.getByText("Synced copy deleted")).toBeTruthy();
    expect(deleteSyncedCopy).not.toHaveBeenCalled();

    view.unmount();
    expect(deleteSyncedCopy).toHaveBeenCalledWith(expect.anything(), "a");
  });

  it("sends nothing once undone", async () => {
    const view = await open();
    fireEvent.click(screen.getByRole("button", { name: "More for Comfy" }));
    fireEvent.click(screen.getByRole("menuitem", { name: "Delete synced copy" }));
    fireEvent.click(screen.getByRole("button", { name: "Undo" }));
    view.unmount();
    expect(deleteSyncedCopy).not.toHaveBeenCalled();
  });
});
