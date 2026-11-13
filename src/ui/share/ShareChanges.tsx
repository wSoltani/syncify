import type { ItemChange, ItemType, ManualItem, RestorePreview } from "../../core/restorePreview";
import { isWarning, type SourceCheck, type SourceChecks } from "../../core/sourceChecks";
import { Dot } from "../kit";
import { ChevronIcon, WarningIcon } from "../legacyIcons";

const CHANGE_MARKS: Record<ItemChange, { mark: string; label: string }> = {
  added: { mark: "+", label: "Added" },
  removed: { mark: "−", label: "Removed" },
  unchanged: { mark: "=", label: "Unchanged" },
};
export const ITEM_GROUPS: [ItemType, string][] = [
  ["extension", "Extensions"],
  ["theme", "Themes"],
  ["snippet", "Snippets"],
];
const MANUAL_LABELS: Record<ManualItem["type"], string> = {
  extension: "extension",
  custom_app: "custom app",
  theme: "theme",
};

/**
 * What a restore changes on this device: count chips, then the items grouped
 * by type behind "Show changes".
 */
export function RestoreChanges(props: {
  preview: RestorePreview;
  checks: SourceChecks;
  /** Items left off unless turned on, and those turned on. */
  off: Set<string>;
  /** Items left off that can't be turned on. */
  fixed?: Set<string>;
  /** The switch that turns an item on. */
  switchLabel?: string;
  allowed: Set<string>;
  /** The backup came from an install this Spotify account hasn't approved. */
  unapproved: boolean;
  onAllow(key: string, on: boolean): void;
  expanded: boolean;
  onToggle(): void;
}) {
  const { items, counts, manual, theme } = props.preview;
  const offCount = [...props.off].filter((key) => !props.allowed.has(key)).length;

  return (
    <>
      <div className="syncify-chips" aria-label="What changes on this device">
        {counts.added ? (
          <span className="syncify-chip" data-change="added">
            +{counts.added} added
          </span>
        ) : null}
        {counts.removed ? (
          <span className="syncify-chip" data-change="removed">
            −{counts.removed} removed
          </span>
        ) : null}
        {counts.unchanged ? (
          <span className="syncify-chip">{counts.unchanged} unchanged</span>
        ) : null}
        {manual.length ? (
          <span className="syncify-chip">
            {manual.length} to add manually
          </span>
        ) : null}
        {theme && (!props.off.has(theme.key) || props.allowed.has(theme.key)) ? (
          <span className="syncify-chip">Switches your theme to {theme.name}</span>
        ) : null}
        {offCount ? (
          <span className="syncify-chip" data-change="off">
            {offCount} off
          </span>
        ) : null}
      </div>

      {items.length || manual.length ? (
        <button
          className="syncify-text-button syncify-disclosure"
          type="button"
          aria-expanded={props.expanded}
          aria-controls="syncify-restore-changes"
          onClick={props.onToggle}
        >
          {props.expanded ? "Hide changes" : "Show changes"}
          <ChevronIcon />
        </button>
      ) : null}

      {props.expanded ? (
        <div className="syncify-changes" id="syncify-restore-changes">
          {ITEM_GROUPS.map(([type, title]) => {
            const group = items.filter((item) => item.type === type);
            if (group.length === 0) return null;

            return (
              <section key={type} aria-label={title}>
                <h5 className="syncify-change-group">{title}</h5>
                <ul className="syncify-change-list">
                  {group.map((item) => (
                    <li className="syncify-change" key={item.key}>
                      <span
                        className="syncify-mark"
                        data-change={item.change}
                        role="img"
                        aria-label={CHANGE_MARKS[item.change].label}
                      >
                        {CHANGE_MARKS[item.change].mark}
                      </span>
                      <span className="syncify-change-name">
                        {item.name}
                        {item.repo ? (
                          <span className="syncify-change-detail">
                            <Dot />
                            {item.repo}
                          </span>
                        ) : null}
                      </span>
                      {props.checks.has(item.key) ? (
                        <SourceLabel check={props.checks.get(item.key)!} />
                      ) : props.unapproved && props.off.has(item.key) ? (
                        <span className="syncify-source" data-warning="true">
                          <WarningIcon />
                          Not approved
                        </span>
                      ) : null}
                      {props.off.has(item.key) && !props.fixed?.has(item.key) ? (
                        <label className="syncify-item-switch">
                          <input
                            type="checkbox"
                            checked={props.allowed.has(item.key)}
                            onChange={(event) =>
                              props.onAllow(item.key, event.currentTarget.checked)
                            }
                          />
                          {props.switchLabel ?? "Restore"}
                        </label>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
          {manual.length ? (
            <section aria-label="Add manually">
              <h5 className="syncify-change-group">Add manually</h5>
              <ul className="syncify-change-list">
                {manual.map((item) => (
                  <li className="syncify-change" key={`${item.type}:${item.name}`}>
                    <span className="syncify-mark" aria-hidden="true" />
                    <span className="syncify-change-name">
                      {item.name}
                      <span className="syncify-change-detail">
                        <Dot />
                        {MANUAL_LABELS[item.type]}
                        {item.scheme ? `, ${item.scheme}` : ""}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

const SOURCE_TITLES: Record<SourceCheck["kind"], string> = {
  host: "Loads from outside GitHub",
  repo: "Its code is in a different repo than the one it names",
  blocked: "On Marketplace's block list",
  catalog: "Not in Marketplace's catalog",
  unchecked: "GitHub couldn't be reached to check it",
  custom: "A snippet made in Marketplace, not from its list",
};

/** A small label after an item: a muted warning, or a plain note. */
export function SourceLabel(props: { check: SourceCheck }) {
  const { check } = props;
  const warning = isWarning(check);
  const label =
    check.kind === "host"
      ? `Code from ${check.host}`
      : check.kind === "repo"
        ? `Code from ${check.repo}`
        : check.kind === "blocked"
          ? "Blocked by Marketplace"
          : check.kind === "catalog"
            ? "Not in Marketplace"
            : check.kind === "unchecked"
              ? "Not checked"
              : "Custom";

  return (
    <span
      className="syncify-source"
      data-warning={warning ? "true" : "false"}
      title={SOURCE_TITLES[check.kind]}
    >
      {warning ? <WarningIcon /> : null}
      {label}
    </span>
  );
}
