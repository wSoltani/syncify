import { useEffect, useMemo, useState } from "react";
import { previewSettings } from "../../core/extensionSettings";
import { previewRestore, type InstalledItem } from "../../core/restorePreview";
import {
  checkCatalog,
  checkSources,
  isWarning,
  type SourceChecks,
} from "../../core/sourceChecks";
import type { SyncifyPayload, SyncifySpicetifyConfig } from "../../types/syncify";
import { backupItems } from "./backupItems";
import { listChanges } from "../changes/listChanges";
import { describeSettings } from "./settingsRows";

/**
 * What restoring a backup changes here, with where each item comes from and
 * the extension settings it writes. The checks that need no network show at
 * once; the catalog lookups and the settings follow, and Restore waits for
 * them, so nothing unchecked slips through.
 */
export function useRestorePreview(
  backup: SyncifyPayload,
  localItems: InstalledItem[],
  localConfig: SyncifySpicetifyConfig | null,
) {
  // Items off by default that were turned on.
  const [allowed, setAllowed] = useState<ReadonlySet<string>>(() => new Set());
  const [catalog, setCatalog] = useState<{ for: SyncifyPayload; checks: SourceChecks } | null>(null);

  const preview = useMemo(
    () => previewRestore(backupItems(backup), backup.spicetify_config, localItems, localConfig),
    [backup, localItems, localConfig],
  );
  const localChecks = useMemo(() => checkSources(preview.items), [preview]);

  useEffect(() => {
    let current = true;
    void checkCatalog(preview.items, localChecks).then((checks) => {
      if (current) setCatalog({ for: backup, checks });
    });
    return () => {
      current = false;
    };
  }, [backup, preview, localChecks]);

  // Registry ids whose settings differ. A failure to read them leaves the
  // settings as they are rather than holding the restore up.
  const [settings, setSettings] = useState<{ for: SyncifyPayload; ids: string[] } | null>(null);
  useEffect(() => {
    let current = true;
    void previewSettings(backup.extension_settings)
      .catch(() => [])
      .then((ids) => {
        if (current) setSettings({ for: backup, ids });
      });
    return () => {
      current = false;
    };
  }, [backup]);

  const catalogChecks = catalog?.for === backup ? catalog.checks : null;
  // The local checks win when both have something.
  const checks = useMemo<SourceChecks>(
    () => new Map([...(catalogChecks ?? []), ...localChecks]),
    [catalogChecks, localChecks],
  );
  const unapproved = backup.backup?.kind === "quarantined";

  // Left off unless turned on: from a backup no approved install made, or
  // with a warning or a check that couldn't be done. Only items whose code
  // would come from the backup; the rest stay as they are.
  const optional = useMemo(
    () =>
      new Set(
        preview.items
          .filter(
            (item) =>
              item.change !== "removed" &&
              item.isNew &&
              (unapproved || isWarning(checks.get(item.key)) || checks.get(item.key)?.kind === "unchecked"),
          )
          .map((item) => item.key),
      ),
    [preview, checks, unapproved],
  );

  const skipped = useMemo(() => [...optional].filter((key) => !allowed.has(key)), [optional, allowed]);
  const settingsIds = settings?.for === backup ? settings.ids : null;
  // An item left off keeps its settings too.
  const settingsRows = useMemo(
    () => describeSettings(settingsIds ?? [], backupItems(backup), localItems).filter((row) => !skipped.includes(row.key)),
    [settingsIds, backup, localItems, skipped],
  );

  const changes = useMemo(
    () =>
      listChanges(preview, checks, {
        optional,
        allowed,
        unapproved,
        settings: settingsRows.map(({ id, name, kind }) => ({ id, name, kind })),
      }),
    [preview, checks, optional, allowed, unapproved, settingsRows],
  );

  function allow(key: string, on: boolean) {
    const next = new Set(allowed);
    if (on) next.add(key);
    else next.delete(key);
    setAllowed(next);
  }

  return {
    preview,
    changes,
    unapproved,
    /** Catalog lookups or settings still being read: Restore waits. */
    checking: catalogChecks === null || settingsIds === null,
    /** Optional items left off: the restore skips them. */
    skipped,
    /** Registry ids of the items whose settings the restore writes. */
    settingsIds: changes.settings.map((row) => row.id),
    allow,
  };
}
