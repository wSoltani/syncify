import type { UserIdentity } from "../core/user";
import type { SyncifyClaim } from "../types/syncify";
import { readClaim, request } from "./syncifyApi";

const CLAIMS_PATH = "/claims";
const CANCEL_CLAIM_PATH = "/claims/cancel";

const ERROR_MESSAGES: Record<string, string> = {
  no_backup: "Back up first, then secure your backup.",
  unsupported_identity: "This Spotify account can't be secured.",
  too_many_accounts: "Your account already has 10 Spotify accounts linked.",
  undone: "This backup can't be secured with your account.",
  offline: "Couldn't reach Syncify. Check your connection and try again.",
};

/** A claim was refused, with the backup service's code. */
export class ClaimError extends Error {
  constructor(readonly code: string) {
    super(ERROR_MESSAGES[code] ?? "Couldn't secure your backup. Try again.");
    this.name = "ClaimError";
  }
}

/** One of the signed-in account's claims, oldest first. */
export interface LinkedAccount {
  hash: string;
  /**
   * `final` claims are the linked accounts. Cancelled and undone ones are
   * listed for 30 days, unless claimed again since.
   */
  status: "pending" | "final" | "cancelled" | "unlinked";
  final_at: number;
  /** A pending claim held for Syncify to review. */
  held: boolean;
  /**
   * For a cancelled claim, who cancelled it: this Spotify account, or an
   * admin (null).
   */
  cancelled_by: "owner" | "claimer" | null;
  device_info: string | null;
}

export interface ClaimStatus {
  /** The claim on this Spotify account. */
  claim: SyncifyClaim | null;
  /** Only when signed in. */
  accounts: LinkedAccount[] | null;
}

/** This Spotify account's claim and, signed in, the account's claims. */
export async function fetchClaimStatus(
  workerUrl: string,
  identity: UserIdentity,
): Promise<ClaimStatus> {
  const response = await send(workerUrl, identity, "GET", CLAIMS_PATH);
  if (!response.ok) throw new ClaimError(await readCode(response));

  const result = (await response.json().catch(() => null)) as {
    claim?: unknown;
    accounts?: unknown;
  } | null;
  return {
    claim: readClaim(result?.claim),
    accounts: Array.isArray(result?.accounts)
      ? result.accounts.filter(isLinkedAccount)
      : null,
  };
}

/** Claims this Spotify account for the signed-in account. */
export async function claimBackup(
  workerUrl: string,
  identity: UserIdentity,
): Promise<SyncifyClaim | null> {
  const response = await send(workerUrl, identity, "POST", CLAIMS_PATH);
  if (!response.ok) throw new ClaimError(await readCode(response));

  const result = (await response.json().catch(() => null)) as {
    claim?: unknown;
  } | null;
  return readClaim(result?.claim);
}

/**
 * Not me on someone else's pending claim on this Spotify account: from an
 * install this account trusts, it cancels the claim; from any other, Syncify
 * checks it. Signed by the claimer, it cancels the claimer's own.
 */
export async function cancelClaim(
  workerUrl: string,
  identity: UserIdentity,
): Promise<"cancelled" | "checking"> {
  const response = await send(workerUrl, identity, "POST", CANCEL_CLAIM_PATH);
  // Already gone: nothing left to cancel.
  if (response.status === 404) return "cancelled";
  if (!response.ok) throw new ClaimError(await readCode(response));
  const result = (await response.json().catch(() => null)) as {
    held?: unknown;
  } | null;
  return result?.held === true ? "checking" : "cancelled";
}

async function send(
  workerUrl: string,
  identity: UserIdentity,
  method: "GET" | "POST",
  path: string,
): Promise<Response> {
  try {
    return await request(workerUrl, identity, { method }, path);
  } catch (error) {
    if (error instanceof TypeError) throw new ClaimError("offline");
    throw error;
  }
}

async function readCode(response: Response): Promise<string> {
  const data = (await response.json().catch(() => null)) as {
    code?: unknown;
  } | null;
  return typeof data?.code === "string" ? data.code : "failed";
}

function isLinkedAccount(value: unknown): value is LinkedAccount {
  const account = value as Partial<LinkedAccount> | null;
  return Boolean(
    account &&
      typeof account.hash === "string" &&
      (account.status === "pending" ||
        account.status === "final" ||
        account.status === "cancelled" ||
        account.status === "unlinked"),
  );
}
