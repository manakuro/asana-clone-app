import type { ShadowToken } from '../types';

/**
 * Expands the virtual `shadow` prop into real `shadowColor`/`shadowOffset`/
 * `shadowOpacity`/`shadowRadius`/`elevation` props in one shot. Unlike the
 * other resolvers this always clones when `shadow` is present (it has to
 * remove that key either way), but costs nothing when it's absent.
 */
export function createShadowResolver(shadows: Record<string, ShadowToken> | undefined) {
  if (!shadows) {
    return (input: Record<string, unknown>) => input;
  }

  return function resolveShadowStyle(input: Record<string, unknown>): Record<string, unknown> {
    if (!('shadow' in input)) return input;

    const { shadow, ...rest } = input;
    const preset = shadows[shadow as string];
    return preset ? { ...rest, ...preset } : rest;
  };
}
