import type { HTMLAttributes, ReactNode } from "react";
import { useStableId } from "./useStableId";

interface FieldProps {
  /** Always shown above the input; a placeholder never stands in for it. */
  label: string;
  value: string;
  onChange(value: string): void;
  /** Checks belong here, when the person leaves the field. */
  onBlur?(): void;
  /** What's wrong and what to do, under the input. What was typed stays. */
  error?: string | null;
  placeholder?: string;
  /** Fixed text before what's typed, like "@" for a handle. */
  prefix?: string;
  /** A button beside the input, like Load. */
  action?: ReactNode;
  type?: "text" | "email";
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  maxLength?: number;
  disabled?: boolean;
  autoFocus?: boolean;
  /** Typed text in the code font, for codes. */
  mono?: boolean;
}

export function Field(props: FieldProps) {
  const id = useStableId("field");
  const errorId = `${id}-error`;
  const invalid = Boolean(props.error);

  return (
    <div className="syncify-field-group">
      <label className="syncify-field-label" htmlFor={id}>
        {props.label}
      </label>
      <div className="syncify-field-row">
        <span
          className="syncify-input-box"
          data-invalid={invalid ? "true" : undefined}
          data-disabled={props.disabled ? "true" : undefined}
        >
          {props.prefix ? (
            <span className="syncify-input-prefix" aria-hidden="true">
              {props.prefix}
            </span>
          ) : null}
          <input
            className="syncify-input-control"
            id={id}
            type={props.type ?? "text"}
            value={props.value}
            onChange={(event) => props.onChange(event.currentTarget.value)}
            onBlur={props.onBlur}
            placeholder={props.placeholder}
            inputMode={props.inputMode}
            autoComplete={props.autoComplete ?? "off"}
            spellCheck={false}
            maxLength={props.maxLength}
            disabled={props.disabled}
            autoFocus={props.autoFocus}
            aria-invalid={invalid || undefined}
            aria-describedby={invalid ? errorId : undefined}
            data-mono={props.mono ? "true" : undefined}
          />
        </span>
        {props.action}
      </div>
      {invalid ? (
        <span className="syncify-field-error" id={errorId} role="alert">
          {props.error}
        </span>
      ) : null}
    </div>
  );
}
