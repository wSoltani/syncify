import { useCallback, useState } from "react";
import { summarizeMarketplaceState } from "../../core/marketplace";
import type { SyncifySnapshotSummary } from "../../types/syncify";

/** What's installed on this device, read again after each backup or check. */
export function useLocalSetup(): {
  /** null until read once. */
  local: SyncifySnapshotSummary | null;
  refreshLocal(): Promise<SyncifySnapshotSummary>;
} {
  const [local, setLocal] = useState<SyncifySnapshotSummary | null>(null);
  const refreshLocal = useCallback(async () => {
    const summary = await summarizeMarketplaceState();
    setLocal(summary);
    return summary;
  }, []);
  return { local, refreshLocal };
}
