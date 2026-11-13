import { useEffect, useState } from "react";
import { readSyncStatus, watchSyncStatus, type SettingsSyncStatus } from "../../core/settingsSync";

/** Extension settings sync as last known on this device, kept up to date. */
export function useSyncStatus(): SettingsSyncStatus {
  const [status, setStatus] = useState(() => readSyncStatus());
  useEffect(() => watchSyncStatus(setStatus), []);
  return status;
}
