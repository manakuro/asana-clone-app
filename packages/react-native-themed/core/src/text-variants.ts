import type { TextStyle } from 'react-native';
import type { TextToken, ThemeConfig } from './types';

type TextVariant = (override?: object) => TextStyle;

/**
 * Builds `themed.text.<role>.<size>(override?)` by iterating whatever
 * roles/sizes `config.semanticTokens.text` defines — no hand-written
 * per-variant code. Each variant merges its preset with the caller's
 * override (preset first, override wins) and runs the result through the
 * same `resolve` as `themed.text()` itself, so presets referencing scale keys
 * (e.g. `fontSize: 'lg'`) resolve exactly like caller-passed tokens.
 *
 * Typed loosely on purpose; the exact role/size shape comes from the
 * generated `themed.gen.ts`.
 */
export function createTextVariants(
  config: ThemeConfig,
  resolve: (input: object) => TextStyle,
): Record<string, Record<string, TextVariant>> {
  const text = config.semanticTokens?.text;
  const textTokens: Record<string, Record<string, TextToken>> = text ?? {};

  return Object.fromEntries(
    Object.entries(textTokens).map(([role, sizes]) => [
      role,
      Object.fromEntries(
        Object.entries(sizes).map(([size, preset]) => [
          size,
          (override?: object) => resolve({ ...preset, ...override }),
        ]),
      ),
    ]),
  );
}
