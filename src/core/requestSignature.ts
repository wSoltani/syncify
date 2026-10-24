// A signed-in Syncify signs its requests to sign-in's service with a key kept
// on this device. The signature covers the day's salt from the service, the
// method, the path with its query and a hash of the exact body.
const SIGNATURE_VERSION = "syncify-signature-v1";
const SIGNING_ALGORITHM = { name: "ECDSA", hash: "SHA-256" };

/** A key pair whose private key can't be exported. */
export function createDeviceKey(): Promise<CryptoKeyPair> {
  return crypto.subtle.generateKey(
    { name: "ECDSA", namedCurve: "P-256" },
    false,
    ["sign", "verify"],
  ) as Promise<CryptoKeyPair>;
}

/** The public key as sent at sign-in: raw, base64url without padding. */
export async function exportPublicKey(key: CryptoKey): Promise<string> {
  return base64UrlEncode(
    new Uint8Array(await crypto.subtle.exportKey("raw", key)),
  );
}

export async function signRequest(
  privateKey: CryptoKey,
  salt: string,
  method: string,
  url: string,
  body: string,
): Promise<string> {
  const message = await signedMessage(salt, method, url, body);
  const signature = await crypto.subtle.sign(
    SIGNING_ALGORITHM,
    privateKey,
    message,
  );
  return base64UrlEncode(new Uint8Array(signature));
}

export async function signedMessage(
  salt: string,
  method: string,
  url: string,
  body: string,
): Promise<Uint8Array<ArrayBuffer>> {
  const { pathname, search } = new URL(url);
  const encoder = new TextEncoder();
  const bodyHash = base64UrlEncode(
    new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(body))),
  );
  return encoder.encode(
    [SIGNATURE_VERSION, salt, method.toUpperCase(), pathname + search, bodyHash].join(
      "\n",
    ),
  );
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (let index = 0; index < bytes.length; index++) {
    binary += String.fromCharCode(bytes[index]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
