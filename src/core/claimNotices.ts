import type { SyncifyClaim } from "../types/syncify";
import { readStored, writeStored } from "./localStore";

// Someone else's claim on this Spotify username, as Syncify asks about it:
// while it's pending, and once the backup is secured with an email this
// Syncify isn't signed in with. Not me is remembered on this device only, so
// the same claim isn't asked about twice.

/** A claim that isn't this Syncify's account's: pending, or final. */
export type OtherClaim = Extract<SyncifyClaim, { status: "pending" | "final" }>;

// The claim this Syncify last answered Not me to.
const NOT_ME_KEY = "syncify:claim-not-me";

/** Someone else's claim this Syncify hasn't answered Not me to, or null. */
export function otherClaim(claim: SyncifyClaim | null): OtherClaim | null {
  if (!claim || claim.mine || claim.status === "undone") return null;
  return readStored(NOT_ME_KEY) === claimKey(claim) ? null : claim;
}

/** Not me: this claim isn't asked about here again. */
export function rememberNotMe(claim: OtherClaim): void {
  writeStored(NOT_ME_KEY, claimKey(claim));
}

// A pending claim and the same one made final are asked about once each: by
// then it's a new fact.
function claimKey(claim: OtherClaim): string {
  return claim.status === "pending"
    ? `pending ${claim.email ?? ""} ${claim.final_at}`
    : `final ${claim.email ?? ""}`;
}
