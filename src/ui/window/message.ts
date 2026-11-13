/** A problem or a warning from an action, shown next to where it happened. */
export interface WindowMessage {
  kind: "warning" | "error";
  text: string;
}
