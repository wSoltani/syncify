import type { ButtonHTMLAttributes, ReactNode } from "react";
import { classNames } from "./classNames";

/**
 * primary: the one main action. secondary: other actions. danger: a confirmed
 * delete. text: a row action in the text color. subtle: a quiet action in the
 * muted color.
 */
type ButtonVariant = "primary" | "secondary" | "danger" | "text" | "subtle";
/** 36 px, 28 px, or 24 px for the footer. */
type ButtonSize = "regular" | "small" | "tiny";

interface ButtonProps
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
