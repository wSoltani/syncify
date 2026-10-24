import { collectMarketplaceKeys } from "./marketplace";
import { listItems, type InstalledItem, type ManualItem } from "./restorePreview";

/** What Syncify found after the reload that followed a restore. */
export interface RestoreResult {
  at: number;
  loaded: number;
  total: number;
  /** In the backup's Spicetify config but not this device's. */
  manual: ManualItem[];
}

const PENDING_KEY = "syncify:pending-restore";
// A restore reloads Spotify straight away; an older record is left over
// from a reload that never happened.
const PENDING_MAX_AGE_MS = 10 * 60 * 1000;
const CHECK_INTERVAL_MS = 2000;
const CHECK_LIMIT_MS = 15000;
const ACTIVE_THEME_KEY = "marketplace:theme-installed";
const GITHUB_RAW_HOST = "raw.githubusercontent.com";
// Marketplace loads GitHub files from whichever of these answers first.
const JSDELIVR_HOSTS = ["cdn.jsdelivr.net", "cdn.jsdelivr.xyz"];

let result: RestoreResult | null = null;
const listeners = new Set<(result: RestoreResult | null) => void>();
// Scripts seen loading or failing since Syncify started, without their query.
const scriptEvents = new Map<string, "load" | "error">();

export function getRestoreResult(): RestoreResult | null {
  return result;
}

export function onRestoreResult(
  listener: (result: RestoreResult | null) => void,
): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function dismissManualItems(): void {
  if (result) setResult({ ...result, manual: [] });
}

/** Called right before the reload that follows a restore. */
export function savePendingRestore(manual: ManualItem[]): void {
  try {
    localStorage.setItem(
      PENDING_KEY,
      JSON.stringify({ at: Date.now(), manual }),
    );
  } catch {
    // no summary after the reload, the restore itself is unaffected
  }
}

/** Reloads Spotify and checks again afterwards. */
export function reloadAndCheck(): void {
  savePendingRestore(result?.manual ?? []);
  window.location.reload();
}

/**
 * Called as soon as Syncify starts. When a restore is pending, it notes every
 * script that loads or fails from then on, since the browser's own record of
 * downloads can be full by the time Marketplace has loaded everything.
 */
export function watchScriptsIfRestored(): void {
  if (!readPending()) return;
  document.addEventListener(
    "load",
    (event) => noteScript(event.target, "load"),
    true,
  );
  document.addEventListener(
    "error",
    (event) => noteScript(event.target, "error"),
    true,
  );
}

/**
 * After a restore's reload: waits until Marketplace has loaded everything
 * (checked every 2 seconds, for at most 15), then tells the user how much
 * loaded. The details wait in Syncify's window.
 */
export async function checkRestore(): Promise<void> {
  const pending = readPending();
  if (!pending) return;
  try {
    localStorage.removeItem(PENDING_KEY);
  } catch {
    // checked once more after the next reload at worst
  }

  const started = Date.now();
  let count = await countLoaded();
  while (count.loaded < count.total && Date.now() - started < CHECK_LIMIT_MS) {
    await new Promise((resolve) => setTimeout(resolve, CHECK_INTERVAL_MS));
    count = await countLoaded();
  }

  setResult({ at: Date.now(), ...count, manual: pending.manual });
  const complete = count.loaded === count.total && pending.manual.length === 0;
  Spicetify.showNotification(
    complete
      ? `Syncify: backup restored. ${describeLoaded(count)}.`
      : `Syncify: restored ${count.loaded} of ${count.total}. Open Syncify for details.`,
    false,
    8000,
  );
}

/** One `spicetify config` line per item, then `spicetify apply`. */
export function manualCommands(items: ManualItem[]): string[] {
  const lines = items.map((item) =>
    item.type === "extension"
      ? `spicetify config extensions ${quote(item.name)}`
      : item.type === "custom_app"
        ? `spicetify config custom_apps ${quote(item.name)}`
        : `spicetify config current_theme ${quote(item.name)}${item.scheme ? ` color_scheme ${quote(item.scheme)}` : ""}`,
  );
  return lines.length > 0 ? [...lines, "spicetify apply"] : [];
}

function describeLoaded(count: { loaded: number; total: number }): string {
  return count.total === 1 ? "It loaded" : `All ${count.total} loaded`;
}

// Names are already limited to letters, digits and . _ - + @ / ( ) and
// spaces; quotes keep spaces and parentheses together in every shell.
function quote(name: string): string {
  return /^[\w.@+/-]+$/.test(name) ? name : `"${name}"`;
}

function setResult(next: RestoreResult | null): void {
  result = next;
  for (const listener of listeners) listener(next);
}

function readPending(): { manual: ManualItem[] } | null {
  try {
    const pending = JSON.parse(localStorage.getItem(PENDING_KEY) ?? "null");
    if (!pending || Date.now() - pending.at > PENDING_MAX_AGE_MS) return null;
    return { manual: Array.isArray(pending.manual) ? pending.manual : [] };
  } catch {
    return null;
  }
}

function noteScript(target: EventTarget | null, kind: "load" | "error"): void {
  if (target instanceof HTMLScriptElement && target.src) {
    scriptEvents.set(withoutQuery(target.src), kind);
  }
}

// What Marketplace loads at startup: every extension, the active theme and
// every snippet. Other installed themes aren't loaded, so they don't count.
async function countLoaded(): Promise<{ loaded: number; total: number }> {
  const keys = await collectMarketplaceKeys();
  const activeTheme = keys[ACTIVE_THEME_KEY] ?? "";
  const expected = listItems(keys).filter(
    (item) =>
      (item.type === "extension" && item.sources.length > 0) ||
      (item.type === "theme" && activeTheme.includes(item.key)) ||
      item.type === "snippet",
  );

  return {
    loaded: expected.filter(isLoaded).length,
    total: expected.length,
  };
}

function isLoaded(item: InstalledItem): boolean {
  if (item.type === "snippet") {
    const snippets = document.querySelector("style.marketplaceSnippets");
    return snippets?.textContent?.includes(`/* ${item.name} - `) === true;
  }
  if (item.type === "theme") {
    const css = document.querySelector(
      "style.marketplaceCSS.marketplaceUserCSS",
    );
    return Boolean(css?.textContent?.trim());
  }
  return scriptAddresses(item.sources[0]).some(wasLoaded);
}

// Where Marketplace loads an extension from: jsDelivr for a file on GitHub,
// the address itself otherwise.
function scriptAddresses(source: string): string[] {
  let url: URL;
  try {
    url = new URL(source);
  } catch {
    return [];
  }
  if (url.host !== GITHUB_RAW_HOST) return [withoutQuery(url.href)];

  const [owner, repo, branch, ...path] = url.pathname.split("/").filter(Boolean);
  if (!owner || !repo || !branch || path.length === 0) return [];
  // Parsed like the page parses script addresses, so they compare equal.
  return JSDELIVR_HOSTS.map((host) =>
    withoutQuery(`https://${host}/gh/${owner}/${repo}@${branch}/${path.join("/")}`),
  );
}

// A script on the page that loaded, as Syncify saw it or as the browser
// recorded its download.
function wasLoaded(address: string): boolean {
  const seen = scriptEvents.get(address);
  if (seen) return seen === "load";

  const onPage = [...document.querySelectorAll<HTMLScriptElement>("script[src]")]
    .some((script) => withoutQuery(script.src) === address);
  return (
    onPage &&
    performance
      .getEntriesByType("resource")
      .some((entry) => withoutQuery(entry.name) === address)
  );
}

function withoutQuery(address: string): string {
  try {
    const url = new URL(address);
    return `${url.origin}${url.pathname}`;
  } catch {
    return address;
  }
}
