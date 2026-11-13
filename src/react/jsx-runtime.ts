import type { ElementType, Key, ReactElement, ReactNode } from "react";
import { createElement, Fragment } from "./index";

/*
 * The automatic JSX runtime, built on Spotify's createElement (the build
 * points `react/jsx-runtime` here). `jsx` gets one child or none, `jsxs` a
 * static list, whose children are passed one by one so React doesn't ask for
 * keys on them.
 */

type Props = Record<string, unknown> & { children?: ReactNode };

function withKey(props: Record<string, unknown>, key: Key | undefined) {
  return key === undefined ? props : { ...props, key };
}

export function jsx(type: ElementType, props: Props, key?: Key): ReactElement {
  const { children, ...rest } = props;
  return children === undefined
    ? createElement(type, withKey(rest, key))
    : createElement(type, withKey(rest, key), children);
}

export function jsxs(type: ElementType, props: Props, key?: Key): ReactElement {
  const { children, ...rest } = props;
  const list = Array.isArray(children) ? children : [children];
  return createElement(type, withKey(rest, key), ...list);
}

export { Fragment };
