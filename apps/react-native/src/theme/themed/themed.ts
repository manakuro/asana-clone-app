import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { createTextVariants } from './text-variants';
import { resolveColorStyle } from './themed-color';
import { resolveRadiusStyle } from './themed-radius';
import { resolveSpacingStyle } from './themed-spacing';
import type { TokenizeStyle } from './types';

function resolveStyle<T extends object>(input: TokenizeStyle<T>): T {
  let result = input as Record<string, unknown>;
  result = resolveColorStyle(result);
  result = resolveRadiusStyle(result);
  result = resolveSpacingStyle(result);
  return result as T;
}

const text = Object.assign(
  (input: TokenizeStyle<TextStyle> = {}) => resolveStyle<TextStyle>(input),
  createTextVariants((input) => resolveStyle<TextStyle>(input)),
);

export const themed = {
  view: (input: TokenizeStyle<ViewStyle>) => resolveStyle<ViewStyle>(input),
  text,
  image: (input: TokenizeStyle<ImageStyle>) => resolveStyle<ImageStyle>(input),
};
