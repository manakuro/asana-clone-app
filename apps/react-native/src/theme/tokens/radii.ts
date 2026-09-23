/**
 * Radius values used throughout the app, aligned with Chakra UI's spacing tokens.
 * https://www.chakra-ui.com/docs/theming/radii
 *
 * - none: 0
 * - 2xs: 1
 * - xs: 2
 * - sm: 4
 * - md: 6
 * - lg: 8
 * - xl: 12
 * - 2xl: 16
 * - 3xl: 24
 * - 4xl: 32
 * - full: 9999
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

export type RadiusToken = keyof typeof radii;
