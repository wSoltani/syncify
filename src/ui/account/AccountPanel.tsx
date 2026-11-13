import { useEffect, useState } from "react";
import {
  AccountError,
  createManageLink,
  describeAccountError,
  refreshSession,
  sendCode,
  signIn,
  signOut,
} from "../../api/accountApi";
import { listShares, profileUrl } from "../../api/sharesApi";
import type { LockedError } from "../../api/syncifyApi";
import {
  getSignInDraft,
  saveSignInDraft,
  type AccountSession,
  type SignInDraft,
} from "../../core/account";
import { Meta } from "../kit";
import { ClockIcon, ExternalIcon } from "../legacyIcons";
import type { WindowMessage } from "../window/message";
import { pendingSecureText, type SecureState } from "./secureState";

// Codes are 6 digits and work for 10 minutes.
const CODE_LENGTH = 6;
const CODE_VALID_MS = 10 * 60 * 1000;
// Longer waits (until tomorrow) are only explained, not counted down.
const MAX_COUNTDOWN_SECONDS = 5 * 60;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** "a***@gmail.com" */
function maskEmail(email: string): string {
  const at = email.lastIndexOf("@");
  if (at < 1) return email;
  return `${email[0]}***${email.slice(at)}`;
}

/** "0:45" */
function formatCountdown(seconds: number): string {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

const ENDED = {
  owner: "This backup isn't secured. Someone using this Spotify account said it isn't yours.",
  admin: "This backup isn't secured. Syncify couldn't confirm it's yours.",
  undone: "This backup is no longer secured by your account.",
} as const;

/**
 * The Account section: an email code to sign in, then the email, where
 * securing the backup stands, Manage and Sign out. The form's progress outlives the
 * section and the window while Spotify runs.
 */
export function AccountPanel(props: {
  /** undefined until the stored session has been read. */
  session: AccountSession | null | undefined;
  locked: LockedError["code"] | null;
  secure: SecureState;
  securing: boolean;
  secureError: string | null;
  onSecure(): void;
  /** Sign-in started from the Secure nudge: its code says so. */
  nudge: boolean;
  onSignedIn(session: AccountSession): void;
  onSignedOut(): void;
  onOpenWebsite(url: string): void;
  /** The account's handle, picked with its first code; undefined until listed. */
  handle: string | null | undefined;
  onHandle(handle: string | null): void;
}) {

  const { session, secure } = props;
  const [draft, setDraft] = useState<SignInDraft>(() => getSignInDraft());
  const [email, setEmail] = useState(() => getSignInDraft().email);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<WindowMessage | null>(null);
  const [now, setNow] = useState(() => Date.now());

  // Without a listing yet (another device made the codes), asks once.
  const { handle, onHandle } = props;
  useEffect(() => {
    if (!session || handle !== undefined) return;
    let current = true;
    listShares()
      .then((result) => {
        if (current) onHandle(result.profile?.handle ?? null);
      })
      .catch(() => undefined);
    return () => {
      current = false;
    };
  }, [session, handle]);

  const codeSent = Boolean(
    draft.codeSentAt && now - draft.codeSentAt < CODE_VALID_MS,
  );
  const waitSeconds = Math.max(0, Math.ceil((draft.retryAt - now) / 1000));
  // Waits are per email, except after too many requests from this network.
  const emailWaitSeconds =
    draft.retryEmail === null ||
    draft.retryEmail === email.trim().toLowerCase()
      ? waitSeconds
      : 0;

  // Checks the stored session with the service, once per Spotify run.
  useEffect(() => {
    if (!session) return;
    let current = true;
    void refreshSession()
      .then((checked) => {
        if (!current || checked) return;
        setError({
          kind: "warning",
          text: describeAccountError(new AccountError("signed_out")),
        });
        props.onSignedOut();
      })
      .catch(() => {
        // Offline or refused for now: keep showing the stored session.
      });
    return () => {
      current = false;
    };
  }, [session?.token]);

  // Ticks while a countdown runs.
  useEffect(() => {
    if (draft.retryAt <= Date.now()) return;
    const timer = setInterval(() => {
      setNow(Date.now());
      if (draft.retryAt <= Date.now()) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [draft.retryAt]);

  function updateDraft(next: Partial<SignInDraft>) {
    const updated = { ...getSignInDraft(), ...next };
    saveSignInDraft(updated);
    setDraft(updated);
    setNow(Date.now());
  }

  async function requestCode(address: string) {
    const target = address.trim();
    if (!EMAIL_PATTERN.test(target)) {
      setError({ kind: "error", text: "Enter a valid email address." });
      return;
    }

    setBusy(true);
    setError(null);
    try {
      const resendIn = await sendCode(target, { nudge: props.nudge });
      updateDraft({
        email: target,
        codeSentAt: Date.now(),
        retryAt: Date.now() + resendIn * 1000,
        retryEmail: target.toLowerCase(),
      });
      setCode("");
    } catch (failure) {
      const failed = failure instanceof AccountError ? failure : null;
      const retryAfter = failed?.retryAfter ?? null;
      const retryAt =
        retryAfter && retryAfter <= MAX_COUNTDOWN_SECONDS
          ? Date.now() + retryAfter * 1000
          : 0;
      const retryEmail =
        failed?.code === "too_many_requests" ? null : target.toLowerCase();

      // A code went to this email less than a minute ago, and it still works.
      if (failed?.code === "resend_wait") {
        updateDraft({
          email: target,
          codeSentAt:
            draft.email === target && draft.codeSentAt
              ? draft.codeSentAt
              : Date.now(),
          retryAt,
          retryEmail,
        });
        return;
      }

      if (retryAt) updateDraft({ retryAt, retryEmail });
      setError({ kind: "error", text: describeAccountError(failure) });
    } finally {
      setBusy(false);
    }
  }

  async function verify() {
    setBusy(true);
    setError(null);
    try {
      const signedIn = await signIn(draft.email, code);
      updateDraft({ codeSentAt: null });
      setCode("");
      props.onSignedIn(signedIn);
    } catch (failure) {
      setError({ kind: "error", text: describeAccountError(failure) });
      const failed = failure instanceof AccountError ? failure.code : null;
      if (failed === "too_many_attempts" || failed === "code_expired") {
        setCode("");
      }
    } finally {
      setBusy(false);
    }
  }

  async function runSignOut() {
    const lastEmail = session?.email ?? "";
    setBusy(true);
    setError(null);
    await signOut();
    // Signing in again starts from the same email.
    updateDraft({ email: lastEmail, codeSentAt: null });
    setEmail(lastEmail);
    setBusy(false);
    props.onSignedOut();
  }

  async function openManage() {
    setBusy(true);
    setError(null);
    try {
      props.onOpenWebsite(await createManageLink());
    } catch (failure) {
      const signedOut =
        failure instanceof AccountError && failure.code === "signed_out";
      setError({
        kind: signedOut ? "warning" : "error",
        text: describeAccountError(failure),
      });
      if (signedOut) props.onSignedOut();
    } finally {
      setBusy(false);
    }
  }

  const errorAlert = error ? (
    <div
      className="syncify-alert"
      data-kind={error.kind === "error" ? "error" : undefined}
      role="alert"
    >
      {error.text}
    </div>
  ) : null;

  if (session === undefined) return null;

  if (session) {
    const canSecure =
      secure.kind === "open" ||
      secure.kind === "other-claim" ||
      (secure.kind === "ended" && secure.reason !== "undone");

    return (
      <>
        <div className="syncify-setting">
          <span className="syncify-setting-text">
            <span className="syncify-account-email">{session.email}</span>
            {secure.kind === "secured" ? (
              <span className="syncify-muted">
                <Meta
                  parts={[
                    "Backup secured",
                    secure.linkedCount === 1
                      ? "1 Spotify account linked"
                      : `${secure.linkedCount} Spotify accounts linked`,
                  ]}
                />
              </span>
            ) : secure.kind === "pending" ? (
              <span className="syncify-muted syncify-account-state">
                <ClockIcon />
                <span>
                  {pendingSecureText(secure)}
                </span>
              </span>
            ) : secure.kind === "other-account" ? (
              <span className="syncify-muted">
                This backup is secured by another account
              </span>
            ) : (
              <span className="syncify-muted">Signed in</span>
            )}
          </span>
          <span className="syncify-account-actions">
            <button
              className="syncify-text-button syncify-disclosure"
              type="button"
              aria-label="Manage on the website"
              onClick={() => void openManage()}
              disabled={busy}
            >
              Manage
              <ExternalIcon />
            </button>
            <button
              className="syncify-text-button"
              type="button"
              onClick={() => void runSignOut()}
              disabled={busy}
            >
              Sign out
            </button>
          </span>
        </div>
        {handle ? (
          <div className="syncify-setting">
            <span className="syncify-setting-text">
              <span>@{handle}</span>
              <span className="syncify-muted">Your handle</span>
            </span>
            <button
              className="syncify-text-button syncify-disclosure"
              type="button"
              aria-label="Open your profile"
              onClick={() => props.onOpenWebsite(profileUrl(handle))}
            >
              Profile
              <ExternalIcon />
            </button>
          </div>
        ) : null}
        {canSecure ? (
          <div className="syncify-setting">
            <span className="syncify-setting-text">
              <span>Secure your backup</span>
              <span className="syncify-muted">So only you can restore it</span>
            </span>
            <button
              className="syncify-button"
              type="button"
              onClick={props.onSecure}
              disabled={
                busy ||
                props.securing ||
                secure.kind === "other-claim"
              }
            >
              {props.securing
                ? "Securing…"
                : secure.kind === "ended"
                  ? "Secure again"
                  : "Secure"}
            </button>
          </div>
        ) : null}
        {secure.kind === "ended" ? (
          <div className="syncify-alert" role="status">
            {ENDED[secure.reason]}
          </div>
        ) : null}
        {props.secureError ? (
          <div className="syncify-alert" data-kind="error" role="alert">
            {props.secureError}
          </div>
        ) : null}
        {errorAlert}
      </>
    );
  }

  return (
    <>
      <div className="syncify-setting">
        {props.locked ? (
          <span className="syncify-setting-text">
            <span>Sign in to restore</span>
            <span className="syncify-muted">
              With the email that secured this backup
            </span>
          </span>
        ) : (
          <span className="syncify-setting-text">
            <span>Secure your backup</span>
            <span className="syncify-muted">So only you can restore it</span>
          </span>
        )}
      </div>
      <form
        className="syncify-confirm"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          if (busy) return;
          if (codeSent) {
            if (code.length === CODE_LENGTH) void verify();
          } else if (!emailWaitSeconds) {
            void requestCode(email);
          }
        }}
      >
        {codeSent ? (
          <>
            <p className="syncify-muted">Code sent to {maskEmail(draft.email)}</p>
            <div className="syncify-field">
              <input
                className="syncify-input syncify-code-input"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                aria-label="6-digit code"
                placeholder="123456"
                maxLength={CODE_LENGTH}
                value={code}
                onChange={(event) =>
                  setCode(
                    event.currentTarget.value
                      .replace(/\D/g, "")
                      .slice(0, CODE_LENGTH),
                  )
                }
                autoFocus
              />
              <button
                className="syncify-button"
                type="submit"
                disabled={busy || code.length !== CODE_LENGTH}
              >
                {busy ? "Verifying…" : "Verify"}
              </button>
            </div>
            <p className="syncify-muted syncify-account-links">
              <button
                className="syncify-text-button"
                type="button"
                onClick={() => void requestCode(draft.email)}
                disabled={busy || waitSeconds > 0}
              >
                {waitSeconds > 0
                  ? `Resend in ${formatCountdown(waitSeconds)}`
                  : "Resend code"}
              </button>
              <button
                className="syncify-text-button"
                type="button"
                onClick={() => {
                  updateDraft({ codeSentAt: null });
                  setCode("");
                  setError(null);
                }}
                disabled={busy}
              >
                Use another email
              </button>
            </p>
          </>
        ) : (
          <>
            <div className="syncify-field">
              <input
                className="syncify-input"
                type="email"
                autoComplete="email"
                aria-label="Email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
                autoFocus
              />
              <button
                className="syncify-button"
                type="submit"
                disabled={busy || emailWaitSeconds > 0 || !email.trim()}
              >
                {busy ? "Sending…" : "Send code"}
              </button>
            </div>
            <p className="syncify-muted">
              {emailWaitSeconds > 0
                ? `Send another code in ${formatCountdown(emailWaitSeconds)}`
                : "We only email sign-in codes."}
            </p>
          </>
        )}
        {errorAlert}
      </form>
    </>
  );
}
