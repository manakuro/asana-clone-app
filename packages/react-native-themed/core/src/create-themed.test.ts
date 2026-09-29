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

  it('passes through an input without tokens unchanged (no copy)', () => {
    const themed = createThemedStyles(config, 'light');
    const input = { flex: 1 };
    expect(themed.view(input)).toBe(input);
  });
});

describe('createThemedStyles / themed.text.<role>.<size>', () => {
  const themed = createThemedStyles(config, 'light');

  it('resolves token keys in a preset through tokens.*', () => {
    expect(themed.text.title.md()).toEqual({
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 1.375,
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
        lineHeight: 1.375,
        letterSpacing: 0.4,
      },
    );
  });

  it('keeps themed.text callable without a preset', () => {
    expect(themed.text({ color: 'fg.default' })).toEqual({ color: '#111' });
  });
});
