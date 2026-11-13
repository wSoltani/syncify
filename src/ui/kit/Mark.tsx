import type { ReactNode } from "react";

/** info is green, warning amber, error red. */
export type Tone = "info" | "warning" | "error";

export interface MarkProps {
  tone: Tone;
  /** A large mark holds an icon; a small one is a plain square. */
  icon?: ReactNode;
  /** Read out when the mark stands alone, like a tab's status. */
  label?: string;
}

/** A small square in a tone's color, or a larger one around an icon. */
export function Mark(props: MarkProps) {
  return (
    <span
      className="syncify-mark-square"
      data-tone={props.tone}
      data-size={props.icon ? "large" : "small"}
      role={props.label ? "img" : undefined}
      aria-label={props.label}
      aria-hidden={props.label ? undefined : "true"}
    >
      {props.icon}
    </span>
  );
}

/** A count after a tab's name, like how many codes there are. */
export function Badge(props: { count: number; label: string }) {
  return (
    <span className="syncify-badge" role="img" aria-label={props.label}>
      <span className="syncify-cap">{props.count}</span>
    </span>
  );
}
