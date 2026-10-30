/** Models sometimes answer in markdown despite the prompt; the panel renders plain text, so tidy it for display. */
export const plainText = (s: string): string =>
  s
    .replace(/\*\*|__/g, "")
    .replace(/`/g, "")
    .replace(/^[ \t]*#{1,6}[ \t]+/gm, "")
    .replace(/^([ \t]*)[-*][ \t]+/gm, "$1• ");
