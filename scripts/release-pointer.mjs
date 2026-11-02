import { writeFile } from "node:fs/promises";
import {
  compareVersions,
  readPointer,
  VERSION_PATTERN,
} from "./release-versions.mjs";

// Writes a version pointer (latest.json or latest-beta.json) for the release
// workflows: node scripts/release-pointer.mjs <file> <version> [--stable]
// [--newer-than <current file>]. The loader accepts only these versions, so
// anything else fails here first.
// --stable refuses betas (latest.json reaches everyone).
// --newer-than skips the write when the current pointer (downloaded from the
// bucket; a missing file means none yet) is already at this version or a
// newer one, so an older tag never moves the beta channel back.

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
  const current = await readPointer(newerThan).catch((error) =>
    fail(error.message),
  );
  if (current && compareVersions(current, version) >= 0) {
    console.log(`${newerThan} is at ${current}; not moving it to ${version}`);
    process.exit(0);
  }
}

await writeFile(file, `${JSON.stringify({ version })}\n`);
console.log(`${file} -> ${version}`);

function fail(message) {
  console.error(message);
  process.exit(1);
}
