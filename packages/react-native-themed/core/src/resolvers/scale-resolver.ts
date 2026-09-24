/**
 * Generic factory shared by every scale-based category (radii, spacing,
 * fontSizes, fontWeights, lineHeights, letterSpacings) instead of duplicating
 * the same lookup per category.
 *
 * Copy-on-write: returns `input` unchanged (no clone) if none of `props` is
 * present with a value found in `scale`, and only clones on the first actual
 * match — so a style that doesn't touch this category costs zero allocation.
 */
export function createScaleResolver(
  props: readonly string[],
  scale: Record<string, unknown> | undefined,
) {
  if (!scale) {
    return (input: Record<string, unknown>) => input;
  }

  return function resolveScaleStyle(input: Record<string, unknown>): Record<string, unknown> {
    let result = input;

    for (const prop of props) {
      if (!(prop in input)) continue;

      const token = input[prop] as PropertyKey;
      if (!Object.hasOwn(scale, token)) continue;

      if (result === input) {
        result = { ...input };
      }
      result[prop] = scale[token as string];
    }

    return result;
  };
}
