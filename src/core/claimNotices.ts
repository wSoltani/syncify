import type { SyncifyClaim } from "../types/syncify";
import { readStored, writeStored } from "./localStore";

// Backups on this Spotify username are secured with emails this Syncify
// isn't signed in with, as Syncify asks about it. Not me is remembered on
// this device only, so the same emails aren't asked about twice.

/** Secured with emails this Syncify isn't signed in with. */
export type SecuredElsewhere = Extract<SyncifyClaim, { mine: false }>;

// The emails this Syncify last answered Not me to.
const NOT_ME_KEY = "syncify:claim-not-me";

/** Secured elsewhere, and this Syncify hasn't answered Not me to it, or null. */
export function securedElsewhere(claim: SyncifyClaim | null): SecuredElsewhere | null {
  if (!claim || claim.mine) return null;
  return readStored(NOT_ME_KEY) === claimKey(claim) ? null : claim;
}

/** Not me: these emails aren't asked about here again. */
export function rememberNotMe(claim: SecuredElsewhere): void {
  writeStored(NOT_ME_KEY, claimKey(claim));
}

// One more account securing it is a new fact, asked about once. The word in
// front is from when a claim could also be pending: kept, so an answer given
// then still stands.
function claimKey(claim: SecuredElsewhere): string {
  return `final ${claim.emails.join(" ")}`;
}
