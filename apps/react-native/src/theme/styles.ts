import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { getSnapshot } from './store/color-mode-store';
import { Colors, type ColorToken } from './tokens/colors';
import { Radii, type RadiusToken } from './tokens/radii';

type ColorKeys =
  | 'color'
  | 'backgroundColor'
  | 'borderColor'
  | 'borderTopColor'
  | 'borderBottomColor'
  | 'borderLeftColor'
  | 'borderRightColor'
  | 'tintColor'
  | 'shadowColor';

type TokenizeStyle<T extends object> = Omit<T, ColorKeys | 'borderRadius'> & {
  [K in ColorKeys & keyof T]?: ColorToken;
} & {
  borderRadius?: RadiusToken | number;
};

function getThemedColors() {
  const { scheme } = getSnapshot();
  return Object.fromEntries(
    (Object.keys(Colors) as (keyof typeof Colors)[]).map((key) => [
      key,
      Colors[key][scheme],
    ]),
  ) as { [K in keyof typeof Colors]: (typeof Colors)[K][typeof scheme] };
}

function resolveColor(colors: Record<string, unknown>, path: string): string {
  const value = path
    .split('.')
    .reduce<unknown>((acc, key) => (acc as any)?.[key], colors);
  return typeof value === 'string' ? value : path;
}

function resolveRadius(value: RadiusToken | number): number {
  return typeof value === 'number' ? value : Radii[value];
}

const COLOR_KEYS: ColorKeys[] = [
  'color',
  'backgroundColor',
  'borderColor',
  'borderTopColor',
  'borderBottomColor',
  'borderLeftColor',
  'borderRightColor',
  'tintColor',
  'shadowColor',
];

function resolveStyle<T extends object>(input: TokenizeStyle<T>): T {
  const colors = getThemedColors();
  const result = { ...input } as Record<string, unknown>;

  for (const key of COLOR_KEYS) {
    if (typeof result[key] === 'string') {
      result[key] = resolveColor(colors, result[key] as string);
    }
  }
  if (result.borderRadius !== undefined) {
    result.borderRadius = resolveRadius(
      result.borderRadius as RadiusToken | number,
    );
  }

  return result as T;
}

export const styles = {
  view: (input: TokenizeStyle<ViewStyle>) => resolveStyle<ViewStyle>(input),
  text: (input: TokenizeStyle<TextStyle>) => resolveStyle<TextStyle>(input),
  image: (input: TokenizeStyle<ImageStyle>) => resolveStyle<ImageStyle>(input),
};
