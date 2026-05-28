import { context, build } from "esbuild";

const watch = process.argv.includes("--watch");
const env = process.env;

function defineEnvValue(value) {
  return value === undefined ? "undefined" : JSON.stringify(value);
}

const options = {
  entryPoints: ["src/app.tsx"],
  outfile: "dist/syncify.js",
  bundle: true,
  minify: !watch,
  sourcemap: watch,
  format: "iife",
  target: ["es2017"],
  legalComments: "none",
  banner: {
    js: "// NAME: Syncify\n// AUTHOR: wsoltani\n// DESCRIPTION: Back up and restore Spicetify extensions and themes.",
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      watch ? "development" : "production",
    ),
    "process.env.SYNCIFY_WORKER_URL": defineEnvValue(env.SYNCIFY_WORKER_URL),
    "process.env.SYNCIFY_GITHUB_URL": defineEnvValue(env.SYNCIFY_GITHUB_URL),
    "process.env.SYNCIFY_KOFI_URL": defineEnvValue(env.SYNCIFY_KOFI_URL),
    "process.env.SYNCIFY_ISSUE_URL": defineEnvValue(env.SYNCIFY_ISSUE_URL),
  },
  external: ["react", "react-dom"],
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
  console.log("Built dist/syncify.js");
}
