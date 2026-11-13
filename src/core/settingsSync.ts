import { deleteSettingsCopy } from "../api/syncifyApi";
import type { SyncifyConfig, SyncifyExtensionSettings, SyncifyPayload } from "../types/syncify";
import { loadSession } from "./account";
import { loadConfig, saveConfig } from "./config";
import { stableStringify } from "./crypto";
import { deleteState, readState, writeState } from "./database";
import {
  readLocalSettings,
  RESTORED_SETTINGS_KEY,
  writeSettings,
  type RestoredSettings,
} from "./extensionSettings";
import { nameLocalItems, type NamedItem } from "./settingsNames";
import { isSettingKey, loadRegistry, type RegistryItem, type SettingsRegistry } from "./settingsRegistry";
import { getUserIdentity } from "./user";

// Extension settings sync between a person's devices (docs/implementation.md,
// "Extension settings sync"). Nothing here makes a request of its own: the
// settings part rides the launch check and a manual backup, and only
// Delete synced copy is sent by itself. The backup service decides what's
// kept; this side sends what changed since the account and this device last
// agreed, and takes what changed on the account since its last pull.

// What this device knows of the account's copy and what it last agreed on,
// in Syncify's own database: up to the account's 256 KB, too much for
// localStorage.
const STATE_KEY = "settings-sync";
// What the Settings tab shows, in localStorage so the tab reads it at once.
const STATUS_KEY = "syncify:settings-sync";
// A server time as long as the backup service's, so a size measured here is
// the size it stores: each key is kept as {"v": value, "t": time}.
const STORED_TIME = 1_794_600_000_000;

/** One key's values as they go to the backup service: a list key's value is its parsed list. */
type Values = Record<string, unknown>;

/** The account's copy of an item, as the backup service sends it. */
interface AccountItem {
  data: Record<string, { v: unknown; t: number }> | null;
  size: number;
  /** The size of the copy it refused, while it keeps the last that fit. */
  held?: number;
  /** Deleted: every device turns the item off. */
  off?: boolean;
  /** This install sent its last change. */
  mine?: boolean;
}

interface SyncState {
  /** The account version this device last took. */
  since: number;
  /** The account's copy has been read once, so items it lacks are known to be only here. */
  pulled: boolean;
  /** The first-sync choice was made on this device, or there was none to make. */
  firstSyncDone: boolean;
  account: Record<string, AccountItem>;
  /** Each item's values when this device and the account last agreed. */
  base: Record<string, Values>;
  /** The account's copy of each item this device last took or sent, to spot a new one. */
  seen: Record<string, string>;
  /** The size this device last said it holds an item at. */
  heldSent: Record<string, number>;
  /** Items deleted from this device, by the version the delete made. */
  deleted: Record<string, number>;
}

const EMPTY_STATE: SyncState = {
  since: 0,
  pulled: false,
  firstSyncDone: false,
  account: {},
  base: {},
  seen: {},
  heldSent: {},
  deleted: {},
};

/** Why an item isn't syncing. */
export type HoldReason = "too_big" | "account_full";

export interface ItemHold {
  /** The size it was held at. */
  size: number;
  reason: HoldReason;
}

/** A first-sync choice: when each copy last changed, in milliseconds. */
export interface SyncChoice {
  id: string;
  name: string;
  kind: NamedItem["kind"];
  localAt: number;
  accountAt: number;
}

/** What the Settings tab and the notices show, kept on the device. */
export interface SettingsSyncStatus {
  /** The account's total, as the backup service last said. */
  bytes: number;
  /** The account's limit, from the registry. */
  limit: number;
  /** Items with settings on this device. */
  items: SyncItem[];
  /** Items waiting for the first-sync choice. */
  choices: SyncChoice[];
  /** Items whose new settings were written here and wait for a reload. */
  arrived: { ids: string[]; names: string[]; hidden: boolean } | null;
  /** The UTC day the day's budget ran out; changes wait until the next. */
  budgetDay: string | null;
}

/** An item with extension settings on this device. */
export interface SyncItem extends NamedItem {
  /** Its settings' size here, as the backup service would store them. */
  size: number;
  /** Bytes its tier allows. */
  limit: number;
  /** Some of its keys merge as lists. */
  list: boolean;
  /** The size of the account's copy, which a hold keeps. */
  accountSize: number;
  hold: ItemHold | null;
}

const EMPTY_STATUS: SettingsSyncStatus = {
  bytes: 0,
  limit: 0,
  items: [],
  choices: [],
  arrived: null,
  budgetDay: null,
};

// ─── Status ─────────────────────────────────────────────────────────────────

const listeners = new Set<(status: SettingsSyncStatus) => void>();

/** The last status, read at once. */
export function readSyncStatus(): SettingsSyncStatus {
  const raw = Spicetify.LocalStorage?.get(STATUS_KEY) ?? window.localStorage.getItem(STATUS_KEY);
  if (!raw) return EMPTY_STATUS;
  try {
    const parsed = JSON.parse(raw) as Partial<SettingsSyncStatus>;
    return {
      bytes: typeof parsed.bytes === "number" ? parsed.bytes : 0,
      limit: typeof parsed.limit === "number" ? parsed.limit : 0,
      items: Array.isArray(parsed.items) ? parsed.items : [],
      choices: Array.isArray(parsed.choices) ? parsed.choices : [],
      arrived: parsed.arrived && Array.isArray(parsed.arrived.ids) ? parsed.arrived : null,
      budgetDay: typeof parsed.budgetDay === "string" ? parsed.budgetDay : null,
    };
  } catch {
    return EMPTY_STATUS;
  }
}

function saveSyncStatus(status: SettingsSyncStatus): void {
  const text = JSON.stringify(status);
  if (Spicetify.LocalStorage?.set) Spicetify.LocalStorage.set(STATUS_KEY, text);
  else window.localStorage.setItem(STATUS_KEY, text);
  for (const listener of listeners) listener(status);
}

/** Calls `listener` with each new status until the returned function is called. */
export function watchSyncStatus(listener: (status: SettingsSyncStatus) => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Spotify reloaded, so the settings that arrived are in use. */
export function clearArrived(): void {
  const status = readSyncStatus();
  if (status.arrived) saveSyncStatus({ ...status, arrived: null });
}

/** Not now: the arrival notice stays hidden until the next arrival. */
export function hideArrived(): void {
  const status = readSyncStatus();
  if (status.arrived) saveSyncStatus({ ...status, arrived: { ...status.arrived, hidden: true } });
}

/** "Shuffle+ and Comfy", "Shuffle+, Comfy and 4 more" */
export function arrivedText(names: string[]): string {
  const shown = names.length >= 3 ? `${names[0]}, ${names[1]} and ${names.length - 2} more` : names.join(" and ");
  return `${shown} ${names.length === 1 ? "has" : "have"} new extension settings`;
}

// ─── The settings part ──────────────────────────────────────────────────────

/** A settings part on its way, with what it was made from. */
export interface SettingsSync {
  /** The settings part, as JSON text. */
  part: string;
  registry: SettingsRegistry;
  /** Each item's values here when the part was made. */
  local: Map<string, Values>;
  /** Items whose changes went in the part. */
  sent: Set<string>;
}

/**
 * The settings part for the next launch check or manual backup, or null when
 * this device doesn't sync: its switch is off, it isn't signed in, or the
 * registry can't be read.
 */
export async function prepareSettingsSync(config: SyncifyConfig): Promise<SettingsSync | null> {
  if (!config.settingsSyncEnabled) return null;
  if (!(await loadSession().catch(() => null))) return null;
  const registry = await loadRegistry();
  if (!registry) return null;

  const state = await loadState();
  const local = await readLocalValues(registry);
  await keepRestoredHere(state, local);
  const status = readSyncStatus();
  const off = new Set(config.settingsSyncOff);
  const waiting = new Set(status.choices.map((choice) => choice.id));
  // Changes wait while the day's budget is used up, and until the account's
  // copy has been read once, so nothing here overwrites a copy not yet seen.
  const sends = state.pulled && status.budgetDay !== utcDay(Date.now());

  const changes: Record<string, unknown> = {};
  const sent = new Set<string>();
  if (sends) {
    for (const item of registry.items) {
      const values = local.get(item.id);
      // An item with no settings here sends nothing: its settings going
      // missing never clears the account's copy.
      if (off.has(item.id) || waiting.has(item.id) || !values) continue;
      const size = measure(item, values);
      if (size > item.limit) {
        // Held here: it neither sends nor takes. Said once per size.
        if (state.heldSent[item.id] !== size) {
          changes[item.id] = { held: size };
          sent.add(item.id);
        }
        continue;
      }
      const base = state.base[item.id] ?? (isOnlyHere(state, item.id) ? {} : undefined);
      if (base === undefined) continue;
      const change = diffValues(item, values, base);
      if (change) {
        changes[item.id] = change;
        sent.add(item.id);
      }
    }
  }

  const part = JSON.stringify({
    since: state.since,
    ...(sent.size > 0 ? { changes } : {}),
    installed: [...local.keys()],
  });
  return { part, registry, local, sent };
}

// An item the account has no copy of: everything here is new to it.
function isOnlyHere(state: SyncState, id: string): boolean {
  const copy = state.account[id];
  return !copy || copy.off === true || copy.data === null;
}

// A restore whose settings stay on this device: they become what this
// device and the account agree on, so they aren't sent.
async function keepRestoredHere(state: SyncState, local: Map<string, Values>): Promise<void> {
  const restored = await readState<RestoredSettings>(RESTORED_SETTINGS_KEY).catch(() => undefined);
  if (!restored) return;
  if (!restored.share) {
    for (const id of restored.ids) {
      state.base[id] = local.get(id) ?? {};
      const copy = state.account[id];
      if (copy?.data) state.seen[id] = stableStringify(copy.data);
    }
    await saveState(state);
  }
  await deleteState(RESTORED_SETTINGS_KEY).catch(() => {});
}

// ─── The answer ─────────────────────────────────────────────────────────────

/** What a sync did that the person should hear about. */
export interface SyncOutcome {
  /** Names of the items whose new settings were written here. */
  arrived: string[];
  /** The first-sync choice is waiting. */
  choose: boolean;
}

const NOTHING: SyncOutcome = { arrived: [], choose: false };

/**
 * Takes the backup service's answer to a settings part: the account's
 * changes are written here, and what was sent becomes what this device and
 * the account agree on. `backups`: this Spotify account's backups, which
 * date this device's settings for the first-sync choice.
 */
export async function finishSettingsSync(
  sync: SettingsSync | null,
  answer: unknown,
  backups: SyncifyPayload[],
): Promise<SyncOutcome> {
  const parsed = sync ? parseAnswer(answer) : null;
  if (!sync || !parsed) return NOTHING;

  const { registry, local } = sync;
  const now = Date.now();
  const state = await loadState();
  const config = loadConfig();
  const off = new Set(config.settingsSyncOff);
  const status = readSyncStatus();
  const arrived: string[] = [];

  for (const [id, copy] of Object.entries(parsed.items)) state.account[id] = copy;
  state.since = parsed.version;
  state.pulled = true;

  // Deleted on another device: off here too, unless this device deleted it
  // and turned it back on since.
  const deletedOnAccount = new Set([
    ...Object.entries(parsed.items).flatMap(([id, copy]) => (copy.off ? [id] : [])),
    ...Object.entries(parsed.results).flatMap(([id, result]) => (result === "off" ? [id] : [])),
  ]);
  for (const id of deletedOnAccount) {
    if (state.deleted[id] !== undefined && !off.has(id)) continue;
    off.add(id);
    forget(state, id);
  }
  for (const [id, version] of Object.entries(state.deleted)) {
    if (version <= parsed.version) delete state.deleted[id];
  }

  const items = new Map(registry.items.map((item) => [item.id, item]));
  const choices: string[] = [];
  // Only items with settings here: one that isn't here takes the account's
  // copy once it is, and nothing is cleared for an item gone from here.
  for (const item of registry.items) {
    const values = local.get(item.id);
    if (off.has(item.id) || !values) continue;
    const result = sync.sent.has(item.id) ? parsed.results[item.id] : undefined;
    if (result === "held") {
      state.heldSent[item.id] = measure(item, values);
      continue;
    }
    if (measure(item, values) > item.limit) continue;
    delete state.heldSent[item.id];
    // Sent, but not taken this time: it goes again later.
    if (result !== undefined && result !== "saved") continue;

    const copy = state.account[item.id];
    if (!copy?.data || copy.off) continue;
    const accountValues = valuesOf(copy);
    const fingerprint = stableStringify(copy.data);
    const base = state.base[item.id];
    // Makes the account's copy this device's, and what both agree on. A
    // write that fails leaves both as they were, to try at the next sync.
    // `announce`: tell the person, even when this install sent the last change.
    const adopt = async (announce: boolean) => {
      if (!sameValues(item, values, accountValues)) {
        if (!(await take(registry, item, copy))) return;
        if (announce || !copy.mine) arrived.push(item.id);
      }
      state.base[item.id] = accountValues;
      state.seen[item.id] = fingerprint;
    };

    if (result === "saved") {
      // What was sent, merged with what other devices sent.
      await adopt(true);
    } else if (base === undefined) {
      // New on this device since its first sync: the account's copy, which
      // the person chose on their other devices. At the first sync, a copy
      // that differs waits for the person's choice.
      if (state.firstSyncDone || sameValues(item, values, accountValues)) await adopt(false);
      else choices.push(item.id);
    } else if (state.seen[item.id] !== fingerprint && sameValues(item, values, base)) {
      // Changed on the account and not here. Changed in both places, this
      // device's change goes next time and the newest wins key by key.
      await adopt(false);
    }
  }

  if (choices.length === 0) state.firstSyncDone = true;
  const names = await nameLocalItems([...local.keys()]);

  await saveState(state);
  if (off.size !== config.settingsSyncOff.length) saveConfig({ ...config, settingsSyncOff: [...off] });
  saveSyncStatus({
    ...describe(registry, state, local, names, parsed.bytes),
    choices: choices.flatMap((id) => {
      const named = names.get(id);
      const item = items.get(id);
      if (!named || !item) return [];
      return [
        {
          id,
          name: named.name,
          kind: named.kind,
          localAt: localChangedAt(item, local.get(id) ?? {}, backups, now),
          accountAt: changedAt(state.account[id]),
        },
      ];
    }),
    arrived: mergeArrived(status.arrived, arrived, names),
    budgetDay: parsed.budget === "used_up" ? utcDay(now) : null,
  });
  return { arrived: arrived.map((id) => names.get(id)?.name ?? id), choose: choices.length > 0 };
}

function mergeArrived(
  before: SettingsSyncStatus["arrived"],
  ids: string[],
  names: Map<string, NamedItem>,
): SettingsSyncStatus["arrived"] {
  if (ids.length === 0) return before;
  const all = [...new Set([...(before?.ids ?? []), ...ids])];
  const known = new Map(before ? before.ids.map((id, index) => [id, before.names[index]]) : []);
  return { ids: all, names: all.map((id) => names.get(id)?.name ?? known.get(id) ?? id), hidden: false };
}

// The backup service's answer, or null when it isn't one to take.
function parseAnswer(answer: unknown): {
  version: number;
  bytes: number;
  budget: "open" | "used_up";
  results: Record<string, string>;
  items: Record<string, AccountItem>;
} | null {
  if (!isRecord(answer) || answer.status !== "ok") return null;
  if (!Number.isSafeInteger(answer.version) || typeof answer.bytes !== "number") return null;
  const items: Record<string, AccountItem> = {};
  for (const raw of Array.isArray(answer.items) ? answer.items : []) {
    if (!isRecord(raw) || typeof raw.id !== "string" || typeof raw.size !== "number") continue;
    const data = isRecord(raw.data) ? (raw.data as AccountItem["data"]) : null;
    items[raw.id] = {
      data,
      size: raw.size,
      ...(typeof raw.held === "number" ? { held: raw.held } : {}),
      ...(raw.off === true ? { off: true } : {}),
      ...(raw.mine === true ? { mine: true } : {}),
    };
  }
  const results: Record<string, string> = {};
  if (isRecord(answer.results)) {
    for (const [id, result] of Object.entries(answer.results)) if (typeof result === "string") results[id] = result;
  }
  return {
    version: answer.version as number,
    bytes: answer.bytes,
    budget: answer.budget === "used_up" ? "used_up" : "open",
    results,
    items,
  };
}

// ─── First sync ─────────────────────────────────────────────────────────────

/**
 * Keep these: each item takes the copy picked for it. This Spotify's copy
 * goes to the other devices with the next launch check or backup; the other
 * devices' copy is written here and waits for a reload.
 */
export async function chooseFirstSync(picks: Record<string, "here" | "account">): Promise<void> {
  const registry = await loadRegistry();
  if (!registry) return;
  const state = await loadState();
  const status = readSyncStatus();
  const taken: string[] = [];
  for (const [id, pick] of Object.entries(picks)) {
    const item = registry.items.find((entry) => entry.id === id);
    const copy = state.account[id];
    if (!item || !copy?.data || copy.off) continue;
    if (pick === "account" && (await take(registry, item, copy))) taken.push(id);
    state.base[id] = valuesOf(copy);
    state.seen[id] = stableStringify(copy.data);
  }
  state.firstSyncDone = true;
  await saveState(state);

  const names = new Map(
    status.choices.map((choice): [string, NamedItem] => [choice.id, { id: choice.id, key: "", name: choice.name, kind: choice.kind }]),
  );
  saveSyncStatus({ ...status, choices: [], arrived: mergeArrived(status.arrived, taken, names) });
}

// When this device's copy last changed. Sort-Play-like records carry their
// own time; otherwise the oldest of this Spotify account's latest backups
// that hold the same settings, or now when the latest one doesn't.
function localChangedAt(item: RegistryItem, values: Values, backups: SyncifyPayload[], now: number): number {
  if (item.storage.type === "indexedDB" && item.storage.valueField) {
    const times = Object.values(values).flatMap((record) =>
      isRecord(record) && typeof record.ts === "number" ? [record.ts] : [],
    );
    if (times.length > 0) return Math.max(...times);
  }
  let at = now;
  for (const backup of backups) {
    const saved = backup.extension_settings?.[item.id];
    if (!saved || saved.storage !== item.storage.type) break;
    if (!sameValues(item, values, toValues(item, saved.values))) break;
    const time = Date.parse(backup.metadata.last_sync_datetime);
    if (Number.isNaN(time)) break;
    at = time;
  }
  return at;
}

// When the account's copy last changed: its newest key.
function changedAt(copy: AccountItem | undefined): number {
  return Math.max(0, ...Object.values(copy?.data ?? {}).map((entry) => entry.t));
}

// ─── Delete synced copy ─────────────────────────────────────────────────────

/**
 * Deletes the account's copy of an item: it turns off on every device,
 * this one now and the others at their next launch. Each keeps its own
 * settings.
 */
export async function deleteSyncedCopy(config: SyncifyConfig, id: string): Promise<void> {
  if (!config.workerUrl) throw new Error("Syncify backup service is not configured.");
  const { version } = await deleteSettingsCopy(config.workerUrl, await getUserIdentity(), id);
  const state = await loadState();
  state.deleted[id] = version;
  state.account[id] = { data: null, size: 0, off: true };
  forget(state, id);
  await saveState(state);

  const current = loadConfig();
  if (!current.settingsSyncOff.includes(id)) {
    saveConfig({ ...current, settingsSyncOff: [...current.settingsSyncOff, id] });
  }
  const status = readSyncStatus();
  saveSyncStatus({ ...status, items: status.items.map((item) => (item.id === id ? { ...item, hold: null } : item)) });
}

// ─── The Items list ─────────────────────────────────────────────────────────

/** This device's items with extension settings, read again, problems first then by name. */
export async function loadSyncItems(): Promise<SyncItem[]> {
  const registry = await loadRegistry();
  if (!registry) return readSyncStatus().items;
  const [state, local] = await Promise.all([loadState(), readLocalValues(registry)]);
  const names = await nameLocalItems([...local.keys()]);
  const status = readSyncStatus();
  const described = describe(registry, state, local, names, status.bytes);
  saveSyncStatus({ ...status, ...described });
  return described.items;
}

/** Problems first, then by name. */
export function sortSyncItems(items: SyncItem[]): SyncItem[] {
  return [...items].sort((a, b) => Number(b.hold !== null) - Number(a.hold !== null) || a.name.localeCompare(b.name));
}

function describe(
  registry: SettingsRegistry,
  state: SyncState,
  local: Map<string, Values>,
  names: Map<string, NamedItem>,
  bytes: number,
): Pick<SettingsSyncStatus, "bytes" | "limit" | "items"> {
  const items = registry.items.flatMap((item): SyncItem[] => {
    const values = local.get(item.id);
    if (!values) return [];
    const size = measure(item, values);
    const copy = state.account[item.id];
    const hold: ItemHold | null =
      size > item.limit
        ? { size, reason: "too_big" }
        : copy?.held !== undefined && !copy.off
          ? { size: copy.held, reason: copy.held > item.limit ? "too_big" : "account_full" }
          : null;
    const named = names.get(item.id) ?? { id: item.id, key: "", name: item.id, kind: "extension" as const };
    const accountSize = copy && !copy.off ? copy.size : 0;
    return [{ ...named, size, limit: item.limit, list: Object.keys(item.lists).length > 0, accountSize, hold }];
  });
  return { bytes, limit: registry.accountLimit, items: sortSyncItems(items) };
}

// ─── Values ─────────────────────────────────────────────────────────────────

// Each registry item's settings here as they're sent, items without any left out.
async function readLocalValues(registry: SettingsRegistry): Promise<Map<string, Values>> {
  const { settings } = await readLocalSettings(registry);
  const local = new Map<string, Values>();
  for (const item of registry.items) {
    const saved = settings[item.id];
    if (saved) local.set(item.id, toValues(item, saved.values));
  }
  return local;
}

// Stored values as they're sent: a list key's value is its list.
function toValues(item: RegistryItem, stored: Record<string, unknown>): Values {
  const values: Values = {};
  for (const [key, value] of Object.entries(stored)) {
    if (!isSettingKey(item, key)) continue;
    values[key] = item.lists[key] ? (readList(item, key, value) ?? value) : value;
  }
  return values;
}

// The list a list key holds, or null when it doesn't hold one.
function readList(item: RegistryItem, key: string, stored: unknown): unknown {
  const rule = item.lists[key];
  let value = stored;
  if (item.storage.type === "localStorage") {
    if (typeof stored !== "string") return null;
    try {
      value = JSON.parse(stored);
    } catch {
      return null;
    }
  } else if (item.storage.valueField && isRecord(stored)) {
    value = stored[item.storage.valueField];
  }
  return isListOf(rule, value) ? value : null;
}

function isListOf(rule: RegistryItem["lists"][string] | undefined, value: unknown): boolean {
  if (!rule) return false;
  return rule.merge === "object" ? isRecord(value) : Array.isArray(value);
}

// The account's values, stored the way this device stores them. Removed keys are left out.
function storedValues(item: RegistryItem, values: Values, current: Record<string, unknown>): Record<string, unknown> {
  const stored: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(values)) {
    if (!isSettingKey(item, key)) continue;
    const list = item.lists[key] && isListOf(item.lists[key], value);
    if (item.storage.type === "localStorage") {
      if (list) stored[key] = JSON.stringify(value);
      else if (typeof value === "string") stored[key] = value;
    } else if (list && item.storage.valueField) {
      stored[key] = { ...(isRecord(current[key]) ? current[key] : {}), [item.storage.valueField]: value };
    } else {
      stored[key] = value;
    }
  }
  return stored;
}

// Writes the account's copy of an item here. False when there's nothing to
// write or the write failed.
async function take(registry: SettingsRegistry, item: RegistryItem, copy: AccountItem): Promise<boolean> {
  const { settings } = await readLocalSettings({ ...registry, items: [item] });
  const current = settings[item.id]?.values ?? {};
  const values = storedValues(item, valuesOf(copy), current);
  if (Object.keys(values).length === 0) return false;
  const saved: SyncifyExtensionSettings = { [item.id]: { storage: item.storage.type, values } };
  try {
    await writeSettings(registry, saved, [item.id]);
    return true;
  } catch {
    return false;
  }
}

function valuesOf(copy: AccountItem): Values {
  const values: Values = {};
  for (const [key, entry] of Object.entries(copy.data ?? {})) {
    if (isRecord(entry) && entry.v !== null && entry.v !== undefined) values[key] = entry.v;
  }
  return values;
}

/** The size the backup service would store these values at. */
function measure(item: RegistryItem, values: Values): number {
  const stored: Record<string, { v: unknown; t: number }> = {};
  for (const [key, value] of Object.entries(values)) stored[key] = { v: value, t: STORED_TIME };
  return Object.keys(stored).length === 0 ? 0 : new TextEncoder().encode(JSON.stringify(stored)).byteLength;
}

function sameValues(item: RegistryItem, a: Values, b: Values): boolean {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  return [...keys].every((key) => sameValue(item, key, a[key], b[key]));
}

// IndexedDB records can carry fields beside the value, such as when they
// were saved; only the value counts as a change.
function sameValue(item: RegistryItem, key: string, a: unknown, b: unknown): boolean {
  if (a === undefined || b === undefined) return a === b;
  const field = item.storage.type === "indexedDB" && !item.lists[key] ? item.storage.valueField : undefined;
  const value = (record: unknown) => (field && isRecord(record) ? record[field] : record);
  return stableStringify(value(a)) === stableStringify(value(b));
}

/**
 * What changed here since the last agreement: keys whose newest value wins,
 * null for a removed one, and list members put and removed. Null when nothing did.
 */
function diffValues(item: RegistryItem, values: Values, base: Values): Record<string, unknown> | null {
  const set: Record<string, unknown> = {};
  const lists: Record<string, { put?: unknown; remove?: (string | number)[] }> = {};
  for (const key of new Set([...Object.keys(values), ...Object.keys(base)])) {
    const now = values[key];
    const before = base[key];
    if (sameValue(item, key, now, before)) continue;
    const rule = item.lists[key];
    const members = rule && now !== undefined ? diffList(rule, now, before) : null;
    if (members) lists[key] = members;
    else set[key] = now === undefined ? null : now;
  }
  const change = {
    ...(Object.keys(set).length > 0 ? { set } : {}),
    ...(Object.keys(lists).length > 0 ? { lists } : {}),
  };
  return Object.keys(change).length > 0 ? change : null;
}

// A list's members put and removed, or null when it can't be sent as members.
function diffList(
  rule: RegistryItem["lists"][string],
  now: unknown,
  before: unknown,
): { put?: unknown; remove?: (string | number)[] } | null {
  if (!isListOf(rule, now)) return null;
  const was = isListOf(rule, before) ? before : rule.merge === "object" ? {} : [];
  if (rule.merge === "object") {
    const after = now as Record<string, unknown>;
    const earlier = was as Record<string, unknown>;
    const put = Object.fromEntries(
      Object.entries(after).filter(([name, value]) => stableStringify(value) !== stableStringify(earlier[name])),
    );
    const remove = Object.keys(earlier).filter((name) => !(name in after));
    return { ...(Object.keys(put).length > 0 ? { put } : {}), ...(remove.length > 0 ? { remove } : {}) };
  }
  const idOf = (member: unknown) => {
    const id = isRecord(member) ? member[rule.id] : undefined;
    return typeof id === "string" || typeof id === "number" ? id : null;
  };
  const after = now as unknown[];
  // A member without an id can't merge: the whole list goes as a value.
  if (after.some((member) => idOf(member) === null)) return null;
  const earlier = new Map((was as unknown[]).flatMap((member) => (idOf(member) === null ? [] : [[JSON.stringify(idOf(member)), member]])));
  const put = after.filter((member) => stableStringify(member) !== stableStringify(earlier.get(JSON.stringify(idOf(member)))));
  const kept = new Set(after.map((member) => JSON.stringify(idOf(member))));
  const remove = [...earlier.entries()].filter(([id]) => !kept.has(id)).flatMap(([, member]) => idOf(member) ?? []);
  return { ...(put.length > 0 ? { put } : {}), ...(remove.length > 0 ? { remove } : {}) };
}

// ─── Storage ────────────────────────────────────────────────────────────────

async function loadState(): Promise<SyncState> {
  const stored = await readState<Partial<SyncState>>(STATE_KEY).catch(() => undefined);
  return { ...structuredClone(EMPTY_STATE), ...(isRecord(stored) ? stored : {}) };
}

function saveState(state: SyncState): Promise<void> {
  return writeState(STATE_KEY, state);
}

// The item starts over: it's sent whole when it syncs again.
function forget(state: SyncState, id: string): void {
  delete state.base[id];
  delete state.seen[id];
  delete state.heldSent[id];
}

function utcDay(now: number): string {
  return new Date(now).toISOString().slice(0, 10);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
