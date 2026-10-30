import { getProjectConfig } from "../core/projectConfig";
import { readShareFile, type ShareFile } from "../core/shareCodes";
import type { UserIdentity } from "../core/user";
import {
  AccountError,
  describeAccountError,
  sendSignedIfPossible,
  signedRequest,
} from "./accountApi";

// Share codes on the website's API. Making, updating, listing and deleting
// need a signed-in session; loading a code reads its file from the share host
// and needs nothing.
const SHARES_PATH = "/api/shares";
const UPDATE_PATH = `${SHARES_PATH}/update`;
const DELETE_PATH = `${SHARES_PATH}/delete`;
const IMPORT_PATH = `${SHARES_PATH}/import`;
const USER_HASH_HEADER = "x-syncify-user-hash";

const ERROR_MESSAGES: Record<string, string> = {
  no_code: "This code doesn't exist.",
  too_many_codes: "You can't make more share codes. Delete one to make another.",
  daily_limit: "Too many changes to share codes today. Try again tomorrow.",
  too_large: "This setup is too big to share.",
  invalid_name: "Names are up to 60 characters.",
  empty: "There's nothing to share yet. Install something from Marketplace first.",
  invalid_items: "Syncify couldn't read some items. Reload Spotify and try again.",
  source: "Some items don't load from GitHub. Reload Spotify and try again.",
  blocked: "Some items are on Marketplace's block list. Reload Spotify and try again.",
  custom_snippet: "Custom snippets can't be shared. Reload Spotify and try again.",
  unchecked: "Couldn't check Marketplace's block list. Try again in a minute.",
  publish_failed: "Couldn't publish the code. Press Update on it to try again.",
  delete_failed: "Couldn't delete the code. Try again.",
  same_setup: "You already shared this setup.",
  unavailable: "Share codes aren't available yet.",
};
// Refusals sign-in's own copy already explains.
const ACCOUNT_CODES = new Set([
  "offline",
  "signed_out",
  "invalid_signature",
  "stale_salt",
  "no_device_key",
  "too_many_requests",
]);

/** One of the signed-in account's codes. */
export interface ShareCode {
  code: string;
  name: string | null;
  /** Its page on the share host. */
  link: string | null;
  item_count: number;
  imports: number;
  created_at: number;
  updated_at: number;
}

/** A code as making or updating it answers. */
export interface SavedShare {
  code: string;
  link: string | null;
  /** Snippets the service left out, missing from Marketplace's list. */
  leftOut: number;
}

/**
 * Short copy for a failed share code request. `maxCodes`, from the list of
 * codes, names the limit when the account is at it.
 */
export function describeShareError(
  error: unknown,
  maxCodes: number | null = null,
): string {
  if (error instanceof AccountError && ACCOUNT_CODES.has(error.code)) {
    return describeAccountError(error);
  }
  if (
    error instanceof AccountError &&
    error.code === "too_many_codes" &&
    maxCodes !== null
  ) {
    return `You have ${maxCodes} share codes already. Delete one to make another.`;
  }
  return (
    (error instanceof AccountError ? ERROR_MESSAGES[error.code] : undefined) ??
    "Something went wrong. Try again."
  );
}

/**
 * The signed-in account's codes, oldest first, and how many it may have
 * (null when the service doesn't say).
 */
export async function listShares(): Promise<{
  codes: ShareCode[];
  max: number | null;
}> {
  const result = (await signedRequest(SHARES_PATH, "GET")) as {
    codes?: unknown;
    max?: unknown;
  } | null;
  return {
    codes: Array.isArray(result?.codes)
      ? result.codes.flatMap((value) => {
          const code = readShareCode(value);
          return code ? [code] : [];
        })
      : [],
    max: typeof result?.max === "number" ? result.max : null,
  };
}

/** Makes a code from these keys. */
export async function createShare(
  name: string,
  keys: Record<string, string>,
): Promise<SavedShare> {
  return readSaved(await signedRequest(SHARES_PATH, "POST", { name, keys }));
}

/** Replaces a code's items and name, keeping the code. */
export async function updateShare(
  code: string,
  name: string,
  keys: Record<string, string>,
): Promise<SavedShare> {
  return readSaved(
    await signedRequest(UPDATE_PATH, "POST", { code, name, keys }),
  );
}

export async function deleteShare(code: string): Promise<void> {
  try {
    await signedRequest(DELETE_PATH, "POST", { code });
  } catch (error) {
    // Already gone, from another device or the website.
    if (error instanceof AccountError && error.code === "no_code") return;
    throw error;
  }
}

/**
 * A code's items from the share host. Rejects with an AccountError:
 * `no_code` when it doesn't exist, `offline` when the host can't be reached.
 */
export async function fetchShare(code: string): Promise<ShareFile> {
  const base = getProjectConfig().shareUrl.replace(/\/+$/, "");
  let response: Response;
  try {
    response = await fetch(`${base}/${code}.json`);
  } catch {
    throw new AccountError("offline");
  }
  // A code that never existed, or was deleted.
  if (response.status === 404 || response.status === 403) {
    throw new AccountError("no_code");
  }
  if (!response.ok) throw new AccountError("failed");

  const file = readShareFile(await response.json().catch(() => null));
  if (!file || file.code !== code) throw new AccountError("no_code");
  return file;
}

/**
 * Lets the service count a code loaded on this Spotify account, once per
 * code. Signed when this device is signed in. Sent as Spotify reloads, so it
 * uses keepalive, and it never fails the load itself.
 */
export async function reportShareImport(
  code: string,
  identity: UserIdentity,
): Promise<void> {
  try {
    await sendSignedIfPossible(IMPORT_PATH, { code }, {
      [USER_HASH_HEADER]: identity.hash,
    });
  } catch {
    // Counting is best effort.
  }
}

function readShareCode(value: unknown): ShareCode | null {
  const row = value as Partial<ShareCode> | null;
  if (!row || typeof row.code !== "string") return null;
  return {
    code: row.code,
    name: typeof row.name === "string" && row.name ? row.name : null,
    link: typeof row.link === "string" ? row.link : null,
    item_count: typeof row.item_count === "number" ? row.item_count : 0,
    imports: typeof row.imports === "number" ? row.imports : 0,
    created_at: typeof row.created_at === "number" ? row.created_at : 0,
    updated_at: typeof row.updated_at === "number" ? row.updated_at : 0,
  };
}

function readSaved(value: unknown): SavedShare {
  const result = value as {
    code?: unknown;
    link?: unknown;
    left_out?: unknown;
  } | null;
  if (typeof result?.code !== "string") throw new AccountError("failed");
  return {
    code: result.code,
    link: typeof result.link === "string" ? result.link : null,
    leftOut: Array.isArray(result.left_out) ? result.left_out.length : 0,
  };
}
