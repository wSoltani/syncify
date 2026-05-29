<p align="center">
  <img src="assets/SYNCIFY-BANNER.png" alt="Syncify banner">
</p>

<h1 align="center">
  Syncify
</h1>

<p align="center">
  <a href="https://github.com/wSoltani/Syncify"><img alt="GitHub Repo" src="https://img.shields.io/badge/GitHub-Syncify-181717?logo=github"></a>
  <a href="https://github.com/spicetify/marketplace"><img alt="Spicetify Marketplace" src="https://img.shields.io/badge/Spicetify-Marketplace-1DB954?logo=spotify&logoColor=white"></a>
  <a href="https://ko-fi.com/wsoltani"><img alt="Support on Ko-fi" src="https://img.shields.io/badge/Buy%20me%20a%20coffee-Ko--fi-ff5f5f?logo=ko-fi&logoColor=white"></a>
</p>

<p align="center">
  <strong>Your Spicetify setup needs a savepoint. </strong><br>
  Back up your Marketplace extensions, themes, snippets, and preferences, then restore them when Spotify/Spicetify breaks.
</p>

---

## What is Syncify?

Syncify is a Spicetify extension for backing up and restoring a user's installed extensions and themes.

It saves the browser `localStorage` entries that Spicetify Marketplace uses to remember installed extensions, snippets, themes, and related preferences. The goal is simple: create a backup, restore it later, reload Spotify, and let Marketplace rehydrate the user's extensions and themes.

> This repository contains the **Spicetify extension client only**. The Cloudflare Worker backend lives in a separate repository/project.

## Why does Syncify exist?

Spicetify Marketplace stores installed extension and theme state in Spotify's Chromium/Electron `localStorage`. If that state is lost, users have to rebuild their setup manually.

Syncify provides a backup and restore layer for those installed extensions and themes without requiring filesystem access from inside Spotify.

## Like Syncify?

If Syncify saved your setup, your time, or your sanity, consider supporting the project:

[![Support me on Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/wsoltani)

Starring the repo, sharing it, or reporting bugs also helps a ton. 💚

## What the extension does

- Adds a `Syncify` button to the Spotify top bar.
- Opens a Spicetify modal UI.
- Shows local/remote backup status, backup metadata, and Marketplace availability.
- Collects all `localStorage` keys beginning with `marketplace:`.
- Uploads the collected extension/theme backup to the Syncify Worker backend.
- Refuses to upload an empty `0`-entry backup, protecting existing backups from fresh/broken local states.
- Downloads the saved backup for the current Spotify user.
- Restores saved extension/theme entries into `localStorage` after confirmation.
- Reloads Spotify after restore so Marketplace can initialize the restored extensions and themes.
- Supports startup auto-backup with downgrade-prevention checks and empty-state upload protection.

## What Syncify backs up

Syncify backs up all keys matching:

```txt
marketplace:*
```

This includes, but is not limited to:

```txt
marketplace:installed-extensions
marketplace:installed-snippets
marketplace:installed-themes
marketplace:installed:<item-key>
marketplace:theme-installed
marketplace:tabs
marketplace:active-tab
marketplace:sort
marketplace:stars
marketplace:tags
marketplace:hideInstalled
marketplace:albumArtBasedColors
marketplace:albumArtBasedColorsMode
marketplace:albumArtBasedColorsVibrancy
marketplace:colorShift
```

Syncify does **not** currently back up arbitrary non-Marketplace extension settings unless those settings are also stored under the `marketplace:` namespace.

## Manual installation

After building, copy or symlink `dist/syncify.js` into your Spicetify `Extensions` directory.

Typical Windows path:

```txt
%appdata%\spicetify\Extensions\syncify.js
```

Typical Linux/macOS path:

```txt
~/.config/spicetify/Extensions/syncify.js
```

Then enable and apply it:

```bash
spicetify config extensions syncify.js
spicetify apply
```

Restart Spotify if needed.

---

## Development

## Requirements

- Node.js and npm
- Spicetify installed locally
- Spotify desktop client patched with Spicetify
- Spicetify Marketplace installed and enabled for restore to be useful
- A running/deployed `syncify-worker` backend

## Companion backend

The extension requires a deployed Syncify Worker backend. During local development, point the extension at the Worker URL with build-time environment variables:

```bash
SYNCIFY_WORKER_URL=http://localhost:8787 npm run build
```

For production builds, use the deployed Worker URL:

```bash
SYNCIFY_WORKER_URL=https://syncify-worker.wsoltani.com npm run build
```

The extension also supports optional build-time link overrides:

```bash
SYNCIFY_GITHUB_URL=https://github.com/wSoltani/Syncify \
SYNCIFY_KOFI_URL=https://ko-fi.com/wsoltani \
SYNCIFY_ISSUE_URL=https://github.com/wSoltani/Syncify/issues/new \
npm run build
```

At runtime, `window.SyncifyConfig` can override the same values before Syncify initializes:

```js
window.SyncifyConfig = {
  workerUrl: "http://localhost:8787",
  githubUrl: "https://github.com/wSoltani/Syncify",
  kofiUrl: "https://ko-fi.com/wsoltani",
  issueUrl: "https://github.com/wSoltani/Syncify/issues/new",
};
```

## Install dependencies

```bash
npm install
```

## Build

```bash
npm run build
```

The build output is:

```txt
dist/syncify.js
```

## Typecheck

```bash
npm run typecheck
```

## Development watch mode

```bash
npm run watch
```

## Local dev install

For local testing on Windows, you can install a dev-labeled build directly into your Spicetify `Extensions` folder:

```bash
npm run install:dev
spicetify apply
```

This builds a temporary bundle named `Syncify (dev)` and copies it to:

```txt
%appdata%\spicetify\Extensions\syncify.js
```

The temporary build changes the Spicetify tooltip and modal title to `Syncify (dev)`, making it easier to tell your local test copy apart from the Marketplace version.

`npm run install:dev` does **not** overwrite the Marketplace bundle at:

```txt
dist/syncify.js
```

Use `npm run build` when you want to update the production/Marketplace bundle.

## Backend contract

The extension expects the Worker backend to support:

- `POST /` for backup upload
- `GET /` for backup download
- `OPTIONS /` for CORS preflight
- `x-syncify-user-hash` request header
- JSON payloads matching the Syncify schema

## Identity model

Syncify derives a pseudonymous user key from the active Spotify user returned by Spicetify Platform APIs.

Flow:

1. Resolve active Spotify user via `Spicetify.Platform.UserAPI.getUser()`.
2. Extract a stable identifier such as `username`, `canonicalUsername`, `id`, or `uri`.
3. Hash it with browser Web Crypto SHA-256.
4. Send only the resulting hash to the backend using the `x-syncify-user-hash` header.

The raw Spotify identifier is not sent to the Syncify backend.

Important security note: a plain SHA-256 hash of a username or stable user identifier is pseudonymous, not a strong authentication secret. A future version should consider optional user-controlled encryption or passphrase-based protection if stronger privacy is required.

## Payload schema

Current client payload shape:

```ts
interface SyncifyPayload {
  schema_version: 1;
  metadata: {
    last_sync_datetime: string;
    device_info: string;
    marketplace_key_count: number;
  };
  payload_hash: string;
  marketplace_data: {
    keys: Record<string, string>;
  };
}
```

## Backup safety

Syncify refuses to upload an empty backup. If the local collected state has `0` backup entries, `Back up now` and startup auto-backup both fail before sending anything to the Worker.

This prevents a fresh install, failed Marketplace load, or reset Spicetify state from overwriting an existing remote backup with an empty payload.

Manual backups with non-zero entries are still allowed, including cases where the user intentionally removed many extensions/themes.

## Restore behavior

Restore is intentionally explicit and destructive:

1. The user clicks `Restore Backup`.
2. Syncify asks for confirmation.
3. Syncify downloads the remote payload.
4. Syncify writes restored `marketplace:` keys into `localStorage`.
5. Syncify reloads Spotify.

The reload is required because Marketplace initializes installed extensions/themes/snippets from `localStorage` during startup.

## Startup auto-backup safety

Startup auto-backup is disabled by default.

Syncify performs safety checks before uploading local state. It blocks auto-backup when the saved backup appears significantly larger than the current local extension/theme state, and it always blocks `0`-entry uploads. This is meant to prevent a fresh or empty install from overwriting a good backup.

Manual backup remains available through the modal when local backup entries are present.

## Marketplace dependency

Syncify does not download extension files itself. It restores the saved entries that tell Spicetify Marketplace which extensions and themes to load.

For restore to be useful, Spicetify Marketplace must be installed and enabled.

## Production release checklist

1. Deploy `syncify-worker` first and confirm the Worker URL is live.
2. Build this extension with the production Worker URL:

   ```bash
   SYNCIFY_WORKER_URL=https://syncify-worker.wsoltani.com npm run build
   ```

3. Install the resulting `dist/syncify.js` locally and test:
   - backup with non-zero entries
   - refresh status
   - restore
   - startup behavior
   - empty-state backup refusal
4. Update version/release metadata as needed.
5. Prepare Marketplace submission assets/metadata.
6. Submit the built extension to the Spicetify Marketplace flow according to Marketplace contribution requirements.

## Current limitations

- No user-controlled encryption/passphrase layer yet.
- Only `marketplace:` keys are backed up.
- Worker currently stores the latest backup only; snapshot/history support is not implemented yet.

## License

MIT
