const PREFIX = "[Syncify]";

/** Console lines tagged so they can be told apart from Spotify's own. */
export function debug(message: string, ...data: unknown[]): void {
  console.debug(PREFIX, message, ...data);
}

export function warn(message: string, ...data: unknown[]): void {
  console.warn(PREFIX, message, ...data);
}
