<p align="center">
  <img src="assets/SYNCIFY-BANNER.png" alt="Syncify banner">
</p>

<p align="center">
  <a href="https://syncify.wsoltani.com/discord"><img src="https://img.shields.io/badge/Discord-Join%20the%20server-5865F2?logo=discord&logoColor=white" alt="Join the Syncify Discord"></a>
</p>

## Using Syncify

Syncify backs up the extensions, themes and snippets you installed from Spicetify Marketplace, so you can get them back in one click after a Spotify update, a reinstall, or on a new computer. Backups follow the Spotify account you're signed in with. Secure yours with your email so only you can restore it.

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
- **Backups** keeps your 3 latest backups plus a weekly **safety copy**. **Current** marks the one on this device.
- **Restore** shows what will be added and removed and flags anything that isn't from Marketplace. Spotify then reloads and Syncify tells you how much loaded.
- **Back up automatically** (off by default) backs up when Spotify starts if something changed. It never replaces a bigger backup with a smaller one.

Change the shortcut and where the button shows under **Settings**.

### Updating

Syncify updates itself each time Spotify starts. Old versions stop backing up after a while, so if Syncify says yours is no longer supported:

- **Marketplace install:** restart Spotify, or reinstall Syncify from Marketplace.
- **Manual install:** download `syncify.js` from the [latest release](https://github.com/wSoltani/Syncify/releases/latest), replace the old one and run `spicetify apply`.

### Good to know

- Syncify needs [Spicetify Marketplace](https://github.com/spicetify/marketplace). Things you set up manually in Spicetify's config are listed in your backups too. Syncify can't add them back for you, but it gives you the commands.
- **Privacy:** Syncify stores your backups, a one-way hash of your Spotify username, and your email if you sign in. You can delete everything any time. [What Syncify stores](https://github.com/wSoltani/Syncify/blob/master/PRIVACY.md)

### Keep your backup safe

Syncify finds your backup by a hash of your Spotify username. Usernames are often public, so anyone who knows yours can restore a backup that isn't secured, or claim it before you do. Versions before 1.11.0 also let them replace it, so a restore could add extensions or themes from anywhere.

To secure yours, open Syncify, press **Secure** and enter your email. After that, only your account can restore it or back up to it.

Every backup also gets these:

- Before a restore, Syncify shows what will change and warns about anything that doesn't load from GitHub or is blocked by Marketplace
- A safety copy of your setup that a burst of new backups can't replace
- Backups from a new install wait until you approve them from one you already use

### Support

If Syncify saved your setup, you can support it on Ko-fi:

[![Support me on Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/wsoltani)

Starring the repo and sharing it help a lot too. 💚

Found a bug or have an idea? [Open an issue](https://github.com/wSoltani/Syncify/issues/new) or ask in the [Syncify Discord](https://syncify.wsoltani.com/discord).

Check out [Netherstone](https://github.com/Netherstone-HQ/Netherstone)

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
