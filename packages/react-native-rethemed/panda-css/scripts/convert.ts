/**
 * Converts `@pandacss/preset-panda`'s theme into react-native-rethemed
 * tokens. Pure functions only: `generate.ts` writes the result to
 * `src/tokens.gen.ts`, and the tests re-run the conversion to check that the
 * committed file still matches the installed preset.
 *
 * Not exported from the package.
 */
import type { ShadowToken } from '@react-native-rethemed/core/config';
import { formatHex, formatHex8, parse, toGamut } from 'culori';

/** CSS root font size used to turn `rem`/`em` into RN points. */
export const BASE_FONT_SIZE = 16;

/**
 * Panda categories with no token-aware RN style prop (or no RN equivalent at
 * all), so they are not converted.
 */
export const EXCLUDED_CATEGORIES = [
  'aspectRatios',
  'animations',
  'blurs',
  'borders',
  'durations',
  'easings',
  'fonts',
  'sizes',
] as const;

// Panda's `theme.textStyles` (composite styles) are not converted either:
// Panda ships no semantic tokens, so this package has no text presets.
// Apps define `semanticTokens.text` themselves.

/** Colors RN cannot represent (`currentcolor`). */
export const EXCLUDED_COLORS = ['current'] as const;

/**
 * Android `elevation` per shadow token. CSS has no equivalent, so these are
 * picked by hand, following the same progression as the Chakra UI package.
 */
export const SHADOW_ELEVATIONS: Record<string, number> = {
  '2xs': 1,
  xs: 1,
  sm: 2,
  md: 4,
  lg: 8,
  xl: 12,
  '2xl': 16,
};

type PandaToken = { value: unknown };
type PandaTokenGroup = Record<string, unknown>;

/** The part of a Panda preset this converter reads. */
export type PandaPreset = {
  theme?: {
    tokens?: Record<string, PandaTokenGroup | undefined>;
  };
};

export type ConvertedTheme = {
  colors: Record<string, string>;
  radii: Record<string, number>;
  spacing: Record<string, number>;
  fontSizes: Record<string, number>;
  fontWeights: Record<string, string>;
  lineHeights: Record<string, number>;
  letterSpacings: Record<string, number>;
  shadows: Record<string, ShadowToken>;
};

const isToken = (node: unknown): node is PandaToken =>
  typeof node === 'object' && node !== null && 'value' in node;

/** Rounds away floating-point noise (`0.025 * 16` → `0.4`). */
const round = (n: number, digits = 3) => {
  const factor = 10 ** digits;
  return Math.round(n * factor) / factor;
};

function scale(
  tokens: Record<string, PandaTokenGroup | undefined>,
  category: string,
): [string, unknown][] {
  const group = tokens[category];
  if (!group) throw new Error(`preset has no tokens.${category}`);
  return Object.entries(group).map(([key, node]) => {
    if (!isToken(node)) {
      throw new Error(`tokens.${category}.${key}: expected a { value } token`);
    }
    return [key, node.value];
  });
}

/** `'0.75rem'` → 12, `'9999px'` → 9999, `'0'` → 0. */
export function toPoints(value: unknown): number {
  const match = /^(-?\d*\.?\d+)(rem|px)?$/.exec(String(value).trim());
  if (!match) throw new Error(`unsupported length: ${String(value)}`);
  const n = Number(match[1]);
  return round(match[2] === 'rem' ? n * BASE_FONT_SIZE : n);
}

/** `'-0.025em'` → -0.4 (at the 16px base font size). */
export function emToPoints(value: unknown): number {
  const match = /^(-?\d*\.?\d+)em$/.exec(String(value).trim());
  if (!match) throw new Error(`unsupported em value: ${String(value)}`);
  return round(Number(match[1]) * BASE_FONT_SIZE);
}

/** `'1.5'` → 1.5 (unitless line-height ratio). */
export function toRatio(value: unknown): number {
  const text = String(value).trim();
  if (/^\d*\.?\d+$/.test(text)) return Number(text);
  throw new Error(`unsupported line height: ${text}`);
}

const toSrgb = toGamut('rgb', 'oklch');

/**
 * Any CSS color → hex, since RN has no `oklch()`. Colors outside sRGB are
 * gamut-mapped (CSS Color 4 algorithm) instead of clipped. Translucent colors
 * become 8-digit hex.
 */
export function toHex(css: string): string {
  const parsed = parse(css);
  if (!parsed) throw new Error(`unsupported color: ${css}`);
  const rgb = toSrgb(parsed);
  return (rgb.alpha ?? 1) < 1 ? formatHex8(rgb) : formatHex(rgb);
}

/** Flattens `{ red: { 50: { value } } }` to `{ 'red.50': '#…' }`. */
export function convertColors(group: PandaTokenGroup): Record<string, string> {
  const colors: Record<string, string> = {};
  for (const [name, node] of Object.entries(group)) {
    if ((EXCLUDED_COLORS as readonly string[]).includes(name)) continue;
    if (isToken(node)) {
      colors[name] = toHex(String(node.value));
      continue;
    }
    for (const [shade, shadeNode] of Object.entries(node as PandaTokenGroup)) {
      if (!isToken(shadeNode)) {
        throw new Error(`tokens.colors.${name}.${shade}: expected a token`);
      }
      colors[`${name}.${shade}`] = toHex(String(shadeNode.value));
    }
  }
  return colors;
}

type ShadowLayer = {
  inset: boolean;
  x: number;
  y: number;
  blur: number;
  color: string;
};

/** Parses one CSS box-shadow layer: `[inset] x y [blur [spread]] color`. */
export function parseShadowLayer(layer: string): ShadowLayer {
  const match =
    /^(inset\s+)?(-?[\d.]+(?:px)?)\s+(-?[\d.]+(?:px)?)(?:\s+(-?[\d.]+(?:px)?))?(?:\s+(-?[\d.]+(?:px)?))?\s+(\S.*)$/.exec(
      layer.trim(),
    );
  if (!match) throw new Error(`unsupported box-shadow: ${layer}`);
  return {
    inset: Boolean(match[1]),
    x: toPoints(match[2]),
    y: toPoints(match[3]),
    blur: match[4] === undefined ? 0 : toPoints(match[4]),
    // Spread (match[5]) has no RN equivalent and is dropped.
    color: match[6],
  };
}

/**
 * CSS box-shadow → one RN shadow. RN has no multi-layer shadows, so the first
 * (largest) layer is used. Inset shadows cannot be represented and return
 * `undefined`. CSS blur is twice the Gaussian radius RN's `shadowRadius`
 * expects, hence `blur / 2`.
 */
export function convertShadow(
  name: string,
  value: unknown,
): ShadowToken | undefined {
  const layers = (Array.isArray(value) ? value : [value]).map((layer) =>
    parseShadowLayer(String(layer)),
  );
  if (layers.some((layer) => layer.inset)) return undefined;
  const [primary] = layers;
  const color = parse(primary.color);
  if (!color) throw new Error(`unsupported shadow color: ${primary.color}`);
  const elevation = SHADOW_ELEVATIONS[name];
  if (elevation === undefined) {
    throw new Error(`no elevation defined for shadow '${name}'`);
  }
  return {
    shadowColor: formatHex({ ...color, alpha: undefined }),
    shadowOffset: { width: primary.x, height: primary.y },
    shadowOpacity: round(color.alpha ?? 1),
    shadowRadius: round(primary.blur / 2),
    elevation,
  };
}

const byNumericKey = <T>(entries: [string, T][]): [string, T][] =>
  [...entries].sort(([a], [b]) => Number(a) - Number(b));

export function convertPreset(preset: PandaPreset): ConvertedTheme {
  const tokens = preset.theme?.tokens;
  if (!tokens) throw new Error('preset has no theme.tokens');

  const shadows: Record<string, ShadowToken> = {};
  for (const [name, value] of scale(tokens, 'shadows')) {
    const shadow = convertShadow(name, value);
    if (shadow) shadows[name] = shadow;
  }

  return {
    colors: convertColors(tokens.colors ?? {}),
    radii: Object.fromEntries(
      scale(tokens, 'radii').map(([k, v]) => [k, toPoints(v)]),
    ),
    spacing: Object.fromEntries(
      byNumericKey(scale(tokens, 'spacing')).map(([k, v]) => [k, toPoints(v)]),
    ),
    fontSizes: Object.fromEntries(
      scale(tokens, 'fontSizes').map(([k, v]) => [k, toPoints(v)]),
    ),
    fontWeights: Object.fromEntries(
      scale(tokens, 'fontWeights').map(([k, v]) => [k, String(v)]),
    ),
    lineHeights: Object.fromEntries(
      scale(tokens, 'lineHeights').map(([k, v]) => [k, toRatio(v)]),
    ),
    letterSpacings: Object.fromEntries(
      scale(tokens, 'letterSpacings').map(([k, v]) => [k, emToPoints(v)]),
    ),
    shadows,
  };
}
