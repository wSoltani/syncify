import { useEffect, useRef, useState } from "react";
import { AccountError } from "../../api/accountApi";
import { deleteShare, describeShareError, listShares, type ShareCode, type ShareProfile } from "../../api/sharesApi";
import type { AccountSession } from "../../core/account";
import { useLatest } from "../useLatest";

/**
 * The signed-in account's codes, read when the Share tab opens and never at
 * startup, with how many it may have and its handle.
 */
export function useShareCodes(props: {
  session: AccountSession | null | undefined;
  /** How many codes the account has, each time they're listed. */
  onCodeCount(count: number): void;
  /** The account's handle, each time the codes are listed. */
  onHandle(handle: string | null): void;
  onSignedOut(): void;
}) {
  const [codes, setCodes] = useState<ShareCode[] | null>(null);
  const [max, setMax] = useState<number | null>(null);
  // The account's handle; without one, a first code asks for it, filled
  // with the service's suggestion.
  const [profile, setProfile] = useState<ShareProfile | null>(null);
  const [suggestedHandle, setSuggestedHandle] = useState<string | null>(null);
  const [newHearts, setNewHearts] = useState(0);
  // Reading the codes marks new hearts seen, so only the tab's first read
  // sets the count: the reloads after Delete or Update would clear it.
  const heartsRead = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  /** Shows what went wrong; a session refused along the way signs this device out. */
  function fail(failure: unknown, show: (text: string) => void) {
    show(describeShareError(failure, max));
    if (failure instanceof AccountError && failure.code === "signed_out") props.onSignedOut();
  }

  async function load() {
    setError(null);
    try {
      const result = await listShares();
      setCodes(result.codes);
      if (!heartsRead.current) {
        heartsRead.current = true;
        setNewHearts(result.newHearts);
      }
      props.onCodeCount(result.codes.length);
      setMax(result.max);
      setProfile(result.profile);
      props.onHandle(result.profile?.handle ?? null);
      setSuggestedHandle(result.suggestedHandle);
    } catch (failure) {
      fail(failure, setError);
    }
  }

  /** Deletes a code, then lists the codes again. True once it's gone. */
  async function remove(code: string): Promise<boolean> {
    setDeleting(true);
    setError(null);
    try {
      await deleteShare(code);
      await load();
      return true;
    } catch (failure) {
      fail(failure, setError);
      return false;
    } finally {
      setDeleting(false);
    }
  }

  const loadFor = useLatest((signedIn: boolean) => {
    setCodes(null);
    heartsRead.current = false;
    if (signedIn) void load();
  });
  const token = props.session?.token;
  useEffect(() => loadFor.current(token !== undefined), [loadFor, token]);

  return {
    codes,
    max,
    /** At the most codes the account may have. */
    atMax: codes !== null && max !== null && codes.length >= max,
    profile,
    suggestedHandle,
    newHearts,
    error,
    deleting,
    load,
    remove,
    fail,
  };
}
