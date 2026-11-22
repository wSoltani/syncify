import { getInstall } from "./client";
import { readState, writeState } from "./database";
import { createDeviceKey, exportPublicKey } from "./requestSignature";

// This install's own key, which signs every request to the backup service so
// it can tell this install from others on the same Spotify account. It's kept
// next to the install ID in Syncify's database and its private half can't be
// exported. An ID kept in localStorage instead (no usable IndexedDB) has no
// key.
const INSTALL_KEY = "install-key";

interface InstallKey {
  privateKey: CryptoKey;
  /** As the backup service reads it: raw, base64url without padding. */
  publicKey: string;
}

let installKey: Promise<InstallKey | null> | null = null;

/**
 * This install's key, or null for an install kept in localStorage (no key by
 * design). A key that couldn't be read rejects, so no request goes out
 * without the key the backup service knows, which would be kept apart as
 * from an install it doesn't trust; it's tried again on the next request.
 */
export function getInstallKey(): Promise<InstallKey | null> {
  if (!installKey) {
    const loading = loadInstallKey();
    installKey = loading;
    loading.catch(() => {
      if (installKey === loading) installKey = null;
    });
  }
  return installKey;
}

async function loadInstallKey(): Promise<InstallKey | null> {
  if (!(await getInstall()).inDatabase) return null;

  // A key that couldn't be read is never replaced, or this install would
  // stop matching the key the backup service knows: reading errors reject.
  const stored = await readState<CryptoKeyPair>(INSTALL_KEY, { wait: true });
  const pair = isKeyPair(stored) ? stored : await createAndStore();
  return {
    privateKey: pair.privateKey,
    publicKey: await exportPublicKey(pair.publicKey),
  };
}

async function createAndStore(): Promise<CryptoKeyPair> {
  const created = await createDeviceKey();
  await writeState(INSTALL_KEY, created);
  return created;
}

function isKeyPair(value: unknown): value is CryptoKeyPair {
  const pair = value as CryptoKeyPair | undefined;
  return Boolean(
    pair &&
      pair.privateKey instanceof CryptoKey &&
      pair.publicKey instanceof CryptoKey,
  );
}
