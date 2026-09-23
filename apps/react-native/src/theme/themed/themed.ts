import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { resolveColorStyle } from './themed-color';
import { resolveRadiusStyle } from './themed-radius';
import type { TokenizeStyle } from './types';

function resolveStyle<T extends object>(input: TokenizeStyle<T>): T {
  let result = { ...input } as Record<string, unknown>;
  result = resolveColorStyle(result);
  result = resolveRadiusStyle(result);
  return result as T;
}

export const themed = {
  view: (input: TokenizeStyle<ViewStyle>) => resolveStyle<ViewStyle>(input),
  text: (input: TokenizeStyle<TextStyle>) => resolveStyle<TextStyle>(input),
  image: (input: TokenizeStyle<ImageStyle>) => resolveStyle<ImageStyle>(input),
};
