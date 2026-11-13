import type { ReactNode } from "react";

interface SwitchProps {
  checked: boolean;
  onChange(checked: boolean): void;
  disabled?: boolean;
}

/** A switch takes effect at once. Use it inside a SwitchRow, which labels it. */
function Switch(props: SwitchProps) {
  return (
    <input
      className="syncify-switch-control"
      type="checkbox"
      role="switch"
      checked={props.checked}
      onChange={(event) => props.onChange(event.currentTarget.checked)}
      disabled={props.disabled}
    />
  );
}

interface SwitchRowProps extends SwitchProps {
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
