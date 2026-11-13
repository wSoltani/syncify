import type { ShareCode, SharePick } from "../../api/sharesApi";
import { getProjectConfig } from "../../core/projectConfig";
import { displayCode } from "../../core/shareCodes";
import type { Kind } from "../kit";

/** Discover on the website, or its Post your setup started on a code. */
export function discoverUrl(post?: string): string {
  const base = `${getProjectConfig().webUrl.replace(/\/+$/, "")}/discover`;
  return post ? `${base}?post=${encodeURIComponent(post)}` : base;
}

/** A code's name, or the code itself when it has none. */
export function codeTitle(code: Pick<ShareCode, "code" | "name">): string {
  return code.name ?? displayCode(code.code);
}

/** "Used by 12" and "On Discover", after the code. */
export function codeFacts(code: ShareCode): string[] {
  return [`Used by ${code.imports}`, ...(code.posted ? ["On Discover"] : [])];
}

/** What deleting a code loses, for its dialog. */
export function deleteCodeText(code: ShareCode): string {
  const stops = code.posted
    ? "The code stops working and its Discover post comes down."
    : "The code stops working.";
  if (code.imports === 0) return stops;
  return `${stops} ${code.imports === 1 ? "1 person" : `${code.imports} people`} used it.`;
}

// At most this many squares, so a big setup's row stays one line.
const PIPS_MAX = 12;

/** A pick's items as kind squares, as on the website's cards. */
export function pickKinds(pick: SharePick): Kind[] {
  return [
    ...Array<Kind>(Math.min(pick.extensions, PIPS_MAX)).fill("extension"),
    ...Array<Kind>(Math.min(pick.themes, PIPS_MAX)).fill("theme"),
    ...Array<Kind>(Math.min(pick.snippets, PIPS_MAX)).fill("snippet"),
  ].slice(0, PIPS_MAX);
}
