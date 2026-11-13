import { useEffect, useMemo, useRef, useState } from "react";
import { AccountError } from "../../api/accountApi";
import {
  createShare,
  deleteShare,
  describeShareError,
  fetchPicks,
  fetchShare,
  listShares,
  profileUrl,
  updateShare,
  type SavedShare,
  type ShareCode,
  type SharePick,
  type ShareProfile,
} from "../../api/sharesApi";
import { LockedError } from "../../api/syncifyApi";
import type { AccountSession } from "../../core/account";
import { collectMarketplaceKeys } from "../../core/marketplace";
import { getProjectConfig } from "../../core/projectConfig";
import { listItems, previewRestore, type InstalledItem } from "../../core/restorePreview";
import {
  checkCatalog,
  checkSources,
  fetchSnippetCatalog,
  isWarning,
  type SnippetCatalog,
  type SourceChecks,
} from "../../core/sourceChecks";
import {
  checkShareItems,
  displayCode,
  HANDLE_MAX,
  handleProblem,
  NAME_MAX,
  parseCode,
  previewShare,
  shareKeys,
  unloadableSnippets,
  type ShareFile,
  type ShareMode,
} from "../../core/shareCodes";
import { savePendingRestore } from "../../core/restoreSummary";
import { backupNow, loadShare, SafetyBackupError } from "../../core/syncService";
import type { SyncifyConfig, SyncifySpicetifyConfig } from "../../types/syncify";
import { copyToClipboard } from "../clipboard";
import { formatCount } from "../format";
import { Dot, Meta } from "../kit";
import { ChevronIcon, CloseIcon, ExternalIcon } from "../legacyIcons";
import { ITEM_GROUPS, RestoreChanges, SourceLabel } from "./ShareChanges";

// How long typing pauses before a handle's form is checked.
const HANDLE_CHECK_DELAY_MS = 600;

const SHARE_MODES: [ShareMode, string][] = [
  ["add", "Add to my setup"],
  ["replace", "Replace my setup"],
];

/**
 * The Share section: load a code anyone shared, and signed in, share this
 * setup as a code and keep the account's codes up to date.
 */
export function SharePanel(props: {
  config: SyncifyConfig;
  /** undefined until the stored session has been read. */
  session: AccountSession | null | undefined;
  localItems: InstalledItem[];
  localConfig: SyncifySpicetifyConfig | null;
  /** Marketplace's active theme here, null when none is set. */
  localTheme: string | null;
  marketplaceAvailable: boolean | null;
  /** A backup or a restore is running. */
  busy: boolean;
  onSignIn(): void;
  onSignedOut(): void;
  /** How many codes the account has, each time they're listed. */
  onCodeCount(count: number): void;
  /** The account's handle, each time the codes are listed. */
  onHandle(handle: string | null): void;
}) {
  const { session } = props;

  // Loading a code.
  const [input, setInput] = useState("");
  const [fetching, setFetching] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [shared, setShared] = useState<{
    file: ShareFile;
    items: InstalledItem[];
    /** Loaded from Syncify picks. */
    pick: boolean;
  } | null>(null);
  // Syncify picks, read once when this section opens; null until Discover
  // opens (no picks file), which also hides Find more setups.
  const [picks, setPicks] = useState<SharePick[] | null>(null);
  // The pick whose Preview is loading, for its row's button.
  const [previewing, setPreviewing] = useState<string | null>(null);
  const [mode, setMode] = useState<ShareMode>("add");
  const [showChanges, setShowChanges] = useState(false);
  const [allowed, setAllowed] = useState<Set<string>>(() => new Set());
  const [catalogChecks, setCatalogChecks] = useState<SourceChecks | null>(
    null,
  );
  // undefined until Marketplace's snippet list has been asked for.
  const [snippets, setSnippets] = useState<SnippetCatalog | null | undefined>(
    undefined,
  );
  const [applying, setApplying] = useState(false);

  // Sharing, signed in.
  const [codes, setCodes] = useState<ShareCode[] | null>(null);
  const [newHearts, setNewHearts] = useState(0);
  // Reading the codes marks new hearts seen, so only the section's first
  // read sets the chip: the reloads after Delete or Update would clear it.
  const heartsRead = useRef(false);
  const [maxCodes, setMaxCodes] = useState<number | null>(null);
  // The account's handle; without one, a first code asks for it, filled
  // with the service's suggestion.
  const [profile, setProfile] = useState<ShareProfile | null>(null);
  const [suggestedHandle, setSuggestedHandle] = useState<string | null>(null);
  const [handle, setHandle] = useState("");
  const [codesError, setCodesError] = useState<string | null>(null);
  // The code being made (code null) or updated.
  const [compose, setCompose] = useState<{ code: ShareCode | null } | null>(
    null,
  );
  const [name, setName] = useState("");
  const [draft, setDraft] = useState<{
    keys: Record<string, string>;
    items: InstalledItem[];
    leftOut: SourceChecks;
  } | null>(null);
  const [showItems, setShowItems] = useState(false);
  const [saving, setSaving] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);
  const [saved, setSaved] = useState<
    (SavedShare & { outcome: "created" | "updated" | "existing" }) | null
  >(
    null,
  );
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  // Only the latest check of this setup may fill the box.
  const composeRun = useRef(0);

  const preview = useMemo(
    () =>
      shared
        ? previewShare(
            shared.file,
            shared.items,
            props.localItems,
            props.localConfig,
            props.localTheme,
            mode,
          )
        : null,
    [shared, props.localItems, props.localConfig, props.localTheme, mode],
  );
  // Only what the code writes is checked: what it adds, and when replacing,
  // its copy of what's here too. Adding keeps this device's copies as they are.
  const writtenItems = useMemo(() => {
    if (!preview || !shared) return null;
    const inCode = new Set(shared.items.map((item) => item.key));
    return preview.items.filter(
      (item) =>
        item.change !== "removed" &&
        inCode.has(item.key) &&
        (mode === "replace" || item.isNew),
    );
  }, [preview, shared, mode]);
  const localChecks = useMemo(
    () => (writtenItems ? checkSources(writtenItems) : null),
    [writtenItems],
  );
  const sourceChecks = useMemo<SourceChecks>(
    () => new Map([...(catalogChecks ?? []), ...(localChecks ?? [])]),
    [catalogChecks, localChecks],
  );
  // Snippets whose CSS Marketplace's list doesn't have stay off for good.
  const unloadable = useMemo(
    () =>
      preview && snippets !== undefined
        ? unloadableSnippets(preview, snippets)
        : new Set<string>(),
    [preview, snippets],
  );
  // Off unless turned on, as in a restore: an item whose code would come
  // from the code with a warning, or a check that couldn't be done.
  const offByDefault = useMemo(
    () =>
      new Set([
        ...(preview?.items ?? [])
          .filter(
            (item) =>
              item.change !== "removed" &&
              item.isNew &&
              (isWarning(sourceChecks.get(item.key)) ||
                sourceChecks.get(item.key)?.kind === "unchecked"),
          )
          .map((item) => item.key),
        ...unloadable,
      ]),
    [preview, sourceChecks, unloadable],
  );
  const skippedItems = [...offByDefault].filter(
    (key) => unloadable.has(key) || !allowed.has(key),
  );
  // Apply waits for every check, so nothing unchecked slips through.
  const checkingCode =
    preview !== null && (catalogChecks === null || snippets === undefined);
  const included = draft
    ? draft.items.filter((item) => !draft.leftOut.has(item.key))
    : [];
  const atMax = Boolean(codes && maxCodes !== null && codes.length >= maxCodes);
  // A new code from an account without a handle picks one.
  const askHandle = compose !== null && compose.code === null && !profile;
  const handleError = askHandle ? handleProblem(handle) : null;
  // Shown once typing pauses, so a handle isn't called wrong mid-word; gone
  // as soon as it's fixed.
  const [shownHandleError, setShownHandleError] = useState<string | null>(
    null,
  );
  useEffect(() => {
    if (!handleError) {
      setShownHandleError(null);
      return;
    }
    const timer = window.setTimeout(
      () => setShownHandleError(handleError),
      HANDLE_CHECK_DELAY_MS,
    );
    return () => window.clearTimeout(timer);
  }, [handleError]);

  // Any warning opens the list, so the item can't be missed.
  useEffect(() => {
    setCatalogChecks(null);
    if (!writtenItems || !localChecks) return;
    if ([...localChecks.values()].some(isWarning)) setShowChanges(true);

    let current = true;
    void checkCatalog(writtenItems, localChecks).then((checks) => {
      if (!current) return;
      setCatalogChecks(checks);
      if ([...checks.values()].some(isWarning)) setShowChanges(true);
    });
    return () => {
      current = false;
    };
  }, [writtenItems, localChecks]);

  useEffect(() => {
    void fetchPicks().then(setPicks);
  }, []);

  // The account's codes, read when this section opens, never at startup.
  useEffect(() => {
    setCodes(null);
    setCompose(null);
    setSaved(null);
    heartsRead.current = false;
    if (session) void loadCodes();
  }, [session?.token]);

  async function previewCode(picked?: string) {
    const code = picked ?? parseCode(input);
    setLoadError(null);
    setShared(null);
    if (!code) {
      setLoadError(describeShareError(new AccountError("no_code")));
      return;
    }

    setFetching(true);
    setPreviewing(picked ?? null);
    try {
      const file = await fetchShare(code);
      setMode("add");
      setAllowed(new Set());
      setShowChanges(false);
      setShared({ file, items: listItems(file.keys), pick: picked !== undefined });
      void fetchSnippetCatalog().then(setSnippets);
    } catch (error) {
      setLoadError(describeShareError(error));
    } finally {
      setFetching(false);
      setPreviewing(null);
    }
  }

  async function applyCode() {
    if (!shared || !preview) return;
    setApplying(true);
    setLoadError(null);
    try {
      await loadShare(
        props.config,
        shared.file,
        mode,
        skippedItems,
        snippets ?? null,
        shared.pick,
      );
      Spicetify.showNotification("Syncify: setup loaded. Reloading…");
      // What to add manually is shown after the reload, with the commands.
      savePendingRestore(preview.manual, "share");
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      setApplying(false);
      setLoadError(
        error instanceof SafetyBackupError
          ? `${error.message} ${describeBackupFailure(error.reason)}`
          : error instanceof Error
            ? error.message
            : String(error),
      );
    }
  }

  async function loadCodes() {
    setCodesError(null);
    try {
      const result = await listShares();
      setCodes(result.codes);
      if (!heartsRead.current) {
        heartsRead.current = true;
        setNewHearts(result.newHearts);
      }
      props.onCodeCount(result.codes.length);
      setMaxCodes(result.max);
      setProfile(result.profile);
      props.onHandle(result.profile?.handle ?? null);
      setSuggestedHandle(result.suggestedHandle);
    } catch (error) {
      showShareFailure(error, setCodesError);
    }
  }

  // A session refused along the way signs this device out.
  function showShareFailure(error: unknown, show: (text: string) => void) {
    show(describeShareError(error, maxCodes));
    if (error instanceof AccountError && error.code === "signed_out") {
      props.onSignedOut();
    }
  }

  /** Checks this setup for a new code, or for an update of `code`. */
  async function startCompose(code: ShareCode | null) {
    const run = ++composeRun.current;
    setCompose({ code });
    setName(code?.name ?? "");
    setHandle(suggestedHandle ?? "");
    setDraft(null);
    setShowItems(false);
    setShareError(null);
    setSaved(null);
    setConfirmDelete(null);
    try {
      const keys = await collectMarketplaceKeys();
      const checked = await checkShareItems(listItems(keys), keys);
      if (run !== composeRun.current) return;
      setDraft({ keys, ...checked });
      // What's left out is shown, so it can't be missed.
      if (checked.leftOut.size > 0) setShowItems(true);
    } catch (error) {
      if (run !== composeRun.current) return;
      setCompose(null);
      setShareError(error instanceof Error ? error.message : String(error));
    }
  }

  function cancelCompose() {
    composeRun.current += 1;
    setCompose(null);
    setDraft(null);
  }

  async function saveCode() {
    if (!compose || !draft) return;
    setSaving(true);
    setShareError(null);
    const keys = shareKeys(draft.keys, included);
    try {
      const result = compose.code
        ? await updateShare(compose.code.code, name.trim(), keys)
        : await createShare(
            name.trim(),
            keys,
            askHandle ? handle.trim() : undefined,
          );
      setSaved({ ...result, outcome: compose.code ? "updated" : "created" });
      setCompose(null);
      setDraft(null);
      await loadCodes();
    } catch (error) {
      // Another of the account's codes holds this setup already: that code
      // is shown instead of a copy.
      if (
        error instanceof AccountError &&
        error.code === "same_setup" &&
        error.share
      ) {
        setSaved({ ...error.share, leftOut: 0, outcome: "existing" });
        setCompose(null);
        setDraft(null);
        return;
      }
      showShareFailure(error, setShareError);
      // A code made but not published yet is listed, for Update to finish.
      if (error instanceof AccountError && error.code === "publish_failed") {
        setCompose(null);
        void loadCodes();
      }
    } finally {
      setSaving(false);
    }
  }

  async function removeCode(code: string) {
    setDeleting(true);
    setCodesError(null);
    try {
      await deleteShare(code);
      setConfirmDelete(null);
      if (saved?.code === code) setSaved(null);
      await loadCodes();
    } catch (error) {
      showShareFailure(error, setCodesError);
    } finally {
      setDeleting(false);
    }
  }

  async function copy(text: string, id: string) {
    if (!(await copyToClipboard(text))) return;
    setCopied(id);
    setTimeout(() => setCopied((current) => (current === id ? null : current)), 2000);
  }

  return (
    <>
      <form
        className="syncify-field syncify-share-load"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          if (!fetching && !applying && input.trim()) void previewCode();
        }}
      >
        <label className="syncify-share-load-label" htmlFor="syncify-share-input">
          Load a setup
        </label>
        <input
          className="syncify-input syncify-share-input"
          id="syncify-share-input"
          type="text"
          placeholder="Paste a code or a link"
          autoComplete="off"
          spellCheck={false}
          value={input}
          onChange={(event) => setInput(event.currentTarget.value)}
          disabled={applying}
        />
        <button
          className="syncify-button secondary"
          type="submit"
          disabled={fetching || applying || !input.trim()}
        >
          {fetching ? "Loading…" : "Preview"}
        </button>
      </form>
      {loadError ? (
        <div className="syncify-alert" data-kind="error" role="alert">
          {loadError}
        </div>
      ) : null}

      {shared && preview ? (
        <div className="syncify-confirm">
          <span className="syncify-share-title">
            <p className="syncify-confirm-title">
              Load {shared.file.name ?? displayCode(shared.file.code)}?
            </p>
            {shared.file.creator ? (
              <button
                className="syncify-text-button"
                type="button"
                title="Open their profile"
                onClick={() =>
                  window.open(
                    profileUrl(shared.file.creator!),
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
              >
                by @{shared.file.creator}
              </button>
            ) : null}
          </span>
          <div
            className="syncify-share-modes"
            role="radiogroup"
            aria-label="How to load it"
          >
            {SHARE_MODES.map(([value, label]) => (
              <button
                className="syncify-backup"
                role="radio"
                aria-checked={mode === value}
                data-selected={mode === value ? "true" : "false"}
                type="button"
                key={value}
                onClick={() => setMode(value)}
                disabled={applying}
              >
                <span className="syncify-radio" aria-hidden="true" />
                <span className="syncify-backup-text">
                  <span>{label}</span>
                </span>
              </button>
            ))}
          </div>
          <RestoreChanges
            preview={preview}
            checks={sourceChecks}
            off={offByDefault}
            fixed={unloadable}
            switchLabel="Load"
            allowed={allowed}
            unapproved={false}
            onAllow={(key, on) => {
              const next = new Set(allowed);
              if (on) next.add(key);
              else next.delete(key);
              setAllowed(next);
            }}
            expanded={showChanges}
            onToggle={() => setShowChanges(!showChanges)}
          />
          {props.marketplaceAvailable === false ? (
            <p className="syncify-muted">
              Install Spicetify Marketplace to load a setup.
            </p>
          ) : (
            <div className="syncify-actions">
              <button
                className="syncify-button secondary"
                type="button"
                onClick={() => setShared(null)}
                disabled={applying}
              >
                Cancel
              </button>
              <button
                className="syncify-button"
                type="button"
                onClick={() => void applyCode()}
                disabled={applying || checkingCode || props.busy}
              >
                {applying ? "Applying…" : checkingCode ? "Checking…" : "Apply"}
              </button>
            </div>
          )}
        </div>
      ) : null}

      {picks ? (
        <section className="syncify-share-part" aria-label={picks.length > 0 ? "Syncify picks" : "Discover"}>
          {picks.length > 0 ? <h5 className="syncify-change-group">Syncify picks</h5> : null}
          <ul className="syncify-change-list syncify-share-codes">
            {picks.map((pick) => (
              <li className="syncify-setting" key={pick.code}>
                <span className="syncify-setting-text">
                  <span className="syncify-account-email">{pick.name}</span>
                  <span className="syncify-muted syncify-pick-detail">
                    <Pips pick={pick} />
                    {formatCount(pick.extensions + pick.themes + pick.snippets, "item")}
                  </span>
                </span>
                <button
                  className="syncify-text-button"
                  type="button"
                  disabled={fetching || applying}
                  onClick={() => void previewCode(pick.code)}
                >
                  {previewing === pick.code ? "Loading…" : "Preview"}
                </button>
              </li>
            ))}
            <li className="syncify-setting">
              <span className="syncify-setting-text">
                <span>Find more setups</span>
                <span className="syncify-muted">People's setups on Discover</span>
              </span>
              <button
                className="syncify-button secondary"
                type="button"
                onClick={() =>
                  window.open(`${getProjectConfig().webUrl.replace(/\/+$/, "")}/discover`, "_blank", "noopener,noreferrer")
                }
              >
                Open Discover
              </button>
            </li>
          </ul>
        </section>
      ) : null}

      {session === undefined ? null : !session ? (
        <div className="syncify-setting syncify-share-part">
          <span className="syncify-setting-text">
            <span>Share this setup</span>
            <span className="syncify-muted">Get a code anyone can load</span>
          </span>
          <button
            className="syncify-button secondary"
            type="button"
            onClick={props.onSignIn}
          >
            Sign in to share
          </button>
        </div>
      ) : (
        <>
          <div className="syncify-setting syncify-share-part">
            <span className="syncify-setting-text">
              <span>Share this setup</span>
              <span className="syncify-muted">
                {codes && codes.length > 0 && maxCodes !== null
                  ? codesLeft(maxCodes - codes.length)
                  : "Get a code anyone can load"}
              </span>
            </span>
            <button
              className="syncify-button secondary"
              type="button"
              onClick={() => void startCompose(null)}
              disabled={
                compose !== null ||
                codes === null ||
                atMax ||
                props.marketplaceAvailable === false
              }
              title={atMax ? "Delete a code to make another" : undefined}
            >
              Share
            </button>
          </div>

          {compose ? (
            <div className="syncify-confirm">
              <p className="syncify-confirm-title">
                {compose.code
                  ? `Update ${displayCode(compose.code.code)} with this setup?`
                  : "Share this setup?"}
              </p>
              {draft ? (
                <>
                  <div className="syncify-chips" aria-label="What goes in">
                    <span className="syncify-chip">
                      {included.length} going in
                    </span>
                    {draft.leftOut.size ? (
                      <span className="syncify-chip" data-change="off">
                        {draft.leftOut.size} left out
                      </span>
                    ) : null}
                  </div>
                  {draft.items.length ? (
                    <button
                      className="syncify-text-button syncify-disclosure"
                      type="button"
                      aria-expanded={showItems}
                      aria-controls="syncify-share-items"
                      onClick={() => setShowItems(!showItems)}
                    >
                      {showItems ? "Hide items" : "Show items"}
                      <ChevronIcon />
                    </button>
                  ) : null}
                  {showItems ? (
                    <ShareItems items={draft.items} leftOut={draft.leftOut} />
                  ) : null}
                  <div className="syncify-share-fields">
                    <label
                      className="syncify-share-load-label"
                      htmlFor="syncify-share-name"
                    >
                      Setup name
                    </label>
                    <input
                      id="syncify-share-name"
                      className="syncify-input"
                      type="text"
                      placeholder="Optional"
                      maxLength={NAME_MAX}
                      value={name}
                      onChange={(event) => setName(event.currentTarget.value)}
                      disabled={saving}
                    />
                    {askHandle ? (
                      <>
                        <p className="syncify-muted syncify-share-handle-note">
                          It's your first time creating a share code. Pick a
                          handle for your profile:
                        </p>
                        <label
                          className="syncify-share-load-label"
                          htmlFor="syncify-share-handle"
                        >
                          Your handle
                        </label>
                        <span className="syncify-input syncify-handle-input">
                          <span aria-hidden="true">@</span>
                          <input
                            id="syncify-share-handle"
                            type="text"
                            placeholder="handle"
                            autoComplete="off"
                            spellCheck={false}
                            maxLength={HANDLE_MAX}
                            value={handle}
                            onChange={(event) =>
                              setHandle(
                                event.currentTarget.value.replace(/^@/, ""),
                              )
                            }
                            disabled={saving}
                          />
                        </span>
                        {handle && shownHandleError ? (
                          <span
                            className="syncify-share-handle-problem"
                            role="alert"
                          >
                            {shownHandleError}
                          </span>
                        ) : null}
                      </>
                    ) : null}
                  </div>
                </>
              ) : (
                <p className="syncify-muted">Checking your items…</p>
              )}
              <div className="syncify-actions">
                <button
                  className="syncify-button secondary"
                  type="button"
                  onClick={cancelCompose}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  className="syncify-button"
                  type="button"
                  onClick={() => void saveCode()}
                  disabled={
                    !draft ||
                    included.length === 0 ||
                    saving ||
                    (askHandle && handleError !== null)
                  }
                >
                  {!draft
                    ? "Checking…"
                    : saving
                      ? compose.code
                        ? "Updating…"
                        : "Creating…"
                      : compose.code
                        ? "Update"
                        : "Create code"}
                </button>
              </div>
            </div>
          ) : null}

          {shareError ? (
            <div className="syncify-alert" data-kind="error" role="alert">
              {shareError}
            </div>
          ) : null}

          {saved ? (
            <div className="syncify-confirm">
              <span className="syncify-manual-header">
                <span className="syncify-confirm-title">
                  {saved.outcome === "existing"
                    ? "You already shared this setup"
                    : saved.outcome === "updated"
                      ? "Code updated"
                      : "Your code is ready"}
                </span>
                <button
                  className="syncify-icon-button"
                  type="button"
                  aria-label="Dismiss"
                  title="Dismiss"
                  onClick={() => setSaved(null)}
                >
                  <CloseIcon />
                </button>
              </span>
              <span className="syncify-code syncify-share-code">
                <code>{displayCode(saved.code)}</code>
                <button
                  className="syncify-text-button"
                  type="button"
                  onClick={() => void copy(displayCode(saved.code), "saved-code")}
                >
                  {copied === "saved-code" ? "Copied" : "Copy"}
                </button>
                {saved.link ? (
                  <button
                    className="syncify-text-button"
                    type="button"
                    onClick={() => void copy(saved.link!, "saved-link")}
                  >
                    {copied === "saved-link" ? "Copied" : "Get link"}
                  </button>
                ) : null}
              </span>
              {saved.leftOut ? (
                <p className="syncify-muted">
                  {saved.leftOut === 1
                    ? "1 snippet isn't in Marketplace's list anymore, so it was left out."
                    : `${saved.leftOut} snippets aren't in Marketplace's list anymore, so they were left out.`}
                </p>
              ) : null}
              {/* A new code, once Discover is open (picks is its file): the
                  website's Post your setup, started on this code. */}
              {saved.outcome === "created" && picks ? (
                <div className="syncify-setting">
                  <span className="syncify-setting-text">
                    <span>Post it on Discover</span>
                    <span className="syncify-muted">Let people find it and try it</span>
                  </span>
                  <button
                    className="syncify-button secondary"
                    type="button"
                    onClick={() =>
                      window.open(
                        `${getProjectConfig().webUrl.replace(/\/+$/, "")}/discover?post=${encodeURIComponent(saved.code)}`,
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                  >
                    Post
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}

          {codesError ? (
            <div className="syncify-alert" data-kind="error" role="alert">
              <span>{codesError}</span>
              <span className="syncify-alert-actions">
                <button
                  className="syncify-text-button"
                  type="button"
                  onClick={() => void loadCodes()}
                >
                  Try again
                </button>
              </span>
            </div>
          ) : null}

          {codes && codes.length > 0 ? (
            <section aria-label="Your codes">
              <h5 className="syncify-change-group syncify-codes-heading">
                Your codes
                {newHearts > 0 ? (
                  <span className="syncify-tag" data-tone="new">
                    {formatCount(newHearts, "new heart")}
                  </span>
                ) : null}
              </h5>
              <ul className="syncify-change-list syncify-share-codes">
                {codes.map((code) => (
                  <li className="syncify-setting" key={code.code}>
                    <span className="syncify-setting-text">
                      <span className="syncify-account-email">
                        {code.name ?? displayCode(code.code)}
                      </span>
                      <span className="syncify-muted">
                        {confirmDelete === code.code
                          ? code.posted
                            ? "Delete it? Its link stops working and its post comes off Discover."
                            : "Delete it? Its link stops working."
                          : (
                            <Meta
                              parts={[
                                code.name ? displayCode(code.code) : null,
                                formatCount(code.item_count, "item"),
                                `Used by ${code.imports}`,
                                code.hearts === null ? null : formatCount(code.hearts, "heart"),
                              ]}
                            />
                          )}
                      </span>
                    </span>
                    <span className="syncify-account-actions">
                      {confirmDelete === code.code ? (
                        <>
                          <button
                            className="syncify-text-button"
                            type="button"
                            onClick={() => setConfirmDelete(null)}
                            disabled={deleting}
                          >
                            Cancel
                          </button>
                          <button
                            className="syncify-text-button"
                            data-danger="true"
                            type="button"
                            onClick={() => void removeCode(code.code)}
                            disabled={deleting}
                          >
                            {deleting ? "Deleting…" : "Delete"}
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="syncify-text-button"
                            type="button"
                            onClick={() => void startCompose(code)}
                            disabled={compose !== null || deleting}
                          >
                            Update
                          </button>
                          <button
                            className="syncify-text-button"
                            type="button"
                            onClick={() =>
                              void copy(displayCode(code.code), `code:${code.code}`)
                            }
                          >
                            {copied === `code:${code.code}` ? "Copied" : "Copy"}
                          </button>
                          {code.link ? (
                            <button
                              className="syncify-text-button"
                              type="button"
                              onClick={() => void copy(code.link!, `link:${code.code}`)}
                            >
                              {copied === `link:${code.code}` ? "Copied" : "Get link"}
                            </button>
                          ) : null}
                          <button
                            className="syncify-text-button"
                            type="button"
                            onClick={() => setConfirmDelete(code.code)}
                            disabled={deleting}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </>
      )}
    </>
  );
}

const SHARE_MARKS = {
  in: { mark: "+", label: "Goes in" },
  out: { mark: "−", label: "Left out" },
};

/** What a new code holds, grouped by type, with why anything is left out. */
function ShareItems(props: { items: InstalledItem[]; leftOut: SourceChecks }) {

  return (
    <div className="syncify-changes" id="syncify-share-items">
      {ITEM_GROUPS.map(([type, title]) => {
        const group = props.items
          .filter((item) => item.type === type)
          .sort((a, b) => a.name.localeCompare(b.name));
        if (group.length === 0) return null;

        return (
          <section key={type} aria-label={title}>
            <h5 className="syncify-change-group">{title}</h5>
            <ul className="syncify-change-list">
              {group.map((item) => {
                const check = props.leftOut.get(item.key);
                const mark = check ? SHARE_MARKS.out : SHARE_MARKS.in;
                return (
                  <li className="syncify-change" key={item.key}>
                    <span
                      className="syncify-mark"
                      data-change={check ? "removed" : "added"}
                      role="img"
                      aria-label={mark.label}
                    >
                      {mark.mark}
                    </span>
                    <span className="syncify-change-name">
                      {item.name}
                      {item.repo ? (
                        <span className="syncify-change-detail">
                          <Dot />
                          {item.repo}
                        </span>
                      ) : null}
                    </span>
                    {check ? <SourceLabel check={check} /> : null}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

/** "Couldn't back up your setup first…" and why. */
function describeBackupFailure(reason: unknown): string {
  if (reason instanceof LockedError) return "Sign in to back up.";
  return reason instanceof Error ? reason.message : String(reason);
}

/** "4 codes left", or what to do at the limit. */
function codesLeft(left: number): string {
  if (left <= 0) return "No codes left, delete one to make another";
  return `${left} ${left === 1 ? "code" : "codes"} left`;
}

// Syncify's kind colors, one square per item, as on the website's cards.
// At most PIPS_MAX, so a big setup's row stays one line.
const PIPS_MAX = 12;

function Pips(props: { pick: SharePick }) {
  const { extensions, themes, snippets } = props.pick;
  const kinds = [
    ...Array<string>(Math.min(extensions, PIPS_MAX)).fill("extension"),
    ...Array<string>(Math.min(themes, PIPS_MAX)).fill("theme"),
    ...Array<string>(Math.min(snippets, PIPS_MAX)).fill("snippet"),
  ].slice(0, PIPS_MAX);
  return (
    <span className="syncify-pips" aria-hidden="true">
      {kinds.map((kind, index) => (
        <span className="syncify-pip" data-kind={kind} key={index} />
      ))}
    </span>
  );
}
