// The code That's me asks for: 6 characters from this Syncify's own key,
// shown in Settings. Typing it on the Syncify that asks shows that the same
// person has both open, which nothing a request carries can. The backup
// service works it out the same way from the key it knows, so nothing is
// stored or sent to show it.
const CODE_ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
export const PAIRING_CODE_LENGTH = 6;

/** The code of a public key as the backup service reads it (base64url). */
export async function pairingCode(publicKey: string): Promise<string> {
  const digest = new Uint8Array(
    await crypto.subtle.digest("SHA-256", new TextEncoder().encode(publicKey)),
  );
  const bits = ((digest[0] << 24) | (digest[1] << 16) | (digest[2] << 8) | digest[3]) >>> 2;
  let code = "";
  for (let index = PAIRING_CODE_LENGTH - 1; index >= 0; index--) {
    code += CODE_ALPHABET[(bits >>> (index * 5)) & 31];
  }
  return code;
}

/** "K1C YES": the code in two halves, easier to read across and type. */
export function formatPairingCode(code: string): string {
  const half = PAIRING_CODE_LENGTH / 2;
  return `${code.slice(0, half)} ${code.slice(half)}`;
}

/** What was typed, without the spaces and dashes a person adds. */
export function cleanPairingCode(typed: string): string {
  return typed.toUpperCase().replace(/[\s-]/g, "");
}
