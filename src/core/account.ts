import { deleteState, readState, writeState } from "./database";
import { createDeviceKey } from "./requestSignature";

// What signing in keeps in Syncify's own database (see database.ts).
const DEVICE_KEY = "device-key";
const SESSION_KEY = "session";
const SALT_KEY = "salt";

/** A signed-in session, bound to this device's key. */
export interface AccountSession {
  token: string;
  email: string;
}

/**
 * What the sign-in form shows, kept while Spotify runs, so closing the window
 * doesn't lose a code that's on its way.
 */
export interface SignInDraft {
  email: string;
  /** When the code was sent; null before one is sent. */
  codeSentAt: number | null;
  /** Until then, sending another code is refused. */
  retryAt: number;
  /** The email (lowercase) the wait is for; null when it's for any email. */
  retryEmail: string | null;
}

let deviceKey: Promise<CryptoKeyPair> | null = null;
let salt: string | null | undefined;
let draft: SignInDraft = {
  email: "",
  codeSentAt: null,
  retryAt: 0,
  retryEmail: null,
};

/**
 * The key pair that signs this device's requests. It's created at the first
 * sign-in and kept after signing out. With `create` false, a missing key
 * resolves null instead.
 */
export async function getDeviceKey(create: true): Promise<CryptoKeyPair>;
export async function getDeviceKey(create: false): Promise<CryptoKeyPair | null>;
export async function getDeviceKey(
  create: boolean,
): Promise<CryptoKeyPair | null> {
  if (deviceKey) return deviceKey;

  // A key that couldn't be read is never replaced, or the session bound to it
  // would stop working: reading errors reject instead.
  const stored = await readState<CryptoKeyPair>(DEVICE_KEY);
  if (isKeyPair(stored)) {
    deviceKey = Promise.resolve(stored);
    return stored;
  }
  if (!create) return null;

  deviceKey = createDeviceKey().then(async (created) => {
    await writeState(DEVICE_KEY, created);
    return created;
  });
  // A key that couldn't be stored can't sign after a restart: try again later.
  deviceKey.catch(() => {
    deviceKey = null;
  });
  return deviceKey;
}

export async function loadSession(): Promise<AccountSession | null> {
  const stored = await readState<AccountSession>(SESSION_KEY);
  return isSession(stored) ? stored : null;
}

export function saveSession(session: AccountSession): Promise<void> {
  return writeState(SESSION_KEY, session);
}

/** Forgets the session token. The device key stays for the next sign-in. */
export async function clearSession(): Promise<void> {
  await deleteState(SESSION_KEY).catch(() => undefined);
}

/** The latest salt from sign-in's service, or null before the first one. */
export async function getSalt(): Promise<string | null> {
  if (salt === undefined) {
    const stored = await readState<string>(SALT_KEY).catch(() => undefined);
    salt = typeof stored === "string" ? stored : null;
  }
  return salt;
}

export async function saveSalt(value: string): Promise<void> {
  if (value === salt) return;
  salt = value;
  await writeState(SALT_KEY, value).catch(() => undefined);
}

export function getSignInDraft(): SignInDraft {
  return draft;
}

export function saveSignInDraft(next: SignInDraft): void {
  draft = next;
}

function isKeyPair(value: unknown): value is CryptoKeyPair {
  const pair = value as CryptoKeyPair | undefined;
  return Boolean(
    pair &&
      pair.privateKey instanceof CryptoKey &&
      pair.publicKey instanceof CryptoKey,
  );
}

function isSession(value: unknown): value is AccountSession {
  const session = value as AccountSession | undefined;
  return Boolean(
    session &&
      typeof session.token === "string" &&
      session.token &&
      typeof session.email === "string",
  );
}
