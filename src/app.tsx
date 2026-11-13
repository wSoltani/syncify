import { bindReact } from "./react";
import { syncifyStyles } from "./ui/styles";
import { runStartupSyncCheck } from "./core/startupSync";
import { checkRestore, watchScriptsIfRestored } from "./core/restoreSummary";
import { loadConfig } from "./core/config";
import { initShortcut } from "./core/shortcut";
import { applyEntryPoint, setEntryPointTargets } from "./core/entryPoints";
import { createProfileMenuItem, createTopbarButton } from "./core/entryButtons";
import { markNudgePanelShown } from "./core/nudge";
import { debug, warn } from "./core/log";
import { SyncifyWindow } from "./ui/window/SyncifyWindow";
import { closeWindow, isWindowOpen, openWindow } from "./ui/window/openWindow";
import { ClaimNotice, InstallNotice, NudgeNotice, UndoneClaimNotice } from "./ui/notices/LaunchNotices";
import type { SyncifyClaim, SyncifyWaitingInstall } from "./types/syncify";

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

  bindReact(Spicetify.React);
  injectStyles();
  const config = loadConfig();
  setEntryPointTargets({
    topbarButton: createTopbarButton(toggleSyncify),
    menuItem: createProfileMenuItem(toggleSyncify),
  });
  applyEntryPoint(config.entryPoint);
  initShortcut(config.shortcut, toggleSyncify);
  void runStartupSyncCheck({
    onClaim: openClaimNotice,
    onUndone: openUndoneNotice,
    onInstall: openInstallNotice,
    onNudge: openNudgeNotice,
    onFirstSync: openFirstSync,
  }).catch((error) => {
    warn("Startup sync check failed", error);
  });
  void checkRestore().catch((error) => {
    warn("Restore check failed", error);
  });
}

function injectStyles(): void {
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = syncifyStyles;
  document.head.appendChild(style);
}

// The shortcut works as a toggle: pressed again, it closes Syncify.
function toggleSyncify(): void {
  if (isWindowOpen()) {
    closeWindow();
    return;
  }

  openWindow(<SyncifyWindow />);
}

// Someone else's claim on this Spotify account, found when Spotify started.
function openClaimNotice(claim: Extract<SyncifyClaim, { status: "pending" }>): void {
  // Syncify's own window already shows it.
  if (isWindowOpen()) return;
  debug("Opening claim notice");
  openWindow(<ClaimNotice claim={claim} onClose={closeWindow} />);
}

// An admin undid someone else's claim on this Spotify account, found when
// Spotify started. Not shown over Syncify's own window, so it shows on a
// later launch instead.
function openUndoneNotice(claim: Extract<SyncifyClaim, { status: "undone" }>): boolean {
  if (isWindowOpen()) return false;
  debug("Opening undone claim notice");
  openWindow(<UndoneClaimNotice claim={claim} onClose={closeWindow} />);
  return true;
}

// A new install on this Spotify account waiting for this one's approval,
// found when Spotify started.
function openInstallNotice(install: SyncifyWaitingInstall): void {
  // Syncify's own window already shows it.
  if (isWindowOpen()) return;
  debug("Opening install notice");
  openWindow(<InstallNotice install={install} onDone={closeWindow} />);
}

// The Secure nudge's launch panel, once per install. Secure opens Syncify at
// its Account section to secure the backup.
function openNudgeNotice(): void {
  // Syncify's own window already shows the nudge.
  if (isWindowOpen()) return;
  debug("Opening nudge notice");
  markNudgePanelShown();
  openWindow(
    <NudgeNotice
      onSecure={() => openWindow(<SyncifyWindow tab="account" secure />)}
      onClose={closeWindow}
    />,
  );
}

// The first-sync choice of extension settings, once per device: Syncify
// opens at Settings with the choice over it.
function openFirstSync(): void {
  // Syncify's own window shows it already.
  if (isWindowOpen()) return;
  debug("Opening first sync");
  openWindow(<SyncifyWindow tab="settings" />);
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
