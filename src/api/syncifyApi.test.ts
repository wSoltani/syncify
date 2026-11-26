import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getDeviceKey, loadSession } from "../core/account";
import { getInstallKey } from "../core/installKey";
import { replaceInstall } from "../core/client";
import { DatabaseUnavailableError } from "../core/database";
import { PairingCodeError, answerInstall, downloadPayload, request } from "./syncifyApi";

vi.mock("../core/account", () => ({
  clearSession: vi.fn(),
  getDeviceKey: vi.fn(),
  getSalt: vi.fn().mockResolvedValue("salt"),
  loadSession: vi.fn(),
  saveSalt: vi.fn(),
}));
vi.mock("../core/installKey", () => ({ getInstallKey: vi.fn() }));
vi.mock("../core/client", () => ({
  getClientHeaders: vi.fn().mockResolvedValue({ "x-syncify-install": "install-1" }),
  replaceInstall: vi.fn(),
}));
vi.mock("../core/requestSignature", () => ({ signRequest: vi.fn().mockResolvedValue("signature") }));

const identity = { hash: "a".repeat(64), field: "username" as const };
const fetchMock = vi.fn();

beforeEach(() => {
  vi.stubGlobal("fetch", fetchMock);
  vi.mocked(getInstallKey).mockResolvedValue(null);
  vi.mocked(getDeviceKey).mockResolvedValue(null);
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("request", () => {
  it("sends nothing when the session can't be read, rather than sending it unsigned", async () => {
    vi.mocked(loadSession).mockRejectedValue(new Error("IndexedDB failed."));
    await expect(request("https://worker.test", identity, {})).rejects.toThrow("IndexedDB failed.");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends nothing when the install key can't be read", async () => {
    vi.mocked(loadSession).mockResolvedValue(null);
    vi.mocked(getInstallKey).mockRejectedValue(new Error("IndexedDB failed."));
    await expect(request("https://worker.test", identity, {})).rejects.toThrow("IndexedDB failed.");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends unsigned on a device without IndexedDB", async () => {
    vi.mocked(loadSession).mockRejectedValue(new DatabaseUnavailableError());
    fetchMock.mockResolvedValue(new Response("{}"));
    await request("https://worker.test", identity, {});
    expect(fetchMock.mock.calls[0][1].headers.authorization).toBeUndefined();
  });

  it("starts over as a new install, once, when its key no longer matches", async () => {
    vi.mocked(loadSession).mockResolvedValue(null);
    vi.mocked(getInstallKey).mockResolvedValue({ privateKey: {} as CryptoKey, publicKey: "key" });
    fetchMock
      .mockResolvedValueOnce(new Response(JSON.stringify({ code: "install_key_mismatch" }), { status: 401 }))
      .mockResolvedValueOnce(new Response("{}"));
    const response = await request("https://worker.test", identity, {});
    expect(response.status).toBe(200);
    expect(replaceInstall).toHaveBeenCalledExactlyOnceWith("install-1");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});

describe("downloadPayload", () => {
  const backup = (hash: string, at: string, mark: Record<string, unknown>) => ({
    payload_hash: hash,
    metadata: { last_sync_datetime: at, device_info: "Windows", marketplace_key_count: 1 },
    marketplace_data: { keys: {} },
    backup: mark,
  });

  const hashes = (backups: { payload_hash: string }[]) => backups.map((entry) => entry.payload_hash);
  const answerWith = (first: object, ...rest: object[]) =>
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ ...first, backup_history: rest })));

  beforeEach(() => {
    vi.mocked(loadSession).mockResolvedValue(null);
  });

  it("counts this Syncify's own waiting backups as its latest, and keeps unconfirmed ones apart", async () => {
    const rolling = backup("old", "2026-11-01T10:00:00.000Z", { id: "1", kind: "rolling" });
    const own = backup("own", "2026-11-20T10:00:00.000Z", { id: "2", kind: "quarantined", mine: true });
    const stranger = backup("stranger", "2026-11-21T10:00:00.000Z", { id: "3", kind: "quarantined" });
    answerWith(rolling, own, stranger);

    const remote = await downloadPayload("https://worker.test", identity);
    expect(remote.payload?.payload_hash).toBe("own");
    expect(hashes(remote.backups)).toEqual(["own", "old"]);
    expect(hashes(remote.unapproved)).toEqual(["stranger"]);
    expect(remote.borrowed).toBe(false);
  });

  it("lists other Syncifys' backups under this one's, never as its latest or its safety copy", async () => {
    const theirs = backup("theirs", "2026-11-25T10:00:00.000Z", { id: "1", kind: "rolling", other: true });
    const theirCopy = backup("their-copy", "2026-11-02T10:00:00.000Z", { id: "2", kind: "anchor", other: true });
    const own = backup("own", "2026-11-20T10:00:00.000Z", { id: "3", kind: "rolling" });
    // The backup service lists the newest first, whoever made it.
    answerWith(theirs, own, theirCopy);

    const remote = await downloadPayload("https://worker.test", identity);
    expect(remote.payload?.payload_hash).toBe("own");
    expect(hashes(remote.backups)).toEqual(["own"]);
    expect(remote.safetyCopy).toBeNull();
    expect(hashes(remote.others)).toEqual(["theirs", "their-copy"]);
    expect(remote.borrowed).toBe(false);
  });

  it("lets the others stand in until this Syncify has a backup of its own", async () => {
    const latest = backup("latest", "2026-11-25T10:00:00.000Z", { id: "1", kind: "rolling", other: true });
    const older = backup("older", "2026-11-24T10:00:00.000Z", { id: "2", kind: "rolling", other: true });
    const copy = backup("copy", "2026-11-02T10:00:00.000Z", { id: "3", kind: "anchor", other: true });
    answerWith(latest, older, copy);

    const remote = await downloadPayload("https://worker.test", identity);
    expect(remote.exists).toBe(true);
    expect(remote.borrowed).toBe(true);
    expect(remote.payload?.payload_hash).toBe("latest");
    expect(hashes(remote.backups)).toEqual(["latest", "older"]);
    expect(remote.safetyCopy?.payload_hash).toBe("copy");
    expect(remote.others).toEqual([]);
  });

  it("reads who secured the backup and whether Not me can stop a claim", async () => {
    const own = backup("own", "2026-11-20T10:00:00.000Z", { id: "1", kind: "rolling" });
    answerWith({ ...own, claim: { status: "final", mine: false, email: "j***n@example.com" } });
    expect((await downloadPayload("https://worker.test", identity)).claim).toEqual({
      status: "final",
      mine: false,
      email: "j***n@example.com",
    });

    const pending = { status: "pending", mine: false, email: "j***n@example.com", final_at: 5, held: false };
    answerWith({ ...own, claim: { ...pending, can_cancel: true } });
    expect((await downloadPayload("https://worker.test", identity)).claim).toMatchObject({ can_cancel: true });
    // Without the mark, Not me promises nothing.
    answerWith({ ...own, claim: pending });
    expect((await downloadPayload("https://worker.test", identity)).claim).toMatchObject({ can_cancel: false });
  });
});

describe("answerInstall", () => {
  const install = "33333333-3333-4333-8333-333333333333";

  beforeEach(() => {
    vi.mocked(loadSession).mockResolvedValue(null);
  });

  it("sends That's me with the other Syncify's code, and Not me without one", async () => {
    fetchMock.mockImplementation(async () => new Response(JSON.stringify({ ok: true })));
    await answerInstall("https://worker.test", identity, install, { action: "approve", code: "K1CYES" });
    await answerInstall("https://worker.test", identity, install, { action: "reject" });
    expect(fetchMock.mock.calls.map(([, init]) => JSON.parse(init.body))).toEqual([
      { install, action: "approve", code: "K1CYES" },
      { install, action: "reject" },
    ]);
  });

  it("tells a code that doesn't match from any other failure", async () => {
    const refuse = (status: number, code?: string) =>
      fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ code }), { status }));
    const approve = () => answerInstall("https://worker.test", identity, install, { action: "approve", code: "AAAAAA" });

    refuse(403, "code_mismatch");
    await expect(approve()).rejects.toBeInstanceOf(PairingCodeError);
    refuse(429);
    await expect(approve()).rejects.toThrow("Too many tries. Wait a minute and try again.");
    // Already answered, or it signed in since: nothing left to do.
    refuse(404, "not_pending");
    await expect(approve()).resolves.toBeUndefined();
  });
});
