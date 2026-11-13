import { useRef, type KeyboardEvent, type ReactNode } from "react";

export interface TabItem<Id extends string> {
  id: Id;
  label: string;
  /** After the label: a count, a check or a mark. */
  status?: ReactNode;
}

export interface TabsProps<Id extends string> {
  tabs: readonly TabItem<Id>[];
  selected: NoInfer<Id>;
  onSelect(id: NoInfer<Id>): void;
  /** Ties each tab to its panel; the same value goes to every TabPanel. */
  idBase: string;
  label: string;
}

export const tabId = (idBase: string, id: string) => `${idBase}-tab-${id}`;
export const panelId = (idBase: string, id: string) => `${idBase}-panel-${id}`;

/**
 * Tabs that switch a panel. Arrow keys, Home and End move between them and
 * open the one they land on; Tab moves into the open panel.
 */
export function Tabs<Id extends string>(props: TabsProps<Id>) {
  const listRef = useRef<HTMLDivElement>(null);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const count = props.tabs.length;
    const index = props.tabs.findIndex((tab) => tab.id === props.selected);
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % count
        : event.key === "ArrowLeft"
          ? (index - 1 + count) % count
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? count - 1
              : null;
    if (next === null) return;
    event.preventDefault();
    props.onSelect(props.tabs[next].id);
    listRef.current?.querySelectorAll<HTMLElement>('[role="tab"]')[next]?.focus();
  }

  return (
    <div
      className="syncify-tabs"
      role="tablist"
      aria-label={props.label}
      ref={listRef}
      onKeyDown={onKeyDown}
    >
      {props.tabs.map((tab) => {
        const selected = tab.id === props.selected;
        return (
          <button
            className="syncify-tab"
            id={tabId(props.idBase, tab.id)}
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={panelId(props.idBase, tab.id)}
            tabIndex={selected ? 0 : -1}
            onClick={() => props.onSelect(tab.id)}
          >
            <span className="syncify-cap">{tab.label}</span>
            {tab.status}
          </button>
        );
      })}
    </div>
  );
}

/**
 * The open tab's content. It scrolls on its own under the tabs; its actions,
 * when it has any, stay in view below it.
 */
export function TabPanel(props: {
  idBase: string;
  id: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div
      className="syncify-tab-panel"
      id={panelId(props.idBase, props.id)}
      role="tabpanel"
      aria-labelledby={tabId(props.idBase, props.id)}
    >
      <div className="syncify-tab-scroll" tabIndex={0}>
        {props.children}
      </div>
      {props.actions ? <div className="syncify-tab-actions">{props.actions}</div> : null}
    </div>
  );
}
