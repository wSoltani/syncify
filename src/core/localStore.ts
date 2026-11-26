// Small values Syncify keeps on this device, in Spicetify's storage, or the
// browser's where Spicetify has none.

export function readStored(key: string): string | null {
  return Spicetify.LocalStorage?.get(key) ?? window.localStorage.getItem(key);
}

export function writeStored(key: string, value: string): void {
  if (Spicetify.LocalStorage?.set) Spicetify.LocalStorage.set(key, value);
  else window.localStorage.setItem(key, value);
}
