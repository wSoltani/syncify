import type { ReactNode } from "react";

interface SwitchProps {
  checked: boolean;
  onChange(checked: boolean): void;
  disabled?: boolean;
  /** Read out when the row around it names it, like a list row's item. */
  label?: string;
}

/**
 * A switch takes effect at once. In a SwitchRow, which labels it, or at a
 * list row's end with `label`.
 */
export function Switch(props: SwitchProps) {
  return (
    <input
      className="syncify-switch-control"
      type="checkbox"
      role="switch"
      aria-label={props.label}
      checked={props.checked}
      onChange={(event) => props.onChange(event.currentTarget.checked)}
      disabled={props.disabled}
    />
  );
}

interface SwitchRowProps extends Omit<SwitchProps, "label"> {
  /** Names the thing that is on, never the action. */
  label: ReactNode;
}

/** A setting row whose whole width turns the switch on and off. */
export function SwitchRow(props: SwitchRowProps) {
  const { label, ...control } = props;
  return (
    <label className="syncify-setting-row" data-disabled={props.disabled ? "true" : undefined}>
      <span className="syncify-setting-row-label">{label}</span>
      <Switch {...control} />
    </label>
  );
}
