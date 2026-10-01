import type { TextStyle } from 'react-native';
import type { ColorScheme } from './resolvers/color-resolver';
import { createStyleResolver } from './resolvers/style-resolver';
import { resolveTextTree } from './text-tree';
import { createTextVariants } from './text-variants';
import type {
  LooseSchema,
  ThemeConfig,
  ThemedSchema,
  ThemedStyles,
} from './types';

/**
 * Builds `{ view, text, image }` from a fully resolved `ThemeConfig` for one
 * fixed color scheme. No React here — plain data in, plain functions out.
 * `createThemed` calls this once per scheme and hands the result out through
 * `useThemed()`, so components re-render (and pick up new colors) when the
 * scheme changes.
 *
 * `S` comes from the generated `themed.gen.ts`; without it every token
 * prop is loosely typed (`LooseSchema`).
 */
export function createThemedStyles<S extends ThemedSchema = LooseSchema>(
  config: ThemeConfig,
  scheme: ColorScheme,
): ThemedStyles<S> {
  // One pass over the input's keys per call; see `createStyleResolver`.
  const resolveStyle = createStyleResolver(config, scheme);

  const text = (input: object = {}) => resolveStyle(input) as TextStyle;
  // Preset colors (`{ light, dark }`) are picked for this scheme up front.
  const variants = createTextVariants(
    resolveTextTree(config.semanticTokens?.text, scheme),
    (input) => resolveStyle(input) as TextStyle,
  );
  // `Object.assign` would throw for roles that collide with non-writable
  // function properties (`name`, `length`); defineProperty overrides them.
  for (const [role, sizes] of Object.entries(variants)) {
    Object.defineProperty(text, role, {
      value: sizes,
      enumerable: true,
      configurable: true,
    });
  }

  return {
    view: resolveStyle,
    image: resolveStyle,
    text,
  } as unknown as ThemedStyles<S>;
}
