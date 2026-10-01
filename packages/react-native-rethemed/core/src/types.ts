import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import type {
  ColorKeys,
  FontSizeKeys,
  FontWeightKeys,
  LetterSpacingKeys,
  LineHeightKeys,
  RadiusKeys,
  SpacingKeys,
  ZIndexKeys,
} from './style-props';

/** One shadow preset — expands into these real RN style props. */
export type ShadowToken = Pick<
  ViewStyle,
  | 'shadowColor'
  | 'shadowOffset'
  | 'shadowOpacity'
  | 'shadowRadius'
  | 'elevation'
>;

/**
 * One `role`/`size` entry in `semanticTokens.text` (Material Design 3
 * type-scale shape). Each field is either a key of the matching primitive
 * scale in `tokens` (e.g. `fontSize: 'lg'`) or a raw value. References are
 * validated by `@react-native-rethemed/cli codegen` against the final config,
 * since a partial theme may reference keys supplied by another theme it is
 * later merged with.
 *
 * `color` is optional: type-scale packages (Material Design) leave it out,
 * while an app's own presets (`caption`, `link`, …) may set it.
 */
export type TextToken = {
  /** A `tokens.fontSizes` key (`'lg'`) or a raw size (`18`). */
  fontSize?: string | number;
  /**
   * A `tokens.lineHeights` key (`'short'` — a ratio of `fontSize`) or a raw,
   * absolute line height (`24`).
   */
  lineHeight?: string | number;
  /** A `tokens.letterSpacings` key (`'wide'`) or a raw value (`0.15`). */
  letterSpacing?: string | number;
  /** A `tokens.fontWeights` key (`'semibold'`) or a raw RN weight (`'600'`). */
  fontWeight?: string | TextStyle['fontWeight'];
  /**
   * A raw color, the same in light and dark (`colorTokens['gray.500']`), or
   * one per scheme. A scheme left out gets no color from the preset, so the
   * surrounding style (or React Native's default) applies there.
   *
   * @example
   * color: { light: colorTokens['gray.950'], dark: colorTokens.white }
   * color: { dark: colorTokens.white } // light: no color from the preset
   */
  color?: TextColor;
};

/** `TextToken['color']`: one raw color, or one per scheme. */
export type TextColor = string | { light?: string; dark?: string };

/**
 * `semanticTokens.text`: groups of any depth whose leaves are presets.
 * See `isTextPreset` for how leaves and groups are told apart.
 */
export type TextTokenTree = { [key: string]: TextToken | TextTokenTree };

/**
 * The shape a theme package (or an app's local override) must satisfy.
 * `tokens` holds primitive values (the smallest design-system units);
 * `semanticTokens` holds role-named values built on top of them — the
 * scheme-dependent `colors` and the `text` type scale — mirroring Chakra
 * UI's `tokens` vs `semanticTokens` distinction.
 */
export type ThemeConfig = {
  /**
   * Primitive, scheme-independent values. Keys are the token names used in
   * styles (`themed.view({ padding: 4 })`).
   */
  tokens?: {
    /**
     * Fixed colors, the same in light and dark. Color style props accept
     * them by name (`themed.view({ backgroundColor: 'red.500' })`) alongside
     * `semanticTokens.colors`; when both define a name, the semantic color
     * wins. Prefer semantic colors for anything that should follow the color
     * scheme. Also readable via `useThemed().tokens.colors`.
     *
     * @example
     * colors: { white: '#ffffff', 'gray.50': '#fafafa', 'gray.950': '#111111' }
     */
    colors?: Record<string, string>;
    /**
     * For `borderRadius` and every corner-radius variant.
     *
     * @example
     * radii: { none: 0, sm: 4, md: 6, lg: 8, full: 9999 }
     */
    radii?: Record<string, number>;
    /**
     * For `padding*`, `margin*`, `gap`, `rowGap` and `columnGap`. Numeric
     * keys are used as numbers: `themed.view({ padding: 4 })`.
     *
     * @example
     * spacing: { px: 1, 0: 0, 0.5: 2, 1: 4, 2: 8, 4: 16 }
     */
    spacing?: Record<string, number>;
    /**
     * For `fontSize`.
     *
     * @example
     * fontSizes: { sm: 14, md: 16, lg: 18, xl: 20 }
     */
    fontSizes?: Record<string, number>;
    /**
     * For `fontWeight`.
     *
     * @example
     * fontWeights: { normal: '400', medium: '500', semibold: '600', bold: '700' }
     */
    fontWeights?: Record<string, TextStyle['fontWeight']>;
    /**
     * For `lineHeight`, as **ratios of `fontSize`** (like CSS unitless
     * line-height). A token resolves to `fontSize × ratio`, using the
     * `fontSize` in the same style or else `defaults.fontSize`. A raw number
     * passed to `lineHeight` stays an absolute value, as in React Native.
     *
     * @example
     * lineHeights: { shorter: 1.25, short: 1.375, moderate: 1.5, tall: 1.625 }
     * // themed.text({ fontSize: 'lg', lineHeight: 'short' })
     * // → { fontSize: 18, lineHeight: 24.75 }
     */
    lineHeights?: Record<string, number>;
    /**
     * For `letterSpacing`, in points.
     *
     * @example
     * letterSpacings: { tight: -0.4, normal: 0, wide: 0.4 }
     */
    letterSpacings?: Record<string, number>;
    /**
     * For `zIndex`, which also accepts a raw number.
     *
     * @example
     * zIndices: { base: 0, dropdown: 1000, modal: 1400, toast: 1700 }
     * // themed.view({ zIndex: 'modal' }) → { zIndex: 1400 }
     */
    zIndices?: Record<string, number>;
    /**
     * Presets for the virtual `shadow` prop, which expands to these RN props.
     *
     * @example
     * shadows: {
     *   sm: {
     *     shadowColor: '#000000',
     *     shadowOffset: { width: 0, height: 1 },
     *     shadowOpacity: 0.1,
     *     shadowRadius: 2,
     *     elevation: 2,
     *   },
     * }
     */
    shadows?: Record<string, ShadowToken>;
  };
  /** Role-named values built on top of `tokens`. */
  semanticTokens?: {
    /**
     * group -> token -> scheme. Used in styles as `'group.token'`
     * (`themed.view({ backgroundColor: 'bg.subtle' })`) and switched with
     * the current light/dark scheme. Takes precedence over a
     * `tokens.colors` entry with the same name.
     *
     * @example
     * colors: {
     *   bg: {
     *     default: { light: '#ffffff', dark: '#111111' },
     *     subtle: { light: '#fafafa', dark: '#18181b' },
     *   },
     *   fg: {
     *     default: { light: '#111111', dark: '#fafafa' },
     *   },
     * }
     */
    colors?: Record<string, Record<string, { light: string; dark: string }>>;
    /**
     * Typography presets, as a tree of any depth. A node whose values are
     * all primitives is a **preset** (`TextToken`); a node of objects is a
     * **group**. Each preset is called by its path:
     * `themed.text.<path>(override?)`. Fields reference `tokens` keys or
     * take raw values (see `TextToken`).
     *
     * @example
     * text: {
     *   // role -> size (Material Design 3 style)
     *   title: {
     *     md: { fontSize: 'md', lineHeight: 'moderate', fontWeight: 'semibold' },
     *     sm: { fontSize: 14, lineHeight: 20, fontWeight: '500' },
     *   },
     *   // flat: themed.text.caption()
     *   caption: { fontSize: 'xs', lineHeight: 'short' },
     *   // deeper: themed.text.heading.display.lg()
     *   heading: { display: { lg: { fontSize: '4xl', fontWeight: 'bold' } } },
     * }
     */
    text?: TextTokenTree;
  };
  /** Theme-wide defaults. */
  defaults?: {
    /**
     * The base font size: a `tokens.fontSizes` key or a raw size. Used to
     * resolve a `lineHeight` token when the style has no `fontSize` of its
     * own. Falls back to 14 (React Native's default) when unset.
     *
     * @example
     * defaults: { fontSize: 'md' }
     * // with fontSizes.md = 16:
     * // themed.text({ lineHeight: 'short' }) → { lineHeight: 22 } (16 × 1.375)
     */
    fontSize?: string | number;
  };
};

// ---------------------------------------------------------------------------
// Schema — the slot the generated `themed.gen.ts` fills in
// ---------------------------------------------------------------------------

/**
 * Exact token types for one theme. Written by
 * `@react-native-rethemed/cli codegen` from the evaluated config, never by
 * hand, so core never has to infer token names from literal types.
 */
export type ThemedSchema = {
  /**
   * Every token-aware style prop (plus the virtual `shadow`). Each primitive
   * only picks the props its RN style type actually has — see `TokenizeStyle`.
   */
  style: object;
  /** `themed.text.<role>.<size>(override?)` */
  textVariants: object;
  /** `useThemed().tokens` */
  tokens: object;
  /** `useThemed().semanticTokens`, colors resolved for the current scheme. */
  semanticTokens: object;
};

/**
 * Swaps `Base`'s token-bearing props for the token-aware ones in `P`.
 * `Omit` + `Pick` only — one level, no recursion. `Pick` is homomorphic, so
 * the generated JSDoc (token tables) survives into editor hovers.
 *
 * Only props `Base` actually has are picked (e.g. no `color` on `View`); the
 * virtual `shadow` prop is kept when `Base` has real shadow props.
 */
export type TokenizeStyle<Base, P> = Omit<Base, keyof P> &
  Pick<
    P,
    Extract<
      keyof P,
      keyof Base | ('shadowColor' extends keyof Base ? 'shadow' : never)
    >
  >;

export type ThemedStyles<S extends ThemedSchema> = {
  /** Resolves token values in a `View` style. */
  view: (style: TokenizeStyle<ViewStyle, S['style']>) => ViewStyle;
  /** Resolves token values in an `Image` style. */
  image: (style: TokenizeStyle<ImageStyle, S['style']>) => ImageStyle;
  /**
   * Resolves token values in a `Text` style. Typography presets are
   * available as `themed.text.<role>.<size>(override?)`.
   */
  text: ((style?: TokenizeStyle<TextStyle, S['style']>) => TextStyle) &
    S['textVariants'];
};

// ---------------------------------------------------------------------------
// Fallback when codegen has not been run: usable, but no token names
// ---------------------------------------------------------------------------

type LooseTokenKeys =
  | ColorKeys
  | RadiusKeys
  | SpacingKeys
  | FontSizeKeys
  | FontWeightKeys
  | LineHeightKeys
  | LetterSpacingKeys
  | ZIndexKeys
  | 'shadow';

type LooseStyle = { [K in LooseTokenKeys]?: string | number };

/** Any path under `themed.text`, callable at the leaves. */
type LooseTextVariants = {
  [key: string]: ((
    override?: TokenizeStyle<TextStyle, LooseStyle>,
  ) => TextStyle) &
    LooseTextVariants;
};

export type LooseSchema = {
  style: LooseStyle;
  textVariants: LooseTextVariants;
  tokens: NonNullable<ThemeConfig['tokens']>;
  semanticTokens: {
    colors: Record<string, Record<string, string>>;
    text: NonNullable<NonNullable<ThemeConfig['semanticTokens']>['text']>;
  };
};
