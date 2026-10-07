import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Copies package.json's version into manifest.json (read by Spicetify
// Marketplace). Runs from the npm `version` lifecycle, so `npm version patch`
// keeps both files in step.
const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = join(rootDir, "manifest.json");

const { version } = JSON.parse(
  await readFile(join(rootDir, "package.json"), "utf8"),
);
const manifestText = await readFile(manifestPath, "utf8");
const updated = manifestText.replace(
  /("version":\s*")[^"]*(")/,
  `$1${version}$2`,
);

if (updated === manifestText && !manifestText.includes(`"${version}"`)) {
  throw new Error("Could not find a version field in manifest.json");
}

await writeFile(manifestPath, updated);
console.log(`manifest.json -> ${version}`);
