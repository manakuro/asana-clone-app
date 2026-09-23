import type { ColorToken } from '@/theme/tokens/colors';
import type { RadiusToken } from '@/theme/tokens/radii';
import type { SpacingToken } from '@/theme/tokens/spacing';

export type ColorKeys =
  | 'color'
  | 'backgroundColor'
  | 'borderColor'
  | 'borderTopColor'
  | 'borderBottomColor'
  | 'borderLeftColor'
  | 'borderRightColor'
  | 'tintColor'
  | 'shadowColor';

export type SpacingKeys =
  | 'padding'
  | 'paddingTop'
  | 'paddingBottom'
  | 'paddingLeft'
  | 'paddingRight'
  | 'paddingHorizontal'
  | 'paddingVertical'
  | 'paddingStart'
  | 'paddingEnd'
  | 'margin'
  | 'marginTop'
  | 'marginBottom'
  | 'marginLeft'
  | 'marginRight'
  | 'marginHorizontal'
  | 'marginVertical'
  | 'marginStart'
  | 'marginEnd'
  | 'gap'
  | 'rowGap'
  | 'columnGap';

export type TokenizeStyle<T extends object> = Omit<
  T,
  ColorKeys | 'borderRadius' | SpacingKeys
> & {
  [K in ColorKeys & keyof T]?: ColorToken;
} & {
  borderRadius?: RadiusToken;
} & {
  [K in SpacingKeys & keyof T]?: SpacingToken;
};
