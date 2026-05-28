import appStyles from "./styles/app.css";
import syncifyIcon from "../assets/icon.svg";
import { runStartupSyncCheck } from "./core/startupSync";
import { getProjectConfig } from "./core/projectConfig";
import { SyncifyModal } from "./ui/SyncifyModal";

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

(function init() {
  if (!isSpicetifyReady()) {
    setTimeout(init, 100);
    return;
  }

  debug("Spicetify APIs ready");
  main();
})();

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

function main(): void {
  injectStyles();
  injectTopbarButton();
  void runStartupSyncCheck().catch((error) => {
    warn("Startup sync check failed", error);
  });
}

function injectStyles(): void {
  const styleId = "syncify-styles";
  if (document.getElementById(styleId)) return;

  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = appStyles;
  document.head.appendChild(style);
}

function injectTopbarButton(): void {
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

  exposeDebugButton(button);

  debug("Topbar button registered", describeTopbarButton(button));
}

function makeRightTopbarButtonClickable(button: Spicetify.Topbar.Button): void {
  const runtimeButton = button as Spicetify.Topbar.Button & {
    button?: HTMLButtonElement;
  };

  button.element.style.setProperty("-webkit-app-region", "no-drag");
  runtimeButton.button?.style.setProperty("-webkit-app-region", "no-drag");
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

function openSyncifyModal(): void {
  debug("Opening modal");
  const container = document.createElement("div");

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
  renderReact(container);
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

function renderReact(container: Element): void {
  try {
    const element = Spicetify.React.createElement(SyncifyModal);

    if (typeof Spicetify.ReactDOM.createRoot === "function") {
      Spicetify.ReactDOM.createRoot(container).render(element);
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
