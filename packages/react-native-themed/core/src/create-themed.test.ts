import { describe, expect, expectTypeOf, it } from 'vitest';
import { createThemed } from './create-themed';
import { defineTheme } from './define-theme';

const config = defineTheme({
  tokens: {
    fontSizes: { md: 16, lg: 18 },
    fontWeights: { normal: '400', semibold: '600' },
    lineHeights: { short: 1.375 },
    letterSpacings: { wide: 0.4 },
  },
  semanticTokens: {
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

describe('createThemed / themed.text.<role>.<size>', () => {
  const themed = createThemed(config);

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

  it('infers roles and sizes from the config type', () => {
    expectTypeOf(themed.text.title.md).toBeFunction();
    expectTypeOf(themed.text.title.sm).toBeFunction();

    // @ts-expect-error -- undefined size
    themed.text.title.xxl;
    // @ts-expect-error -- undefined role
    themed.text.nope;
  });

  it('rejects presets referencing scale keys the config does not define', () => {
    const invalid = defineTheme({
      tokens: { fontSizes: { md: 16 } },
      semanticTokens: { text: { title: { md: { fontSize: 'nope' } } } },
    });
    // @ts-expect-error -- 'nope' is not a key of tokens.fontSizes
    createThemed(invalid);

    const noScale = defineTheme({
      semanticTokens: { text: { title: { md: { lineHeight: 'short' } } } },
    });
    // @ts-expect-error -- no tokens.lineHeights, so only raw numbers are valid
    createThemed(noScale);
  });
});
