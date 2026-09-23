/**
 * zIndex values used throughout the app, aligned with Chakra UI's spacing tokens.
 * https://www.chakra-ui.com/docs/theming/z-index
 *
 * - hide: -1
 * - base: 0
 * - docked: 10
 * - dropdown: 1000
 * - sticky: 1100
 * - banner: 1200
 * - overlay: 1300
 * - modal: 1400
 * - popover: 1500
 * - skipNav: 1600
 * - toast: 1700
 * - tooltip: 1800
 * - max: 2147483647
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

export type ZIndexToken = keyof typeof zIndices;
