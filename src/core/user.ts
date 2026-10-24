import { sha256Hex } from "./crypto";

interface SpicetifyUserCandidate {
  username?: string;
  canonicalUsername?: string;
  displayName?: string;
  id?: string;
  uri?: string;
}

/** The Spotify user fields tried in order; the first one present is hashed. */
const IDENTITY_FIELDS = [
  "username",
  "canonicalUsername",
  "id",
  "uri",
  "displayName",
] as const;

export type IdentityField = (typeof IDENTITY_FIELDS)[number];

export interface UserIdentity {
  hash: string;
  /** Which field the hash was computed from. */
  field: IdentityField;
}

export async function getUserIdentity(): Promise<UserIdentity> {
  const { value, field } = await resolveUsername();
  return { hash: await sha256Hex(value), field };
}

async function resolveUsername(): Promise<{ value: string; field: IdentityField }> {
  const userApi = Spicetify.Platform?.UserAPI as { getUser?: () => Promise<SpicetifyUserCandidate> | SpicetifyUserCandidate } | undefined;

  if (!userApi?.getUser) {
    throw new Error("Spicetify Platform UserAPI is unavailable.");
  }

  const user = await userApi.getUser();
  const field = IDENTITY_FIELDS.find((name) => user?.[name] != null);
  const value = field ? user[field] : undefined;

  if (!field || !value) {
    throw new Error("Unable to resolve the active Spotify user.");
  }

  return { value, field };
}
