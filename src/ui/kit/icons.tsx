import type { SVGProps } from "react";
import { classNames } from "./classNames";

type IconProps = Omit<SVGProps<SVGSVGElement>, "children">;

function Icon(props: IconProps & { children: SVGProps<SVGSVGElement>["children"] }) {
  const { children, className, ...rest } = props;
  return (
    <svg
      className={classNames("syncify-icon", className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m9 6 6 6-6 6" />
    </Icon>
  );
}

/** Opens a page outside Spotify. */
export function ArrowUpRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </Icon>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m6 9 6 6 6-6" />
    </Icon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </Icon>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z" />
    </Icon>
  );
}

/** A pushpin, after a pinned backup's name. */
export function PinIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 17v5" />
      <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
    </Icon>
  );
}

/** Three squares, for a menu of more actions. */
export function MoreIcon(props: IconProps) {
  return (
    <Icon {...props} data-filled="true">
      <rect x="4" y="10.5" width="3" height="3" rx="0.75" />
      <rect x="10.5" y="10.5" width="3" height="3" rx="0.75" />
      <rect x="17" y="10.5" width="3" height="3" rx="0.75" />
    </Icon>
  );
}

/** An exclamation mark, inside a warning mark that needs an answer. */
export function AlertIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 6v7" />
      <path d="M12 17.5v.5" />
    </Icon>
  );
}
