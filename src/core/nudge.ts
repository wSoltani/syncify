// The Secure nudge: Syncify's prompt to secure a backup that has no account.
// The backup service says who sees it (SyncifyRemoteState.nudge); what each
// person chose is kept on this device only.
import { readStored, writeStored } from "./localStore";

// Until when Not now hides the row in Syncify's window (ms).
const HIDDEN_UNTIL_KEY = "syncify:nudge-hidden-until";
// Set once the launch panel has opened: it opens once per install.
const PANEL_SHOWN_KEY = "syncify:nudge-panel-shown";

// How long Not now hides the row (decided on 2026-11-01).
const HIDE_DAYS = 30;
const DAY_MS = 86_400_000;

export function isNudgeHidden(now = Date.now()): boolean {
  const until = Number(readStored(HIDDEN_UNTIL_KEY));
  return Number.isFinite(until) && until > now;
}

export function hideNudge(now = Date.now()): void {
  writeStored(HIDDEN_UNTIL_KEY, String(now + HIDE_DAYS * DAY_MS));
}

export function wasNudgePanelShown(): boolean {
  return readStored(PANEL_SHOWN_KEY) !== null;
}

export function markNudgePanelShown(): void {
  writeStored(PANEL_SHOWN_KEY, "1");
}
