import {
  defineTheme,
  type TextToken,
} from '@react-native-rethemed/core/config';

/**
 * Material Design 3's baseline type scale — 5 roles (display/headline/title/
 * body/label) × 3 sizes (lg/md/sm).
 * https://m3.material.io/styles/typography/type-scale-tokens
 *
 * MD3 Expressive's additional 15 "Emphasized" styles are intentionally left
 * out — their values are less stable/well-documented across sources than
 * this baseline scale.
 */
export const typescale = {
  display: {
    lg: {
      fontSize: 57,
      lineHeight: 64,
      letterSpacing: -0.25,
      fontWeight: '400',
    },
    md: {
      fontSize: 45,
      lineHeight: 52,
      letterSpacing: 0,
      fontWeight: '400',
    },
    sm: {
      fontSize: 36,
      lineHeight: 44,
      letterSpacing: 0,
      fontWeight: '400',
    },
  },
  headline: {
    lg: {
      fontSize: 32,
      lineHeight: 40,
      letterSpacing: 0,
      fontWeight: '400',
    },
    md: {
      fontSize: 28,
      lineHeight: 36,
      letterSpacing: 0,
      fontWeight: '400',
    },
    sm: {
      fontSize: 24,
      lineHeight: 32,
      letterSpacing: 0,
      fontWeight: '400',
    },
  },
  title: {
    lg: {
      fontSize: 22,
      lineHeight: 28,
      letterSpacing: 0,
      fontWeight: '400',
    },
    md: {
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.15,
      fontWeight: '500',
    },
    sm: {
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.1,
      fontWeight: '500',
    },
  },
  body: {
    lg: {
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.5,
      fontWeight: '400',
    },
    md: {
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.25,
      fontWeight: '400',
    },
    sm: {
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.4,
      fontWeight: '400',
    },
  },
  label: {
    lg: {
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.1,
      fontWeight: '500',
    },
    md: {
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.5,
      fontWeight: '500',
    },
    sm: {
      fontSize: 11,
      lineHeight: 16,
      letterSpacing: 0.5,
      fontWeight: '500',
    },
  },
} as const satisfies Record<string, Record<string, TextToken>>;

/**
 * Material Design 3's system spacing tokens (`md.sys.measurement.space*`),
 * keyed by their dp value: `space100` (8dp) → `8`, so
 * `themed.view({ padding: 8 })` is 8. React Native style numbers are already
 * density-independent (1dp = 1), so values are used as-is.
 *
 * | M3 token | key / value (dp) |
 * |:--|--:|
 * | `space0` | 0 |
 * | `space25` / `space50` / `space75` | 2 / 4 / 6 |
 * | `space100` / `space125` | 8 / 10 |
 * | `space200` … `space900` | 16 … 72 (8dp steps) |
 *
 * https://m3.material.io/styles/spacing/tokens (checked 2026-10-02; M3 notes
 * these tokens are so far only used by Jetpack Compose).
 */
export const spacing = {
  0: 0,
  2: 2,
  4: 4,
  6: 6,
  8: 8,
  10: 10,
  16: 16,
  24: 24,
  32: 32,
  40: 40,
  48: 48,
  56: 56,
  64: 64,
  72: 72,
} as const satisfies Record<number, number>;

export const materialDesignTheme = defineTheme({
  // Spacing is a scale, not a role, so it is a primitive `tokens` entry.
  tokens: { spacing },
  // Type-scale styles are role-named (MD3 also places them under
  // `md.sys.typescale.*`, not the reference layer), so they live in
  // `semanticTokens`. Values stay raw: MD3 has its own scale and does not
  // reference another theme's primitives.
  semanticTokens: { text: typescale },
});
