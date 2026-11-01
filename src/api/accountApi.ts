import {
  clearSession,
  getDeviceKey,
  getSalt,
  loadSession,
  saveSalt,
  saveSession,
  type AccountSession,
} from "../core/account";
import { getProjectConfig } from "../core/projectConfig";
import { exportPublicKey, signRequest } from "../core/requestSignature";

const SEND_CODE_PATH = "/api/auth/email-otp/send-verification-otp";
const SIGN_IN_PATH = "/api/auth/sign-in/email-otp";
const SESSION_PATH = "/api/auth/get-session";
const SIGN_OUT_PATH = "/api/auth/sign-out";
const LINK_PATH = "/api/auth/link";

const DEVICE_KEY_HEADER = "x-syncify-device-key";
const SIGNATURE_HEADER = "x-syncify-signature";
const SALT_HEADER = "x-syncify-salt";
// Before the first response there's no salt yet. Signing with this one is
// refused as stale, with the day's salt to sign again with.
const NO_SALT = "none";

const ERROR_MESSAGES: Record<string, string> = {
  invalid_email: "Enter a valid email address.",
  resend_wait: "Wait a moment before sending another code.",
  email_daily_limit: "Too many codes for this email today. Try again tomorrow.",
  emails_paused: "Sign-in codes are paused for today. Try again tomorrow.",
  too_many_requests: "Too many tries. Wait a minute and try again.",
  send_failed: "Couldn't send the code. Try again in a minute.",
  unavailable: "Sign-in isn't available yet.",
  invalid_code: "That code isn't right.",
  code_expired: "That code has expired. Send a new one.",
  too_many_attempts: "Too many wrong codes. Send a new one.",
  invalid_signature: "Couldn't verify this device. Try again.",
  stale_salt: "Couldn't verify this device. Try again.",
  signed_out: "You've been signed out. Sign in again.",
  no_device_key: "Syncify couldn't keep its sign-in key on this device.",
  offline: "Couldn't reach Syncify. Check your connection and try again.",
  link_failed: "Couldn't open the website. Try again.",
};

/** A request to sign-in's service was refused, with the service's code. */
export class AccountError extends Error {
  constructor(
    readonly code: string,
    /** Seconds until it's worth trying again, from `retry-after`. */
    readonly retryAfter: number | null = null,
    /** The code a share code refusal points to, such as the one that already holds this setup. */
    readonly share: { code: string; link: string | null } | null = null,
  ) {
    super(ERROR_MESSAGES[code] ?? "Sign-in failed. Try again.");
    this.name = "AccountError";
  }
}

/** Short copy for the sign-in form. */
export function describeAccountError(error: unknown): string {
  return error instanceof AccountError
    ? error.message
    : "Sign-in failed. Try again.";
}

/** Emails a sign-in code. Resolves with the seconds until another can be sent. */
export async function sendCode(
  email: string,
  options: { nudge?: boolean } = {},
): Promise<number> {
  const result = (await request(SEND_CODE_PATH, {
    method: "POST",
    // A code asked from the Secure nudge counts against its share of the
    // day's emails.
    body: JSON.stringify({
      email,
      type: "sign-in",
      ...(options.nudge ? { nudge: true } : {}),
    }),
  })) as { resend_in?: unknown } | null;
  return typeof result?.resend_in === "number" ? result.resend_in : 60;
}

/** Signs in with the emailed code and keeps the session on this device. */
export async function signIn(
  email: string,
  code: string,
): Promise<AccountSession> {
  const keys = await getDeviceKey(true).catch(() => {
    throw new AccountError("no_device_key");
  });
  const result = (await request(SIGN_IN_PATH, {
    method: "POST",
    body: JSON.stringify({ email, otp: code }),
    keys,
    sendPublicKey: true,
  })) as { token?: unknown; user?: { email?: unknown } } | null;

  if (typeof result?.token !== "string" || !result.token) {
    throw new AccountError("sign_in_failed");
  }

  const session = {
    token: result.token,
    email: typeof result.user?.email === "string" ? result.user.email : email,
  };
  await saveSession(session).catch(() => {
    throw new AccountError("no_device_key");
  });
  sessionChecked = true;
  return session;
}

// The session is checked once per Spotify run, since each check costs the
// service CPU time.
let sessionChecked = false;

/**
 * Checks the stored session with the service, once per Spotify run. Resolves
 * null when signed out; other failures reject and keep the session.
 */
export async function refreshSession(): Promise<AccountSession | null> {
  const session = await loadSession();
  if (!session || sessionChecked) return session;

  try {
    const result = (await signedSessionRequest(session, SESSION_PATH, "GET")) as {
      user?: { email?: unknown };
    } | null;
    sessionChecked = true;
    const email = result?.user?.email;
    if (typeof email !== "string" || email === session.email) return session;

    const updated = { ...session, email };
    await saveSession(updated).catch(() => undefined);
    return updated;
  } catch (error) {
    if (error instanceof AccountError && error.code === "signed_out") return null;
    throw error;
  }
}

/**
 * Signs this device out. The session is forgotten here even when the service
 * can't be reached; the device key stays for the next sign-in.
 */
export async function signOut(): Promise<void> {
  const session = await loadSession().catch(() => null);
  if (session) {
    await signedSessionRequest(session, SIGN_OUT_PATH, "POST").catch(
      () => undefined,
    );
  }
  await clearSession();
}

/**
 * A one-time link that signs the browser in to the website, for Manage. Only
 * the website's own address is returned.
 */
export async function createManageLink(): Promise<string> {
  const session = await loadSession();
  if (!session) throw new AccountError("signed_out");

  const result = (await signedSessionRequest(session, LINK_PATH, "POST")) as {
    url?: unknown;
  } | null;
  const url = typeof result?.url === "string" ? result.url : "";
  const origin = new URL(getProjectConfig().webUrl).origin;
  if (!url.startsWith(`${origin}/link#`)) throw new AccountError("link_failed");
  return url;
}

/**
 * A request to the website's API signed with this device's session. Rejects
 * with an AccountError carrying the service's code, `signed_out` when there's
 * no session.
 */
export async function signedRequest(
  path: string,
  method: "GET" | "POST",
  body?: unknown,
): Promise<unknown> {
  const session = await loadSession();
  if (!session) throw new AccountError("signed_out");
  return signedSessionRequest(session, path, method, body);
}

/**
 * A request to the website's API that's signed when this device is signed
 * in, and sent as it is otherwise. Uses keepalive, so it finishes while
 * Spotify reloads.
 */
export async function sendSignedIfPossible(
  path: string,
  body: unknown,
  headers: Record<string, string>,
): Promise<void> {
  const session = await loadSession().catch(() => null);
  const keys = session ? await getDeviceKey(false).catch(() => null) : null;
  await request(path, {
    method: "POST",
    body: JSON.stringify(body),
    headers,
    keepalive: true,
    ...(session && keys ? { token: session.token, keys } : {}),
  });
}

async function signedSessionRequest(
  session: AccountSession,
  path: string,
  method: "GET" | "POST",
  body?: unknown,
): Promise<unknown> {
  const keys = await getDeviceKey(false);
  // Without its key the token can't be used: sign in again.
  if (!keys) {
    await clearSession();
    throw new AccountError("signed_out");
  }

  return request(path, {
    method,
    token: session.token,
    keys,
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
}

interface RequestOptions {
  method: "GET" | "POST";
  body?: string;
  token?: string;
  /** Signs the request with this key pair. */
  keys?: CryptoKeyPair;
  /** Sends the public key, for signing in. */
  sendPublicKey?: boolean;
  headers?: Record<string, string>;
  keepalive?: boolean;
}

async function request(
  path: string,
  options: RequestOptions,
  isRetry = false,
): Promise<unknown> {
  const url = `${getProjectConfig().webUrl.replace(/\/+$/, "")}${path}`;
  const headers: Record<string, string> = { ...options.headers };
  if (options.body !== undefined) headers["content-type"] = "application/json";
  if (options.token) headers.authorization = `Bearer ${options.token}`;
  if (options.keys) {
    const salt = (await getSalt()) ?? NO_SALT;
    headers[SALT_HEADER] = salt;
    headers[SIGNATURE_HEADER] = await signRequest(
      options.keys.privateKey,
      salt,
      options.method,
      url,
      options.body ?? "",
    );
    if (options.sendPublicKey) {
      headers[DEVICE_KEY_HEADER] = await exportPublicKey(
        options.keys.publicKey,
      );
    }
  }

  let response: Response;
  try {
    response = await fetch(url, {
      method: options.method,
      headers,
      body: options.body,
      keepalive: options.keepalive,
    });
  } catch {
    throw new AccountError("offline");
  }

  const salt = response.headers.get(SALT_HEADER);
  if (salt) await saveSalt(salt);

  const data = (await response.json().catch(() => null)) as {
    code?: unknown;
    share?: { code?: unknown; link?: unknown };
  } | null;
  if (response.ok) return data;

  const code =
    typeof data?.code === "string"
      ? data.code
      : response.status === 503
        ? "unavailable"
        : "failed";
  // Signed with a salt that has moved on: sign again with the new one, once.
  if (code === "stale_salt" && options.keys && !isRetry) {
    return request(path, options, true);
  }
  if (code === "signed_out") await clearSession();

  const retryAfter = Number(response.headers.get("retry-after"));
  const share = data?.share;
  throw new AccountError(
    code,
    Number.isFinite(retryAfter) && retryAfter > 0
      ? retryAfter
      : (RETRY_AFTER_SECONDS[code] ?? null),
    typeof share?.code === "string"
      ? { code: share.code, link: typeof share.link === "string" ? share.link : null }
      : null,
  );
}

// The service's usual waits, for when its retry-after header can't be read
// (CORS hides it unless the service exposes it).
const RETRY_AFTER_SECONDS: Record<string, number> = {
  resend_wait: 60,
  too_many_requests: 60,
  send_failed: 60,
};
