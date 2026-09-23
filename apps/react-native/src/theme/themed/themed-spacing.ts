import { type SpacingToken, spacing } from '@/theme/tokens/spacing';
import type { SpacingKeys } from './types';

const SPACING_KEYS: SpacingKeys[] = [
  'padding',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingHorizontal',
  'paddingVertical',
  'paddingStart',
  'paddingEnd',
  'margin',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginHorizontal',
  'marginVertical',
  'marginStart',
  'marginEnd',
  'gap',
  'rowGap',
  'columnGap',
];

function isSpacingToken(value: unknown): value is SpacingToken {
  return typeof value === 'string' || typeof value === 'number'
    ? Object.hasOwn(spacing, value)
    : false;
}

function resolveSpacing(value: unknown): unknown {
  return isSpacingToken(value) ? spacing[value] : value;
}

export function resolveSpacingStyle(
  input: Record<string, unknown>,
): Record<string, unknown> {
  const result = { ...input };

  for (const key of SPACING_KEYS) {
    if (key in result) {
      result[key] = resolveSpacing(result[key]);
    }
  }

  return result;
}
