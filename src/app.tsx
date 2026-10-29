import appStyles from "./styles/app.css";
import syncifyIcon from "../assets/icon.svg";
import { runStartupSyncCheck } from "./core/startupSync";
import { checkRestore, watchScriptsIfRestored } from "./core/restoreSummary";
import { getProjectConfig } from "./core/projectConfig";
import { loadConfig } from "./core/config";
import { initShortcut } from "./core/shortcut";
import { applyEntryPoint, setEntryPointTargets } from "./core/entryPoints";
import { SyncifyModal } from "./ui/SyncifyModal";
import { ClaimNotice } from "./ui/ClaimNotice";
import type { SyncifyClaim } from "./types/syncify";

const LOG_PREFIX = "[Syncify]";

function debug(message: string, data?: unknown): void {
  if (data === undefined) {
    console.debug(LOG_PREFIX, message);
    return;
  }

  console.debug(LOG_PREFIX, message, data);
}

function warn(message: string, data?: unknown): void {
  if (data === undefined) {
    console.warn(LOG_PREFIX, message);
    return;
  }

  console.warn(LOG_PREFIX, message, data);
}

function isSpicetifyReady(): boolean {
  return Boolean(
    Spicetify?.Platform &&
    Spicetify?.LocalStorage &&
    Spicetify?.Topbar?.Button &&
    Spicetify?.PopupModal &&
    Spicetify?.React &&
    Spicetify?.ReactDOM &&
    Spicetify?.showNotification,
  );
}

const STYLE_ID = "syncify-styles";

function main(): void {
  // Another copy already runs: the Marketplace version next to a manual one,
  // or an old copy (1.2.x and earlier add the same style element).
  if (document.getElementById(STYLE_ID)) {
    debug("Another copy of Syncify is running; stopping this one");
    return;
  }

  injectStyles();
  const config = loadConfig();
  setEntryPointTargets({
    topbarButton: injectTopbarButton(),
    menuItem: createProfileMenuItem(),
  });
  applyEntryPoint(config.entryPoint);
  initShortcut(config.shortcut, openSyncifyModal);
  void runStartupSyncCheck(openClaimNotice).catch((error) => {
    warn("Startup sync check failed", error);
  });
  void checkRestore().catch((error) => {
    warn("Restore check failed", error);
  });
}

function injectStyles(): void {
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = appStyles;
  document.head.appendChild(style);
}

function injectTopbarButton(): Spicetify.Topbar.Button {
  const { extensionName } = getProjectConfig();
  const button = new Spicetify.Topbar.Button(
    extensionName,
    syncifyIcon,
    (self) => {
      debug("Topbar button clicked", describeTopbarButton(self));
      openSyncifyModal();
    },
    false,
    true,
  );

  makeRightTopbarButtonClickable(button);
  keepTopbarButtonAttached(button);

  exposeDebugButton(button);

  debug("Topbar button registered", describeTopbarButton(button));
  return button;
}

function makeRightTopbarButtonClickable(button: Spicetify.Topbar.Button): void {
  const runtimeButton = button as Spicetify.Topbar.Button & {
    button?: HTMLButtonElement;
  };

  button.element.style.setProperty("-webkit-app-region", "no-drag");
  runtimeButton.button?.style.setProperty("-webkit-app-region", "no-drag");
}

const TOPBAR_CONTAINER_SELECTOR = ".main-actionButtons";
const TOPBAR_ROOT_SELECTOR = ".Root__globalNav, .Root__top-bar";
const TOPBAR_REFERENCE_BUTTON_SELECTOR = [
  ".main-actionButtons .main-topBar-buddyFeed",
  ".main-actionButtons .main-globalNav-buddyFeed",
  ".main-actionButtons .main-actionButtons-button",
  ".main-actionButtons > button",
].join(", ");

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
function keepTopbarButtonAttached(button: Spicetify.Topbar.Button): void {
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
    restoreTopbarButtonClass(button);
    makeRightTopbarButtonClickable(button);
    debug("Topbar button re-attached", describeTopbarButton(button));
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

function restoreTopbarButtonClass(button: Spicetify.Topbar.Button): void {
  const inner = getInnerTopbarButton(button);
  if (!inner || (inner.className && inner.className !== "undefined")) return;

  const reference = Array.from(
    document.querySelectorAll<HTMLElement>(TOPBAR_REFERENCE_BUTTON_SELECTOR),
  ).find((candidate) => !button.element.contains(candidate));
  if (reference?.className) inner.className = reference.className;
}

function getInnerTopbarButton(
  button: Spicetify.Topbar.Button,
): HTMLButtonElement | undefined {
  return (button as Spicetify.Topbar.Button & { button?: HTMLButtonElement })
    .button;
}

/** Profile menu entry point; registered by `applyEntryPoint` when enabled. */
function createProfileMenuItem(): Spicetify.Menu.Item | null {
  if (typeof Spicetify.Menu?.Item !== "function") return null;

  try {
    return new Spicetify.Menu.Item(
      getProjectConfig().extensionName,
      false,
      () => openSyncifyModal(),
      getMenuIcon(),
    );
  } catch (error) {
    warn("Failed to create profile menu item", error);
    return null;
  }
}

/**
 * Spicetify renders menu icons inside Spotify's own 16x16 <svg>, so a 24x24
 * root <svg> overflows and gets clipped. Shrink it to fit that box.
 */
function getMenuIcon(): string {
  return syncifyIcon
    .replace(/\swidth="\d+"/, ' width="16"')
    .replace(/\sheight="\d+"/, ' height="16"');
}

function exposeDebugButton(button: Spicetify.Topbar.Button): void {
  Object.assign(window, {
    SyncifyDebug: {
      button,
      element: button.element,
      openModal: openSyncifyModal,
      inspect: () => describeTopbarButton(button),
      clickElement: () => button.element?.click(),
      clickInnerButton: () =>
        (
          button as Spicetify.Topbar.Button & { button?: HTMLButtonElement }
        ).button?.click(),
      clickCallback: () => button.onClick(button),
    },
  });
}

function describeTopbarButton(
  button: Spicetify.Topbar.Button,
): Record<string, unknown> {
  return {
    label: button.label,
    disabled: button.disabled,
    isRight: button.isRight,
    hasElement: Boolean(button.element),
    elementConnected: button.element?.isConnected,
    elementDisabled: button.element?.disabled,
    elementAriaDisabled: button.element?.getAttribute("aria-disabled"),
    elementClass: button.element?.className,
    appRegion: button.element
      ? getComputedStyle(button.element).getPropertyValue("-webkit-app-region")
      : null,
    innerButtonAppRegion: (
      button as Spicetify.Topbar.Button & { button?: HTMLButtonElement }
    ).button
      ? getComputedStyle(
          (button as Spicetify.Topbar.Button & { button: HTMLButtonElement })
            .button,
        ).getPropertyValue("-webkit-app-region")
      : null,
    pointerEvents: button.element
      ? getComputedStyle(button.element).pointerEvents
      : null,
    visibility: button.element
      ? getComputedStyle(button.element).visibility
      : null,
    display: button.element ? getComputedStyle(button.element).display : null,
    rect: button.element?.getBoundingClientRect().toJSON(),
  };
}

// The window currently shown, if any.
let openModal: {
  container: Element;
  root: { unmount(): void } | null;
} | null = null;

function openSyncifyModal(): void {
  // The shortcut works as a toggle: pressed again, it closes Syncify.
  if (openModal?.container.isConnected) {
    debug("Closing modal");
    Spicetify.PopupModal.hide();
    return;
  }

  debug("Opening modal");
  openWindow(Spicetify.React.createElement(SyncifyModal));
}

// Someone else's claim on this Spotify account, found when Spotify started.
function openClaimNotice(claim: Extract<SyncifyClaim, { status: "pending" }>): void {
  // Syncify's own window already shows it.
  if (openModal?.container.isConnected) return;
  debug("Opening claim notice");
  openWindow(
    Spicetify.React.createElement(ClaimNotice, {
      claim,
      onClose: () => Spicetify.PopupModal.hide(),
    }),
  );
}

function openWindow(element: ReturnType<typeof Spicetify.React.createElement>): void {
  openModal?.root?.unmount();
  const container = document.createElement("div");
  openModal = { container, root: null };

  try {
    Spicetify.PopupModal.display({
      title: getProjectConfig().extensionName,
      content: container,
      isLarge: false,
    });
  } catch (error) {
    warn("Failed to open PopupModal", error);
    throw error;
  }

  prepareSyncifyModalShell(container);
  renderReact(container, element);
}

function prepareSyncifyModalShell(container: Element): void {
  requestAnimationFrame(() => {
    const shell = findSyncifyModalShell(container);
    shell?.classList.add("syncify-modal-shell");

    const closeButton = shell?.querySelector<HTMLButtonElement>(
      'button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type',
    );

    if (!closeButton) return;

    closeButton.classList.add("syncify-modal-close");
    closeButton.setAttribute(
      "aria-label",
      `Close ${getProjectConfig().extensionName}`,
    );
    closeButton.title = "Close";
    closeButton.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
  });
}

function findSyncifyModalShell(container: Element): HTMLElement | null {
  let current = container.parentElement;

  while (current && current !== document.body) {
    if (current.querySelector(".main-trackCreditsModal-header")) return current;
    current = current.parentElement;
  }

  return container.closest<HTMLElement>('[class*="trackCreditsModal"]');
}

function renderReact(
  container: Element,
  element: ReturnType<typeof Spicetify.React.createElement>,
): void {
  try {
    if (typeof Spicetify.ReactDOM.createRoot === "function") {
      const root = Spicetify.ReactDOM.createRoot(container);
      root.render(element);
      if (openModal?.container === container) openModal.root = root;
      debug("Modal rendered", { renderer: "createRoot" });
      return;
    }

    Spicetify.ReactDOM.render(element, container);
    debug("Modal rendered", { renderer: "render" });
  } catch (error) {
    warn("Failed to render modal", error);
    throw error;
  }
}

// Before waiting for Spicetify, so no script that loads after a restore is missed.
watchScriptsIfRestored();

// Last, so every constant above is set even when Spicetify is already ready.
(function init() {
  if (!isSpicetifyReady()) {
    setTimeout(init, 100);
    return;
  }

  debug("Spicetify APIs ready");
  main();
})();
