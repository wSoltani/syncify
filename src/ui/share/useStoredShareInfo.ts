import { useCallback, useState } from "react";

// How many codes the account had when Share last listed them, so the Share
// tab's badge shows it without asking the service. Forgotten on sign-out.
const CODE_COUNT_KEY = "syncify:share-code-count";
// The account's handle when Share last listed its codes, for Account: an
// empty value is none yet. Forgotten on sign-out.
const HANDLE_KEY = "syncify:handle";

function readCodeCount(): number | null {
  const value = Number(Spicetify.LocalStorage?.get(CODE_COUNT_KEY) ?? NaN);
  return Number.isInteger(value) && value >= 0 ? value : null;
}

/** undefined: not listed yet. */
function readHandle(): string | null | undefined {
  const value = Spicetify.LocalStorage?.get(HANDLE_KEY);
  return value === null || value === undefined ? undefined : value || null;
}

/** The code count and handle Share last saw, kept on this device. */
export function useStoredShareInfo() {
  const [codeCount, setCodeCount] = useState<number | null>(() => readCodeCount());
  const [handle, setHandle] = useState<string | null | undefined>(() => readHandle());

  const saveCodeCount = useCallback((count: number | null) => {
    if (count === null) Spicetify.LocalStorage?.remove(CODE_COUNT_KEY);
    else Spicetify.LocalStorage?.set(CODE_COUNT_KEY, String(count));
    setCodeCount(count);
  }, []);

  const saveHandle = useCallback((next: string | null | undefined) => {
    if (next === undefined) Spicetify.LocalStorage?.remove(HANDLE_KEY);
    else Spicetify.LocalStorage?.set(HANDLE_KEY, next ?? "");
    setHandle(next);
  }, []);

  /** Signed out: none of it belongs to this device any more. */
  const forget = useCallback(() => {
    saveCodeCount(null);
    saveHandle(undefined);
  }, [saveCodeCount, saveHandle]);

  return { codeCount, handle, saveCodeCount, saveHandle, forget };
}
