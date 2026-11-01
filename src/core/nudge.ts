// The Secure nudge: Syncify's prompt to secure a backup that has no account.
// The backup service says who sees it (SyncifyRemoteState.nudge); what each
// person chose is kept on this device only.

// Until when Not now hides the row in Syncify's window (ms).
const HIDDEN_UNTIL_KEY = "syncify:nudge-hidden-until";
// Set once the launch panel has opened: it opens once per install.
const PANEL_SHOWN_KEY = "syncify:nudge-panel-shown";

// How long Not now hides the row (decided on 2026-11-01).
const HIDE_DAYS = 30;
const DAY_MS = 86_400_000;

export function isNudgeHidden(now = Date.now()): boolean {
  const until = Number(read(HIDDEN_UNTIL_KEY));
  return Number.isFinite(until) && until > now;
}

export function hideNudge(now = Date.now()): void {
  write(HIDDEN_UNTIL_KEY, String(now + HIDE_DAYS * DAY_MS));
}

export function wasNudgePanelShown(): boolean {
  return read(PANEL_SHOWN_KEY) !== null;
}

export function markNudgePanelShown(): void {
  write(PANEL_SHOWN_KEY, "1");
}

function read(key: string): string | null {
  return Spicetify.LocalStorage?.get(key) ?? window.localStorage.getItem(key);
}

function write(key: string, value: string): void {
  if (Spicetify.LocalStorage?.set) Spicetify.LocalStorage.set(key, value);
  else window.localStorage.setItem(key, value);
}
