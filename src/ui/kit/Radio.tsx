interface RadioRowProps {
  /** Radios with the same name are one choice. */
  name: string;
  checked: boolean;
  onChange(): void;
  label: string;
  disabled?: boolean;
}

/** One of several choices, saved with a button: a square radio and its label, the whole row a target. */
export function RadioRow(props: RadioRowProps) {
  return (
    <label className="syncify-radio-row" data-disabled={props.disabled ? "true" : undefined}>
      <input
        className="syncify-radio"
        type="radio"
        name={props.name}
        checked={props.checked}
        onChange={() => props.onChange()}
        disabled={props.disabled}
      />
      <span className="syncify-radio-label">{props.label}</span>
    </label>
  );
}
