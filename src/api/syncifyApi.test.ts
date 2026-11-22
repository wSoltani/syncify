import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getDeviceKey, loadSession } from "../core/account";
import { getInstallKey } from "../core/installKey";
import { replaceInstall } from "../core/client";
import { DatabaseUnavailableError } from "../core/database";
import { request } from "./syncifyApi";

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
