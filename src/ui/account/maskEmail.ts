/**
 * "a***e@example.com": the first and last letter before the @, one star for
 * each letter between.
 */
export function maskEmail(email: string): string {
  const at = email.lastIndexOf("@");
  if (at < 1) return email;
  const name = email.slice(0, at);
  if (name.length <= 2) return email;
  return `${name[0]}${"*".repeat(name.length - 2)}${name[name.length - 1]}${email.slice(at)}`;
}
