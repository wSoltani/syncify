import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { answerWaitingInstall, cancelPendingClaim } from "../../core/syncService";
import type { SyncifyConfig } from "../../types/syncify";
import { ClaimNotice, InstallNotice, NudgeNotice } from "./LaunchNotices";

const config: SyncifyConfig = { workerUrl: null, autoBackupEnabled: true, shortcut: null, entryPoint: "both" };

vi.mock("../../core/config", () => ({ loadConfig: () => config }));
vi.mock("../../core/syncService", () => ({ answerWaitingInstall: vi.fn(), cancelPendingClaim: vi.fn() }));

const showNotification = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal("Spicetify", { showNotification });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

const install = { id: "w", device: "Linux", first_seen_at: 0 };

describe("InstallNotice", () => {
  it("approves the install and closes", async () => {
    vi.mocked(answerWaitingInstall).mockResolvedValue();
    const onDone = vi.fn();
    render(<InstallNotice install={install} onDone={onDone} />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Approve" }));
    });
    expect(answerWaitingInstall).toHaveBeenCalledWith(config, "w", "approve");
    expect(showNotification).toHaveBeenCalledWith("Syncify: install approved");
    expect(onDone).toHaveBeenCalledOnce();
  });

  it("keeps the notice open with the error when the answer fails", async () => {
    vi.mocked(answerWaitingInstall).mockRejectedValue(new Error("Couldn't reach Syncify."));
    const onDone = vi.fn();
    render(<InstallNotice install={install} onDone={onDone} />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Not mine" }));
    });
    expect(screen.getByText("Couldn't reach Syncify.")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Not mine" })).toHaveProperty("disabled", false);
    expect(onDone).not.toHaveBeenCalled();
  });
});

describe("ClaimNotice", () => {
  it("answers Not me and closes", async () => {
    vi.mocked(cancelPendingClaim).mockResolvedValue("cancelled");
    const onClose = vi.fn();
    render(
      <ClaimNotice
        claim={{ status: "pending", mine: false, email: "j***n@gmail.com", final_at: Date.now(), held: false }}
        onClose={onClose}
      />,
    );
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Not me" }));
    });
    expect(cancelPendingClaim).toHaveBeenCalledOnce();
    expect(showNotification).toHaveBeenCalledWith("Syncify: claim cancelled");
    expect(onClose).toHaveBeenCalledOnce();
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
