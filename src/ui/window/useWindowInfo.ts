import { useEffect, useState } from "react";
import { getProjectConfig } from "../../core/projectConfig";
import { compareVersions, fetchLatestVersion, isReleaseVersion } from "../../core/releases";
import { getRestoreResult, onRestoreResult, type RestoreResult } from "../../core/restoreSummary";

// How long after a restore its result replaces the status.
const RESULT_SHOWN_MS = 10 * 60 * 1000;

/** A newer release than the one running, asked for once per window. */
export function useNewerVersion(): string | null {
  const [newer, setNewer] = useState<string | null>(null);
  useEffect(() => {
    const running = getProjectConfig();
    if (!isReleaseVersion(running.version)) return;
    let current = true;
    void fetchLatestVersion(running.releasesUrl).then((latest) => {
      if (current && latest && compareVersions(latest, running.version) > 0) setNewer(latest);
    });
    return () => {
      current = false;
    };
  }, []);
  return newer;
}

/** The last restore's result while it's recent, and its commands to run by hand. */
export function useRestoreResult(): { result: RestoreResult | null; recent: boolean } {
  const [result, setResult] = useState(() => getRestoreResult());
  // Read once per change, so the status doesn't flip while it's on screen.
  const [shownAt] = useState(() => Date.now());
  useEffect(() => onRestoreResult(setResult), []);
  return { result, recent: Boolean(result && shownAt - result.at < RESULT_SHOWN_MS) };
}
