import { readFile, writeFile } from "node:fs/promises";
import {
  compareVersions,
  readPointerFile,
  VERSION_PATTERN,
} from "./release-versions.mjs";

// Writes a version pointer (latest.json or latest-beta.json) for the release
// workflows: node scripts/release-pointer.mjs <file> <version> [--stable]
// [--newer-than <current file>] [--since-from <current file>]
// [--uploaded <its get-object answer>]. The loader
// accepts only these versions, so anything else fails here first. The
// pointer also says since when it points at its version (admin's Stable
// since and Beta since): now, or the current pointer's own since when it's
// already at this version, so uploading the same version again keeps it.
// --stable refuses betas (latest.json reaches everyone).
// --newer-than skips the write when the current pointer (downloaded from the
// bucket; a missing file means none yet) is already at this version or a
// newer one, so an older tag never moves the beta channel back.
// --since-from is the current pointer (downloaded from the bucket) to keep
// since from; --newer-than's file is used when it's not given. --uploaded
// is the bucket's answer when it was downloaded, whose LastModified stands in
// for since in a pointer written before since was kept.

const [file, version, ...flags] = process.argv.slice(2);
const stable = flags.includes("--stable");
const flag = (name) => (flags.includes(name) ? flags[flags.indexOf(name) + 1] : null);
const newerThan = flag("--newer-than");
const sinceFrom = flag("--since-from") ?? newerThan;
const uploadedFrom = flag("--uploaded");

if (!file || !VERSION_PATTERN.test(version ?? "")) {
  fail(`"${version}" is not a release version such as 1.4.0 or 1.4.0-beta.1`);
}
if (stable && version.includes("-")) {
  fail(`${version} is a beta; only stable versions go to everyone`);
}

const read = (path) => (path ? readPointerFile(path).catch((error) => fail(error.message)) : null);

if (newerThan) {
  const current = (await read(newerThan))?.version;
  if (current && compareVersions(current, version) >= 0) {
    console.log(`${newerThan} is at ${current}; not moving it to ${version}`);
    process.exit(0);
  }
}

const current = await read(sinceFrom);
const since = current?.version === version ? (current.since ?? (await uploaded())) : null;
const kept = since ?? new Date().toISOString();
await writeFile(file, `${JSON.stringify({ version, since: kept })}\n`);
console.log(`${file} -> ${version} since ${kept}`);

// The downloaded pointer's upload time, or null without one.
async function uploaded() {
  if (!uploadedFrom) return null;
  const text = await readFile(uploadedFrom, "utf8").catch(() => null);
  const at = Date.parse(text ? (JSON.parse(text).LastModified ?? "") : "");
  return Number.isFinite(at) ? new Date(at).toISOString() : null;
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
