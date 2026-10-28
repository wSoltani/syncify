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
- **Privacy:** what Syncify stores and how to delete it is under [Privacy](#privacy).

### Privacy

You don't need an account. Without one, your backups follow the Spotify account you're signed in with. An account adds your email, and lets you secure your backups so only you can restore them.

#### What Syncify stores

- **A one-way hash of your Spotify username,** and which account field was hashed. Syncify doesn't see your username or your Spotify password.
- **Your backups:** your 3 latest backups and a safety copy. Each holds what Marketplace keeps about your extensions, themes (with their color scheme), snippets and apps, what you set up manually in Spicetify's config, and the kind of computer it came from (Windows, macOS or Linux). Backups aren't encrypted, so don't keep secrets in them.
- **Each install:** a random ID made when Syncify is installed, its Syncify version, and when it was first and last seen.
- **Activity counts:** how many backups and restores you made, by month and by day of the week and hour, when you first had each item, and which items you added and removed each year. Your time zone is used to count these and isn't stored.
- **With an account:** your email, the Spotify accounts you linked, and your signed-in devices, each with its user agent, the country it signed in from and when it was last used. IP addresses aren't stored.
- **Share codes (coming soon):** the items in each code you create, when it was made and changed, and how many times it was imported. Anyone with a code can see what's in it.
- **Discovery posts (coming soon):** the setups you post, with their title, description and screenshots, and the hearts you give and get. Screenshots are checked by Cloudflare's Workers AI before anyone sees them.

Sign-in codes go out by email through Resend, Brevo or Mailjet, so they see your email address. Syncify only emails sign-in codes.

Syncify runs on Cloudflare. Its usage analytics keep your username hash with each request for 3 months, and requests go into short-lived logs used to fix problems. Syncify also keeps app-wide counts, like how many people backed up each day. Nothing in them points back to you, so they stay after your data is deleted.

#### Securing your backup

1. In Syncify, open **Account**, press **Secure your backup** and sign in with the code sent to your email.
2. The claim stays pending for 7 days. Syncify on that Spotify account shows it with your email partly hidden, like a\*\*\*@gmail.com, and anyone signed in to that Spotify account can cancel it.
3. If nobody cancels, the backup is secured to your account, and only your signed-in devices can restore it.

You can link more than one Spotify account to the same Syncify account.

#### Deleting your data

- **With an account:** sign in at [syncify.wsoltani.com](https://syncify.wsoltani.com/account) and press **Delete everything**. It deletes your account, your email, your signed-in devices, and every linked Spotify account with all its backups and activity counts. This can't be undone.
- **Without an account:** secure your backup first, then delete everything once it's secured.
- **Data you stop using:** a Spotify account without a Syncify account that hasn't used Syncify for 12 months is deleted with all its backups. A Syncify account with no sign-in for 12 months, and none of its linked Spotify accounts using Syncify in that time, is deleted entirely, the same as Delete everything.

If an admin ever changed your account manually, for example by signing out your devices, that log entry keeps a one-way hash of your email after the account is deleted, so a later question about it can still be answered. Usage analytics drop your username hash within 3 months.

This note is updated before Syncify starts storing anything new.

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
