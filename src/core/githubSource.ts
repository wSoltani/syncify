// The GitHub repo an item's code loads from, or null when it loads from
// anywhere else. Marketplace items load from GitHub in three forms, all
// serving a repo's own files:
// - raw.githubusercontent.com/{owner}/{repo}/{branch}/{path}
// - cdn.jsdelivr.net/gh/{owner}/{repo}@{version}/{path}
// - {owner}.github.io/{repo}/{path} (GitHub Pages; a user site without a
//   repo in its path is {owner}/{owner}.github.io)
// Custom domains, even ones GitHub Pages serves, can't be told apart from any
// other host, so they stay outside.
const RAW_HOST = "raw.githubusercontent.com";
const JSDELIVR_HOST = "cdn.jsdelivr.net";
const PAGES_SUFFIX = ".github.io";

export function githubRepo(url: URL): string | null {
  if (url.protocol !== "https:") return null;
  const path = url.pathname.split("/").filter(Boolean);

  if (url.host === RAW_HOST) return repoOf(path[0], path[1]);
  if (url.host === JSDELIVR_HOST) {
    return path[0] === "gh" ? repoOf(path[1], path[2]?.split("@")[0]) : null;
  }
  if (url.host.endsWith(PAGES_SUFFIX)) {
    const owner = url.host.slice(0, -PAGES_SUFFIX.length);
    if (owner.includes(".")) return null;
    return repoOf(owner, path.length > 1 ? path[0] : url.host);
  }
  return null;
}

function repoOf(owner: string | undefined, repo: string | undefined): string | null {
  return owner && repo ? `${owner}/${repo}` : null;
}
