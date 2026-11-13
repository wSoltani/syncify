import { useEffect, useRef, useState } from "react";
import { loadConfig } from "../../core/config";
import { deleteSyncedCopy, loadSyncItems, type SettingsSyncStatus, type SyncItem } from "../../core/settingsSync";
import type { SyncifyConfig } from "../../types/syncify";
import {
  Button,
  formatBytes,
  List,
  ListRow,
  Menu,
  Meta,
  Notice,
  Pip,
  SectionHeader,
  SkeletonRow,
  Switch,
  SwitchRow,
  UsageMeter,
  useStableId,
} from "../kit";
import { heldItems, holdText, itemCounts, sizeText, spaceUsed, type HeldItem } from "./syncText";

// As many placeholder rows as a short list.
const SKELETON_ROWS = 4;

/**
 * The Settings tab's Extension settings section: the device switch, the
 * space used, why an item isn't syncing, and the Items row that opens the
 * list in place. Without a secured backup, only how to start.
 */
export function ExtensionSettingsSection(props: {
  config: SyncifyConfig;
  status: SettingsSyncStatus;
  /** Signed in with this backup secured: the only way settings sync. */
  secured: boolean;
  onSecure(): void;
  securing: boolean;
  onEnabledChange(enabled: boolean): void;
  onOpenItems(): void;
  disabled: boolean;
}) {
  const { config, status } = props;
  const headingId = useStableId("extension-settings");
  const ref = useRef<HTMLDivElement>(null);
  const held = heldItems(status, config.settingsSyncOff);
  const showsHolds = props.secured && config.settingsSyncEnabled && held.length > 0;

  // Opened while an item is held: the section, with its notice, comes into view.
  const opensOnHold = useRef(showsHolds);
  useEffect(() => {
    if (opensOnHold.current) ref.current?.scrollIntoView({ block: "start" });
  }, []);

  return (
    <div className="syncify-sync-section" data-place="settings" ref={ref} role="group" aria-labelledby={headingId}>
      <SectionHeader title="Extension settings" id={headingId} />
      {!props.secured ? (
        <Notice
          tone="info"
          bare
          actions={
            <Button size="small" onClick={props.onSecure} disabled={props.securing}>
              {props.securing ? "Securing…" : "Secure"}
            </Button>
          }
        >
          Secure your backup to sync extension settings between your devices.
        </Notice>
      ) : (
        <>
          <SwitchRow
            label="Syncing on this device"
            checked={config.settingsSyncEnabled}
            onChange={props.onEnabledChange}
            disabled={props.disabled}
          />
          {config.settingsSyncEnabled ? (
            <>
              <SpaceUsed status={status} off={config.settingsSyncOff} />
              <HoldNotices items={held} accountLimit={status.limit} />
              <List>
                {status.items.length === 0 ? (
                  <ListRow name="None of your items have settings Syncify can sync" plain />
                ) : (
                  <ListRow name="Items" meta={<ItemCounts status={status} off={config.settingsSyncOff} />} onOpen={props.onOpenItems} />
                )}
              </List>
            </>
          ) : null}
        </>
      )}
    </div>
  );
}

function ItemCounts(props: { status: SettingsSyncStatus; off: string[] }) {
  const counts = itemCounts(props.status, props.off);
  return (
    <Meta
      parts={[
        counts.syncing > 0 && `${counts.syncing} syncing`,
        counts.held > 0 && <span className="syncify-sync-warning">{counts.held} too big to sync</span>,
        counts.off > 0 && `${counts.off} off`,
      ]}
    />
  );
}

function SpaceUsed(props: { status: SettingsSyncStatus; off: string[] }) {
  const { used, over } = spaceUsed(props.status, props.off);
  return <UsageMeter used={used} max={props.status.limit} warning={over} />;
}

function HoldNotices(props: { items: HeldItem[]; accountLimit: number }) {
  return (
    <>
      {props.items.map((item) => (
        <Notice tone="warning" key={item.id}>
          {holdText(item, props.accountLimit)}
        </Notice>
      ))}
    </>
  );
}

/**
 * Items, open in place of the Settings tab: each item's size, its switch and
 * Delete synced copy. A delete waits, with Undo in its row, until the list is
 * left or Syncify closes; if Spotify closes first, nothing is deleted.
 */
export function SyncItemsView(props: {
  config: SyncifyConfig;
  status: SettingsSyncStatus;
  onItemChange(id: string, on: boolean): void;
  onBack(): void;
  /** A delete went: this device's switch for it is off now. */
  onDeleted(): void;
}) {
  const { config, status } = props;
  const headingId = useStableId("items");
  const [items, setItems] = useState<SyncItem[] | null>(null);
  const [deleting, setDeleting] = useState<string[]>([]);
  // Read when the list is left, which may be as Syncify closes.
  const pending = useRef<{ ids: string[]; names: Map<string, string> }>({ ids: [], names: new Map() });

  useEffect(() => {
    let current = true;
    void loadSyncItems()
      .catch(() => status.items)
      .then((loaded) => {
        if (current) setItems(loaded);
      });
    document.getElementById(headingId)?.focus();
    return () => {
      current = false;
    };
    // Read once each time the list opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Leaving the list sends the deletes still waiting.
  const onDeleted = useRef(props.onDeleted);
  useEffect(() => {
    onDeleted.current = props.onDeleted;
  });
  useEffect(
    () => () => {
      const { ids, names } = pending.current;
      if (ids.length === 0) return;
      void Promise.all(
        ids.map((id) =>
          deleteSyncedCopy(loadConfig(), id).catch((error: unknown) => {
            const reason = error instanceof Error ? error.message : String(error);
            Spicetify.showNotification(`Syncify couldn't delete the synced copy of ${names.get(id) ?? id}. ${reason}`, true, 6000);
          }),
        ),
      ).then(() => onDeleted.current());
    },
    [],
  );

  function markDeleted(item: SyncItem, deleted: boolean) {
    const ids = deleted ? [...deleting, item.id] : deleting.filter((id) => id !== item.id);
    pending.current.names.set(item.id, item.name);
    pending.current.ids = ids;
    setDeleting(ids);
  }

  const held = heldItems({ ...status, items: items ?? status.items }, config.settingsSyncOff);
  return (
    <div className="syncify-sync-section">
      <SectionHeader
        title="Items"
        id={headingId}
        focusable
        end={
          <Button variant="subtle" onClick={props.onBack}>
            Back to settings
          </Button>
        }
      />
      <SpaceUsed status={status} off={config.settingsSyncOff} />
      <HoldNotices items={held} accountLimit={status.limit} />
      <List label="Items" busy={items === null} wrap>
        {items === null
          ? Array.from({ length: SKELETON_ROWS }, (_, index) => <SkeletonRow shape="item" key={index} />)
          : items.map((item) => (
              <ItemRow
                key={item.id}
                item={item}
                on={!config.settingsSyncOff.includes(item.id)}
                deleted={deleting.includes(item.id)}
                onChange={(on) => props.onItemChange(item.id, on)}
                onDelete={(deleted) => markDeleted(item, deleted)}
              />
            ))}
      </List>
    </div>
  );
}

function ItemRow(props: {
  item: SyncItem;
  on: boolean;
  deleted: boolean;
  onChange(on: boolean): void;
  onDelete(deleted: boolean): void;
}) {
  const { item } = props;
  return (
    <ListRow
      leading={<Pip kind={item.kind} />}
      name={item.name}
      end={
        props.deleted ? (
          <>
            <span className="syncify-sync-size">Synced copy deleted</span>
            <Button variant="text" onClick={() => props.onDelete(false)}>
              Undo
            </Button>
          </>
        ) : (
          <>
            <span className="syncify-sync-size" data-tone={item.hold && props.on ? "warning" : undefined}>
              {props.on ? sizeText(item) : formatBytes(item.size)}
            </span>
            <Switch label={`Sync ${item.name}`} checked={props.on} onChange={props.onChange} />
            <Menu
              trigger="more"
              label={`More for ${item.name}`}
              items={[{ label: "Delete synced copy", danger: true, onSelect: () => props.onDelete(true) }]}
            />
          </>
        )
      }
    />
  );
}
