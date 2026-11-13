import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import { ClaimError } from "../../api/claimsApi";
import { InstallRefusedError, LockedError, UnsupportedVersionError } from "../../api/syncifyApi";
import type { AccountSession } from "../../core/account";
import { loadConfig } from "../../core/config";
import { hideNudge, isNudgeHidden } from "../../core/nudge";
import { getProjectConfig } from "../../core/projectConfig";
import { getLoaderInfo } from "../../core/releases";
import { reloadAndCheck, savePendingRestore } from "../../core/restoreSummary";
import {
  answerWaitingInstall,
  backupNow,
  cancelPendingClaim,
  restoreNow,
  secureBackup,
} from "../../core/syncService";
import type { SyncifyConfig } from "../../types/syncify";
import { AccountPanel } from "../account/AccountPanel";
import { accountTabStatus, describeSecureState } from "../account/secureState";
import { backupItems } from "../backups/backupItems";
import { BackupsTab } from "../backups/BackupsTab";
import type { RestoreRequest } from "../backups/RestorePreview";
import { notMeToast } from "../claimText";
import { TabPanel, useStableId } from "../kit";
import { SettingsTab } from "../settings/SettingsTab";
import { ShareTab } from "../share/ShareTab";
import { useStoredShareInfo } from "../share/useStoredShareInfo";
import { useLatest } from "../useLatest";
import { BackupNotices } from "./BackupNotices";
import { MessageNotice } from "./MessageNotice";
import type { WindowMessage } from "./message";
import { openExternal } from "./openExternal";
import { describeAlert, describeStatus, type Activity, type StatusAction } from "./status";
import { useBackupCheck } from "./useBackupCheck";
import { useLocalSetup } from "./useLocalSetup";
import { useNewerVersion, useRestoreResult } from "./useWindowInfo";
import { WindowFooter } from "./WindowFooter";
import { WindowStatusBlock } from "./WindowStatusBlock";
import { WindowTabs, type WindowTab } from "./WindowTabs";

/**
 * Syncify's window: where this device stands, pinned above four tabs.
 * tab: the tab to open with, as That's me, sign in opens Account.
 * secure: opened from the Secure nudge's launch panel, so signing in secures
 * the backup, and signed in it's secured at once.
 */
export function SyncifyWindow(props: { tab?: WindowTab; secure?: boolean }) {
  const idBase = useStableId("syncify");
  const project = getProjectConfig();
  const [config, setConfig] = useState<SyncifyConfig>(() => loadConfig());
  const { local, localFailed, refreshLocal } = useLocalSetup();
  const backups = useBackupCheck(config);
  const shareInfo = useStoredShareInfo();
  const newerVersion = useNewerVersion();
  const restoreResult = useRestoreResult();
  const [loadedByLoader] = useState(() => getLoaderInfo() !== null);

  const [tab, setTab] = useState<WindowTab>(props.tab ?? "backups");
  const [activity, setActivity] = useState<Activity>(() => (backups.check ? "idle" : "checking"));
  // Why the first check failed; later failures are a message.
  const [checkError, setCheckError] = useState<string | null>(null);
  const [message, setMessage] = useState<WindowMessage | null>(null);
  // The backup service refused this version (HTTP 426).
  const [unsupported, setUnsupported] = useState(false);
  const [answering, setAnswering] = useState(false);
  const [securing, setSecuring] = useState(false);
  const [secureError, setSecureError] = useState<string | null>(null);
  // The Secure nudge: whether Not now hides it on this device, and whether a
  // sign-in started from it.
  const [nudgeHidden, setNudgeHidden] = useState(() => isNudgeHidden());
  const [fromNudge, setFromNudge] = useState(props.secure === true);
  const securedFromPanel = useRef(false);

  const { remote, lockedBy: locked, claims, session } = backups;
  const busy = activity !== "idle";
  const localHash = local?.hash ?? null;
  // Someone else's claim on this Spotify account: the real owner can cancel it.
  const otherClaim = remote.claim?.status === "pending" && !remote.claim.mine ? remote.claim : null;
  const secureState = describeSecureState(claims, locked, otherClaim !== null);
  // What's on this device is backed up when any of the backups holds it, so
  // restoring an older backup doesn't ask to back the same data up again.
  // The safety copy doesn't count: it's replaced every week.
  const isBackedUp = Boolean(localHash && remote.backups.some((backup) => backup.payload_hash === localHash));
  const status = describeStatus({
    activity,
    checked: backups.check !== null,
    checkError,
    unsupported,
    locked,
    latest: remote.payload,
    latestItems: remote.payload ? backupItems(remote.payload).map((item) => item.key) : [],
    backedUp: isBackedUp,
    localHash,
    localItems: local?.installedItems ?? [],
    localItemCount: local?.installedItemCount ?? 0,
    localConfig: local?.spicetifyConfig ?? null,
    restoreResult: restoreResult.recent ? restoreResult.result : null,
  });
  const alert = describeAlert(remote.claim, remote.install?.waiting[0] ?? null);
  // Signed out, the backup service decides; signed in, securing sends no
  // email, so any backup that isn't secured yet shows it. Account says the
  // same once open.
  const showNudge =
    !nudgeHidden &&
    !locked &&
    remote.payload !== null &&
    tab !== "account" &&
    (session ? secureState.kind === "open" : session === null && remote.nudge);
  // The signed-in account's other Spotify accounts, numbered in the order
  // they were linked. Backups only ever go to this one.
  const otherAccounts = (session ? (claims?.accounts ?? []) : [])
    .filter((account) => account.status === "final")
    .map((account, index) => ({
      hash: account.hash,
      label: `Spotify account ${index + 1}${account.device_info ? ` from ${account.device_info}` : ""}`,
    }))
    .filter((account) => account.hash !== claims?.hash);

  async function refresh(options: { silent?: boolean } = {}) {
    try {
      // A quiet check behind the last one shown changes nothing until done.
      if (!options.silent || !backups.check) setActivity("checking");
      if (!options.silent) {
        setMessage(null);
        setCheckError(null);
      }
      await refreshLocal();
      const lockedBy = await backups.refresh();
      // A locked backup needs a sign-in: the Account tab opens by itself.
      if (lockedBy) setTab("account");
      setCheckError(null);
      setActivity("idle");
    } catch (error) {
      handleError(error);
    }
  }

  function handleError(error: unknown) {
    setActivity("idle");
    // Shown as the status, which stays until Syncify is updated.
    if (error instanceof UnsupportedVersionError) {
      setUnsupported(true);
      setMessage(null);
      return;
    }
    // Refused by a trusted install: shown with this install's state.
    if (error instanceof InstallRefusedError) {
      setMessage({ kind: "error", text: error.message });
      void refresh({ silent: true });
      return;
    }
    // Secured since the window opened, or the session ended: show the lock.
    if (error instanceof LockedError && error.code !== "not_linked") {
      setMessage(null);
      void refresh({ silent: true });
      return;
    }
    const text = error instanceof Error ? error.message : String(error);
    if (backups.check) setMessage({ kind: "error", text });
    else setCheckError(text);
    Spicetify.showNotification(text, true, 6000);
  }

  async function runBackup() {
    try {
      setActivity("backing-up");
      setMessage(null);
      const { payload, unchanged, unapproved } = await backupNow(config);
      await refreshLocal();

      // Kept apart from the approved backups: shown with them after a check.
      if (unapproved) {
        await refresh({ silent: true });
        setMessage({ kind: "warning", text: "Backed up, but kept apart until this install is approved." });
        Spicetify.showNotification("Syncify: backed up, waiting for approval");
        return;
      }
      // Nothing was stored, so the existing backup keeps its original time.
      if (!unchanged) backups.addBackup(payload);
      setActivity("idle");
      Spicetify.showNotification(
        unchanged ? "Syncify: everything is already backed up" : "Syncify backup complete",
      );
    } catch (error) {
      handleError(error);
    }
  }

  async function restore(request: RestoreRequest & { linkedHash: string | null }) {
    try {
      setActivity("restoring");
      setMessage(null);
      await restoreNow(config, request.row.backup, request.linkedHash ?? undefined, request.skipped);
      Spicetify.showNotification("Syncify restore complete. Reloading…");
      // What to add by hand is shown after the reload, with the commands.
      savePendingRestore(request.manual);
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      handleError(error);
    }
  }

  async function answerInstall(answer: "approve" | "reject") {
    const waiting = remote.install?.waiting[0];
    if (!waiting) return;
    setAnswering(true);
    try {
      await answerWaitingInstall(config, waiting.id, answer);
      Spicetify.showNotification(answer === "approve" ? "Syncify: install approved" : "Syncify: install refused");
      await refresh({ silent: true });
    } catch (error) {
      handleError(error);
    } finally {
      setAnswering(false);
    }
  }

  /**
   * Not me: from an install this Spotify account trusts it cancels the
   * claim, from any other Syncify checks it.
   */
  async function cancelOtherClaim() {
    setAnswering(true);
    try {
      Spicetify.showNotification(notMeToast(await cancelPendingClaim(config)));
      await refresh({ silent: true });
    } catch (error) {
      setMessage({ kind: "error", text: error instanceof Error ? error.message : String(error) });
    } finally {
      setAnswering(false);
    }
  }

  /** Claims this Spotify account for the signed-in account. */
  async function runSecure() {
    setSecuring(true);
    setSecureError(null);
    try {
      await secureBackup(config);
    } catch (error) {
      // Another claim or another owner show as the claim's state.
      const shownAsState = error instanceof ClaimError && ["claim_pending", "claimed"].includes(error.code);
      if (!shownAsState) setSecureError(error instanceof Error ? error.message : String(error));
    } finally {
      await refresh({ silent: true });
      setSecuring(false);
    }
  }

  /** The nudge's Secure: signed in it secures, signed out Account opens. */
  function secureFromNudge() {
    setFromNudge(true);
    if (session) void runSecure();
    else setTab("account");
  }

  // Signing in from "Secure your backup" claims it at once. Signing in to a
  // locked backup only unlocks it.
  function handleSignedIn(signedIn: AccountSession) {
    backups.setSession(signedIn);
    // Signing in secures it below, so the launch panel's effect doesn't too.
    securedFromPanel.current = true;
    if (!locked && remote.payload) void runSecure();
    else void refresh({ silent: true });
  }

  function handleSignedOut() {
    shareInfo.forget();
    backups.forgetClaims();
    setSecureError(null);
    void refresh({ silent: true });
  }

  function runStatusAction(action: StatusAction) {
    if (action === "back-up") void runBackup();
    else if (action === "try-again") void refresh();
    else if (action === "sign-in") setTab("account");
    else if (action === "how-to-update") openExternal(`${project.githubUrl}#updating`);
    else reloadAndCheck();
  }

  // The window opens with the session it last knew, then checks the backups.
  const openWindow = useLatest(() => {
    backups.readSession();
    void refresh({ silent: true });
  });
  useEffect(() => openWindow.current(), [openWindow]);

  // Opened from the launch panel's Secure while signed in: secure at once,
  // once the claim status says it can be.
  const secureOnce = useLatest(() => {
    if (!props.secure || securedFromPanel.current || securing) return;
    if (!session || secureState.kind !== "open" || locked) return;
    securedFromPanel.current = true;
    void runSecure();
  });
  useEffect(() => secureOnce.current(), [secureOnce, session, secureState.kind, locked, securing]);

  return (
    <div
      className="syncify-ui syncify-window"
      onClick={keepWindowOpen}
      onMouseDown={keepWindowOpen}
      onPointerDown={keepWindowOpen}
    >
      <div className="syncify-window-top">
        <WindowStatusBlock
          status={status}
          alert={alert}
          backingUp={activity === "backing-up"}
          busy={busy || (status.action === "back-up" && locked !== null)}
          answering={answering}
          onAction={runStatusAction}
          onNotMe={() => void cancelOtherClaim()}
          onAnswerInstall={(answer) => void answerInstall(answer)}
          onSupport={() => openExternal(project.kofiUrl)}
        />
        {message ? (
          <MessageNotice
            message={message}
            busy={busy}
            onTryAgain={() => void refresh()}
            onDismiss={() => setMessage(null)}
          />
        ) : null}
        <WindowTabs
          idBase={idBase}
          selected={tab}
          onSelect={setTab}
          codeCount={session ? shareInfo.codeCount : null}
          account={accountTabStatus(session, locked, secureState)}
          newerVersion={newerVersion}
        />
      </div>

      {tab === "backups" ? (
        <BackupsTab
          idBase={idBase}
          config={config}
          remote={backups.check ? remote : null}
          failed={checkError !== null || localFailed}
          lockedBy={locked}
          local={local}
          otherAccounts={otherAccounts}
          notices={
            <BackupNotices
              nudge={showNudge}
              securing={securing}
              onSecure={secureFromNudge}
              onHideNudge={() => {
                hideNudge();
                setNudgeHidden(true);
              }}
              install={locked || secureState.kind === "secured" ? null : remote.install}
              restoreResult={restoreResult.result}
            />
          }
          busy={busy}
          restoring={activity === "restoring"}
          onRestore={(request) => void restore(request)}
          onError={handleError}
        />
      ) : tab === "share" ? (
        <ShareTab
          idBase={idBase}
          config={config}
          session={session}
          localItems={local?.items ?? []}
          localConfig={local?.spicetifyConfig ?? null}
          localTheme={local?.activeTheme ?? null}
          marketplaceAvailable={local?.marketplaceAvailable ?? null}
          busy={busy}
          onSignIn={() => setTab("account")}
          onSignedOut={handleSignedOut}
          onCodeCount={shareInfo.saveCodeCount}
          onHandle={shareInfo.saveHandle}
        />
      ) : tab === "account" ? (
        <TabPanel idBase={idBase} id="account">
          <div className="syncify-panel">
            <AccountPanel
              session={session}
              locked={locked}
              secure={secureState}
              securing={securing}
              secureError={secureError}
              onSecure={() => void runSecure()}
              nudge={fromNudge}
              onSignedIn={handleSignedIn}
              onSignedOut={handleSignedOut}
              onOpenWebsite={openExternal}
              handle={shareInfo.handle}
              onHandle={shareInfo.saveHandle}
            />
          </div>
        </TabPanel>
      ) : (
        <SettingsTab
          idBase={idBase}
          config={config}
          onConfigChange={setConfig}
          busy={busy}
          unsupported={unsupported}
        />
      )}

      <WindowFooter newerVersion={newerVersion} loadedByLoader={loadedByLoader} />
    </div>
  );
}

// Clicks inside the window never reach Spotify's handler that closes it.
function keepWindowOpen(event: SyntheticEvent) {
  event.stopPropagation();
}
