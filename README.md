# Syncify

Syncify is a Spicetify extension for backing up and restoring a user's installed extensions and themes.

It saves the browser `localStorage` entries that Spicetify Marketplace uses to remember installed extensions, snippets, themes, and related preferences. The goal is simple: create a backup, restore it later, reload Spotify, and let Marketplace rehydrate the user's extensions and themes.

> Project status: early extension client implementation. The Cloudflare Worker backend is not implemented in this repository yet.

## Why Syncify exists

Spicetify Marketplace stores installed extension and theme state in Spotify's Chromium/Electron `localStorage`. If that state is lost, users have to rebuild their setup manually.

Syncify provides a backup and restore layer for those installed extensions and themes without requiring filesystem access from inside Spotify.

## What Syncify currently does

- Adds a `Syncify` button to the Spotify top bar.
- Opens a Spicetify modal UI.
- Shows local/cloud sync status, backup metadata, and Marketplace availability.
- Collects all `localStorage` keys beginning with `marketplace:`.
- Uploads the collected extension/theme backup to the Syncify backend.
- Downloads the saved backup for the current Spotify user.
- Restores saved extension/theme entries into `localStorage` after confirmation.
- Reloads Spotify after restore so Marketplace can initialize the restored extensions and themes.
- Supports optional startup auto-backup with downgrade-prevention checks.

## What Syncify intentionally backs up

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

## Repository layout

```txt
syncify/
  dist/
    syncify.js              # Built Spicetify extension bundle
  src/
    app.tsx                 # Extension entrypoint
    api/
      syncifyApi.ts         # HTTP client for the Syncify backend
    core/
      config.ts             # Local Syncify configuration
      crypto.ts             # SHA-256 and stable hashing helpers
      device.ts             # Device metadata helper
      marketplace.ts        # Marketplace localStorage collection/restore
      startupSync.ts        # Guarded startup auto-backup logic
      syncService.ts        # Backup/restore orchestration
      user.ts               # Spotify user identity hash helper
    styles/
      app.css               # Modal styles injected by the extension
    types/
      syncify.ts            # Syncify payload and config types
      spicetify.d.ts        # Spicetify API typings from scaffold
  esbuild.config.mjs        # Extension build config
  package.json
  tsconfig.json
```

## Requirements

- Node.js and npm
- Spicetify installed locally
- Spotify desktop client patched with Spicetify
- Spicetify Marketplace installed and enabled for restore to be useful

The project currently uses `esbuild` directly instead of `spicetify-creator`, because the generated Spicetify Creator README warns that `spicetify-creator` is deprecated for bundling new extensions.

## Install dependencies

From the repository root containing this README:

```bash
npm install
```

If you are in the parent repository root (`Syncify/`), use:

```bash
npm install --prefix syncify
```

## Build

From this directory:

```bash
npm run build
```

From the parent repository root:

```bash
npm run build --prefix syncify
```

The build output is:

```txt
dist/syncify.js
```

## Typecheck

```bash
npm run typecheck
```

or from the parent repository root:

```bash
npm run typecheck --prefix syncify
```

## Development watch mode

```bash
npm run watch
```

or from the parent repository root:

```bash
npm run watch --prefix syncify
```

## Local Spicetify installation

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

## Runtime behavior

Open Spotify and click the `Syncify` topbar button.

The backend endpoint is internal to Syncify and is not shown as a user-facing setting. The extension is expected to route all backup and restore traffic to the project-controlled backend.

The backend is expected to support:

- `POST /` for backup upload
- `GET /` for backup download
- `x-syncify-user-hash` request header
- JSON payloads matching the Syncify schema

## Identity model

Syncify derives a pseudonymous user key from the active Spotify user returned by Spicetify Platform APIs.

Flow:

1. Resolve active Spotify user via `Spicetify.Platform.UserAPI.getUser()`.
2. Extract a stable identifier such as `username`, `canonicalUsername`, `id`, `uri`, or `displayName`.
3. Hash it with browser Web Crypto SHA-256.
4. Send only the resulting hash to the backend using the `x-syncify-user-hash` header.

The raw Spotify identifier is not sent to the Syncify backend.

Important security note: a plain SHA-256 hash of a username or stable user identifier is pseudonymous, not a strong authentication secret. A future backend should consider optional user-controlled encryption or passphrase-based protection if stronger privacy is required.

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

## Restore behavior

Restore is intentionally explicit and destructive:

1. The user clicks `Restore Backup`.
2. Syncify asks for confirmation.
3. Syncify downloads the cloud payload.
4. Syncify writes restored `marketplace:` keys into `localStorage`.
5. Syncify reloads Spotify.

The reload is required because Marketplace initializes installed extensions/themes/snippets from `localStorage` during startup.

## Startup auto-backup safety

Startup auto-backup is enabled by default.

Syncify performs safety checks before uploading local state. It blocks auto-backup when the saved backup appears significantly larger than the current local extension/theme state. This is meant to prevent a fresh or empty install from overwriting a good backup.

Manual backup remains available through the modal.

## Marketplace dependency

Syncify does not download extension files itself. It restores the saved entries that tell Spicetify Marketplace which extensions and themes to load.

For restore to be useful, Spicetify Marketplace must be installed and enabled.

## Line endings

The built `dist/syncify.js` may contain visible `\r` escape sequences inside the embedded CSS string when built on Windows from CRLF source files. This is harmless at runtime because the string is assigned to a `<style>` tag and CSS treats the line endings as whitespace.

This does not affect Spicetify compatibility.

## Current limitations

- Backend Worker implementation is not included yet.
- No end-to-end restore test has been run against a real Worker yet.
- No Marketplace submission metadata has been prepared yet.
- No user-controlled encryption/passphrase layer yet.
- Only `marketplace:` keys are backed up.

## License

MIT
