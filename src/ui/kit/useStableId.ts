import { useState } from "react";

let lastId = 0;

/**
 * An id that stays the same for as long as the component is mounted, for
 * labels and aria references. Spotify's React may predate useId.
 */
export function useStableId(name: string): string {
  const [id] = useState(() => `syncify-${name}-${++lastId}`);
  return id;
}
