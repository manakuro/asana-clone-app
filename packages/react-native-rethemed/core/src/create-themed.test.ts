import { describe, expect, it } from 'vitest';
import { createThemedStyles } from './create-themed-styles';
import { defineTheme } from './define-theme';

const config = defineTheme({
  tokens: {
    radii: { md: 6 },
    spacing: { 1: 4, 0.5: 2 },
    fontSizes: { md: 16, lg: 18 },
    fontWeights: { normal: '400', semibold: '600' },
    lineHeights: { short: 1.375 },
    letterSpacings: { wide: 0.4 },
    shadows: {
      sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      },
    },
  },
  semanticTokens: {
    colors: {
      fg: { default: { light: '#111', dark: '#fff' } },
    },
    text: {
      title: {
        md: {
          fontSize: 'lg',
          fontWeight: 'semibold',
          lineHeight: 'short',
          letterSpacing: 'wide',
        },
        sm: { fontSize: 14, lineHeight: 20, letterSpacing: 0.1 },
      },
    },
  },
});

describe('createThemedStyles / themed.view', () => {
  it('resolves color, radius, spacing and shadow tokens', () => {
    const themed = createThemedStyles(config, 'dark');
    expect(
      themed.view({
        backgroundColor: 'fg.default',
        borderRadius: 'md',
        padding: 1,
        margin: 0.5,
        shadow: 'sm',
      }),
    ).toEqual({
      backgroundColor: '#fff',
      borderRadius: 6,
      padding: 4,
      margin: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    });
  });

  it('resolves logical spacing and the extra color props', () => {
    const themed = createThemedStyles(config, 'light');
    expect(
      themed.view({
        paddingBlock: 1,
        marginInlineStart: 0.5,
        borderBlockColor: 'fg.default',
      }),
    ).toEqual({
      paddingBlock: 4,
      marginInlineStart: 2,
      borderBlockColor: '#111',
    });
    expect(
      themed.text({
        textShadowColor: 'fg.default',
        textDecorationColor: 'fg.default',
      }),
    ).toEqual({ textShadowColor: '#111', textDecorationColor: '#111' });
    expect(themed.image({ overlayColor: 'fg.default' })).toEqual({
      overlayColor: '#111',
    });
  });

  it('resolves a zIndex token and keeps a raw zIndex', () => {
    const themed = createThemedStyles(
      defineTheme({ tokens: { zIndices: { base: 0, modal: 1400 } } }),
      'light',
    );
    expect(themed.view({ zIndex: 'modal' })).toEqual({ zIndex: 1400 });
    expect(themed.view({ zIndex: 5 })).toEqual({ zIndex: 5 });
  });

  it('never mutates the input', () => {
    const themed = createThemedStyles(config, 'light');
    const input = { backgroundColor: 'fg.default', padding: 1, shadow: 'sm' };
    const snapshot = { ...input };
    themed.view(input);
    expect(input).toEqual(snapshot);
  });

  it('lets a shadow preset win over explicit shadow props, in any key order', () => {
    const themed = createThemedStyles(config, 'light');
    expect(themed.view({ shadow: 'sm', shadowColor: 'fg.default' })).toEqual(
      themed.view({ shadowColor: 'fg.default', shadow: 'sm' }),
    );
    expect(
      themed.view({ shadow: 'sm', shadowColor: 'fg.default' }).shadowColor,
    ).toBe('#000');
  });

  it('drops an unknown shadow preset and keeps unknown tokens as-is', () => {
    const themed = createThemedStyles(config, 'light');
    expect(themed.view({ shadow: 'nope', padding: 99 } as never)).toEqual({
      padding: 99,
    });
  });

  it('passes through an input without tokens unchanged (no copy)', () => {
    const themed = createThemedStyles(config, 'light');
    const input = { flex: 1 };
    expect(themed.view(input)).toBe(input);
  });
});

describe('createThemedStyles / primitive colors', () => {
  const withPrimitives = defineTheme({
    tokens: {
      colors: { white: '#ffffff', 'red.500': '#ef4444', 'fg.default': '#f00' },
    },
    semanticTokens: {
      colors: { fg: { default: { light: '#111', dark: '#fff' } } },
    },
  });

  it('accepts tokens.colors in color props, the same in every scheme', () => {
    for (const scheme of ['light', 'dark'] as const) {
      const themed = createThemedStyles(withPrimitives, scheme);
      expect(
        themed.view({ backgroundColor: 'red.500', borderColor: 'white' }),
      ).toEqual({ backgroundColor: '#ef4444', borderColor: '#ffffff' });
    }
  });

  it('lets a semantic color win over a primitive with the same name', () => {
    expect(
      createThemedStyles(withPrimitives, 'dark').text({ color: 'fg.default' }),
    ).toEqual({ color: '#fff' });
  });

  it('works for a theme with primitive colors only', () => {
    const themed = createThemedStyles(
      defineTheme({ tokens: { colors: { black: '#000000' } } }),
      'light',
    );
    expect(themed.text({ color: 'black' })).toEqual({ color: '#000000' });
  });
});

describe('createThemedStyles / text preset colors', () => {
  const withColors = defineTheme({
    tokens: { fontSizes: { sm: 14 } },
    semanticTokens: {
      colors: { fg: { muted: { light: '#666', dark: '#999' } } },
      text: {
        caption: {
          fontSize: 'sm',
          color: { light: '#111', dark: '#fff' },
        },
        onDark: { fontSize: 'sm', color: { dark: '#eee' } },
        fixed: { fontSize: 'sm', color: '#777' },
      },
    },
  });

  it('picks the preset color for the current scheme', () => {
    expect(createThemedStyles(withColors, 'light').text.caption()).toEqual({
      fontSize: 14,
      color: '#111',
    });
    expect(createThemedStyles(withColors, 'dark').text.caption()).toEqual({
      fontSize: 14,
      color: '#fff',
    });
  });

  it('sets no color in a scheme the preset leaves out', () => {
    expect(createThemedStyles(withColors, 'light').text.onDark()).toEqual({
      fontSize: 14,
    });
    expect(createThemedStyles(withColors, 'dark').text.onDark()).toEqual({
      fontSize: 14,
      color: '#eee',
    });
  });

  it('uses a string color in both schemes', () => {
    expect(createThemedStyles(withColors, 'dark').text.fixed().color).toBe(
      '#777',
    );
  });

  it('lets the override color (a token) win over the preset color', () => {
    expect(
      createThemedStyles(withColors, 'dark').text.caption({
        color: 'fg.muted',
      }),
    ).toEqual({ fontSize: 14, color: '#999' });
  });
});

describe('createThemedStyles / themed.text.<role>.<size>', () => {
  const themed = createThemedStyles(config, 'light');

  it('resolves token keys in a preset through tokens.*', () => {
    expect(themed.text.title.md()).toEqual({
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 24.75, // 18 × 1.375
      letterSpacing: 0.4,
    });
  });

  it('passes raw preset values through unchanged', () => {
    expect(themed.text.title.sm()).toEqual({
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.1,
    });
  });

  it('lets the override win and resolves its tokens too', () => {
    expect(themed.text.title.md({ fontSize: 'md', fontWeight: '700' })).toEqual(
      {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 22, // recomputed for the overridden fontSize: 16 × 1.375
        letterSpacing: 0.4,
      },
    );
  });

  it('keeps themed.text callable without a preset', () => {
    expect(themed.text({ color: 'fg.default' })).toEqual({ color: '#111' });
  });
});

describe('createThemedStyles / lineHeight ratios', () => {
  it('multiplies a lineHeight token by the fontSize in the same style', () => {
    const themed = createThemedStyles(config, 'light');
    expect(themed.text({ fontSize: 'md', lineHeight: 'short' })).toEqual({
      fontSize: 16,
      lineHeight: 22,
    });
    expect(themed.text({ fontSize: 20, lineHeight: 'short' })).toEqual({
      fontSize: 20,
      lineHeight: 27.5,
    });
  });

  it('keeps a raw lineHeight number absolute', () => {
    const themed = createThemedStyles(config, 'light');
    expect(themed.text({ fontSize: 'lg', lineHeight: 30 })).toEqual({
      fontSize: 18,
      lineHeight: 30,
    });
  });

  it('falls back to defaults.fontSize (a fontSizes key or a number)', () => {
    const byKey = createThemedStyles(
      defineTheme({ ...config, defaults: { fontSize: 'lg' } }),
      'light',
    );
    expect(byKey.text({ lineHeight: 'short' })).toEqual({ lineHeight: 24.75 });

    const byNumber = createThemedStyles(
      defineTheme({ ...config, defaults: { fontSize: 12 } }),
      'light',
    );
    expect(byNumber.text({ lineHeight: 'short' })).toEqual({
      lineHeight: 16.5,
    });
  });

  it("falls back to React Native's default (14) without defaults", () => {
    const themed = createThemedStyles(config, 'light');
    expect(themed.text({ lineHeight: 'short' })).toEqual({ lineHeight: 19.25 });
  });
});

describe('createThemedStyles / text presets at any depth', () => {
  const themed = createThemedStyles(
    defineTheme({
      tokens: { fontSizes: { xs: 12, xl: 20 } },
      semanticTokens: {
        text: {
          caption: { fontSize: 'xs', fontWeight: '500' },
          heading: {
            display: { lg: { fontSize: 'xl', fontWeight: 'bold' } },
            page: { fontSize: 24 },
          },
        },
      },
    }),
    'light',
  );

  it('calls a top-level preset directly', () => {
    expect(themed.text.caption()).toEqual({ fontSize: 12, fontWeight: '500' });
  });

  it('calls presets nested deeper than two levels', () => {
    expect(themed.text.heading.display.lg({ fontWeight: '800' })).toEqual({
      fontSize: 20,
      fontWeight: '800',
    });
    expect(themed.text.heading.page()).toEqual({ fontSize: 24 });
  });
});
