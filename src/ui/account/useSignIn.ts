import { useEffect, useState } from "react";
import { AccountError, describeAccountError, sendCode, signIn, signOut } from "../../api/accountApi";
import { getSignInDraft, saveSignInDraft, type AccountSession, type SignInDraft } from "../../core/account";

// Codes are 6 digits and work for 10 minutes.
export const CODE_LENGTH = 6;
const CODE_VALID_MS = 10 * 60 * 1000;
// Longer waits (until tomorrow) are only explained, not counted down.
const MAX_COUNTDOWN_SECONDS = 5 * 60;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** "0:45" */
export function formatCountdown(seconds: number): string {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

/**
 * Signing in with a code sent by email. Its progress outlives the tab and
 * the window while Spotify runs, so a code on its way isn't lost.
 */
export function useSignIn(props: {
  /** Sign-in started from the Secure nudge: its email says so. */
  nudge: boolean;
  onSignedIn(session: AccountSession): void;
}) {
  const [draft, setDraft] = useState<SignInDraft>(() => getSignInDraft());
  const [email, setEmail] = useState(() => getSignInDraft().email);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());

  const codeSent = Boolean(draft.codeSentAt && now - draft.codeSentAt < CODE_VALID_MS);
  const waitSeconds = Math.max(0, Math.ceil((draft.retryAt - now) / 1000));
  // Waits are per email, except after too many requests from this network.
  const emailWaitSeconds =
    draft.retryEmail === null || draft.retryEmail === email.trim().toLowerCase() ? waitSeconds : 0;

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
      setError("Enter a valid email address.");
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
      const retryAt = retryAfter && retryAfter <= MAX_COUNTDOWN_SECONDS ? Date.now() + retryAfter * 1000 : 0;
      const retryEmail = failed?.code === "too_many_requests" ? null : target.toLowerCase();

      // A code went to this email less than a minute ago, and it still works.
      if (failed?.code === "resend_wait") {
        updateDraft({
          email: target,
          codeSentAt: draft.email === target && draft.codeSentAt ? draft.codeSentAt : Date.now(),
          retryAt,
          retryEmail,
        });
        return;
      }

      if (retryAt) updateDraft({ retryAt, retryEmail });
      setError(describeAccountError(failure));
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
      setError(describeAccountError(failure));
      const failed = failure instanceof AccountError ? failure.code : null;
      if (failed === "too_many_attempts" || failed === "code_expired") setCode("");
    } finally {
      setBusy(false);
    }
  }

  /** Signs out; signing in again starts from the same email. */
  async function runSignOut(lastEmail: string) {
    setBusy(true);
    setError(null);
    await signOut();
    updateDraft({ email: lastEmail, codeSentAt: null });
    setEmail(lastEmail);
    setBusy(false);
  }

  return {
    draft,
    email,
    setEmail,
    code,
    setCode: (value: string) => setCode(value.replace(/\D/g, "").slice(0, CODE_LENGTH)),
    busy,
    error,
    codeSent,
    waitSeconds,
    emailWaitSeconds,
    requestCode,
    verify,
    signOut: runSignOut,
    useAnotherEmail: () => {
      updateDraft({ codeSentAt: null });
      setCode("");
      setError(null);
    },
  };
}
