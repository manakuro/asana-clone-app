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
  | 'borderStartColor'
  | 'borderEndColor'
  | 'tintColor'
  | 'shadowColor'
  | 'outlineColor';

export type RadiusKeys =
  | 'borderRadius'
  | 'borderTopLeftRadius'
  | 'borderTopRightRadius'
  | 'borderTopStartRadius'
  | 'borderTopEndRadius'
  | 'borderBottomLeftRadius'
  | 'borderBottomRightRadius'
  | 'borderBottomStartRadius'
  | 'borderBottomEndRadius'
  | 'borderStartStartRadius'
  | 'borderStartEndRadius'
  | 'borderEndStartRadius'
  | 'borderEndEndRadius';

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
  ColorKeys | RadiusKeys | SpacingKeys
> & {
  [K in ColorKeys & keyof T]?: ColorToken;
} & {
  [K in RadiusKeys & keyof T]?: RadiusToken;
} & {
  [K in SpacingKeys & keyof T]?: SpacingToken;
};
