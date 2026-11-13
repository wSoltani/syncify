import { useLayoutEffect, useRef } from "react";

/**
 * The latest value, for an effect that runs on its own schedule but must
 * call what the last render made.
 */
export function useLatest<T>(value: T): { readonly current: T } {
  const ref = useRef(value);
  useLayoutEffect(() => {
    ref.current = value;
  });
  return ref;
}
