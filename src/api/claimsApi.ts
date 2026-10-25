import type { UserIdentity } from "../core/user";
import type { SyncifyClaim } from "../types/syncify";
import { readClaim, request } from "./syncifyApi";

const CLAIMS_PATH = "/claims";
const CANCEL_CLAIM_PATH = "/claims/cancel";

const ERROR_MESSAGES: Record<string, string> = {
  no_backup: "Back up first, then secure your backup.",
  unsupported_identity: "This Spotify account can't be secured.",
  too_many_accounts: "Your account already has 10 Spotify accounts linked.",
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
  /** `final` claims are the linked accounts. */
  status: "pending" | "final" | "cancelled";
  final_at: number;
  /** For a cancelled claim, who cancelled it. */
  cancelled_by: "owner" | "claimer" | null;
  device_info: string | null;
}

export interface ClaimStatus {
  /** The claim on this Spotify account. */
  claim: SyncifyClaim | null;
  /** Too many claims were cancelled lately: none is accepted for now. */
  disputed: boolean;
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
    disputed?: unknown;
    accounts?: unknown;
  } | null;
  return {
    claim: readClaim(result?.claim),
    disputed: result?.disputed === true,
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

/** Cancels the pending claim on this Spotify account. */
export async function cancelClaim(
  workerUrl: string,
  identity: UserIdentity,
): Promise<void> {
  const response = await send(workerUrl, identity, "POST", CANCEL_CLAIM_PATH);
  // Already gone: nothing left to cancel.
  if (!response.ok && response.status !== 404) {
    throw new ClaimError(await readCode(response));
  }
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
        account.status === "cancelled"),
  );
}
