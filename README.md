<p align="center">
  <img src="assets/SYNCIFY-BANNER.png" alt="Syncify banner">
</p>

<h1 align="center">
  Syncify
</h1>

<p align="center">
  <a href="https://github.com/wSoltani/Syncify"><img alt="GitHub Repo" src="https://img.shields.io/badge/GitHub-Syncify-181717?logo=github"></a>
  <a href="https://github.com/spicetify/marketplace"><img alt="Spicetify Marketplace" src="https://img.shields.io/badge/Spicetify-Marketplace-1DB954?logo=spotify&logoColor=white"></a>
  <a href="https://ko-fi.com/wsoltani"><img alt="Support on Ko-fi" src="https://img.shields.io/badge/Buy%20me%20a%20coffee-Ko--fi-ff5f5f?logo=ko-fi"></a>
</p>

<p align="center">
  <strong>Your Spicetify setup needs a savepoint.</strong><br>
  Back up your Marketplace extensions, themes, snippets, and preferences, then restore them when Spotify or Spicetify breaks.
</p>

---

## What is Syncify?

Syncify is a Spicetify extension that backs up the `marketplace:*` browser `localStorage` and `IndexedDB` entries used by Spicetify Marketplace.

It stores the latest backup plus two older versions, so you can restore a previous state if the newest backup is broken, accidental, or overwritten by auto-backup.

> This repo contains the **Spicetify extension client**. The Cloudflare Worker backend lives in `syncify-worker`.

## Features

- Back up Marketplace extensions, themes, snippets, and preferences.
- Keep the 3 most recent backup versions.
- Restore a selected backup version after confirmation.
- Reload Spotify after restore so Marketplace can rehydrate the setup.
- Block empty `0`-entry backups.
- Run optional startup auto-backups with downgrade protection.

## Important restore note

Syncify restores Marketplace state; it does not download extension files itself. Spicetify Marketplace must be installed and enabled.

Marketplace usually rehydrates restored items after Spotify reloads. If an item appears installed but does not load, open Marketplace, reload Spotify again, or reinstall that specific item from Marketplace.

## What gets backed up?

Syncify backs up keys matching:

```txt
marketplace:*
```

Examples include:

```txt
marketplace:installed-extensions
marketplace:installed-snippets
marketplace:installed-themes
marketplace:installed:<item-key>
marketplace:theme-installed
marketplace:tabs
marketplace:active-tab
marketplace:sort
```

Non-Marketplace extension settings are only backed up if they are stored under the `marketplace:` namespace.

## Install manually

The easiest way to install Syncify is from the Spicetify Marketplace. If you prefer to install it manually, download the prebuilt `syncify.js` extension file from the latest GitHub release, then copy or symlink it into your Spicetify `Extensions` folder. You only need to build the extension yourself if you are developing or modifying Syncify.

Windows:

```txt
%appdata%\spicetify\Extensions\syncify.js
```

Linux/macOS:

```txt
~/.config/spicetify/Extensions/syncify.js
```

Enable and apply it:

```bash
spicetify config extensions syncify.js
spicetify apply
```

## Development

Install dependencies:

```bash
npm install
```

Build `dist/syncify.js`:

```bash
npm run build
```

Typecheck:

```bash
npm run typecheck
```

Watch mode:

```bash
npm run watch
```

Install a Windows dev build into Spicetify:

```bash
npm run install:dev
spicetify apply
```

`install:dev` installs a temporary `Syncify (dev)` build and does not update `dist/syncify.js`.

## Backend configuration

The extension needs a Syncify Worker URL at build time:

```bash
SYNCIFY_WORKER_URL=http://localhost:8787 npm run build
```

Production example:

```bash
SYNCIFY_WORKER_URL=https://syncify-worker.wsoltani.com npm run build
```

Optional build-time overrides:

```bash
SYNCIFY_GITHUB_URL=https://github.com/wSoltani/Syncify \
SYNCIFY_KOFI_URL=https://ko-fi.com/wsoltani \
SYNCIFY_ISSUE_URL=https://github.com/wSoltani/Syncify/issues/new \
npm run build
```

At runtime, `window.SyncifyConfig` can override the same links before Syncify initializes:

```js
window.SyncifyConfig = {
  workerUrl: "http://localhost:8787",
  githubUrl: "https://github.com/wSoltani/Syncify",
  kofiUrl: "https://ko-fi.com/wsoltani",
  issueUrl: "https://github.com/wSoltani/Syncify/issues/new",
};
```

## Backend contract

The Worker backend supports:

- `POST /` — upload a backup and retain history.
- `GET /` — download the latest backup with optional embedded `backup_history`.
- `OPTIONS /` — CORS preflight.
- `x-syncify-user-hash` — required SHA-256 user hash header.

Syncify sends only a pseudonymous SHA-256 hash of the active Spotify user identifier. The raw Spotify identifier is not sent to the backend.

## Limitations

- Only `marketplace:` keys are backed up.
- Restore depends on Spicetify Marketplace rehydrating restored items.
- Backups are stored as plaintext JSON by the backend.
- No user-controlled encryption/passphrase layer yet.

## Support

If Syncify saved your setup, consider supporting the project:

[![Support me on Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/wsoltani)

Starring the repo, sharing it, or reporting bugs also helps a ton. 💚
