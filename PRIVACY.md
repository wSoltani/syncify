# Privacy

You don't need an account. Without one, your backups follow the Spotify account you're signed in with. An account adds your email, and lets you secure your backups so only you can restore them.

## What Syncify stores

- **A one-way hash of your Spotify username,** and which account field was hashed. Syncify doesn't see your username or your Spotify password.
- **Your backups:** your 3 latest backups and a safety copy, and for a backup with items a restore leaves off by default, a copy without them for older versions of Syncify. Each holds what Marketplace keeps about your extensions, themes (with their color scheme), snippets and apps, what you set up manually in Spicetify's config, and the kind of computer it came from (Windows, macOS or Linux). Backups aren't encrypted, so don't keep secrets in them.
- **Each install:** a random ID made when Syncify is installed, its Syncify version, and when it was first and last seen. Also the public half of a key the install makes for itself, and whether your Spotify account trusts that install, how it came to (it was there first, it signed in, or another install or Syncify approved it) and when.
- **Backups from installs your Spotify account doesn't trust yet:** kept apart from your own, the 3 latest at most. They join your backups when the install is approved, and are deleted when newer ones replace them or someone presses **Not mine**.
- **Activity counts:** how many backups and restores you made, by month and by day of the week and hour, when you first had each item, and which items you added and removed each year. Your time zone is used to count these and isn't stored.
- **With an account:** your email, the Spotify accounts you linked, and your signed-in devices, each with its user agent, the country it signed in from and when it was last used. IP addresses aren't stored.
- **Share codes:** for each code you create, its name if you give one, the Marketplace items in it, when it was made and changed, and how many times it was imported. A code and its page are public: anyone with the code or the link can see its name and items. Never extension settings or your Spicetify config.
- **Imports of share codes:** when you apply someone's code, the hash of your Spotify username is kept with that code, so each Spotify account counts once.
- **Discovery posts (coming soon):** the setups you post, with their title, description and screenshots, and the hearts you give and get. Screenshots are checked by Cloudflare's Workers AI before anyone sees them.

Sign-in codes go out by email through Resend, Brevo or Mailjet, so they see your email address. Syncify only emails sign-in codes.

Syncify runs on Cloudflare. Its usage analytics keep your username hash with each request for 3 months, and requests go into short-lived logs used to fix problems. Syncify also keeps app-wide counts, like how many people backed up each day. Nothing in them points back to you, so they stay after your data is deleted.

## Securing your backup

1. In Syncify, open **Account**, press **Secure your backup** and sign in with the code sent to your email.
2. The claim stays pending for 7 days. Syncify on that Spotify account shows it with your email partly hidden, like a\*\*\*e@example.com, and anyone signed in to that Spotify account can press **Not me**.
3. If Syncify was used on that Spotify account from another device lately, the claim waits until you sign in to Syncify on that device, or until it hasn't been used for 7 days. If someone presses **Not me** on a device that isn't then signed in to your account, or an old version of Syncify was used there, the claim waits until Syncify checks it manually. Otherwise, after the 7 days the backup is secured to your account, and only your signed-in devices can restore it.

Syncify can undo a secured claim if it turns out to be wrong. Your backups stay as they are.

For this, Syncify keeps when each claim was made, when it was held for a check and why, and when it was secured or undone. While a Spotify account is being claimed, each Syncify install that uses it is kept with its device, version, country, when it was used and what it did, so an admin can check the claim. That's deleted when the claim finishes or is cancelled.

You can link more than one Spotify account to the same Syncify account.

## Deleting your data

- **With an account:** sign in at [syncify.wsoltani.com](https://syncify.wsoltani.com/account) and press **Delete everything**. It deletes your account, your email, your signed-in devices, your share codes and their pages, and every linked Spotify account with all its backups, activity counts and the codes it imported. This can't be undone.
- **Without an account:** secure your backup first, then delete everything once it's secured.
- **One share code:** delete it in Syncify or on your account page. Its link stops working, and who imported it goes with it.
- **Data you stop using:** a Spotify account without a Syncify account that hasn't used Syncify for 12 months is deleted with all its backups and the codes it imported. A Syncify account with no sign-in for 12 months, and none of its linked Spotify accounts using Syncify in that time, is deleted entirely, the same as Delete everything.

If an admin ever changed your account manually, for example by signing out your devices, that log entry keeps a one-way hash of your email after the account is deleted, so a later question about it can still be answered. Usage analytics drop your username hash within 3 months.

This note is updated before Syncify starts storing anything new.
