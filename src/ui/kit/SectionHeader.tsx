import type { ReactNode } from "react";

/** A small uppercase label over a part of a tab, with something on its right. */
export function SectionHeader(props: { title: ReactNode; end?: ReactNode; id?: string }) {
  return (
    <div className="syncify-section-label">
      <h3 className="syncify-section-label-title" id={props.id}>
        {props.title}
      </h3>
      {props.end}
    </div>
  );
}
