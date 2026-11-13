import { Fragment, type ReactNode } from "react";
import { classNames } from "./classNames";

/** The dot between facts: drawn, never a typed character. */
function Dot() {
  return (
    <>
      <span className="syncify-dot" aria-hidden="true" />
      <span className="syncify-visually-hidden">, </span>
    </>
  );
}

type MetaPart = ReactNode | null | undefined | false;

/** Facts with a drawn dot between each; empty ones are left out. */
export function Meta(props: { parts: MetaPart[]; className?: string }) {
  const shown = props.parts.filter(
    (part): part is Exclude<MetaPart, null | undefined | false> =>
      part !== null && part !== undefined && part !== false && part !== "",
  );
  return (
    <span className={classNames("syncify-meta", props.className)}>
      {shown.map((part, index) => (
        <Fragment key={index}>
          {index > 0 ? <Dot /> : null}
          <span className="syncify-meta-part">{part}</span>
        </Fragment>
      ))}
    </span>
  );
}
