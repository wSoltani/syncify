import type { ReactNode } from "react";

/** A small uppercase label over a part of a tab, with something on its right. */
export function SectionHeader(props: {
  title: ReactNode;
  end?: ReactNode;
  id?: string;
  /** Takes focus when what it heads opens in place of what was there. */
  focusable?: boolean;
}) {
  return (
    <div className="syncify-section-label">
      <h3
        className="syncify-section-label-title"
        id={props.id}
        tabIndex={props.focusable ? -1 : undefined}
      >
        {props.title}
      </h3>
      {props.end}
    </div>
  );
}
