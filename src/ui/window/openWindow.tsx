import syncifyMark from "../../../assets/mark.svg";
import type { ReactElement } from "react";
import { getProjectConfig } from "../../core/projectConfig";
import { debug, warn } from "../../core/log";

// The window currently shown, if any.
let shown: {
  container: Element;
  root: { unmount(): void } | null;
  watch: MutationObserver | null;
} | null = null;

export function isWindowOpen(): boolean {
  return Boolean(shown?.container.isConnected);
}

export function closeWindow(): void {
  Spicetify.PopupModal.hide();
}

/** Shows `element` in Spotify's popup, in place of whatever it showed. */
export function openWindow(element: ReactElement): void {
  close(shown);
  const container = document.createElement("div");
  shown = { container, root: null, watch: null };

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

  prepareShell(container);
  renderReact(container, element);
  unmountOnClose(container);
}

/**
 * However Spotify's popup closes (Syncify's button, Escape, a click outside),
 * what was in it unmounts, so it can finish what waits for it to close, such
 * as a delete held for Undo.
 */
function unmountOnClose(container: Element): void {
  const current = shown;
  if (current?.container !== container || typeof MutationObserver !== "function") return;
  const watch = new MutationObserver(() => {
    if (!container.isConnected) close(current);
  });
  watch.observe(document.body, { childList: true, subtree: true });
  current.watch = watch;
}

function close(entry: typeof shown): void {
  if (!entry) return;
  entry.watch?.disconnect();
  entry.watch = null;
  entry.root?.unmount();
  entry.root = null;
}

// Dresses Spotify's popup once it's on the page: the mark before the title,
// and Syncify's own close button.
function prepareShell(container: Element): void {
  requestAnimationFrame(() => {
    const shell = findShell(container);
    shell?.classList.add("syncify-modal-shell");

    const title = shell?.querySelector<HTMLElement>(
      ".main-trackCreditsModal-header h1",
    );
    if (title && !title.querySelector(".syncify-modal-mark")) {
      const mark = document.createElement("span");
      mark.className = "syncify-modal-mark";
      mark.innerHTML = syncifyMark;
      title.prepend(mark);
    }

    const closeButton = shell?.querySelector<HTMLButtonElement>(
      'button[aria-label*="close" i], button[title*="close" i], .main-trackCreditsModal-header button:last-of-type',
    );

    if (!closeButton) return;

    closeButton.classList.add("syncify-modal-close");
    closeButton.setAttribute(
      "aria-label",
      `Close ${getProjectConfig().extensionName}`,
    );
    closeButton.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
  });
}

function findShell(container: Element): HTMLElement | null {
  let current = container.parentElement;

  while (current && current !== document.body) {
    if (current.querySelector(".main-trackCreditsModal-header")) return current;
    current = current.parentElement;
  }

  return container.closest<HTMLElement>('[class*="trackCreditsModal"]');
}

// Spotify versions without createRoot only have ReactDOM.render.
function renderReact(container: Element, element: ReactElement): void {
  try {
    if (typeof Spicetify.ReactDOM.createRoot === "function") {
      const root = Spicetify.ReactDOM.createRoot(container);
      root.render(element);
      if (shown?.container === container) shown.root = root;
      debug("Window rendered", { renderer: "createRoot" });
      return;
    }

    Spicetify.ReactDOM.render(element, container);
    debug("Window rendered", { renderer: "render" });
  } catch (error) {
    warn("Failed to render window", error);
    throw error;
  }
}
