import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createManageLink, refreshSession, sendCode, signIn, signOut } from "../../api/accountApi";
import { listShares } from "../../api/sharesApi";
import { saveSignInDraft, type AccountSession } from "../../core/account";
import { AccountTab } from "./AccountTab";

vi.mock("../../api/accountApi", async (original) => ({
  ...(await original<typeof import("../../api/accountApi")>()),
  sendCode: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
  refreshSession: vi.fn(),
  createManageLink: vi.fn(),
}));
vi.mock("../../api/sharesApi", () => ({ listShares: vi.fn() }));
vi.mock("../window/openExternal", () => ({ openExternal: vi.fn() }));

const listing = (handle: string | null): Awaited<ReturnType<typeof listShares>> => ({
  codes: [],
  newHearts: 0,
  max: 5,
  profile: handle ? { handle, link: null } : null,
  suggestedHandle: null,
});

const session: AccountSession = { token: "token", email: "alice@example.com" };

type TabProps = Parameters<typeof AccountTab>[0];

const tabProps = (changes: Partial<TabProps> = {}): TabProps => ({
  idBase: "t",
  session: null,
  locked: null,
  secure: { kind: "open" },
  securing: false,
  secureError: null,
  onSecure: () => {},
  nudge: false,
  onSignedIn: () => {},
  onSignedOut: () => {},
  handle: "alice",
  onHandle: () => {},
  ...changes,
});

const renderTab = async (changes: Partial<TabProps> = {}) => {
  const view = render(<AccountTab {...tabProps(changes)} />);
  // Lets the session check settle.
  await act(async () => {});
  return view;
};

beforeEach(() => {
  vi.clearAllMocks();
  saveSignInDraft({ email: "", codeSentAt: null, retryAt: 0, retryEmail: null });
  vi.mocked(refreshSession).mockResolvedValue(session);
  vi.mocked(listShares).mockResolvedValue(listing(null));
});

describe("AccountTab signed out", () => {
  it("checks the email when it's sent, and keeps what was typed", async () => {
    await renderTab();
    const email = screen.getByLabelText("Email for sign-in codes");
    fireEvent.change(email, { target: { value: "alice@" } });
    fireEvent.click(screen.getByRole("button", { name: "Send code" }));
    expect(screen.getByText("Enter a valid email address.")).toBeTruthy();
    expect((email as HTMLInputElement).value).toBe("alice@");
    expect(sendCode).not.toHaveBeenCalled();
  });

  it("sends a code, then signs in with it", async () => {
    vi.mocked(sendCode).mockResolvedValue(60);
    vi.mocked(signIn).mockResolvedValue(session);
    const onSignedIn = vi.fn();
    await renderTab({ onSignedIn });

    fireEvent.change(screen.getByLabelText("Email for sign-in codes"), { target: { value: "alice@example.com" } });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Send code" }));
    });
    expect(sendCode).toHaveBeenCalledWith("alice@example.com", { nudge: false });

    const code = screen.getByLabelText("Code sent to a***e@example.com");
    fireEvent.change(code, { target: { value: "12a3456" } });
    expect((code as HTMLInputElement).value).toBe("123456");
    expect(screen.getByRole("button", { name: /^Resend in / })).toHaveProperty("disabled", true);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Verify" }));
    });
    expect(signIn).toHaveBeenCalledWith("alice@example.com", "123456");
    expect(onSignedIn).toHaveBeenCalledWith(session);
  });

  it("goes back to the email from the code step", async () => {
    saveSignInDraft({ email: "alice@example.com", codeSentAt: Date.now(), retryAt: 0, retryEmail: null });
    await renderTab();
    fireEvent.click(screen.getByRole("button", { name: "Use another email" }));
    expect(screen.getByLabelText("Email for sign-in codes")).toBeTruthy();
  });

  it("asks for the email that secured a locked backup", async () => {
    await renderTab({ locked: "claimed" });
    expect(screen.getByText("Sign in with the email that secured this backup")).toBeTruthy();
  });
});

describe("AccountTab signed in", () => {
  it("shows the masked email, the handle and where securing stands", async () => {
    await renderTab({ session, secure: { kind: "secured", linkedCount: 2 } });
    expect(screen.getByText("a***e@example.com")).toBeTruthy();
    expect(screen.getByText("@alice")).toBeTruthy();
    expect(screen.getByText("This backup is secured")).toBeTruthy();
    expect(screen.getByText("2 Spotify accounts linked")).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Secure" })).toBeNull();
  });

  it("offers Secure while the backup is open", async () => {
    const onSecure = vi.fn();
    await renderTab({ session, onSecure });
    fireEvent.click(screen.getByRole("button", { name: "Secure" }));
    expect(onSecure).toHaveBeenCalledOnce();
    expect(screen.getByText("Signed in")).toBeTruthy();
  });

  it("opens the account page signed in", async () => {
    vi.mocked(createManageLink).mockResolvedValue("https://example.com/account");
    const { openExternal } = await import("../window/openExternal");
    await renderTab({ session });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Open" }));
    });
    expect(openExternal).toHaveBeenCalledWith("https://example.com/account");
  });

  it("signs out, and starts the next sign-in from the same email", async () => {
    vi.mocked(signOut).mockResolvedValue();
    const onSignedOut = vi.fn();
    await renderTab({ session, onSignedOut });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Sign out" }));
    });
    expect(signOut).toHaveBeenCalledOnce();
    expect(onSignedOut).toHaveBeenCalledOnce();
  });

  it("signs out when the service no longer knows the session", async () => {
    vi.mocked(refreshSession).mockResolvedValue(null);
    const onSignedOut = vi.fn();
    await renderTab({ session, onSignedOut });
    expect(onSignedOut).toHaveBeenCalledOnce();
  });

  it("asks for the handle once when it isn't known yet", async () => {
    vi.mocked(listShares).mockResolvedValue(listing("alice"));
    const onHandle = vi.fn();
    await renderTab({ session, handle: undefined, onHandle });
    expect(listShares).toHaveBeenCalledOnce();
    expect(onHandle).toHaveBeenCalledWith("alice");
  });
});
