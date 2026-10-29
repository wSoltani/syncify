import type { ItemType, PreviewItem } from "./restorePreview";
import { githubRepo } from "./githubSource";

/** What Syncify found about where an item in a backup comes from. */
export type SourceCheck =
  /** Loaded from outside GitHub. */
  | { kind: "host"; host: string }
  /** Its code is in a different repo than the one it names. */
  | { kind: "repo"; repo: string }
  /** On Marketplace's block list. */
  | { kind: "blocked" }
  /** Not in Marketplace's catalog. */
  | { kind: "catalog" }
  /** GitHub or Marketplace's lists couldn't be reached. */
  | { kind: "unchecked" }
  /** A snippet made on a device rather than taken from Marketplace's list. */
  | { kind: "custom" };

export type SourceChecks = Map<string, SourceCheck>;

const TOPICS: Partial<Record<ItemType, string>> = {
  extension: "spicetify-extensions",
  theme: "spicetify-themes",
};
// The same lists Marketplace reads.
const BLOCK_LIST_URL =
  "https://raw.githubusercontent.com/spicetify/marketplace/main/resources/blacklist.json";
const SNIPPETS_URL =
  "https://raw.githubusercontent.com/spicetify/marketplace/main/resources/snippets.json";
const REPO_API_URL = "https://api.github.com/repos";
const REQUEST_TIMEOUT_MS = 5000;
// GitHub allows 60 requests an hour per IP without signing in, shared with
// Marketplace, so lookups are cached and capped per preview.
const MAX_LOOKUPS = 20;
const CACHE_KEY = "syncify:repo-topics";
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const MAX_CACHED_REPOS = 200;

export function isWarning(check: SourceCheck | undefined): boolean {
  return (
    check?.kind === "host" ||
    check?.kind === "repo" ||
    check?.kind === "blocked" ||
    check?.kind === "catalog"
  );
}

/**
 * Checks that need no network: where the backup's copy of each item loads
 * from. They apply to everything the restore writes, including items already
 * installed, since the backup's copy replaces this device's.
 */
export function checkSources(items: PreviewItem[]): SourceChecks {
  const checks: SourceChecks = new Map();

  for (const item of items) {
    if (item.change === "removed") continue;
    if (item.custom) {
      checks.set(item.key, { kind: "custom" });
      continue;
    }

    const check = checkAddresses(item);
    if (check) checks.set(item.key, check);
  }

  return checks;
}

/**
 * Marketplace's catalog: its block list, the GitHub topic it searches, and
 * its snippet list. Only for items new to this device that passed
 * `checkSources`.
 */
export async function checkCatalog(
  items: PreviewItem[],
  local: SourceChecks,
): Promise<SourceChecks> {
  const checks: SourceChecks = new Map();
  const pending = items.filter(
    (item) => item.change !== "removed" && item.isNew && !local.has(item.key),
  );
  if (pending.length === 0) return checks;

  const snippets = pending.filter((item) => item.type === "snippet");
  const repos = pending.filter((item) => item.type !== "snippet");

  if (snippets.length > 0) {
    const titles = await fetchSnippetTitles();
    for (const item of snippets) {
      if (!titles) checks.set(item.key, { kind: "unchecked" });
      else if (!titles.has(normalizeTitle(item.name))) {
        checks.set(item.key, { kind: "catalog" });
      }
    }
  }

  if (repos.length > 0) {
    const blockList = await fetchBlockList();
    const cache = readCache();
    let lookups = 0;

    await Promise.all(
      repos.map(async (item) => {
        const repo = sourceRepo(item);
        const topic = TOPICS[item.type];
        if (!repo || !topic) return;

        if (blockList === null) {
          checks.set(item.key, { kind: "unchecked" });
          return;
        }
        if (isBlocked(repo, blockList)) {
          checks.set(item.key, { kind: "blocked" });
          return;
        }

        let topics = cachedTopics(cache, repo);
        if (topics === undefined && lookups < MAX_LOOKUPS) {
          lookups += 1;
          topics = await fetchTopics(repo);
          if (topics !== undefined) cache[repo.toLowerCase()] = { topics, at: Date.now() };
        }

        if (topics === undefined) checks.set(item.key, { kind: "unchecked" });
        else if (topics === null || !topics.includes(topic)) {
          checks.set(item.key, { kind: "catalog" });
        }
      }),
    );

    writeCache(cache);
  }

  return checks;
}

function checkAddresses(item: PreviewItem): SourceCheck | null {
  let otherRepo: string | null = null;

  for (const address of item.sources) {
    let url: URL;
    try {
      url = new URL(address);
    } catch {
      return { kind: "host", host: address.slice(0, 40) };
    }
    const repo = githubRepo(url);
    if (!repo) return { kind: "host", host: url.host };
    if (item.repo && repo.toLowerCase() !== item.repo.toLowerCase()) {
      otherRepo ??= repo;
    }
  }

  return otherRepo ? { kind: "repo", repo: otherRepo } : null;
}

// The repo the code actually comes from: the first address's, else the one
// the item names.
function sourceRepo(item: PreviewItem): string | null {
  for (const address of item.sources) {
    try {
      const repo = githubRepo(new URL(address));
      if (repo) return repo;
    } catch {
      // checkSources already flagged it
    }
  }
  return item.repo;
}

// Marketplace's rule: case-insensitive, and * matches one path segment.
function isBlocked(repo: string, blockList: string[]): boolean {
  const url = `https://github.com/${repo}`.toLowerCase();
  return blockList.some((pattern) => {
    const normalized = pattern.toLowerCase();
    if (!normalized.includes("*")) return normalized === url;
    const regex = normalized
      .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
      .replace(/\*/g, "[^/]+");
    return new RegExp(`^${regex}$`).test(url);
  });
}

function normalizeTitle(title: string): string {
  return title.replace(/\n/g, "").trim().toLowerCase();
}

let blockListRequest: Promise<string[] | null> | null = null;
let snippetTitlesRequest: Promise<Set<string> | null> | null = null;

// Each list is fetched once per session; a failure is retried next time.
function fetchBlockList(): Promise<string[] | null> {
  blockListRequest ??= fetchJson(BLOCK_LIST_URL).then((body) => {
    const repos = (body as { repos?: unknown } | null)?.repos;
    if (!Array.isArray(repos)) {
      blockListRequest = null;
      return null;
    }
    return repos.filter(
      (repo): repo is string =>
        typeof repo === "string" && !repo.startsWith("//"),
    );
  });
  return blockListRequest;
}

function fetchSnippetTitles(): Promise<Set<string> | null> {
  snippetTitlesRequest ??= fetchJson(SNIPPETS_URL).then((body) => {
    if (!Array.isArray(body)) {
      snippetTitlesRequest = null;
      return null;
    }
    return new Set(
      body.flatMap((snippet) =>
        typeof snippet?.title === "string"
          ? [normalizeTitle(snippet.title)]
          : [],
      ),
    );
  });
  return snippetTitlesRequest;
}

/** The repo's topics, null if it doesn't exist, undefined if GitHub didn't answer. */
async function fetchTopics(
  repo: string,
): Promise<string[] | null | undefined> {
  const response = await fetchWithTimeout(`${REPO_API_URL}/${repo}`);
  if (response?.status === 404) return null;
  if (!response?.ok) return undefined;

  const body = (await response.json().catch(() => null)) as {
    topics?: unknown;
  } | null;
  return Array.isArray(body?.topics)
    ? body.topics.filter((topic): topic is string => typeof topic === "string")
    : undefined;
}

async function fetchJson(url: string): Promise<unknown> {
  const response = await fetchWithTimeout(url);
  return response?.ok ? response.json().catch(() => null) : null;
}

async function fetchWithTimeout(url: string): Promise<Response | null> {
  const controller =
    typeof AbortController === "function" ? new AbortController() : null;
  const timer = setTimeout(() => controller?.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, { signal: controller?.signal });
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

type TopicCache = Record<string, { topics: string[] | null; at: number }>;

function cachedTopics(
  cache: TopicCache,
  repo: string,
): string[] | null | undefined {
  const entry = cache[repo.toLowerCase()];
  return entry && Date.now() - entry.at < CACHE_TTL_MS
    ? entry.topics
    : undefined;
}

function readCache(): TopicCache {
  try {
    const parsed = JSON.parse(localStorage.getItem(CACHE_KEY) ?? "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

// Keeps the newest entries only, so the cache can't grow without limit.
function writeCache(cache: TopicCache): void {
  const now = Date.now();
  const kept = Object.entries(cache)
    .filter(([, entry]) => now - entry.at < CACHE_TTL_MS)
    .sort(([, a], [, b]) => b.at - a.at)
    .slice(0, MAX_CACHED_REPOS);
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(Object.fromEntries(kept)));
  } catch {
    // a full or blocked localStorage only costs a lookup next time
  }
}
