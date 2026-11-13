import type { ButtonHTMLAttributes } from "react";

export interface KeyButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "children"> {
  /** The keys, like "Ctrl+Alt+S", or what to press while recording. */
  keys: string;
  recording: boolean;
}

/** Shows a keyboard shortcut like a key. Pressing it records a new one. */
export function KeyButton(props: KeyButtonProps) {
  const { keys, recording, ...rest } = props;
  return (
    <button
      className="syncify-keycap"
      type="button"
      data-recording={recording ? "true" : undefined}
      {...rest}
    >
      <span className="syncify-cap">{keys}</span>
    </button>
  );
}
