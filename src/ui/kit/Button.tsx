import type { ButtonHTMLAttributes, ReactNode } from "react";
import { classNames } from "./classNames";

/**
 * primary: the one main action. secondary: other actions. danger: a confirmed
 * delete. text: a row action in the text color. subtle: a quiet action in the
 * muted color.
 */
export type ButtonVariant = "primary" | "secondary" | "danger" | "text" | "subtle";
/** 36 px, 28 px, or 24 px for the footer. */
export type ButtonSize = "regular" | "small" | "tiny";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: "button" | "submit";
  /** Drawn before the label, on its cap middle. */
  icon?: ReactNode;
  children: ReactNode;
}

const DEFAULT_SIZE: Record<ButtonVariant, ButtonSize> = {
  primary: "regular",
  secondary: "regular",
  danger: "regular",
  text: "small",
  subtle: "small",
};

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = DEFAULT_SIZE[variant],
    type = "button",
    icon,
    children,
    className,
    ...rest
  } = props;
  return (
    <button
      className={classNames("syncify-btn", className)}
      data-variant={variant}
      data-size={size}
      type={type}
      {...rest}
    >
      {icon}
      <span className="syncify-cap">{children}</span>
    </button>
  );
}

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "children"> {
  /** What the button does, read out in place of the icon. */
  label: string;
  icon: ReactNode;
}

/** A 28 px square button that shows only an icon. */
export function IconButton(props: IconButtonProps) {
  const { label, icon, className, ...rest } = props;
  return (
    <button
      className={classNames("syncify-icon-btn", className)}
      type="button"
      aria-label={label}
      {...rest}
    >
      {icon}
    </button>
  );
}
