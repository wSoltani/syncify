import type { UserIdentity } from "../core/user";
import type { SyncifyClaim } from "../types/syncify";
import { readClaim, request } from "./syncifyApi";

const CLAIMS_PATH = "/claims";

const ERROR_MESSAGES: Record<string, string> = {
  no_backup: "Back up first, then secure your backup.",
  unsupported_identity: "This backup can't be secured.",
  too_many_accounts: "Your account already secures 10 backups.",
  accounts_full: "This backup is already secured by 3 Syncify accounts.",
  undone: "This backup can't be secured with your account.",
  offline: "Couldn't reach Syncify. Check your connection and try again.",
};

/** Securing was refused, with the backup service's code. */
export class ClaimError extends Error {
  constructor(readonly code: string) {
    super(ERROR_MESSAGES[code] ?? "Couldn't secure your backup. Try again.");
    this.name = "ClaimError";
  }
}

/** A Spotify username the signed-in account secured, oldest first. */
export interface LinkedAccount {
  hash: string;
  /** `unlinked`: Syncify undid it, listed for 30 days. */
  status: "final" | "unlinked";
  device_info: string | null;
}

export interface ClaimStatus {
  /** Who secured this Spotify username. */
  claim: SyncifyClaim | null;
  /** Only when signed in. */
  accounts: LinkedAccount[] | null;
}

/** Who secured this Spotify username and, signed in, the usernames the account secured. */
export async function fetchClaimStatus(
  workerUrl: string,
  identity: UserIdentity,
): Promise<ClaimStatus> {
  const response = await send(workerUrl, identity, "GET");
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

/** Secures this Spotify username's backups for the signed-in account, at once. */
export async function claimBackup(workerUrl: string, identity: UserIdentity): Promise<void> {
  const response = await send(workerUrl, identity, "POST");
  if (!response.ok) throw new ClaimError(await readCode(response));
}

async function send(workerUrl: string, identity: UserIdentity, method: "GET" | "POST"): Promise<Response> {
  try {
    return await request(workerUrl, identity, { method }, CLAIMS_PATH);
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
      (account.status === "final" || account.status === "unlinked"),
  );
}
