import { Button, Field } from "../kit";
import { maskEmail } from "./maskEmail";
import { CODE_LENGTH, formatCountdown, type useSignIn } from "./useSignIn";

/**
 * The email for sign-in codes, then the code sent to it, each with its
 * visible label and its error under it.
 */
export function SignInForm(props: { signIn: ReturnType<typeof useSignIn> }) {
  const { signIn } = props;
  const { busy } = signIn;

  return (
    <form
      className="syncify-account-form"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        if (busy) return;
        if (signIn.codeSent) {
          if (signIn.code.length === CODE_LENGTH) void signIn.verify();
        } else if (!signIn.emailWaitSeconds) {
          void signIn.requestCode(signIn.email);
        }
      }}
    >
      {signIn.codeSent ? (
        <>
          <Field
            label={`Code sent to ${maskEmail(signIn.draft.email)}`}
            value={signIn.code}
            onChange={signIn.setCode}
            error={signIn.error}
            placeholder="123456"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={CODE_LENGTH}
            mono
            autoFocus
            action={
              <Button type="submit" disabled={busy || signIn.code.length !== CODE_LENGTH}>
                {busy ? "Verifying…" : "Verify"}
              </Button>
            }
          />
          <span className="syncify-account-resend">
            <Button
              variant="text"
              onClick={() => void signIn.requestCode(signIn.draft.email)}
              disabled={busy || signIn.waitSeconds > 0}
            >
              {signIn.waitSeconds > 0 ? `Resend in ${formatCountdown(signIn.waitSeconds)}` : "Resend code"}
            </Button>
            <Button variant="text" onClick={signIn.useAnotherEmail} disabled={busy}>
              Use another email
            </Button>
          </span>
        </>
      ) : (
        <Field
          label="Email for sign-in codes"
          type="email"
          value={signIn.email}
          onChange={signIn.setEmail}
          error={signIn.error}
          placeholder="you@example.com"
          autoComplete="email"
          autoFocus
          action={
            <Button type="submit" disabled={busy || signIn.emailWaitSeconds > 0 || !signIn.email.trim()}>
              {busy
                ? "Sending…"
                : signIn.emailWaitSeconds > 0
                  ? `Send in ${formatCountdown(signIn.emailWaitSeconds)}`
                  : "Send code"}
            </Button>
          }
        />
      )}
    </form>
  );
}
