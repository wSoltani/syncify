/** Joins the class names that are set: classNames("a", busy && "b"). */
export function classNames(
  ...names: (string | false | null | undefined)[]
): string {
  return names.filter(Boolean).join(" ");
}
