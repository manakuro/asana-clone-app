import { getSnapshot } from '../store/color-mode-store';
import { colors } from '../tokens/colors';
import type { ColorKeys } from './types';

function getThemedColors() {
  const { scheme } = getSnapshot();
  return Object.fromEntries(
    (Object.keys(colors) as (keyof typeof colors)[]).map((key) => [
      key,
      colors[key][scheme],
    ]),
  ) as { [K in keyof typeof colors]: (typeof colors)[K][typeof scheme] };
}

function resolveColor(colors: Record<string, unknown>, path: string): string {
  const value = path
    .split('.')
    .reduce<unknown>((acc, key) => (acc as any)?.[key], colors);
  return typeof value === 'string' ? value : path;
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

export function resolveColorStyle(
  input: Record<string, unknown>,
): Record<string, unknown> {
  const colors = getThemedColors();
  let result = input as Record<string, unknown>;

  for (const key of COLOR_KEYS) {
    if (typeof (input as Record<string, unknown>)[key] === 'string') {
      if (result === input) {
        result = { ...input };
      }
      result[key] = resolveColor(colors, result[key] as string);
    }
  }

  return result;
}
