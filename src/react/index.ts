import type * as ReactModule from "react";

/*
 * Spotify ships its own React and Spicetify hands it to extensions as
 * Spicetify.React, which isn't there yet when this bundle runs. The build
 * points `react` here, so components import hooks from "react" with React's
 * own types, and these bindings are filled in by bindReact once Spicetify is
 * ready, before anything renders. Tests and the harness use React itself.
 */

export let createElement: typeof ReactModule.createElement;
export let Fragment: typeof ReactModule.Fragment;
export let useCallback: typeof ReactModule.useCallback;
export let useEffect: typeof ReactModule.useEffect;
export let useLayoutEffect: typeof ReactModule.useLayoutEffect;
export let useMemo: typeof ReactModule.useMemo;
export let useReducer: typeof ReactModule.useReducer;
export let useRef: typeof ReactModule.useRef;
export let useState: typeof ReactModule.useState;

export function bindReact(react: typeof ReactModule): void {
  ({
    createElement,
    Fragment,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useReducer,
    useRef,
    useState,
  } = react);
}
