import { useCallback, useState } from "react";
import { summarizeMarketplaceState } from "../../core/marketplace";
import type { SyncifySnapshotSummary } from "../../types/syncify";

/** What's installed on this device, read again after each backup or check. */
export function useLocalSetup(): {
  /** null until read once. */
  local: SyncifySnapshotSummary | null;
  /** The last read failed; it throws, so the window says why. */
  localFailed: boolean;
  refreshLocal(): Promise<SyncifySnapshotSummary>;
} {
  const [local, setLocal] = useState<SyncifySnapshotSummary | null>(null);
  const [localFailed, setLocalFailed] = useState(false);
  const refreshLocal = useCallback(async () => {
    try {
      const summary = await summarizeMarketplaceState();
      setLocal(summary);
      setLocalFailed(false);
      return summary;
    } catch (error) {
      setLocalFailed(true);
      throw error;
    }
  }, []);
  return { local, localFailed, refreshLocal };
}
