import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { listItems } from "../../core/restorePreview";
import { makeBackup } from "../../test/fixtures";
import type { SyncifyConfig, SyncifyRemoteState, SyncifySnapshotSummary } from "../../types/syncify";
import { BackupsTab } from "./BackupsTab";

// Linked accounts' backups come from the backup service; none are shown here.
vi.mock("../../core/syncService", () => ({ fetchRemoteState: vi.fn() }));
// Marketplace's catalog finds nothing more than the checks that need no network.
vi.mock("../../core/sourceChecks", async (original) => ({
  ...(await original<typeof import("../../core/sourceChecks")>()),
  checkCatalog: (_items: unknown, checks: unknown) => Promise.resolve(checks),
}));

// Extension settings: none differ unless a test says so.
const previewSettings = vi.hoisted(() => vi.fn(async (): Promise<string[]> => []));
vi.mock("../../core/extensionSettings", () => ({ previewSettings }));

const one = "marketplace:installed:a/b/one.js";
const two = "marketplace:installed:a/b/two.js";
const current = makeBackup("now", [one, two], { at: "2026-11-12T22:42:00Z" });
const older = makeBackup("old", [one], { at: "2026-11-11T23:42:00Z" });

const remote: SyncifyRemoteState = {
  exists: true,
  payload: current,
  backups: [current, older],
  safetyCopy: null,
  claim: null,
  unapproved: [],
  install: null,
  nudge: false,
};
const local: SyncifySnapshotSummary = {
  keyCount: 0,
  hash: "now",
  installedItemCount: 2,
  installedItems: [one, two],
  items: listItems(current.marketplace_data.keys),
  spicetifyConfig: null,
  marketplaceAvailable: true,
  activeTheme: null,
};

type TabProps = Parameters<typeof BackupsTab>[0];

const tabProps = (changes: Partial<TabProps> = {}): TabProps => ({
  idBase: "t",
  config: {} as SyncifyConfig,
  remote,
  failed: false,
  lockedBy: null,
  local,
  otherAccounts: [],
  canShareSettings: false,
  shareSettings: true,
  onShareSettingsChange: () => {},
  busy: false,
  restoring: false,
  onRestore: () => {},
  onError: () => {},
  ...changes,
});

const renderTab = (changes: Partial<TabProps> = {}) => render(<BackupsTab {...tabProps(changes)} />);

describe("BackupsTab", () => {
  it("shows the current backup without a way to restore it", () => {
    renderTab();
    const rows = screen.getAllByRole("listitem");
    expect(rows[0].textContent).toContain("Current");
    expect(rows[0].querySelector("button")).toBeNull();
    expect(screen.getAllByRole("button", { name: /^Preview restore of / })).toHaveLength(1);
  });

  it("opens the preview in place and gives focus back to its row", async () => {
    const onRestore = vi.fn();
    renderTab({ onRestore });
    const row = screen.getByRole("button", { name: /^Preview restore of / });
    fireEvent.click(row);

    const heading = screen.getByRole("heading", { name: /^Restore / });
    expect(document.activeElement).toBe(heading);
    // The catalog check runs before Restore can be pressed.
    await act(() => Promise.resolve());
    const restore = screen.getByRole("button", { name: "Restore 1 change" });
    fireEvent.click(restore);
    expect(onRestore).toHaveBeenCalledWith(expect.objectContaining({ skipped: [], linkedHash: null }));

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(document.activeElement).toBe(screen.getByRole("button", { name: /^Preview restore of / }));
  });

  it("lists extension settings after the items, and offers them to the other devices", async () => {
    previewSettings.mockResolvedValueOnce(["spicetify/cli/Extensions/trashbin.js"]);
    const onRestore = vi.fn();
    const onShareSettingsChange = vi.fn();
    renderTab({ onRestore, canShareSettings: true, onShareSettingsChange });
    fireEvent.click(screen.getByRole("button", { name: /^Preview restore of / }));
    await act(() => Promise.resolve());

    const rows = screen.getAllByRole("listitem").map((row) => row.textContent);
    expect(rows).toEqual(["two.jsRemoves", "Trashbin settingsUpdates", "1 more stay the sameShow"]);
    expect(document.querySelectorAll(".syncify-list-divider")).toHaveLength(2);
    const share = screen.getByRole("checkbox", { name: "Use these extension settings on my other devices too" });
    fireEvent.click(share);
    expect(onShareSettingsChange).toHaveBeenCalledWith(false);

    fireEvent.click(screen.getByRole("button", { name: "Restore 2 changes" }));
    expect(onRestore).toHaveBeenCalledWith(
      expect.objectContaining({ settings: { ids: ["spicetify/cli/Extensions/trashbin.js"], share: true } }),
    );
  });

  it("keeps the extension settings choice off this device when it can't be shared", async () => {
    previewSettings.mockResolvedValueOnce(["spicetify/cli/Extensions/trashbin.js"]);
    const onRestore = vi.fn();
    renderTab({ onRestore });
    fireEvent.click(screen.getByRole("button", { name: /^Preview restore of / }));
    await act(() => Promise.resolve());

    expect(screen.queryByRole("checkbox")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Restore 2 changes" }));
    expect(onRestore).toHaveBeenCalledWith(
      expect.objectContaining({ settings: { ids: ["spicetify/cli/Extensions/trashbin.js"], share: false } }),
    );
  });

  it("shows loading rows while checking, and none once the check failed", () => {
    const { rerender } = renderTab({ remote: null });
    expect(screen.getByRole("list", { name: "Loading backups" })).toBeTruthy();
    rerender(<BackupsTab {...tabProps({ remote: null, failed: true })} />);
    expect(screen.queryByRole("list")).toBeNull();
  });

  it("keeps the rows loading until this device's setup is read", () => {
    const { rerender } = renderTab({ local: null });
    expect(screen.getByRole("list", { name: "Loading backups" })).toBeTruthy();
    expect(screen.queryByRole("button", { name: /^Preview restore/ })).toBeNull();
    rerender(<BackupsTab {...tabProps({ local: null, failed: true })} />);
    expect(screen.queryByRole("list")).toBeNull();
    rerender(<BackupsTab {...tabProps()} />);
    expect(screen.getByRole("list", { name: "Backups" })).toBeTruthy();
  });

  it("asks for a sign-in when the backups are locked", () => {
    renderTab({ remote: null, lockedBy: "claimed" });
    expect(screen.getByText("Sign in to see and restore your backups")).toBeTruthy();
  });
});
