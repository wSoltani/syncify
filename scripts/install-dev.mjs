import { copyFile, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const tempOutfile = "temp/syncify.dev.js";
const appData = process.env.APPDATA;

if (!appData) {
  throw new Error(
    "APPDATA is not set. This dev install script currently targets Windows Spicetify installs.",
  );
}

const targetFile = join(appData, "spicetify", "Extensions", "syncify.js");

await run("node", ["esbuild.config.mjs"], {
  ...process.env,
  SYNCIFY_EXTENSION_NAME: "Syncify (dev)",
  SYNCIFY_OUTFILE: tempOutfile,
});

await mkdir(dirname(targetFile), { recursive: true });
await copyFile(join(rootDir, tempOutfile), targetFile);
await rm(join(rootDir, "temp"), { recursive: true, force: true });

console.log(`Installed dev build to ${targetFile}`);
console.log("dist/syncify.js was not modified by this script.");

function run(command, args, env) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: rootDir,
      env,
      stdio: "inherit",
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(
        new Error(`${command} ${args.join(" ")} exited with code ${code}`),
      );
    });
  });
}
