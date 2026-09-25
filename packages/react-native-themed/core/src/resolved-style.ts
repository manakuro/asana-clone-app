import type { ColorScheme } from './resolvers/color-resolver';
import type {
  ColorKeys,
  FontSizeKeys,
  FontWeightKeys,
  LetterSpacingKeys,
  LineHeightKeys,
  RadiusKeys,
  SpacingKeys,
} from './style-props';

/**
 * Type-level mirror of the runtime resolvers: given the literal input passed
 * to `themed.view()`/`text()`/`image()`, computes the literal output (e.g.
 * `{ backgroundColor: 'bg.subtle' }` -> `{ backgroundColor: '#fafafa' }`).
 * Values the config doesn't declare `as const` fall back to their declared
 * type, and anything that isn't a token passes through unchanged — exactly
 * like the runtime.
 */

type TokenScale<T, K extends string> = T extends {
  tokens: { [P in K]: infer S };
}
  ? S
  : never;

type ScaleValue<Scale, V> = [Scale] extends [never]
  ? V
  : V extends keyof Scale
    ? Scale[V]
    : V;

/** `'group.token'` -> the value for scheme `S` (a union when `S` is). */
type SemanticColorValue<T, S extends ColorScheme, V> = T extends {
  semanticTokens: { colors: infer Groups };
}
  ? V extends `${infer G}.${infer Tk}`
    ? G extends keyof Groups
      ? Tk extends keyof Groups[G]
        ? Groups[G][Tk] extends { [P in S]: infer C }
          ? C
          : V
        : V
      : V
    : V
  : V;

// Distributes over `V` so optional (`| undefined`) and union inputs resolve
// member by member.
type ResolveValue<T, S extends ColorScheme, K, V> = V extends undefined
  ? V
  : K extends ColorKeys
    ? SemanticColorValue<T, S, V>
    : K extends RadiusKeys
      ? ScaleValue<TokenScale<T, 'radii'>, V>
      : K extends SpacingKeys
        ? ScaleValue<TokenScale<T, 'spacing'>, V>
        : K extends FontSizeKeys
          ? ScaleValue<TokenScale<T, 'fontSizes'>, V>
          : K extends FontWeightKeys
            ? ScaleValue<TokenScale<T, 'fontWeights'>, V>
            : K extends LineHeightKeys
              ? ScaleValue<TokenScale<T, 'lineHeights'>, V>
              : K extends LetterSpacingKeys
                ? ScaleValue<TokenScale<T, 'letterSpacings'>, V>
                : V;

/** The virtual `shadow` prop expands into its preset's real props. */
type ShadowProps<T, I> = I extends { shadow: infer P }
  ? P extends keyof TokenScale<T, 'shadows'>
    ? TokenScale<T, 'shadows'>[P]
    : unknown
  : unknown;

type Prettify<O> = { -readonly [K in keyof O]: O[K] } & {};

export type ResolvedStyle<T, S extends ColorScheme, I> = Prettify<
  {
    [K in keyof I as K extends 'shadow' ? never : K]: ResolveValue<
      T,
      S,
      K,
      I[K]
    >;
  } & ShadowProps<T, I>
>;

/**
 * Rejects keys `Shape` doesn't know about. Needed because a generic `I`
 * inferred from an object literal skips TypeScript's excess-property check,
 * so a typo like `backgroundColour` would otherwise compile.
 */
export type NoExtraKeys<I, Shape> = {
  [K in Exclude<keyof I, keyof Shape>]: never;
};
