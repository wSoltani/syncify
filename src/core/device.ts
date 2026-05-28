export function getDeviceInfo(): string {
  const userAgent = navigator.userAgent;

  if (/Windows/i.test(userAgent)) return "Windows";
  if (/Mac OS|Macintosh/i.test(userAgent)) return "macOS";
  if (/Linux/i.test(userAgent)) return "Linux";

  return userAgent;
}
