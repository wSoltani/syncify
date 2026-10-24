import { readFile, writeFile } from "node:fs/promises";

// Writes a version pointer (latest.json or latest-beta.json) for the release
// workflows: node scripts/release-pointer.mjs <file> <version> [--stable]
// [--newer-than <current file>]. The loader accepts only these versions, so
// anything else fails here first.
// --stable refuses betas (latest.json reaches everyone).
// --newer-than skips the write when the current pointer (downloaded from the
// bucket; a missing file means none yet) is already at this version or a
// newer one, so an older tag never moves the beta channel back.
const VERSION_PATTERN = /^(\d{1,4})\.(\d{1,4})\.(\d{1,4})(?:-beta\.(\d{1,4}))?$/;

const [file, version, ...flags] = process.argv.slice(2);
const stable = flags.includes("--stable");
const newerThan = flags.includes("--newer-than")
  ? flags[flags.indexOf("--newer-than") + 1]
  : null;

if (!file || !VERSION_PATTERN.test(version ?? "")) {
  fail(`"${version}" is not a release version such as 1.4.0 or 1.4.0-beta.1`);
}
if (stable && version.includes("-")) {
  fail(`${version} is a beta; only stable versions go to everyone`);
}

if (newerThan) {
  const current = await readPointer(newerThan);
  if (current && compareVersions(current, version) >= 0) {
    console.log(`${newerThan} is at ${current}; not moving it to ${version}`);
    process.exit(0);
  }
}

await writeFile(file, `${JSON.stringify({ version })}\n`);
console.log(`${file} -> ${version}`);

async function readPointer(path) {
  const text = await readFile(path, "utf8").catch((error) =>
    error.code === "ENOENT" ? null : fail(`Could not read ${path}: ${error}`),
  );
  if (text === null) return null;
  const { version: current } = JSON.parse(text);
  return VERSION_PATTERN.test(current ?? "") ? current : null;
}

// Same order as the Worker and the loader: 1.4.0-beta.1 < 1.4.0-beta.2 < 1.4.0.
function compareVersions(a, b) {
  const [x, y] = [a, b].map((value) => {
    const [, major, minor, patch, beta] = VERSION_PATTERN.exec(value);
    return [major, minor, patch, beta ?? Infinity].map(Number);
  });
  for (let index = 0; index < x.length; index += 1) {
    if (x[index] !== y[index]) return x[index] < y[index] ? -1 : 1;
  }
  return 0;
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
