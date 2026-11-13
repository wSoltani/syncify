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

  it("shows loading rows while checking, and none once the check failed", () => {
    const { rerender } = renderTab({ remote: null });
    expect(screen.getByRole("list", { name: "Loading backups" })).toBeTruthy();
    rerender(<BackupsTab {...tabProps({ remote: null, failed: true })} />);
    expect(screen.queryByRole("list")).toBeNull();
  });

  it("asks for a sign-in when the backups are locked", () => {
    renderTab({ remote: null, lockedBy: "claimed" });
    expect(screen.getByText("Sign in to see and restore your backups")).toBeTruthy();
  });
});
