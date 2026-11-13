import { useEffect, useMemo, useState } from "react";
import { AccountError } from "../../api/accountApi";
import { describeShareError, fetchShare } from "../../api/sharesApi";
import { LockedError } from "../../api/syncifyApi";
import { listItems, type InstalledItem } from "../../core/restorePreview";
import { savePendingRestore } from "../../core/restoreSummary";
import {
  checkCatalog,
  checkSources,
  fetchSnippetCatalog,
  isWarning,
  type SnippetCatalog,
  type SourceChecks,
} from "../../core/sourceChecks";
import { parseCode, previewShare, unloadableSnippets, type ShareFile, type ShareMode } from "../../core/shareCodes";
import { loadShare, SafetyBackupError } from "../../core/syncService";
import type { SyncifyConfig, SyncifySpicetifyConfig } from "../../types/syncify";
import { listChanges } from "../changes/listChanges";

interface LoadedShare {
  file: ShareFile;
  items: InstalledItem[];
  /** Loaded from Syncify picks. */
  pick: boolean;
}

/**
 * Loading a share code: fetch it, show what it changes here, and load it.
 * Only what the code writes is checked, and Load waits for every check.
 */
export function useShareLoad(props: {
  config: SyncifyConfig;
  localItems: InstalledItem[];
  localConfig: SyncifySpicetifyConfig | null;
  /** Marketplace's active theme here, null when none is set. */
  localTheme: string | null;
}) {
  const [input, setInput] = useState("");
  // The code being fetched, from the field or a pick.
  const [fetching, setFetching] = useState<{ code: string; pick: boolean } | null>(null);
  // A code that couldn't be read, under the field.
  const [error, setError] = useState<string | null>(null);
  // Loading the previewed setup failed, inside the preview.
  const [applyError, setApplyError] = useState<string | null>(null);
  const [shared, setShared] = useState<LoadedShare | null>(null);
  const [mode, setMode] = useState<ShareMode>("add");
  const [allowed, setAllowed] = useState<ReadonlySet<string>>(() => new Set());
  // Marketplace's catalog checks, for the items they were run on.
  const [catalog, setCatalog] = useState<{ for: unknown; checks: SourceChecks } | null>(null);
  // undefined until Marketplace's snippet list has been asked for.
  const [snippets, setSnippets] = useState<SnippetCatalog | null | undefined>(undefined);
  const [applying, setApplying] = useState(false);

  const preview = useMemo(
    () =>
      shared
        ? previewShare(shared.file, shared.items, props.localItems, props.localConfig, props.localTheme, mode)
        : null,
    [shared, props.localItems, props.localConfig, props.localTheme, mode],
  );
  // What the code writes: what it adds, and when replacing, its copy of
  // what's here too. Adding keeps this device's copies as they are.
  const writtenItems = useMemo(() => {
    if (!preview || !shared) return null;
    const inCode = new Set(shared.items.map((item) => item.key));
    return preview.items.filter(
      (item) => item.change !== "removed" && inCode.has(item.key) && (mode === "replace" || item.isNew),
    );
  }, [preview, shared, mode]);
  const localChecks = useMemo(() => (writtenItems ? checkSources(writtenItems) : null), [writtenItems]);
  const catalogChecks = catalog && catalog.for === writtenItems ? catalog.checks : null;
  const checks = useMemo<SourceChecks>(
    () => new Map([...(catalogChecks ?? []), ...(localChecks ?? [])]),
    [catalogChecks, localChecks],
  );
  // Snippets whose CSS Marketplace's list doesn't have stay off for good.
  const unloadable = useMemo(
    () => (preview && snippets !== undefined ? unloadableSnippets(preview, snippets) : new Set<string>()),
    [preview, snippets],
  );
  // Off unless turned on, as in a restore: an item whose code would come
  // from the code with a warning, or a check that couldn't be done.
  const optional = useMemo(
    () =>
      new Set(
        (preview?.items ?? [])
          .filter(
            (item) =>
              item.change !== "removed" &&
              item.isNew &&
              (isWarning(checks.get(item.key)) || checks.get(item.key)?.kind === "unchecked"),
          )
          .map((item) => item.key),
      ),
    [preview, checks],
  );
  const changes = useMemo(
    () => (preview ? listChanges(preview, checks, { optional, allowed, fixed: unloadable, verb: "Load" }) : null),
    [preview, checks, optional, allowed, unloadable],
  );
  // The code's theme becomes the active one, unless it's left off.
  const theme =
    preview?.theme && !unloadable.has(preview.theme.key) && (!optional.has(preview.theme.key) || allowed.has(preview.theme.key))
      ? preview.theme
      : null;
  const checking = preview !== null && (catalogChecks === null || snippets === undefined);

  useEffect(() => {
    if (!writtenItems || !localChecks) return;
    let current = true;
    void checkCatalog(writtenItems, localChecks).then((result) => {
      if (current) setCatalog({ for: writtenItems, checks: result });
    });
    return () => {
      current = false;
    };
  }, [writtenItems, localChecks]);

  /** Fetches what was typed, or a pick, and opens its preview. */
  async function open(picked?: string) {
    const code = picked ?? parseCode(input);
    setError(null);
    setApplyError(null);
    setShared(null);
    if (!code) {
      setError(describeShareError(new AccountError("no_code")));
      return;
    }

    setFetching({ code, pick: picked !== undefined });
    try {
      const file = await fetchShare(code);
      setMode("add");
      setAllowed(new Set());
      setShared({ file, items: listItems(file.keys), pick: picked !== undefined });
      void fetchSnippetCatalog().then(setSnippets);
    } catch (fetchError) {
      setError(describeShareError(fetchError));
    } finally {
      setFetching(null);
    }
  }

  function allow(key: string, on: boolean) {
    const next = new Set(allowed);
    if (on) next.add(key);
    else next.delete(key);
    setAllowed(next);
  }

  /** Loads the code, then reloads Spotify; what's added by hand shows after. */
  async function apply() {
    if (!shared || !preview) return;
    setApplying(true);
    setApplyError(null);
    const skipped = [...new Set([...optional, ...unloadable])].filter((key) => unloadable.has(key) || !allowed.has(key));
    try {
      await loadShare(props.config, shared.file, mode, skipped, snippets ?? null, shared.pick);
      Spicetify.showNotification("Syncify: setup loaded. Reloading…");
      savePendingRestore(preview.manual, "share");
      setTimeout(() => window.location.reload(), 1000);
    } catch (failure) {
      setApplying(false);
      setApplyError(describeApplyError(failure));
    }
  }

  return {
    input,
    setInput,
    fetching,
    error,
    applyError,
    shared,
    close: () => {
      setShared(null);
      setApplyError(null);
    },
    mode,
    setMode,
    changes,
    theme,
    checking,
    applying,
    open,
    allow,
    apply,
  };
}

/** Why loading failed; a backup first that failed says why too. */
function describeApplyError(error: unknown): string {
  if (error instanceof SafetyBackupError) {
    const reason =
      error.reason instanceof LockedError
        ? "Sign in to back up."
        : error.reason instanceof Error
          ? error.reason.message
          : String(error.reason);
    return `${error.message} ${reason}`;
  }
  return error instanceof Error ? error.message : String(error);
}
