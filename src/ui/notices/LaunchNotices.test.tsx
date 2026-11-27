import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PairingCodeError } from "../../api/syncifyApi";
import { securedElsewhere, type SecuredElsewhere } from "../../core/claimNotices";
import { answerWaitingInstall } from "../../core/syncService";
import type { SyncifyConfig } from "../../types/syncify";
import { InstallNotice, NudgeNotice, SecuredElsewhereNotice } from "./LaunchNotices";

const config: SyncifyConfig = { workerUrl: null, autoBackupEnabled: true, shortcut: null, entryPoint: "both", settingsSyncEnabled: true, settingsSyncOff: [], shareRestoredSettings: true };

vi.mock("../../core/config", () => ({ loadConfig: () => config }));
vi.mock("../../core/syncService", () => ({ answerWaitingInstall: vi.fn() }));

const showNotification = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal("Spicetify", { showNotification });
  window.localStorage.clear();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

const install = { id: "w", device: "Linux", first_seen_at: 0 };

describe("InstallNotice", () => {
  it("asks for that Syncify's code before That's me, then closes", async () => {
    vi.mocked(answerWaitingInstall).mockResolvedValue();
    const onDone = vi.fn();
    render(<InstallNotice install={install} onDone={onDone} />);
    fireEvent.click(screen.getByRole("button", { name: "That's me" }));
    expect(answerWaitingInstall).not.toHaveBeenCalled();
    expect(screen.getByText("Enter the code from that Syncify")).toBeTruthy();
    // Nothing to send until the whole code is typed.
    expect(screen.getByRole("button", { name: "That's me" })).toHaveProperty("disabled", true);
    fireEvent.change(screen.getByLabelText("Code"), { target: { value: "k1c yes" } });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "That's me" }));
    });
    expect(answerWaitingInstall).toHaveBeenCalledWith(config, "w", { action: "approve", code: "K1CYES" });
    expect(showNotification).toHaveBeenCalledWith("Syncify: backups brought together");
    expect(onDone).toHaveBeenCalledOnce();
  });

  it("keeps a wrong code in the field, with what's wrong under it", async () => {
    vi.mocked(answerWaitingInstall).mockRejectedValue(new PairingCodeError());
    const onDone = vi.fn();
    render(<InstallNotice install={install} onDone={onDone} />);
    fireEvent.click(screen.getByRole("button", { name: "That's me" }));
    fireEvent.change(screen.getByLabelText("Code"), { target: { value: "AAAAAA" } });
    await act(async () => {
      fireEvent.submit(screen.getByLabelText("Code"));
    });
    expect(screen.getByLabelText("Code")).toHaveProperty("value", "AAAAAA");
    expect(screen.getByLabelText("Code").getAttribute("aria-invalid")).toBe("true");
    expect(screen.getByText(/That code doesn't match/)).toBeTruthy();
    expect(onDone).not.toHaveBeenCalled();
    // Back returns to the question.
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(screen.getByRole("button", { name: "Not me" })).toBeTruthy();
  });

  it("answers Not me at once and closes", async () => {
    vi.mocked(answerWaitingInstall).mockResolvedValue();
    const onDone = vi.fn();
    render(<InstallNotice install={install} onDone={onDone} />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Not me" }));
    });
    expect(answerWaitingInstall).toHaveBeenCalledWith(config, "w", { action: "reject" });
    expect(showNotification).toHaveBeenCalledWith("Syncify: backups kept apart");
    expect(onDone).toHaveBeenCalledOnce();
  });

  it("keeps the notice open with the error when the answer fails", async () => {
    vi.mocked(answerWaitingInstall).mockRejectedValue(new Error("Couldn't reach Syncify."));
    const onDone = vi.fn();
    render(<InstallNotice install={install} onDone={onDone} />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Not me" }));
    });
    expect(screen.getByText("Couldn't reach Syncify.")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Not me" })).toHaveProperty("disabled", false);
    expect(onDone).not.toHaveBeenCalled();
  });
});

describe("SecuredElsewhereNotice", () => {
  const secured: SecuredElsewhere = { status: "final", mine: false, emails: ["j***n@gmail.com"] };

  it("stops asking about a backup secured with another email after Not me", () => {
    const onClose = vi.fn();
    render(<SecuredElsewhereNotice claim={secured} signedIn onSignIn={() => {}} onClose={onClose} />);
    expect(screen.getByText("This backup is secured by j***n@gmail.com")).toBeTruthy();
    expect(screen.getAllByRole("button").map((button) => button.textContent)).toEqual(["Close", "Not me"]);
    fireEvent.click(screen.getByRole("button", { name: "Not me" }));
    expect(onClose).toHaveBeenCalledOnce();
    expect(securedElsewhere(secured)).toBeNull();
    // One more email securing it is asked about again.
    expect(securedElsewhere({ ...secured, emails: [...secured.emails, "o***r@gmail.com"] })).not.toBeNull();
  });

  it("names every email it's secured with", () => {
    const three = { ...secured, emails: ["j***n@gmail.com", "o***r@gmail.com", "s***m@example.com"] };
    render(<SecuredElsewhereNotice claim={three} signedIn={false} onSignIn={() => {}} onClose={() => {}} />);
    expect(screen.getByText("This backup is secured by j***n@gmail.com, o***r@gmail.com and s***m@example.com")).toBeTruthy();
    expect(screen.getByText(/If one of them is your email, sign in to see your backups/)).toBeTruthy();
  });

  it("offers signing in first when signed out, without answering", () => {
    const onSignIn = vi.fn();
    render(<SecuredElsewhereNotice claim={secured} signedIn={false} onSignIn={onSignIn} onClose={() => {}} />);
    expect(screen.getAllByRole("button").map((button) => button.textContent)).toEqual(["Not me", "That's me, sign in"]);
    fireEvent.click(screen.getByRole("button", { name: "That's me, sign in" }));
    expect(onSignIn).toHaveBeenCalledOnce();
    expect(securedElsewhere(secured)).not.toBeNull();
  });
});

describe("NudgeNotice", () => {
  it("keeps Secure's click inside the popup", () => {
    const onSecure = vi.fn();
    const outside = vi.fn();
    const { container } = render(
      <div onClick={outside}>
        <NudgeNotice onSecure={onSecure} onClose={() => {}} />
      </div>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Secure" }));
    expect(onSecure).toHaveBeenCalledOnce();
    expect(outside).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Not now" }));
    expect(outside).toHaveBeenCalledOnce();
    expect(container.textContent).toContain("Your backup isn't secured");
  });
});
