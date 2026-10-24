<p align="center">
  <img src="assets/SYNCIFY-BANNER.png" alt="Syncify banner">
</p>

## Using Syncify

Syncify saves the extensions, themes and snippets you installed from Spicetify Marketplace to the cloud. When a Spotify update breaks things, or you reinstall, or you move to a new computer, you can get all of it back in one click.

There's no account to create. Backups are tied to the Spotify account you're signed in with.

### Install

**From Marketplace (recommended):** open Spicetify Marketplace, search for **Syncify**, and click Install.

**Manually:** download `syncify.js` from the [latest release](https://github.com/wSoltani/Syncify/releases/latest) and put it in your Spicetify `Extensions` folder:

- Windows: `%appdata%\spicetify\Extensions\`
- macOS / Linux: `~/.config/spicetify/Extensions/`

Then run:

```bash
spicetify config extensions syncify.js
spicetify apply
```

### How to use it

Open Syncify from the button in Spotify's top bar, from your profile menu, or with <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>S</kbd>.

- **Back up now** saves what you have installed. If nothing has changed since your last backup, there's nothing to save and the button says so.
- **Backups** lists your 3 most recent backups, plus a **safety copy**: an older backup kept aside and updated about once a week, so a burst of new backups can't replace it. The one tagged **Current** matches what's on this device right now. When everything is backed up, only the latest shows; **Show all** lists the rest.
- **Restore** puts a backup back on this device. Spotify then reloads with your setup.
- **Back up automatically** (off by default) backs up when Spotify starts, but only if something changed. It won't overwrite a bigger cloud backup with a smaller or empty setup, so a fresh install can't wipe out your saved one.

You can change the shortcut and where the Syncify button appears under **Settings**, at the bottom of the window.

### Updating

Syncify tells you at the bottom of its window when a new version is out. Old versions eventually stop backing up; Syncify then says so.

- **From Marketplace:** restart Spotify. Marketplace can take up to 12 hours to pick up a new version.
- **Manual install:** download `syncify.js` from the [latest release](https://github.com/wSoltani/Syncify/releases/latest), replace the one in your `Extensions` folder, then run `spicetify apply`.

### Good to know

- Syncify needs [Spicetify Marketplace](https://github.com/spicetify/marketplace) to be installed. It saves Marketplace's list of what you installed, and Marketplace downloads the actual files again after a restore.
- If something shows as installed but doesn't load after a restore, reload Spotify once more or reinstall that item from Marketplace.
- Only Marketplace data is backed up. Extensions you added by hand outside Marketplace aren't included.
- **Privacy:** Syncify never sends your Spotify username. It sends a one-way hash of it, which identifies your backups without revealing who you are. Each request also carries Syncify's version, a random ID for this install and your time zone, so the server knows which versions are in use and can count activity in your local time. Backups are not encrypted on the server, so don't count on them to keep anything secret.

### Support

If Syncify saved your setup, consider supporting the project:

[![Support me on Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/wsoltani)

Starring the repo, sharing it and [reporting bugs](https://github.com/wSoltani/Syncify/issues/new) help a lot too. 💚

---

## Development

This repo is the Spicetify extension. The backend is a Cloudflare Worker that lives in a separate `syncify-worker` repo.

### How it works

- Syncify reads every `marketplace:*` key from `localStorage` and from Marketplace's IndexedDB store (newer Marketplace versions use IndexedDB).
- The keys are hashed so Syncify can tell whether anything changed. The hash skips data Marketplace rewrites on its own, like the active tab, sort order, and star counts.
- Backups are sent to the Worker under a SHA-256 hash of the Spotify user ID. The Worker keeps the 3 latest backups plus an older safety copy. If an upload has the same data as the latest backup, the Worker doesn't store it again.
- Every request carries `x-syncify-version`, `x-syncify-install` (a random ID kept in Syncify's own IndexedDB database, which survives Spotify profile resets) and `x-syncify-timezone`.
- To restore, Syncify writes the keys back to both `localStorage` and IndexedDB, then reloads Spotify.

### Commands

```bash
npm install          # install dependencies
npm run build        # build dist/syncify.js
npm run watch        # rebuild on change
npm run typecheck    # type-check only
npm run install:dev  # install a "Syncify (dev)" build into Spicetify (Windows), then run spicetify apply
```

`install:dev` doesn't touch `dist/syncify.js`.

### Configuration

The Worker URL is baked in at build time:

```bash
SYNCIFY_WORKER_URL=http://localhost:8787 npm run build
```

`SYNCIFY_GITHUB_URL`, `SYNCIFY_KOFI_URL` and `SYNCIFY_ISSUE_URL` override the footer links the same way, and `SYNCIFY_RELEASES_URL` the address of `latest.json`, which the update note reads. At runtime, setting `window.SyncifyConfig` (with `workerUrl`, `githubUrl`, `kofiUrl`, `issueUrl` or `releasesUrl`) before Syncify starts overrides them too.

### Releasing

Marketplace installs the `dist/syncify.js` committed on `master`, so every release commits a fresh build:

```bash
npm version patch   # or minor / major
git push --follow-tags
```

`npm version` bumps `package.json` and `manifest.json`, rebuilds `dist/syncify.js`, commits, and tags the result `vX.Y.Z`. Pushing the tag runs the Release workflow, which checks everything and publishes a GitHub release with `syncify.js` attached. CI fails any push where `dist/syncify.js` is out of date.
