import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getDeviceKey, loadSession } from "../core/account";
import { getInstallKey } from "../core/installKey";
import { replaceInstall } from "../core/client";
import { DatabaseUnavailableError } from "../core/database";
import { downloadPayload, request } from "./syncifyApi";

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

  it("counts this device's own waiting backups as its latest, and keeps other devices' apart", async () => {
    vi.mocked(loadSession).mockResolvedValue(null);
    const rolling = backup("old", "2026-11-01T10:00:00.000Z", { id: "1", kind: "rolling" });
    const own = backup("own", "2026-11-20T10:00:00.000Z", { id: "2", kind: "quarantined", mine: true });
    const stranger = backup("stranger", "2026-11-21T10:00:00.000Z", { id: "3", kind: "quarantined" });
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ ...rolling, backup_history: [own, stranger] })));

    const remote = await downloadPayload("https://worker.test", identity);
    expect(remote.payload?.payload_hash).toBe("own");
    expect(remote.backups.map((entry) => entry.payload_hash)).toEqual(["own", "old"]);
    expect(remote.unapproved.map((entry) => entry.payload_hash)).toEqual(["stranger"]);
  });
});
