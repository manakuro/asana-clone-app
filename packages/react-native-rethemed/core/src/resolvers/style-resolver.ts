import {
  COLOR_KEYS,
  FONT_SIZE_KEYS,
  FONT_WEIGHT_KEYS,
  LETTER_SPACING_KEYS,
  RADIUS_KEYS,
  SPACING_KEYS,
  Z_INDEX_KEYS,
} from '../style-props';
import type { ThemeConfig } from '../types';
import { type ColorScheme, resolveSemanticColors } from './color-resolver';
import { resolveBaseFontSize } from './line-height-resolver';

type Table = Record<string, unknown>;

/** Avoids float noise like `17.600000000000001` without pixel-snapping. */
const round2 = (value: number) => Math.round(value * 100) / 100;

const hasToken = (table: Table, value: unknown) =>
  (typeof value === 'string' || typeof value === 'number') &&
  Object.hasOwn(table, value);

/**
 * Builds the resolver behind `themed.view()` / `text()` / `image()` for one
 * color scheme.
 *
 * Everything that doesn't depend on the input is done once here: a single
 * **prop → token table** lookup (`backgroundColor` → the primitive
 * `tokens.colors` plus the flattened `'group.token'` semantic colors for this
 * scheme, `padding` → `tokens.spacing`, …).
 * Each call then makes **one pass over the input's own keys** (usually a
 * handful), rather than scanning every token-aware prop name, and copies the
 * input at most once — or not at all when nothing is a token.
 *
 * Two props need the rest of the style, so they are applied after the pass:
 * - `lineHeight` tokens are ratios of the (resolved) `fontSize`, falling back
 *   to `defaults.fontSize`;
 * - the virtual `shadow` prop expands last, so a preset wins over explicit
 *   `shadow*` props, and the `shadow` key itself is removed.
 */
export function createStyleResolver(config: ThemeConfig, scheme: ColorScheme) {
  const tokens = config.tokens ?? {};
  const byProp: Record<string, Table> = Object.create(null);

  const register = (props: readonly string[], table: Table | undefined) => {
    if (!table) return;
    for (const prop of props) byProp[prop] = table;
  };

  // Color props take both kinds of color token. Primitives (`'red.500'`)
  // go in first, so a semantic color with the same name wins (the CLI warns
  // about such collisions).
  const colors: Record<string, string> = { ...tokens.colors };
  for (const [group, names] of Object.entries(
    resolveSemanticColors(config, scheme),
  )) {
    for (const [name, value] of Object.entries(names)) {
      colors[`${group}.${name}`] = value;
    }
  }
  if (tokens.colors || config.semanticTokens?.colors) {
    register(COLOR_KEYS, colors);
  }
  register(RADIUS_KEYS, tokens.radii);
  register(SPACING_KEYS, tokens.spacing);
  register(FONT_SIZE_KEYS, tokens.fontSizes);
  register(FONT_WEIGHT_KEYS, tokens.fontWeights);
  register(LETTER_SPACING_KEYS, tokens.letterSpacings);
  register(Z_INDEX_KEYS, tokens.zIndices);

  const lineHeights = tokens.lineHeights;
  const shadows = tokens.shadows as Record<string, Table> | undefined;
  const baseFontSize = resolveBaseFontSize(config);

  return function resolveStyle(input: object): Record<string, unknown> {
    const source = input as Record<string, unknown>;
    let result: Record<string, unknown> | null = null;
    let lineHeightRatio: number | undefined;
    let shadowPreset: Table | undefined;
    let hasShadow = false;

    for (const key in source) {
      const value = source[key];

      if (key === 'lineHeight') {
        if (lineHeights && hasToken(lineHeights, value)) {
          lineHeightRatio = lineHeights[value as string];
        }
        continue;
      }
      if (key === 'shadow') {
        if (shadows) {
          hasShadow = true;
          shadowPreset = hasToken(shadows, value)
            ? shadows[value as string]
            : undefined;
        }
        continue;
      }

      const table = byProp[key];
      if (table === undefined || !hasToken(table, value)) continue;
      result ??= { ...source };
      result[key] = table[value as string];
    }

    if (lineHeightRatio !== undefined) {
      result ??= { ...source };
      const fontSize =
        typeof result.fontSize === 'number' ? result.fontSize : baseFontSize;
      result.lineHeight = round2(fontSize * lineHeightRatio);
    }
    if (hasShadow) {
      // Rebuild without `shadow` instead of `delete`, which would push the
      // object into V8/Hermes' slow dictionary mode.
      const base = result ?? source;
      const expanded: Record<string, unknown> = {};
      for (const key in base) {
        if (key !== 'shadow') expanded[key] = base[key];
      }
      result = shadowPreset ? Object.assign(expanded, shadowPreset) : expanded;
    }

    return result ?? source;
  };
}
