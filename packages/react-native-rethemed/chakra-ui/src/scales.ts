import type { ShadowToken } from '@react-native-rethemed/core/config';
import { colorTokens } from './colors';

/**
 * Radius scale, aligned with Chakra UI's radii tokens.
 * https://www.chakra-ui.com/docs/theming/radii
 */
export const radii = {
  none: 0,
  '2xs': 1,
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  '4xl': 32,
  full: 9999,
} as const;

/**
 * Spacing scale, aligned with Chakra UI's spacing tokens. 1 unit = 4px,
 * matching Chakra/Tailwind's proportional scale.
 * https://www.chakra-ui.com/docs/theming/spacing
 */
export const spacing = {
  px: 1,
  0: 0,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
  44: 176,
  48: 192,
  52: 208,
  56: 224,
  60: 240,
  64: 256,
  72: 288,
  80: 320,
  96: 384,
} as const;

/**
 * Font size scale, aligned with Chakra UI's fontSizes tokens.
 * https://www.chakra-ui.com/docs/theming/typography
 */
export const fontSizes = {
  '2xs': 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
  '7xl': 72,
  '8xl': 96,
  '9xl': 128,
} as const;

/** Font weight scale — the standard 9-step CSS scale (thin..black). */
export const fontWeights = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const;

/**
 * Line height scale, aligned with Chakra UI's lineHeights tokens: unitless
 * ratios, as Chakra defines them. `themed` resolves a token to
 * `fontSize × ratio` (see `defaults.fontSize` for styles without a fontSize).
 */
export const lineHeights = {
  shorter: 1.25,
  short: 1.375,
  moderate: 1.5,
  tall: 1.625,
  taller: 2,
} as const;

/**
 * Letter spacing scale. Chakra's tokens are em-based; these are the
 * approximate px equivalents at a 16px base font size.
 */
export const letterSpacings = {
  tighter: -0.8,
  tight: -0.4,
  wide: 0.4,
  wider: 0.8,
  widest: 1.6,
} as const;

/**
 * z-index scale, aligned with Chakra UI's zIndices tokens.
 * https://www.chakra-ui.com/docs/theming/z-index
 */
export const zIndices = {
  hide: -1,
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipNav: 1600,
  toast: 1700,
  tooltip: 1800,
  max: 2147483647,
} as const;

/**
 * Chakra's `xs`/`sm`/`md`/`lg`/`xl`/`2xl` box-shadow scale, approximated as
 * single-layer RN shadow objects since RN doesn't support multi-layer
 * shadows the way CSS `box-shadow` does. Chakra's `inner` (inset) shadow
 * isn't included — not representable with RN's native shadow props.
 */
const shadowColor = colorTokens.black;

export const shadows = {
  xs: {
    shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  sm: {
    shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 8,
  },
  xl: {
    shadowColor,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 12,
  },
  '2xl': {
    shadowColor,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 16,
  },
} as const satisfies Record<string, ShadowToken>;
