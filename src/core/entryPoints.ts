import type { SyncifyEntryPoint } from "../types/syncify";

export const DEFAULT_ENTRY_POINT: SyncifyEntryPoint = "both";

const ENTRY_POINTS: readonly SyncifyEntryPoint[] = ["both", "topbar", "menu"];

let topbarButton: Spicetify.Topbar.Button | null = null;
let menuItem: Spicetify.Menu.Item | null = null;
let menuItemRegistered = false;

export function parseEntryPoint(value: unknown): SyncifyEntryPoint {
  return ENTRY_POINTS.includes(value as SyncifyEntryPoint)
    ? (value as SyncifyEntryPoint)
    : DEFAULT_ENTRY_POINT;
}

export function isMenuEntryPointAvailable(): boolean {
  return typeof Spicetify.Menu?.Item === "function";
}

export function setEntryPointTargets(targets: {
  topbarButton: Spicetify.Topbar.Button | null;
  menuItem: Spicetify.Menu.Item | null;
}): void {
  topbarButton = targets.topbarButton;
  menuItem = targets.menuItem;
}

/**
 * Shows or hides each entry point. Spicetify has no way to remove a topbar
 * button (it re-mounts stashed buttons on every navigation), so the button is
 * hidden rather than detached. The menu item uses register/deregister.
 */
export function applyEntryPoint(mode: SyncifyEntryPoint): void {
  const showTopbar = mode !== "menu" || !menuItem;
  const showMenu = mode !== "topbar";

  if (topbarButton?.element) {
    topbarButton.element.style.display = showTopbar ? "" : "none";
  }

  if (!menuItem) return;

  try {
    if (showMenu && !menuItemRegistered) {
      menuItem.register();
      menuItemRegistered = true;
    } else if (!showMenu && menuItemRegistered) {
      menuItem.deregister();
      menuItemRegistered = false;
    }
  } catch (error) {
    console.warn("[Syncify]", "Failed to update profile menu item", error);
  }
}
