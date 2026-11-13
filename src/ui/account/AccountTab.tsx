import { useEffect, useState } from "react";
import { AccountError, createManageLink, describeAccountError, refreshSession } from "../../api/accountApi";
import { listShares } from "../../api/sharesApi";
import type { LockedError } from "../../api/syncifyApi";
import type { AccountSession } from "../../core/account";
import { Button, CheckIcon, Meta, Notice, SettingGroup, SettingRow, TabPanel } from "../kit";
import { useLatest } from "../useLatest";
import type { WindowMessage } from "../window/message";
import { openExternal } from "../window/openExternal";
import { maskEmail } from "./maskEmail";
import { pendingSecureText, type SecureState } from "./secureState";
import { SignInForm } from "./SignInForm";
import { useSignIn } from "./useSignIn";

const ENDED = {
  owner: "This backup isn't secured. Someone using this Spotify account said it isn't yours.",
  admin: "This backup isn't secured. Syncify couldn't confirm it's yours.",
  undone: "This backup is no longer secured by your account.",
} as const;

/**
 * Signed out, the email for sign-in codes and the code. Signed in, the
 * email, the handle and the account page, where securing this backup
 * stands, and Sign out.
 */
export function AccountTab(props: {
  idBase: string;
  /** undefined until the stored session has been read. */
  session: AccountSession | null | undefined;
  locked: LockedError["code"] | null;
  secure: SecureState;
  securing: boolean;
  secureError: string | null;
  onSecure(): void;
  /** Sign-in started from the Secure nudge: its email says so. */
  nudge: boolean;
  onSignedIn(session: AccountSession): void;
  onSignedOut(): void;
  /** The account's handle, picked with its first code; undefined until listed. */
  handle: string | null | undefined;
  onHandle(handle: string | null): void;
}) {
  const { session, secure, handle } = props;
  const signIn = useSignIn({ nudge: props.nudge, onSignedIn: props.onSignedIn });
  const [message, setMessage] = useState<WindowMessage | null>(null);
  const [opening, setOpening] = useState(false);

  // Checks the stored session with the service, once per Spotify run, and
  // without a listing yet (another device made the codes), asks for the handle.
  const checkSession = useLatest((current: () => boolean) => {
    if (!session) return;
    void refreshSession()
      .then((checked) => {
        if (!current() || checked) return;
        setMessage({ kind: "warning", text: describeAccountError(new AccountError("signed_out")) });
        props.onSignedOut();
      })
      .catch(() => {
        // Offline or refused for now: keep showing the stored session.
      });
  });
  const token = session?.token;
  useEffect(() => {
    let current = true;
    checkSession.current(() => current);
    return () => {
      current = false;
    };
  }, [checkSession, token]);

  const listHandle = useLatest((current: () => boolean) => {
    if (!session || handle !== undefined) return;
    listShares()
      .then((result) => {
        if (current()) props.onHandle(result.profile?.handle ?? null);
      })
      .catch(() => undefined);
  });
  const needsHandle = Boolean(session) && handle === undefined;
  useEffect(() => {
    let current = true;
    listHandle.current(() => current);
    return () => {
      current = false;
    };
  }, [listHandle, needsHandle]);

  /** The website's account page, signed in, where the email and handle change. */
  async function openAccountPage() {
    setOpening(true);
    setMessage(null);
    try {
      openExternal(await createManageLink());
    } catch (failure) {
      const signedOut = failure instanceof AccountError && failure.code === "signed_out";
      setMessage({ kind: signedOut ? "warning" : "error", text: describeAccountError(failure) });
      if (signedOut) props.onSignedOut();
    } finally {
      setOpening(false);
    }
  }

  async function signOut() {
    setMessage(null);
    await signIn.signOut(session?.email ?? "");
    props.onSignedOut();
  }

  if (session === undefined) return <TabPanel idBase={props.idBase} id="account">{null}</TabPanel>;

  if (!session) {
    return (
      <TabPanel idBase={props.idBase} id="account">
        <p className="syncify-tab-text">
          {props.locked
            ? "Sign in with the email that secured this backup"
            : "Sign in to secure your backup so only you can restore it"}
        </p>
        {message ? (
          <Notice tone={message.kind} live>
            {message.text}
          </Notice>
        ) : null}
        <SignInForm signIn={signIn} />
      </TabPanel>
    );
  }

  const canSecure =
    secure.kind === "open" ||
    secure.kind === "other-claim" ||
    (secure.kind === "ended" && secure.reason !== "undone");
  const busy = signIn.busy || opening;

  return (
    <TabPanel idBase={props.idBase} id="account">
      <SettingGroup>
        <SettingRow label="Email for sign-in codes" value={maskEmail(session.email)} />
        {handle ? <SettingRow label="Creator handle" value={`@${handle}`} /> : null}
        <SettingRow label="Your account page">
          <Button variant="secondary" size="small" onClick={() => void openAccountPage()} disabled={busy}>
            Open
          </Button>
        </SettingRow>
        {canSecure ? (
          <SettingRow label="Secure your backup so only you can restore it">
            <Button onClick={props.onSecure} disabled={busy || props.securing || secure.kind === "other-claim"}>
              {props.securing ? "Securing…" : secure.kind === "ended" ? "Secure again" : "Secure"}
            </Button>
          </SettingRow>
        ) : null}
      </SettingGroup>
      {secure.kind === "ended" ? <Notice tone="warning">{ENDED[secure.reason]}</Notice> : null}
      {props.secureError ? <Notice tone="error">{props.secureError}</Notice> : null}
      {message ? (
        <Notice tone={message.kind} live>
          {message.text}
        </Notice>
      ) : null}
      <div className="syncify-account-footer">
        <span className="syncify-account-status">
          {secure.kind === "secured" ? <CheckIcon className="syncify-account-check" /> : null}
          <Meta parts={secureStateParts(secure)} />
        </span>
        <Button variant="text" onClick={() => void signOut()} disabled={busy}>
          Sign out
        </Button>
      </div>
    </TabPanel>
  );
}

/** Where securing this backup stands, at the tab's foot. */
function secureStateParts(secure: SecureState): string[] {
  switch (secure.kind) {
    case "secured":
      return [
        "This backup is secured",
        ...(secure.linkedCount > 1 ? [`${secure.linkedCount} Spotify accounts linked`] : []),
      ];
    case "pending":
      return [pendingSecureText(secure)];
    case "other-account":
      return ["This backup is secured by another account"];
    default:
      return ["Signed in"];
  }
}
