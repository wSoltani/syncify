import { pathToFileURL } from "node:url";
import { checkRegistry, readJson, schemaPath } from "./check.mjs";

// Pull request check for registry.json. It runs from the base branch's copy
// of this script, so a pull request can't change the rules it is held to.
//
// Only the owner of an item's repo can add, change or remove its entry. The
// owner is the GitHub account that owns the repo, or a public member of the
// organization that owns it. Every added or changed id must also match an
// item in the repo's manifest.json, as Marketplace builds it.

const GITHUB_API = "https://api.github.com";
const RAW = "https://raw.githubusercontent.com";

export function splitId(id) {
  const [user, repo, ...path] = id.split("/");
  return { user, repo, path: path.join("/") };
}

// The ids an item's manifest.json gives it in Marketplace, which keys
// extensions by main, themes by usercss and custom apps by name.
export function manifestPaths(manifest) {
  const entries = Array.isArray(manifest) ? manifest : [manifest];
  return entries.flatMap((entry) => {
    if (!entry || typeof entry !== "object") return [];
    const paths = [];
    if (typeof entry.main === "string") paths.push(entry.main);
    if (typeof entry.usercss === "string") paths.push(entry.usercss);
    if (typeof entry.name === "string") paths.push(entry.name.replaceAll(" ", "-"));
    return paths;
  });
}

export function diffItems(base, head) {
  const before = new Map((base?.items ?? []).map((item) => [item.id, item]));
  const after = new Map(head.items.map((item) => [item.id, item]));
  const changed = [];
  for (const [id, item] of after) {
    const old = before.get(id);
    if (!old || JSON.stringify(old) !== JSON.stringify(item)) changed.push({ id, item });
  }
  const removed = [...before.keys()].filter((id) => !after.has(id));
  const settingsChanged =
    !base ||
    JSON.stringify({ ...base, items: null }) !== JSON.stringify({ ...head, items: null });
  return { changed, removed, settingsChanged };
}

export function createGitHub(token, fetchImpl = fetch) {
  const headers = {
    accept: "application/vnd.github+json",
    "x-github-api-version": "2022-11-28",
    ...(token ? { authorization: `Bearer ${token}` } : {}),
  };
  return {
    async repo(user, repo) {
      const response = await fetchImpl(`${GITHUB_API}/repos/${user}/${repo}`, { headers });
      if (response.status === 404) return null;
      if (!response.ok) throw new Error(`GitHub answered ${response.status} for ${user}/${repo}`);
      return response.json();
    },
    async isPublicMember(org, login) {
      const response = await fetchImpl(
        `${GITHUB_API}/orgs/${encodeURIComponent(org)}/public_members/${encodeURIComponent(login)}`,
        { headers },
      );
      if (response.status === 204) return true;
      if (response.status === 404) return false;
      throw new Error(`GitHub answered ${response.status} for ${org}'s members`);
    },
    async manifest(user, repo, branch) {
      const response = await fetchImpl(`${RAW}/${user}/${repo}/${branch}/manifest.json`);
      if (response.status === 404) return null;
      if (!response.ok) throw new Error(`GitHub answered ${response.status} for ${user}/${repo}'s manifest.json`);
      try {
        return JSON.parse(await response.text());
      } catch {
        return null;
      }
    },
  };
}

export async function checkPullRequest({ base, head, author, maintainer, github }) {
  const errors = [];
  const { changed, removed, settingsChanged } = diffItems(base, head);
  const isMaintainer = author.toLowerCase() === maintainer.toLowerCase();

  if (settingsChanged && !isMaintainer) {
    errors.push("Only Syncify changes the format, sizes and account limit");
  }

  const repos = new Map();
  const repoOf = async (id) => {
    const { user, repo } = splitId(id);
    const key = `${user}/${repo}`;
    if (!repos.has(key)) repos.set(key, await github.repo(user, repo));
    return repos.get(key);
  };

  const ownsRepo = async (repo) => {
    const owner = repo.owner.login;
    if (owner.toLowerCase() === author.toLowerCase()) return true;
    return repo.owner.type === "Organization" && github.isPublicMember(owner, author);
  };

  for (const { id, item } of changed) {
    const { user, repo: name, path } = splitId(id);
    const repo = await repoOf(id);
    if (!repo) {
      errors.push(`${id}: no public GitHub repo ${user}/${name}`);
      continue;
    }
    if (repo.full_name !== `${user}/${name}`) {
      errors.push(`${id}: the repo is ${repo.full_name}, so the id must start with ${repo.full_name}/`);
      continue;
    }
    const manifest = await github.manifest(user, name, repo.default_branch);
    if (!manifest || !manifestPaths(manifest).includes(path)) {
      errors.push(`${id}: ${repo.full_name}'s manifest.json has no item at ${path}`);
    }
    if (isMaintainer) continue;
    if (item.addedBy !== "owner") {
      errors.push(`${id}: entries submitted by an owner use "addedBy": "owner"`);
    }
    if (!(await ownsRepo(repo))) {
      errors.push(`${id}: only the owner of ${repo.full_name} can add or change this entry`);
    }
  }

  if (!isMaintainer) {
    for (const id of removed) {
      const repo = await repoOf(id);
      if (!repo || !(await ownsRepo(repo))) {
        errors.push(`${id}: only the owner of its repo can remove this entry`);
      }
    }
  }

  return errors;
}

async function main() {
  const [basePath, headPath] = process.argv.slice(2);
  const { PR_AUTHOR: author, MAINTAINER: maintainer, GITHUB_TOKEN: token } = process.env;
  if (!headPath || !author || !maintainer) {
    console.error("Usage: PR_AUTHOR=… MAINTAINER=… node scripts/registry/owners.mjs <base registry> <head registry>");
    process.exit(2);
  }

  const head = await readJson(headPath);
  const shapeErrors = checkRegistry(head, await readJson(schemaPath));
  const errors =
    shapeErrors.length > 0
      ? shapeErrors
      : await checkPullRequest({
          base: await readJson(basePath).catch(() => null),
          head,
          author,
          maintainer,
          github: createGitHub(token),
        });

  if (errors.length > 0) {
    for (const error of errors) console.error(`::error::${error}`);
    process.exit(1);
  }
  console.log("Every changed entry checks out");
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await main();
