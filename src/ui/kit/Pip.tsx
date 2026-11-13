/** Syncify's kinds, each with its own color. */
export type Kind = "extension" | "theme" | "snippet" | "app";

/** A small square in a kind's color, before an item's name. */
export function Pip(props: { kind: Kind }) {
  return <span className="syncify-pip-square" data-kind={props.kind} aria-hidden="true" />;
}
