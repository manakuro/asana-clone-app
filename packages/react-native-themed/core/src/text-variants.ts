import type { TextStyle } from 'react-native';
import type { ThemeConfig, TokenizeStyle } from './types';

type TextTokens<T extends ThemeConfig> = T['tokens'] extends { text: infer Tx }
  ? Tx
  : Record<string, never>;

export type TextVariants<T extends ThemeConfig> = {
  [Role in keyof TextTokens<T>]: {
    [Size in keyof TextTokens<T>[Role]]: (override?: TokenizeStyle<T, TextStyle>) => TextStyle;
  };
};

/**
 * Builds `themed.text.<role>.<size>(override?)` by iterating whatever
 * roles/sizes `config.tokens.text` defines — no hand-written per-variant
 * code, so a theme package's own role/size vocabulary flows straight through
 * to this typing. Each variant merges its preset with the caller's override
 * (preset first, override wins) and runs the result through the same
 * `resolve` as `themed.text()` itself.
 */
export function createTextVariants<T extends ThemeConfig>(
  config: T,
  resolve: (input: Record<string, unknown>) => TextStyle,
): TextVariants<T> {
  const textTokens = (config.tokens?.text ?? {}) as Record<string, Record<string, TextStyle>>;
  const roles = Object.keys(textTokens);

  return Object.fromEntries(
    roles.map((role) => {
      const sizes = Object.keys(textTokens[role]);

      const bySize = sizes.map((size) => {
        const preset = textTokens[role][size];
        const variant = (override?: Record<string, unknown>) =>
          resolve({ ...preset, ...override });
        return [size, variant] as const;
      });

      return [role, Object.fromEntries(bySize)] as const;
    }),
  ) as TextVariants<T>;
}
