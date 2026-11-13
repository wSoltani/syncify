import { useRef, useState } from "react";
import { AccountError } from "../../api/accountApi";
import { createShare, updateShare, type SavedShare, type ShareCode } from "../../api/sharesApi";
import { collectMarketplaceKeys } from "../../core/marketplace";
import { listItems, type InstalledItem } from "../../core/restorePreview";
import type { SourceChecks } from "../../core/sourceChecks";
import { checkShareItems, handleProblem, shareKeys } from "../../core/shareCodes";

/** A code just made or updated, or the code that holds this setup already. */
export type SavedCode = SavedShare & { outcome: "created" | "updated" | "existing" };

interface Draft {
  keys: Record<string, string>;
  items: InstalledItem[];
  leftOut: SourceChecks;
}

/**
 * Making a code from this setup, or updating one with it: this setup is
 * checked first, then named. Without a handle, a first code picks one,
 * checked when the field is left and again on Create code.
 */
export function useComposeCode(props: {
  /** The signed-in session's token: signing in or out starts over. */
  token: string | undefined;
  /** The account has a handle. */
  hasHandle: boolean;
  suggestedHandle: string | null;
  /** Lists the codes again once one is saved. */
  reload(): Promise<void>;
  fail(error: unknown, show: (text: string) => void): void;
}) {
  // The code being made (code null) or updated.
  const [compose, setCompose] = useState<{ code: ShareCode | null } | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [handleChecked, setHandleChecked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<SavedCode | null>(null);
  // Only the latest check of this setup may fill the draft.
  const run = useRef(0);

  // Signing in or out starts over.
  const [token, setToken] = useState(props.token);
  if (token !== props.token) {
    setToken(props.token);
    setCompose(null);
    setDraft(null);
    setSaved(null);
  }

  const askHandle = compose !== null && compose.code === null && !props.hasHandle;
  const handleError = askHandle && handleChecked ? handleProblem(handle) : null;
  const included = draft ? draft.items.filter((item) => !draft.leftOut.has(item.key)) : [];

  /** Checks this setup for a new code, or for an update of `code`. */
  async function start(code: ShareCode | null) {
    const current = ++run.current;
    setCompose({ code });
    setName(code?.name ?? "");
    setHandle(props.suggestedHandle ?? "");
    setHandleChecked(false);
    setDraft(null);
    setError(null);
    setSaved(null);
    try {
      const keys = await collectMarketplaceKeys();
      const checked = await checkShareItems(listItems(keys), keys);
      // A newer check replaced this one.
      if (current === run.current) setDraft({ keys, ...checked });
    } catch (failure) {
      if (current !== run.current) return;
      setCompose(null);
      setError(failure instanceof Error ? failure.message : String(failure));
    }
  }

  function cancel() {
    run.current += 1;
    setCompose(null);
    setDraft(null);
  }

  function close() {
    setCompose(null);
    setDraft(null);
  }

  async function save() {
    if (!compose || !draft) return;
    if (askHandle && handleProblem(handle)) {
      setHandleChecked(true);
      return;
    }
    setSaving(true);
    setError(null);
    const keys = shareKeys(draft.keys, included);
    try {
      const result = compose.code
        ? await updateShare(compose.code.code, name.trim(), keys)
        : await createShare(name.trim(), keys, askHandle ? handle.trim() : undefined);
      setSaved({ ...result, outcome: compose.code ? "updated" : "created" });
      close();
      await props.reload();
    } catch (failure) {
      // Another of the account's codes holds this setup already: that code
      // is shown instead of a copy.
      if (failure instanceof AccountError && failure.code === "same_setup" && failure.share) {
        setSaved({ ...failure.share, leftOut: 0, outcome: "existing" });
        close();
        return;
      }
      props.fail(failure, setError);
      // A code made but not published yet is listed, for Update to finish.
      if (failure instanceof AccountError && failure.code === "publish_failed") {
        setCompose(null);
        void props.reload();
      }
    } finally {
      setSaving(false);
    }
  }

  return {
    compose,
    draft,
    included,
    name,
    setName,
    askHandle,
    handle,
    setHandle: (value: string) => setHandle(value.replace(/^@/, "")),
    checkHandle: () => setHandleChecked(true),
    handleError,
    saving,
    error,
    saved,
    dismissSaved: () => setSaved(null),
    forgetSaved: (code: string) => setSaved((current) => (current?.code === code ? null : current)),
    start,
    cancel,
    save,
  };
}
