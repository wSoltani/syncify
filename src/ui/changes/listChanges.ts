import type { ItemType, ManualItem, RestorePreview } from "../../core/restorePreview";
import { isWarning, type SourceCheck, type SourceChecks } from "../../core/sourceChecks";
import { joinNames } from "../format";

/** Colored text at a change row's end. */
export type ChangeLabel = "Adds" | "Updates" | "Removes";

export interface ItemRow {
  key: string;
  name: string;
  type: ItemType;
  /** What Syncify found about where it loads from, or that it isn't approved. */
  note: string | null;
}

export interface ChangeRow extends ItemRow {
  change: ChangeLabel;
  /** Left off unless turned on: a warning, a check that couldn't run, or not approved. */
  optional: boolean;
  /** Left off for good: there's nothing to turn on. */
  fixed: boolean;
  /** It goes into this restore. */
  included: boolean;
}

/** Which changes are left off, and which of those were turned on. */
export interface ChangeChoices {
  optional: ReadonlySet<string>;
  allowed: ReadonlySet<string>;
  /** Optional items left off for good: snippets Marketplace's list no longer has. */
  fixed?: ReadonlySet<string>;
  /** The backup came from an install this Spotify account hasn't approved. */
  unapproved?: boolean;
  /** What the warnings ask before: "Restore it only if you trust it." */
  verb?: "Restore" | "Load";
}

export interface ChangeList {
  /** Adds, then Updates, then Removes, each by name. */
  changes: ChangeRow[];
  /** Folded into "N more stay the same". */
  unchanged: ItemRow[];
  /** In Spicetify's config: added in a terminal afterwards. */
  manual: ManualItem[];
  /** One sentence per kind of warning, naming the items, then what stays off for good. */
  warnings: string[];
  /** How many changes it makes. */
  count: number;
}

const CHANGE_ORDER: Record<ChangeLabel, number> = { Adds: 0, Updates: 1, Removes: 2 };
const WARNING_ORDER: SourceCheck["kind"][] = ["blocked", "host", "repo", "catalog", "unchecked"];

/**
 * What a restore or a share code changes on this device, for its preview:
 * changes first, the rest folded, and every warning written out.
 */
export function listChanges(preview: RestorePreview, checks: SourceChecks, choices: ChangeChoices): ChangeList {
  const { optional, allowed } = choices;
  const fixed = choices.fixed ?? new Set<string>();
  const changes: ChangeRow[] = [];
  const unchanged: ItemRow[] = [];

  for (const item of preview.items) {
    const check = checks.get(item.key);
    const isOptional = optional.has(item.key) || fixed.has(item.key);
    const row: ItemRow = {
      key: item.key,
      name: item.name,
      type: item.type,
      note: check
        ? describeCheck(check)
        : fixed.has(item.key)
          ? "Not in Marketplace's list"
          : choices.unapproved && isOptional
            ? "Not approved"
            : null,
    };
    const change: ChangeLabel | null =
      item.change === "added"
        ? "Adds"
        : item.change === "removed"
          ? "Removes"
          : item.isNew
            ? "Updates"
            : null;

    if (change) {
      const isFixed = fixed.has(item.key);
      changes.push({
        ...row,
        change,
        optional: isOptional,
        fixed: isFixed,
        included: !isOptional || (!isFixed && allowed.has(item.key)),
      });
    } else {
      unchanged.push(row);
    }
  }

  // The preview keeps its name order inside each kind of change.
  changes.sort((a, b) => CHANGE_ORDER[a.change] - CHANGE_ORDER[b.change]);
  return {
    changes,
    unchanged,
    manual: preview.manual,
    warnings: [...describeWarnings(changes, checks, choices.verb ?? "Restore"), ...describeFixed(changes)],
    count: changes.filter((row) => row.included).length,
  };
}

/** "Restore 4 changes", "Load 1 change" */
export function changesLabel(verb: string, count: number): string {
  if (count === 0) return verb;
  return count === 1 ? `${verb} 1 change` : `${verb} ${count} changes`;
}

/** A short fact under an item's name. */
export function describeCheck(check: SourceCheck): string {
  switch (check.kind) {
    case "host":
      return `Code from ${check.host}`;
    case "repo":
      return `Code from ${check.repo}`;
    case "blocked":
      return "Blocked by Marketplace";
    case "catalog":
      return "Not in Marketplace";
    case "unchecked":
      return "Not checked";
    case "custom":
      return "Custom";
  }
}

/** The changes each kind of warning is about, written out once per kind. */
function describeWarnings(changes: ChangeRow[], checks: SourceChecks, verb: string): string[] {
  const byKind = new Map<SourceCheck["kind"], string[]>();
  for (const row of changes) {
    if (row.change === "Removes" || row.fixed) continue;
    const check = checks.get(row.key);
    if (!check || (!isWarning(check) && check.kind !== "unchecked")) continue;
    byKind.set(check.kind, [...(byKind.get(check.kind) ?? []), row.name]);
  }

  return WARNING_ORDER.flatMap((kind) => {
    const names = byKind.get(kind);
    return names ? [warningText(kind, names, verb)] : [];
  });
}

/** Snippets that can't be loaded, and stay off. */
function describeFixed(changes: ChangeRow[]): string[] {
  const names = changes.filter((row) => row.fixed).map((row) => row.name);
  if (names.length === 0) return [];
  return [
    names.length === 1
      ? `${joinNames(names)} isn't in Marketplace's list anymore, so it stays off.`
      : `${joinNames(names)} aren't in Marketplace's list anymore, so they stay off.`,
  ];
}

function warningText(kind: SourceCheck["kind"], names: string[], verb: string): string {
  const one = names.length === 1;
  const who = joinNames(names);
  const trust = one ? `${verb} it only if you trust it.` : `${verb} them only if you trust them.`;
  switch (kind) {
    case "blocked":
      return `${who} ${one ? "is" : "are"} on Marketplace's block list. ${trust}`;
    case "host":
      return `${who} ${one ? "loads from a site" : "load from sites"} outside GitHub. ${trust}`;
    case "repo":
      return one
        ? `${who} loads its code from a different repo than the one it names. ${trust}`
        : `${who} load their code from different repos than the ones they name. ${trust}`;
    case "catalog":
      return `${who} ${one ? "isn't" : "aren't"} in Marketplace's catalog. ${trust}`;
    default:
      return `GitHub couldn't be reached to check ${who}. ${trust}`;
  }
}
