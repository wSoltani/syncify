// Release versions: 1.4.0 or 1.4.0-beta.1, nothing else. Mirrors the
// backup service's check of x-syncify-version.
const VERSION_PATTERN = /^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;
const POINTER_TIMEOUT_MS = 3000;

export function isReleaseVersion(value: unknown): value is string {
  return typeof value === "string" && VERSION_PATTERN.test(value);
}

/**
 * Negative when a is older than b. A beta comes before its release:
 * 1.4.0-beta.1 < 1.4.0-beta.2 < 1.4.0.
 */
export function compareVersions(a: string, b: string): number {
  const [x, y] = [a, b].map((version) => {
    const [, major, minor, patch, beta] = VERSION_PATTERN.exec(version) ?? [];
    return [major, minor, patch, beta ?? Infinity].map(Number);
  });

  for (let index = 0; index < x.length; index += 1) {
    if (x[index] !== y[index]) return x[index] < y[index] ? -1 : 1;
  }

  return 0;
}

/**
 * Reads a version pointer such as latest.json ({ "version": "1.4.0" }).
 * Returns null if it can't be read in time or holds anything but a version.
 */
export async function fetchPointerVersion(
  url: string,
  timeoutMs = POINTER_TIMEOUT_MS,
): Promise<string | null> {
  const controller =
    typeof AbortController === "function" ? new AbortController() : null;
  const timer = setTimeout(() => controller?.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller?.signal });
    if (!response.ok) return null;

    const body = (await response.json()) as { version?: unknown } | null;
    return isReleaseVersion(body?.version) ? body.version : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
