import { compareVersions, readPointer } from "./release-versions.mjs";

// Posts a promoted version in the Syncify Discord's #announcements:
// node scripts/announce-release.mjs <version> <previous latest.json>.
// Promote is also the rollback, so it posts only when the version is newer
// than the one everyone had. The webhook URL comes from DISCORD_WEBHOOK_URL;
// without it nothing is posted. latest.json is already written by then, so a
// failed post warns instead of failing the run.
const [version, previousFile] = process.argv.slice(2);
const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

if (!webhookUrl) {
  console.log("DISCORD_WEBHOOK_URL isn't set; not posting");
  process.exit(0);
}

const previous = await readPointer(previousFile);
if (previous && compareVersions(previous, version) >= 0) {
  console.log(`${version} isn't newer than ${previous}, which everyone had; not posting`);
  process.exit(0);
}

const response = await fetch(webhookUrl, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    content: `Syncify ${version} is out for everyone\nWhat's new: https://github.com/wSoltani/Syncify/releases/tag/v${version}`,
    allowed_mentions: { parse: [] },
  }),
}).catch((error) => ({ ok: false, status: error.message }));

if (!response.ok) {
  console.log(`::warning::Couldn't post ${version} in the Discord (${response.status})`);
} else {
  console.log(`Posted ${version} in the Discord`);
}
