import type { ColorToken } from '@/theme/tokens/colors';
import type { RadiusToken } from '@/theme/tokens/radii';

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

export type TokenizeStyle<T extends object> = Omit<
  T,
  ColorKeys | 'borderRadius'
> & {
  [K in ColorKeys & keyof T]?: ColorToken;
} & {
  borderRadius?: RadiusToken | number;
};
