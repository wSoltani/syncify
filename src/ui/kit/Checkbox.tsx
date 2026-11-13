interface CheckboxProps {
  checked: boolean;
  onChange(checked: boolean): void;
  /** Read out in place of a visible label, when the row around it names it. */
  label: string;
  disabled?: boolean;
}

/** For choices saved with a button, such as which items a restore includes. */
export function Checkbox(props: CheckboxProps) {
  return (
    <input
      className="syncify-checkbox"
      type="checkbox"
      aria-label={props.label}
      checked={props.checked}
      onChange={(event) => props.onChange(event.currentTarget.checked)}
      disabled={props.disabled}
    />
  );
}

/** A checkbox with its label beside it, the whole row a target. */
export function CheckboxRow(props: Omit<CheckboxProps, "label"> & { label: string }) {
  return (
    <label className="syncify-checkbox-row" data-disabled={props.disabled ? "true" : undefined}>
      <input
        className="syncify-checkbox"
        type="checkbox"
        checked={props.checked}
        onChange={(event) => props.onChange(event.currentTarget.checked)}
        disabled={props.disabled}
      />
      <span className="syncify-checkbox-label">{props.label}</span>
    </label>
  );
}
