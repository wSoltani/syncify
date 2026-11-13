import type { ReactNode } from "react";
import { ChevronRightIcon } from "./icons";

/** A list of the person's things, one ListRow each. */
export function List(props: {
  children: ReactNode;
  label?: string;
  /** Each row's end moves under its name when the list is too narrow for both. */
  wrap?: boolean;
  /** Its rows are still loading. */
  busy?: boolean;
}) {
  return (
    <ul
      className="syncify-list"
      aria-label={props.label}
      aria-busy={props.busy ? "true" : undefined}
      data-wrap={props.wrap ? "true" : undefined}
    >
      {props.children}
    </ul>
  );
}

/** The dashed line that sets the rows after it apart, like the safety copy. */
export function ListDivider() {
  return <li className="syncify-list-divider" role="presentation" />;
}

interface ListRowProps {
  name: ReactNode;
  /** Right after the name, on its cap middle, such as the safety copy's shield. */
  nameMark?: ReactNode;
  /** The facts under the name. A row without them is one line tall. */
  meta?: ReactNode;
  /** Before the name, such as a kind pip. */
  leading?: ReactNode;
  /** At the row's end: a status, or one or two actions and a menu. */
  end?: ReactNode;
  /** Makes the whole row a button that opens something, with a chevron. */
  onOpen?(): void;
  /** What opening the row does, read out in place of its text. */
  openLabel?: string;
  disabled?: boolean;
  /** So focus can come back to the row after what it opened closes. */
  id?: string;
  /** The name is a plain sentence, such as what an empty list says. */
  plain?: boolean;
}

export function ListRow(props: ListRowProps) {
  // Grid cells, so a leading pip sits on the name's line and the end and the
  // chevron center on the whole row.
  const content = (
    <>
      {props.leading ? <span className="syncify-row-leading">{props.leading}</span> : null}
      <span className="syncify-row-name">
        <span className="syncify-row-name-text">{props.name}</span>
        {props.nameMark}
      </span>
      {props.meta ? <span className="syncify-row-meta">{props.meta}</span> : null}
      {props.end ? <span className="syncify-row-end">{props.end}</span> : null}
    </>
  );
  const lines = props.meta ? "2" : "1";

  return (
    <li className="syncify-list-item">
      {props.onOpen ? (
        <button
          className="syncify-row"
          id={props.id}
          data-lines={lines}
          type="button"
          aria-label={props.openLabel}
          onClick={props.onOpen}
          disabled={props.disabled}
        >
          {content}
          <ChevronRightIcon className="syncify-row-chevron" />
        </button>
      ) : (
        <div className="syncify-row" id={props.id} data-lines={lines} data-plain={props.plain ? "true" : undefined}>
          {content}
        </div>
      )}
    </li>
  );
}
