import { type RadiusToken, radii } from '@/theme/tokens/radii';
import type { TokenizeStyle } from './types';

function resolveRadius(value: RadiusToken | number): number {
  return typeof value === 'number' ? value : radii[value];
}

export function resolveRadiusStyle<T extends object>(
  input: TokenizeStyle<T>,
): T {
  if (input.borderRadius !== undefined) {
    const result = { ...input } as Record<string, unknown>;
    result.borderRadius = resolveRadius(
      result.borderRadius as RadiusToken | number,
    );
    return result as T;
  }

  return input as T;
}
