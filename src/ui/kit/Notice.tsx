import type { ReactNode } from "react";
import { Mark, type Tone } from "./Mark";

export interface NoticeProps {
  tone: Tone;
  children: ReactNode;
  /** Up to two buttons, on the right. */
  actions?: ReactNode;
  /**
   * Announced as it appears: an error always is. Set for a result that
   * appears after an action.
   */
  live?: boolean;
}

/** Something to read next to what it's about, with up to two actions. */
export function Notice(props: NoticeProps) {
  const role = props.tone === "error" ? "alert" : props.live ? "status" : undefined;
  return (
    <div className="syncify-notice" data-tone={props.tone} role={role}>
      <span className="syncify-notice-body">
        <span className="syncify-notice-mark">
          <Mark tone={props.tone} />
        </span>
        <span className="syncify-notice-text">{props.children}</span>
      </span>
      {props.actions ? <span className="syncify-notice-actions">{props.actions}</span> : null}
    </div>
  );
}
