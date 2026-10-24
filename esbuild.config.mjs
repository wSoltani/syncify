import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { context, build } from "esbuild";

const watch = process.argv.includes("--watch");
const env = process.env;
const outfile = env.SYNCIFY_OUTFILE ?? "dist/syncify.js";
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
  entryPoints: ["src/app.tsx"],
  outfile,
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
    "process.env.SYNCIFY_GITHUB_URL": defineEnvValue(env.SYNCIFY_GITHUB_URL),
    "process.env.SYNCIFY_KOFI_URL": defineEnvValue(env.SYNCIFY_KOFI_URL),
    "process.env.SYNCIFY_ISSUE_URL": defineEnvValue(env.SYNCIFY_ISSUE_URL),
    "process.env.SYNCIFY_RELEASES_URL": defineEnvValue(env.SYNCIFY_RELEASES_URL),
    "process.env.SYNCIFY_EXTENSION_NAME": JSON.stringify(extensionName),
  },
  external: ["react", "react-dom"],
  plugins: [normalizeLineEndings],
  loader: {
    ".css": "text",
    ".svg": "text",
  },
};

if (watch) {
  const ctx = await context(options);
  await ctx.watch();
  console.log("Watching Syncify extension...");
} else {
  await build(options);
  console.log(`Built ${outfile}`);
}
