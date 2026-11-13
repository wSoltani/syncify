# Privacy

You don't need an account. Without one, your backups follow the Spotify account you're signed in with. An account adds your email, and lets you secure your backups so only you can restore them.

## What Syncify stores

- **A one-way hash of your Spotify username.** Syncify doesn't see your username or your Spotify password.
- **Your backups:** your 3 latest and a safety copy, and for a backup with items a restore leaves off by default, a copy without them for older versions of Syncify. Each holds what Marketplace keeps about your extensions, themes (with their color scheme), snippets and apps, what you set up manually in Spicetify's config, and the kind of computer it came from (Windows, macOS or Linux). With an account, you can name a backup on your account page.
- **Each install:** a random ID made when Syncify is installed, its version, and when it was first and last seen. Also the public half of a key the install makes for itself, and whether your Spotify account trusts that install, how it came to and when.
- **Backups from installs your Spotify account doesn't trust yet:** kept apart from yours, the 3 latest at most. They join your backups when the install is approved, and are deleted when newer ones replace them or someone presses **Not mine**.
- **Activity counts:** how many backups and restores you made, by month and by day of the week and hour, when you first had each item, the names of the items in your latest backup, and which items you added and removed each year. Your time zone is used to count these and isn't stored.
- **With an account:** your email, the Spotify accounts you linked, and your signed-in devices, each with its user agent, the country it signed in from and when it was last used. IP addresses aren't stored.
- **Share codes:** for each code you create, its name if you give one, the Marketplace items in it, when it was made and changed, and how many Spotify accounts applied it. A code and its page are public: anyone with the code or the link can see its name and items. Never extension settings or your Spicetify config.
- **Imports of share codes:** when you apply someone's code, the hash of your Spotify username is kept with that code, so each Spotify account counts once.
- **Your handle:** the name you pick when you first share a setup or on your account page, like @mellow-beat427, and when you last changed it. It's public: your share pages show it, and its profile page lists your codes. It's never made from your email or your Spotify username. When you change it or delete your account, the old one is held for 30 days so nobody else can take it while old links still point to it.
- **Your socials:** the GitHub, Reddit, X and Discord usernames you add on your account page, if any. They're public on your profile page. Delete one by emptying it. They're also deleted with your account, and when Syncify resets your handle.
- **Discover posts:** for each share code you post, its description, up to 3 images, when it was posted and changed, and whether it's public, waiting for a check or not allowed. A public post is public like its code: anyone can see it, its images and your handle. Images are checked by Cloudflare's Workers AI before anyone sees them, and its answer is kept with each one.
- **Hearts:** which setups you hearted and when, so you can heart each once, and how many hearts you gave or took back today, so one account can't give too many. Others see only how many hearts a setup has, never who gave them. Syncify also counts the hearts your setups get, in total and by month.
- **Reports:** when you report a setup or a handle, which one, why and when. The person you report never sees who reported them.

Syncify also keeps app-wide counts, like how many people backed up each day. Nothing in them points back to you, so they stay after your data is deleted.

## Extension settings sync

This is coming in a later version of Syncify. Nothing is stored for it yet.

With an account and a secured backup, Syncify copies the saved settings of your extensions, themes and custom apps between your devices. You can turn it off for each device and for each item.

- **What's stored:** only the keys each item lists in Syncify's public registry, with when each changed, its size and which install sent it. A removed key is kept without its value, so the removal reaches your other devices. Syncify also keeps which of these items your devices still have installed.
- **What never leaves your device:** keys an item marks as secret, like API keys and tokens. They're never synced or backed up. Share codes never include extension settings.
- **Where:** in a separate D1 database, and in your backups in R2. Like backups, they aren't encrypted end to end.
- **How long:** until you delete them. **Delete synced copy** in Syncify, or **Delete** on your account page, removes one item. **Delete everything** removes them all. An item's synced copy is also deleted 30 days after none of your devices has it installed.

## Where it's stored

Syncify runs on Cloudflare:

- **Workers** run Syncify's server and website.
- **D1** databases hold your account, your Spotify accounts and installs, your activity counts, share codes, Discover posts, hearts and reports.
- **R2** holds your backup files, your share codes' files and your Discover images.
- **Workers KV** still holds backups made before October 24, 2026, from before Syncify moved to D1 and R2. Syncify only reads them, to bring them in the first time that Spotify account uses it.
- **Workers Analytics Engine** keeps your username hash with each request for 3 months, to count how many people use Syncify.
- **Workers Logs** keep each request for 3 days, to fix problems.
- **Workers AI** checks Discover images.

Sign-in codes go out by email through Resend, Brevo or Mailjet, so they see your email address. Syncify only emails you codes, to sign in or to delete your account.

## How it's kept safe

Syncify follows common security practice:

- Everything travels over HTTPS, and Cloudflare encrypts the databases and files on disk. Backups aren't encrypted end to end though: Syncify can read them, so don't keep secrets in them.
- There's no password to leak. You sign in with a code sent to your email.
- Once you sign in, Syncify in Spotify is tied to a key that can't be copied off that install.
- IP addresses aren't stored, and limits on requests stop anyone from flooding Syncify.
- Deleted data is held for about 9 days so it can be brought back if Syncify is ever attacked, then erased.
- The extension is open source, so anyone can check what it sends.

## Securing your backup

1. In Syncify, open **Account**, press **Secure your backup** and sign in with the code sent to your email.
2. The claim stays pending for 7 days. Syncify on that Spotify account shows it with your email partly hidden, like a\*\*\*e@example.com, and anyone using that Spotify account can press **Not me**.
3. **Not me** from a device that Spotify account trusts cancels the claim. **Not me** from any other device, or an old version of Syncify used there during the claim, makes it wait until Syncify checks it manually. Otherwise, after the 7 days the backup is secured to your account, and only your signed-in devices can restore it.

Syncify can undo a secured claim if it turns out to be wrong. Your backups stay as they are, and that account can't secure them again. For 30 days, Syncify on that Spotify account says the backup is no longer secured by that account, with its email partly hidden.

For this, Syncify keeps when each claim was made, when it was held for a check and why, and when it was secured or undone. While a claim is pending, the install that made it and each install that pressed **Not me** are kept with their device, version, country and when they were first seen. So is each device the claiming account signs in with: its user agent, the country it signed in from and when, even after it signs out. That way an admin can compare them. All of it is deleted when the claim finishes or is cancelled.

## Deleting your data

- **With an account:** sign in at [syncify.wsoltani.com](https://syncify.wsoltani.com/account) and press **Delete everything**. It deletes your account, your email, your signed-in devices, your share codes and their pages, your Discover posts and their images, the hearts you gave, your reports, your handle, your socials and your profile page, and every linked Spotify account with all its backups, activity counts and the codes it imported. This can't be undone.
- **Without an account:** secure your backup first, then delete everything once it's secured.
- **One share code:** delete it in Syncify or on your account page. Its link stops working, and who imported it goes with it, with its Discover post and hearts.
- **One Discover post:** press **Remove from Discover** on your account page. Its images come off Discover at once, its hearts are deleted, and the code stays.
- **Data you stop using:** a Spotify account without a Syncify account that hasn't used Syncify for 12 months is deleted with all its backups and the codes it imported. A Syncify account with no sign-in for 12 months, and none of its linked Spotify accounts using Syncify in that time, is deleted entirely, the same as Delete everything.

Deleted backups and share codes stay in storage for about 9 more days, out of reach, so they can be brought back if Syncify is ever attacked. Backups replaced by newer ones are held the same way. Images you take off a Discover post, or delete with it, stay about 9 more days at their own link, off Discover. When you change a share code, what it held before is kept for 8 days so Syncify can put it back, then held the same way. After that, all of it is erased.

Backups made before October 24, 2026 stay in Workers KV, which Delete everything and the 12-month cleanup don't reach. If that Spotify account uses Syncify again, they come back as its backups.

If an admin ever changed your account manually, for example by signing out your devices, that log entry keeps a one-way hash of your email after the account is deleted, so a later question about it can still be answered.

## Questions and problems

Ask about your data in the [Syncify Discord](https://syncify.wsoltani.com/discord). If you find a security problem, report it privately from the [Security tab](https://github.com/wSoltani/Syncify/security) instead of in public. Wassim answers both.

This note is updated before Syncify starts storing anything new.
