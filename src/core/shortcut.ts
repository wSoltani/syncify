import type { SyncifyShortcut } from "../types/syncify";

export const DEFAULT_SHORTCUT: SyncifyShortcut = {
  key: "s",
  ctrl: true,
  alt: true,
  shift: false,
  meta: false,
};

const SUPPORTED_KEY = /^([a-z0-9]|f([1-9]|1[0-2]))$/;
const WAIT_INTERVAL_MS = 250;
const WAIT_ATTEMPTS = 40;

let handler: (() => void) | null = null;
let desired: SyncifyShortcut | null = null;
let registered: SyncifyShortcut | null = null;

export function isMacPlatform(): boolean {
  return /mac/i.test(navigator.platform || navigator.userAgent);
}

export function parseShortcut(value: unknown): SyncifyShortcut | null {
  if (value === null) return null;
  if (!value || typeof value !== "object") return DEFAULT_SHORTCUT;

  const candidate = value as Partial<SyncifyShortcut>;
  if (typeof candidate.key !== "string" || !SUPPORTED_KEY.test(candidate.key)) {
    return DEFAULT_SHORTCUT;
  }

  return {
    key: candidate.key,
    ctrl: Boolean(candidate.ctrl),
    alt: Boolean(candidate.alt),
    shift: Boolean(candidate.shift),
    meta: Boolean(candidate.meta),
  };
}

export function formatShortcut(shortcut: SyncifyShortcut | null): string {
  if (!shortcut) return "Off";

  const key = shortcut.key.toUpperCase();

  if (isMacPlatform()) {
    return [
      shortcut.ctrl ? "⌘" : "",
      shortcut.alt ? "⌥" : "",
      shortcut.shift ? "⇧" : "",
      key,
    ].join("");
  }

  return [
    shortcut.ctrl && "Ctrl",
    shortcut.meta && "Win",
    shortcut.alt && "Alt",
    shortcut.shift && "Shift",
    key,
  ]
    .filter(Boolean)
    .join("+");
}

export type ShortcutCaptureResult =
  | { kind: "ignore" }
  | { kind: "cancel" }
  | { kind: "error"; message: string }
  | { kind: "shortcut"; shortcut: SyncifyShortcut };

/**
 * Turns a keydown into a shortcut. Uses `event.code` rather than `event.key`
 * so Alt/Option combos map to the physical key (Option+Y is "¥" on macOS).
 * `ctrl` follows Spicetify's meaning: it becomes Mousetrap's "mod", which is
 * Cmd on macOS and Ctrl elsewhere.
 */
export function shortcutFromEvent(event: KeyboardEvent): ShortcutCaptureResult {
  if (event.key === "Escape") return { kind: "cancel" };

  const key = keyFromCode(event.code);
  if (!key) return { kind: "ignore" };

  const isMac = isMacPlatform();
  if (isMac && event.ctrlKey) {
    return {
      kind: "error",
      message: "Control isn't supported on macOS. Use ⌘ or ⌥ instead.",
    };
  }

  const shortcut: SyncifyShortcut = {
    key,
    ctrl: isMac ? event.metaKey : event.ctrlKey,
    alt: event.altKey,
    shift: event.shiftKey,
    meta: isMac ? false : event.metaKey,
  };

  const isFunctionKey = key.startsWith("f") && key.length > 1;
  if (!shortcut.ctrl && !shortcut.alt && !shortcut.meta && !isFunctionKey) {
    return {
      kind: "error",
      message: `Include ${isMac ? "⌘ or ⌥" : "Ctrl or Alt"} so the shortcut doesn't fire while typing.`,
    };
  }

  return { kind: "shortcut", shortcut };
}

function keyFromCode(code: string): string | null {
  const match = /^(?:Key([A-Z])|Digit([0-9])|(F(?:[1-9]|1[0-2])))$/.exec(code);
  if (!match) return null;
  return (match[1] ?? match[2] ?? match[3]).toLowerCase();
}

/**
 * True when another extension (or Spotify, through the same Mousetrap
 * instance) already has this combo. Reads Mousetrap internals the same way
 * Spicetify's own `Keyboard.changeShortcut` does, so treat a failure as
 * "unknown" rather than "taken".
 */
export function isShortcutTaken(shortcut: SyncifyShortcut): boolean {
  if (registered && sameShortcut(registered, shortcut)) return false;

  try {
    const mousetrap = Spicetify.Mousetrap as unknown as {
      trigger?: () => { _directMap?: Record<string, unknown> };
    };
    const directMap = mousetrap.trigger?.()._directMap;
    if (!directMap) return false;

    const combo = toMousetrapCombo(shortcut);
    return Object.keys(directMap).some((entry) =>
      entry.startsWith(`${combo}:`),
    );
  } catch {
    return false;
  }
}

/** Starts listening once `Spicetify.Keyboard` exists (it loads after Mousetrap). */
export function initShortcut(
  initial: SyncifyShortcut | null,
  onTrigger: () => void,
  attempt = 0,
): void {
  handler = onTrigger;
  desired = initial;

  if (!isKeyboardReady()) {
    if (attempt >= WAIT_ATTEMPTS) {
      console.warn("[Syncify]", "Spicetify.Keyboard unavailable; shortcut not registered");
      return;
    }

    setTimeout(
      () => initShortcut(desired, onTrigger, attempt + 1),
      WAIT_INTERVAL_MS,
    );
    return;
  }

  applyShortcut(desired);
}

/** Swaps the live binding. Safe to call before `Spicetify.Keyboard` loads. */
export function applyShortcut(next: SyncifyShortcut | null): void {
  desired = next;
  if (!isKeyboardReady() || !handler) return;

  const onTrigger = handler;

  try {
    if (registered) Spicetify.Keyboard._deregisterShortcut(registered);
    registered = null;

    if (!next) return;

    Spicetify.Keyboard.registerShortcut(next, (event) => {
      event.preventDefault();
      onTrigger();
    });
    registered = next;
    console.debug("[Syncify]", "Keyboard shortcut registered", formatShortcut(next));
  } catch (error) {
    console.warn("[Syncify]", "Failed to register keyboard shortcut", error);
  }
}

function isKeyboardReady(): boolean {
  return typeof Spicetify.Keyboard?.registerShortcut === "function";
}

function toMousetrapCombo(shortcut: SyncifyShortcut): string {
  return [
    shortcut.ctrl && "mod",
    shortcut.meta && "meta",
    shortcut.alt && "alt",
    shortcut.shift && "shift",
    shortcut.key,
  ]
    .filter(Boolean)
    .join("+");
}

function sameShortcut(a: SyncifyShortcut, b: SyncifyShortcut): boolean {
  return toMousetrapCombo(a) === toMousetrapCombo(b);
}
