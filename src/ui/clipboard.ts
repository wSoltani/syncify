/** Copies text, through Spotify's clipboard when the page's is refused. */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const clipboard = Spicetify.Platform?.ClipboardAPI as
      | { copy?: (text: string) => unknown }
      | undefined;
    if (!clipboard?.copy) return false;
    await clipboard.copy(text);
    return true;
  }
}
