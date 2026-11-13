import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ShareCode } from "../../api/sharesApi";
import type { SyncifyConfig } from "../../types/syncify";
import { codeFacts, deleteCodeText, pickKinds } from "./shareText";
import { ShareTab } from "./ShareTab";

const shares = vi.hoisted(() => ({
  listShares: vi.fn(),
  deleteShare: vi.fn(),
  createShare: vi.fn(),
  fetchPicks: vi.fn(),
}));
vi.mock("../../api/sharesApi", async (original) => ({
  ...(await original<typeof import("../../api/sharesApi")>()),
  ...shares,
}));
// This device's items: one extension from GitHub.
vi.mock("../../core/marketplace", () => ({
  collectMarketplaceKeys: () =>
    Promise.resolve({
      "marketplace:installed-extensions": JSON.stringify(["marketplace:installed:a/b/one.js"]),
      "marketplace:installed:a/b/one.js": JSON.stringify({
        title: "One",
        user: "a",
        repo: "b",
        extensionURL: "https://raw.githubusercontent.com/a/b/main/one.js",
      }),
    }),
}));
vi.mock("../../core/sourceChecks", async (original) => ({
  ...(await original<typeof import("../../core/sourceChecks")>()),
  checkCatalog: (_items: unknown, checks: unknown) => Promise.resolve(checks),
}));

const code = (changes: Partial<ShareCode> = {}): ShareCode => ({
  code: "GMSMDX",
  name: "Clean and quiet",
  link: "https://example.com/GMSMDX",
  item_count: 8,
  imports: 12,
  created_at: 0,
  updated_at: 0,
  posted: true,
  ...changes,
});

const session = { token: "t", email: "someone@example.com" };
type TabProps = Parameters<typeof ShareTab>[0];
const tabProps = (changes: Partial<TabProps> = {}): TabProps => ({
  idBase: "t",
  config: {} as SyncifyConfig,
  session,
  localItems: [],
  localConfig: null,
  localTheme: null,
  marketplaceAvailable: true,
  busy: false,
  onSignIn: () => {},
  onSignedOut: () => {},
  onCodeCount: () => {},
  onHandle: () => {},
  ...changes,
});

async function renderTab(changes: Partial<TabProps> = {}) {
  render(<ShareTab {...tabProps(changes)} />);
  await act(() => Promise.resolve());
}

beforeEach(() => {
  vi.clearAllMocks();
  shares.fetchPicks.mockResolvedValue(null);
  shares.listShares.mockResolvedValue({
    codes: [code()],
    newHearts: 0,
    max: 5,
    profile: { handle: "someone", link: null },
    suggestedHandle: null,
  });
});

describe("ShareTab", () => {
  it("asks to sign in to share, and lists nothing signed out", async () => {
    const onSignIn = vi.fn();
    await renderTab({ session: null, onSignIn });
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));
    expect(onSignIn).toHaveBeenCalled();
    expect(shares.listShares).not.toHaveBeenCalled();
  });

  it("shows the codes against the limit", async () => {
    const onCodeCount = vi.fn();
    await renderTab({ onCodeCount });
    expect(screen.getByText("Clean and quiet")).toBeTruthy();
    expect(screen.getByRole("meter").getAttribute("aria-valuetext")).toBe("Used 1 of 5");
    expect(onCodeCount).toHaveBeenCalledWith(1);
  });

  it("keeps Create a code visible but off at the limit", async () => {
    shares.listShares.mockResolvedValue({
      codes: [code()],
      newHearts: 0,
      max: 1,
      profile: null,
      suggestedHandle: null,
    });
    await renderTab();
    expect((screen.getByRole("button", { name: "Create a code" }) as HTMLButtonElement).disabled).toBe(true);
  });

  it("deletes a code only from its dialog", async () => {
    shares.deleteShare.mockResolvedValue(undefined);
    await renderTab();
    fireEvent.click(screen.getByRole("button", { name: "More for Clean and quiet" }));
    fireEvent.click(screen.getByRole("menuitem", { name: "Delete" }));
    expect(screen.getByText(deleteCodeText(code()))).toBeTruthy();
    expect(shares.deleteShare).not.toHaveBeenCalled();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Delete code" }));
    });
    expect(shares.deleteShare).toHaveBeenCalledWith("GMSMDX");
  });

  it("checks a first handle on Create code, not while typing", async () => {
    shares.listShares.mockResolvedValue({ codes: [], newHearts: 0, max: 5, profile: null, suggestedHandle: null });
    await renderTab();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Create a code" }));
    });
    const handle = screen.getByLabelText("Pick a handle for your profile");
    fireEvent.change(handle, { target: { value: "a" } });
    expect(screen.queryByRole("alert")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Create code" }));
    expect(screen.getByRole("alert").textContent).toBe("At least 3 characters");
    expect(shares.createShare).not.toHaveBeenCalled();
  });
});

describe("share text", () => {
  it("writes a code's facts and what deleting it loses", () => {
    expect(codeFacts(code())).toEqual(["Used by 12", "On Discover"]);
    expect(codeFacts(code({ posted: false, imports: 0 }))).toEqual(["Used by 0"]);
    expect(deleteCodeText(code({ imports: 1 }))).toBe(
      "The code stops working and its Discover post comes down. 1 person used it.",
    );
    expect(deleteCodeText(code({ posted: false, imports: 0 }))).toBe("The code stops working.");
  });

  it("draws at most 12 squares for a pick", () => {
    expect(pickKinds({ code: "c", name: "n", extensions: 2, themes: 1, snippets: 0 })).toEqual([
      "extension",
      "extension",
      "theme",
    ]);
    expect(pickKinds({ code: "c", name: "n", extensions: 20, themes: 3, snippets: 3 })).toHaveLength(12);
  });
});
