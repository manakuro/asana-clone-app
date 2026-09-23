import { type RadiusToken, radii } from '@/theme/tokens/radii';
import type { RadiusKeys } from './types';

const RADIUS_KEYS: RadiusKeys[] = [
  'borderRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderTopStartRadius',
  'borderTopEndRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderBottomStartRadius',
  'borderBottomEndRadius',
  'borderStartStartRadius',
  'borderStartEndRadius',
  'borderEndStartRadius',
  'borderEndEndRadius',
];

export function resolveRadiusStyle(
  input: Record<string, unknown>,
): Record<string, unknown> {
  let result = input;

  for (const key of RADIUS_KEYS) {
    if (key in result) {
      if (result === input) {
        result = { ...input };
      }
      result[key] = radii[result[key] as RadiusToken];
    }
  }

  return result;
}
