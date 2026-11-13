import type { PreviewItem } from "../core/restorePreview";
import type { SyncifyPayload } from "../types/syncify";

/** A made-up backup holding the given extensions. */
export function makeBackup(
  hash: string,
  extensions: string[],
  options: { at?: string; device?: string; name?: string } = {},
): SyncifyPayload {
  const keys: Record<string, string> = {
    "marketplace:installed-extensions": JSON.stringify(extensions),
  };
  for (const key of extensions) {
    keys[key] = JSON.stringify({ title: key.split("/").pop(), user: "someone", repo: "extensions" });
  }
  return {
    schema_version: 2,
    metadata: {
      last_sync_datetime: options.at ?? "2026-11-06T18:56:00Z",
      device_info: options.device ?? "Windows",
      marketplace_key_count: Object.keys(keys).length,
    },
    payload_hash: hash,
    marketplace_data: { keys },
    ...(options.name ? { backup: { id: `id-${hash}`, kind: "rolling", name: options.name } } : {}),
  };
}

/** One item in a restore preview. */
export function makePreviewItem(
  name: string,
  change: PreviewItem["change"],
  isNew = change === "added",
): PreviewItem {
  return {
    key: `marketplace:installed:${name}`,
    type: "extension",
    name,
    repo: "someone/extensions",
    sources: [],
    custom: false,
    change,
    isNew,
  };
}
