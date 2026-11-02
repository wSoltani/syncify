import { readFile } from "node:fs/promises";

// Release versions as the loader accepts them, shared by the release scripts.
export const VERSION_PATTERN =
  /^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;

// Reads a pointer file downloaded from the bucket. A missing file means no
// pointer yet (null); one that holds no valid version counts as none too.
export async function readPointer(path) {
  const text = await readFile(path, "utf8").catch((error) => {
    if (error.code === "ENOENT") return null;
    throw new Error(`Could not read ${path}: ${error}`);
  });
  if (text === null) return null;
  const { version } = JSON.parse(text);
  return VERSION_PATTERN.test(version ?? "") ? version : null;
}

// Same order as the Worker and the loader: 1.4.0-beta.1 < 1.4.0-beta.2 < 1.4.0.
export function compareVersions(a, b) {
  const [x, y] = [a, b].map((value) => {
    const [, major, minor, patch, beta] = VERSION_PATTERN.exec(value);
    return [major, minor, patch, beta ?? Infinity].map(Number);
  });
  for (let index = 0; index < x.length; index += 1) {
    if (x[index] !== y[index]) return x[index] < y[index] ? -1 : 1;
  }
  return 0;
}
