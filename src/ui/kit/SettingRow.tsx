import type { ReactNode } from "react";

export interface SettingRowProps {
  label: ReactNode;
  /** The current value under the label, such as a masked email. */
  value?: ReactNode;
  /** The control on the right. */
  children?: ReactNode;
}

/** A setting: its label on the left, its control on the right. */
export function SettingRow(props: SettingRowProps) {
  return (
    <div className="syncify-setting-row">
      <span className="syncify-setting-row-text">
        <span className="syncify-setting-row-label">{props.label}</span>
        {props.value ? <span className="syncify-setting-row-value">{props.value}</span> : null}
      </span>
      {props.children}
    </div>
  );
}

/** Setting rows that belong together, split by dashed lines. */
export function SettingGroup(props: { children: ReactNode; label?: string }) {
  return (
    <div className="syncify-setting-group" role="group" aria-label={props.label}>
      {props.children}
    </div>
  );
}
