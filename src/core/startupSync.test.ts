import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { rememberNotMe, type SecuredElsewhere } from "./claimNotices";
import { summarizeMarketplaceState } from "./marketplace";
import { runStartupSyncCheck } from "./startupSync";
import { BackupLimitedError } from "../api/syncifyApi";
import { backupNow, fetchRemoteState } from "./syncService";
import type { SyncifyPayload, SyncifyRemoteState } from "../types/syncify";

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
const notices = { onSecuredElsewhere: vi.fn(), onInstall: vi.fn(), onNudge: vi.fn(), onFirstSync: vi.fn() };
const secured: SecuredElsewhere = { status: "final", mine: false, emails: ["j***n@example.com"] };

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
    expect(notices.onSecuredElsewhere).not.toHaveBeenCalled();
  });

  it("waits out a minute's limit and backs up after it, without a word, but not a day's", async () => {
    vi.useFakeTimers();
    try {
      vi.mocked(fetchRemoteState).mockResolvedValue(remote({}));
      vi.mocked(backupNow).mockRejectedValueOnce(new BackupLimitedError(60));
      const check = runStartupSyncCheck(notices);
      await vi.advanceTimersByTimeAsync(59_000);
      expect(backupNow).toHaveBeenCalledOnce();
      await vi.advanceTimersByTimeAsync(1_000);
      await check;
      expect(backupNow).toHaveBeenCalledTimes(2);
      expect(showNotification).toHaveBeenCalledExactlyOnceWith("Syncify auto-backup complete");

      vi.clearAllMocks();
      vi.mocked(backupNow).mockRejectedValueOnce(new BackupLimitedError(12 * 60 * 60));
      await runStartupSyncCheck(notices);
      expect(backupNow).toHaveBeenCalledOnce();
      expect(showNotification).toHaveBeenCalledExactlyOnceWith("Syncify auto-sync skipped: Backup failed with HTTP 429.", true, 8000);
    } finally {
      vi.useRealTimers();
    }
  });

  it("asks before the first backup on a username secured with another email", async () => {
    vi.mocked(fetchRemoteState).mockResolvedValue(remote({ claim: secured }));
    await runStartupSyncCheck(notices);
    expect(notices.onSecuredElsewhere).toHaveBeenCalledWith(secured);
    expect(backupNow).not.toHaveBeenCalled();
  });

  it("backs up there once Not me was answered, without asking again", async () => {
    rememberNotMe(secured);
    vi.mocked(fetchRemoteState).mockResolvedValue(remote({ claim: secured }));
    await runStartupSyncCheck(notices);
    expect(notices.onSecuredElsewhere).not.toHaveBeenCalled();
    expect(backupNow).toHaveBeenCalledOnce();
  });

  it("keeps backing up a Syncify that already has backups there", async () => {
    const own = backup("own", 4);
    vi.mocked(fetchRemoteState).mockResolvedValue(
      remote({ claim: secured, exists: true, payload: own, backups: [own] }),
    );
    await runStartupSyncCheck(notices);
    expect(notices.onSecuredElsewhere).toHaveBeenCalledWith(secured);
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

  it("saves what was restored from another Syncify's backup as its own", async () => {
    const before = backup("local", 4);
    vi.mocked(fetchRemoteState).mockResolvedValue(
      remote({ exists: true, borrowed: true, payload: before, backups: [before] }),
    );
    await runStartupSyncCheck(notices);
    expect(backupNow).toHaveBeenCalledOnce();

    // Already in a backup of its own: nothing to save.
    vi.mocked(backupNow).mockClear();
    vi.mocked(fetchRemoteState).mockResolvedValue(remote({ exists: true, payload: before, backups: [before] }));
    await runStartupSyncCheck(notices);
    expect(backupNow).not.toHaveBeenCalled();
  });

  it("asks about a backup secured elsewhere before another Syncify's backups, and again once one more email secures it", async () => {
    const waiting = { id: "w", device: "Windows", first_seen_at: 0 };
    vi.mocked(fetchRemoteState).mockResolvedValue(remote({ claim: secured, install: { waiting: [waiting] } }));
    await runStartupSyncCheck(notices);
    expect(notices.onSecuredElsewhere).toHaveBeenCalledOnce();
    expect(notices.onInstall).not.toHaveBeenCalled();

    rememberNotMe(secured);
    await runStartupSyncCheck(notices);
    expect(notices.onInstall).toHaveBeenCalledWith(waiting);

    const more = { ...secured, emails: [...secured.emails, "s***m@example.com"] };
    vi.mocked(fetchRemoteState).mockResolvedValue(remote({ claim: more }));
    await runStartupSyncCheck(notices);
    expect(notices.onSecuredElsewhere).toHaveBeenLastCalledWith(more);
  });
});
