/** Opens a page in the browser, or an email address in the mail app. */
export function openExternal(url: string): void {
  if (url.startsWith("mailto:")) {
    window.location.href = url;
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
}
