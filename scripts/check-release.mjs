import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// CI guard: package.json and manifest.json must agree, and when a tag is
// given (e.g. v1.2.3) it must match too.
const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const readJson = async (file) =>
  JSON.parse(await readFile(join(rootDir, file), "utf8"));

const { version } = await readJson("package.json");
const [manifest] = await readJson("manifest.json");
const tag = process.argv[2];
const errors = [];

// The loader only accepts these, so a release can't use any other form.
if (!/^\d{1,4}\.\d{1,4}\.\d{1,4}(-beta\.\d{1,4})?$/.test(version)) {
  errors.push(
    `Version ${version} must look like 1.4.0 or 1.4.0-beta.1, the only forms the loader loads`,
  );
}

if (manifest.version !== version) {
  errors.push(
    `manifest.json is ${manifest.version} but package.json is ${version}. Run: node scripts/sync-version.mjs`,
  );
}

if (tag && tag !== `v${version}`) {
  errors.push(`Tag ${tag} does not match package.json version v${version}`);
}

if (errors.length) {
  for (const error of errors) console.error(error);
  process.exit(1);
}

console.log(`Version ${version} is consistent${tag ? ` with ${tag}` : ""}`);
