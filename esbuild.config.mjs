import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { context, build } from "esbuild";

const watch = process.argv.includes("--watch");
const env = process.env;
// dist/syncify.js is the small loader Marketplace and manual installs run; it
// loads dist/syncify.bundle.js, the app, from jsDelivr. SYNCIFY_OUTFILE builds
// only the app, to that file (install:dev runs it without the loader).
const bundleOutfile = env.SYNCIFY_OUTFILE ?? "dist/syncify.bundle.js";
const buildLoader = env.SYNCIFY_OUTFILE === undefined;
const extensionName = env.SYNCIFY_EXTENSION_NAME ?? "Syncify";
// Read package.json directly so the version is right during `npm version`.
const packageVersion = JSON.parse(readFileSync("package.json", "utf8")).version;

function defineEnvValue(value) {
  return value === undefined ? "undefined" : JSON.stringify(value);
}

// Git on Windows (core.autocrlf) checks text files out with CRLF, and the
// text loader would embed those \r characters. Normalize so the bundle is
// byte-identical on every OS; CI compares it against the committed dist.
const normalizeLineEndings = {
  name: "normalize-line-endings",
  setup(pluginBuild) {
    pluginBuild.onLoad({ filter: /\.(css|svg)$/ }, async (args) => ({
      contents: (await readFile(args.path, "utf8")).replace(/\r\n/g, "\n"),
      loader: "text",
    }));
  },
};

const options = {
  bundle: true,
  minify: !watch,
  sourcemap: watch,
  format: "iife",
  target: ["es2017"],
  legalComments: "none",
  banner: {
    js: `// NAME: ${extensionName}\n// AUTHOR: wsoltani\n// DESCRIPTION: Back up and restore Spicetify extensions and themes.`,
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      watch ? "development" : "production",
    ),
    "process.env.SYNCIFY_VERSION": JSON.stringify(packageVersion),
    "process.env.SYNCIFY_WORKER_URL": defineEnvValue(env.SYNCIFY_WORKER_URL),
    "process.env.SYNCIFY_WEB_URL": defineEnvValue(env.SYNCIFY_WEB_URL),
    "process.env.SYNCIFY_GITHUB_URL": defineEnvValue(env.SYNCIFY_GITHUB_URL),
    "process.env.SYNCIFY_KOFI_URL": defineEnvValue(env.SYNCIFY_KOFI_URL),
    "process.env.SYNCIFY_ISSUE_URL": defineEnvValue(env.SYNCIFY_ISSUE_URL),
    "process.env.SYNCIFY_RELEASES_URL": defineEnvValue(
      env.SYNCIFY_RELEASES_URL,
    ),
    "process.env.SYNCIFY_EXTENSION_NAME": JSON.stringify(extensionName),
  },
  external: ["react", "react-dom"],
  plugins: [normalizeLineEndings],
  loader: {
    ".css": "text",
    ".svg": "text",
  },
};

const builds = [
  { ...options, entryPoints: ["src/app.tsx"], outfile: bundleOutfile },
  ...(buildLoader
    ? [{ ...options, entryPoints: ["src/loader.ts"], outfile: "dist/syncify.js" }]
    : []),
];

if (watch) {
  for (const target of builds) await (await context(target)).watch();
  console.log("Watching Syncify extension...");
} else {
  for (const target of builds) {
    await build(target);
    console.log(`Built ${target.outfile}`);
  }
}
