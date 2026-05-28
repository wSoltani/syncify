import { sha256Hex } from "./crypto";

interface SpicetifyUserCandidate {
  username?: string;
  canonicalUsername?: string;
  displayName?: string;
  id?: string;
  uri?: string;
}

export async function getUserHash(): Promise<string> {
  const username = await resolveUsername();
  return sha256Hex(username);
}

async function resolveUsername(): Promise<string> {
  const userApi = Spicetify.Platform?.UserAPI as { getUser?: () => Promise<SpicetifyUserCandidate> | SpicetifyUserCandidate } | undefined;

  if (!userApi?.getUser) {
    throw new Error("Spicetify Platform UserAPI is unavailable.");
  }

  const user = await userApi.getUser();
  const identifier = user?.username ?? user?.canonicalUsername ?? user?.id ?? user?.uri ?? user?.displayName;

  if (!identifier) {
    throw new Error("Unable to resolve the active Spotify user.");
  }

  return identifier;
}
