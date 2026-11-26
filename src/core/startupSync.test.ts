import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { rememberNotMe } from "./claimNotices";
import { summarizeMarketplaceState } from "./marketplace";
import { runStartupSyncCheck } from "./startupSync";
import { backupNow, fetchRemoteState } from "./syncService";
import type { SyncifyClaim, SyncifyPayload, SyncifyRemoteState } from "../types/syncify";

vi.mock("./config", () => ({ loadConfig: () => ({ workerUrl: "https://worker.test", autoBackupEnabled: true }) }));
vi.mock("./syncService", () => ({ fetchRemoteState: vi.fn(), backupNow: vi.fn(), fetchLaunchNotices: vi.fn() }));
vi.mock("./marketplace", async (original) => ({
  ...(await original<typeof import("./marketplace")>()),
  summarizeMarketplaceState: vi.fn(),
}));
vi.mock("./settingsSync", () => ({
  arrivedText: vi.fn(),
  clearArrived: vi.fn(),
  finishSettingsSync: vi.fn(),
  prepareSettingsSync: vi.fn().mockResolvedValue(null),
}));

const showNotification = vi.fn();
const notices = { onClaim: vi.fn(), onUndone: vi.fn(), onInstall: vi.fn(), onNudge: vi.fn(), onFirstSync: vi.fn() };
const secured: SyncifyClaim = { status: "final", mine: false, email: "j***n@example.com" };

const remote = (changes: Partial<SyncifyRemoteState>): SyncifyRemoteState => ({
  exists: false,
  payload: null,
  backups: [],
  safetyCopy: null,
  pinned: [],
  borrowed: false,
  others: [],
  claim: null,
  unapproved: [],
  install: null,
  nudge: false,
  ...changes,
});
const backup = (hash: string, keys: number) =>
  ({ payload_hash: hash, metadata: { marketplace_key_count: keys } }) as SyncifyPayload;

beforeEach(() => {
  vi.clearAllMocks();
  window.localStorage.clear();
  vi.stubGlobal("Spicetify", { showNotification });
  vi.mocked(summarizeMarketplaceState).mockResolvedValue({ hash: "local", keyCount: 4 } as Awaited<
    ReturnType<typeof summarizeMarketplaceState>
  >);
});
afterEach(() => {
  vi.unstubAllGlobals();
});

describe("runStartupSyncCheck", () => {
  it("backs up what changed when nothing asks first", async () => {
    vi.mocked(fetchRemoteState).mockResolvedValue(remote({}));
    await runStartupSyncCheck(notices);
    expect(backupNow).toHaveBeenCalledOnce();
    expect(notices.onClaim).not.toHaveBeenCalled();
  });

  it("asks before the first backup on a username secured with another email", async () => {
    vi.mocked(fetchRemoteState).mockResolvedValue(remote({ claim: secured }));
    await runStartupSyncCheck(notices);
    expect(notices.onClaim).toHaveBeenCalledWith(secured);
    expect(backupNow).not.toHaveBeenCalled();
  });

  it("backs up there once Not me was answered, without asking again", async () => {
    rememberNotMe(secured);
    vi.mocked(fetchRemoteState).mockResolvedValue(remote({ claim: secured }));
    await runStartupSyncCheck(notices);
    expect(notices.onClaim).not.toHaveBeenCalled();
    expect(backupNow).toHaveBeenCalledOnce();
  });

  it("keeps backing up a Syncify that already has backups there", async () => {
    const own = backup("own", 4);
    vi.mocked(fetchRemoteState).mockResolvedValue(
      remote({ claim: secured, exists: true, payload: own, backups: [own] }),
    );
    await runStartupSyncCheck(notices);
    expect(notices.onClaim).toHaveBeenCalledWith(secured);
    expect(backupNow).toHaveBeenCalledOnce();
  });

  it("waits for a restore when other Syncifys' backups stand in and hold much more", async () => {
    const before = backup("before", 40);
    vi.mocked(fetchRemoteState).mockResolvedValue(
      remote({ exists: true, borrowed: true, payload: before, backups: [before] }),
    );
    await runStartupSyncCheck(notices);
    expect(backupNow).not.toHaveBeenCalled();
    expect(showNotification).toHaveBeenCalledWith(
      "Syncify found a larger cloud backup. Open Syncify to restore before backing up.",
      true,
      8000,
    );
  });

  it("asks about someone else's claim before another Syncify's backups", async () => {
    const waiting = { id: "w", device: "Windows", first_seen_at: 0 };
    vi.mocked(fetchRemoteState).mockResolvedValue(remote({ claim: secured, install: { waiting: [waiting] } }));
    await runStartupSyncCheck(notices);
    expect(notices.onClaim).toHaveBeenCalledOnce();
    expect(notices.onInstall).not.toHaveBeenCalled();

    rememberNotMe(secured);
    await runStartupSyncCheck(notices);
    expect(notices.onInstall).toHaveBeenCalledWith(waiting);
  });
});
