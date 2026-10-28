<p align="center">
  <img src="assets/SYNCIFY-BANNER.png" alt="Syncify banner">
</p>

## Using Syncify

Syncify backs up the extensions, themes and snippets you installed from Spicetify Marketplace, so you can get them back in one click after a Spotify update, a reinstall, or on a new computer. No account needed: backups follow the Spotify account you're signed in with.

### Install

**From Marketplace (recommended):** search for **Syncify** in Marketplace and click Install.

**Manually:** download `syncify.js` from the [latest release](https://github.com/wSoltani/Syncify/releases/latest), put it in your Spicetify `Extensions` folder (`%appdata%\spicetify\Extensions\` on Windows, `~/.config/spicetify/Extensions/` on macOS and Linux), then run:

```bash
spicetify config extensions syncify.js
spicetify apply
```

### How to use it

Open Syncify from the top bar, your profile menu, or <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>S</kbd>.

- **Back up now** saves your setup.
- **Backups** keeps your 3 latest backups and a **safety copy** updated weekly. **Current** marks the one that matches this device.
- **Restore** shows what it will add and remove and flags anything that isn't from Marketplace. Spotify then reloads, and Syncify tells you how much loaded.
- **Back up automatically** (off by default) backs up when Spotify starts if something changed, and never replaces a bigger backup with a smaller one.

The shortcut and where the button appears are under **Settings**.

### Updating

Syncify updates itself: like other self-updating extensions, it loads its latest release each time Spotify starts. Old versions stop backing up after a grace period. If Syncify says it's no longer supported:

- **From Marketplace:** restart Spotify, or reinstall Syncify in Marketplace.
- **Manual install:** replace `syncify.js` with the one from the [latest release](https://github.com/wSoltani/Syncify/releases/latest) and run `spicetify apply`.

### Good to know

- Syncify needs [Spicetify Marketplace](https://github.com/spicetify/marketplace). Anything you set up manually in Spicetify's config is listed in your backups, but you add it back yourself; Syncify gives you the commands.
- **Privacy:** Syncify keeps a one-way hash of your Spotify username and your backups, plus your email if you sign in. You can delete everything any time. [What Syncify stores](https://github.com/wSoltani/Syncify/blob/master/PRIVACY.md)

### Support

If Syncify saved your setup, consider supporting the project:

[![Support me on Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/wsoltani)

Starring the repo, sharing it and [reporting bugs](https://github.com/wSoltani/Syncify/issues/new) help a lot too. 💚

---

## Development

This repo is the Spicetify extension; the backend lives in a separate repo.

```bash
npm install          # install dependencies
npm run build        # build dist/ (commit it with your changes; CI checks it)
npm run watch        # rebuild on change
npm run typecheck    # type-check
npm run install:dev  # install a "Syncify (dev)" build into Spicetify (Windows)
```

**Beta channel:** to get releases early, run `localStorage.setItem("syncify:beta", "true")` in Spotify's DevTools (`spicetify enable-devtools`) and restart Spotify. `localStorage.removeItem("syncify:beta")` turns it off.
