import syncifyIcon from "../../assets/icon.svg";
import { isMenuEntryPointAvailable } from "./entryPoints";
import { getProjectConfig } from "./projectConfig";
import { debug, warn } from "./log";

const TOPBAR_CONTAINER_SELECTOR = ".main-actionButtons";
const TOPBAR_ROOT_SELECTOR = ".Root__globalNav, .Root__top-bar";
const TOPBAR_REFERENCE_BUTTON_SELECTOR = [
  ".main-actionButtons .main-topBar-buddyFeed",
  ".main-actionButtons .main-globalNav-buddyFeed",
  ".main-actionButtons .main-actionButtons-button",
  ".main-actionButtons > button",
].join(", ");

// Spicetify keeps the real <button> on the instance without typing it.
type TopbarButton = Spicetify.Topbar.Button & { button?: HTMLButtonElement };

export function createTopbarButton(onClick: () => void): Spicetify.Topbar.Button {
  const button: TopbarButton = new Spicetify.Topbar.Button(
    getProjectConfig().extensionName,
    syncifyIcon,
    onClick,
    false,
    true,
  );

  makeClickable(button);
  keepAttached(button);
  return button;
}

// The right side of the top bar drags the window unless told otherwise.
function makeClickable(button: TopbarButton): void {
  button.element.style.setProperty("-webkit-app-region", "no-drag");
  button.button?.style.setProperty("-webkit-app-region", "no-drag");
}

/**
 * Spicetify only re-mounts topbar buttons on route changes, so if Spotify
 * re-renders the action buttons in place (seen on 1.3.3.x) ours is dropped
 * until the next navigation. Watch the top bar and put it back ourselves.
 *
 * Only the top bar is watched, plus the direct children of each element above
 * it, in case the whole bar is re-mounted. The rest of Spotify's page changes
 * constantly (playback, lyrics, lists), so watching all of it ran this on
 * every change.
 * Until the top bar exists, the page is watched just to find it.
 */
function keepAttached(button: TopbarButton): void {
  if (typeof MutationObserver === "undefined") return;

  let scheduled = false;
  let watchedRoot: Element | null = null;

  const reattach = () => {
    scheduled = false;
    watchTopbar();
    const element = button.element;
    const container = document.querySelector(TOPBAR_CONTAINER_SELECTOR);
    if (!element || !container || container.contains(element)) return;

    container.prepend(element);
    restoreClass(button);
    makeClickable(button);
    debug("Topbar button re-attached");
  };

  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    setTimeout(reattach, 250);
  });

  const watchTopbar = () => {
    if (watchedRoot?.isConnected) return;

    const container = document.querySelector(TOPBAR_CONTAINER_SELECTOR);
    const root =
      container?.closest(TOPBAR_ROOT_SELECTOR) ?? container?.parentElement;

    observer.disconnect();
    watchedRoot = root ?? null;

    if (!root) {
      observer.observe(document.body, { childList: true, subtree: true });
      return;
    }

    observer.observe(root, { childList: true, subtree: true });
    for (let parent = root.parentElement; parent; parent = parent.parentElement) {
      observer.observe(parent, { childList: true });
    }
  };

  reattach();
}

// A re-attached button can lose its class: borrow it from a neighbour.
function restoreClass(button: TopbarButton): void {
  const inner = button.button;
  if (!inner || (inner.className && inner.className !== "undefined")) return;

  const reference = Array.from(
    document.querySelectorAll<HTMLElement>(TOPBAR_REFERENCE_BUTTON_SELECTOR),
  ).find((candidate) => !button.element.contains(candidate));
  if (reference?.className) inner.className = reference.className;
}

/** Profile menu entry point; registered by `applyEntryPoint` when enabled. */
export function createProfileMenuItem(onClick: () => void): Spicetify.Menu.Item | null {
  if (!isMenuEntryPointAvailable()) return null;

  try {
    return new Spicetify.Menu.Item(getProjectConfig().extensionName, false, onClick, menuIcon());
  } catch (error) {
    warn("Failed to create profile menu item", error);
    return null;
  }
}

/**
 * Spicetify renders menu icons inside Spotify's own 16x16 <svg>, so a 24x24
 * root <svg> overflows and gets clipped. Shrink it to fit that box.
 */
function menuIcon(): string {
  return syncifyIcon
    .replace(/\swidth="\d+"/, ' width="16"')
    .replace(/\sheight="\d+"/, ' height="16"');
}
