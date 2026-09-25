import { describe, expect, expectTypeOf, it } from 'vitest';
import { createThemedStyles } from './create-themed-styles';
import { defineTheme } from './define-theme';
import { extendTheme } from './extend-theme';

const baseTheme = defineTheme({
  tokens: {
    fontSizes: { md: 16, lg: 18 },
  },
  semanticTokens: {
    text: {
      display: {
        lg: { fontSize: 57, lineHeight: 64 },
        md: { fontSize: 45, lineHeight: 52 },
        sm: { fontSize: 36, lineHeight: 44 },
      },
      body: {
        md: { fontSize: 14, lineHeight: 20 },
      },
    },
  },
});

describe('extendTheme / semanticTokens.text', () => {
  it('overrides a single size while keeping sibling sizes and other roles', () => {
    const config = extendTheme(baseTheme, {
      semanticTokens: { text: { display: { lg: { fontSize: 60 } } } },
    });

    // The size-level entry is replaced whole, not merged field by field.
    expect(config.semanticTokens.text.display.lg).toEqual({ fontSize: 60 });
    expect(config.semanticTokens.text.display.md).toEqual({
      fontSize: 45,
      lineHeight: 52,
    });
    expect(config.semanticTokens.text.display.sm).toEqual({
      fontSize: 36,
      lineHeight: 44,
    });
    expect(config.semanticTokens.text.body.md).toEqual({
      fontSize: 14,
      lineHeight: 20,
    });
  });

  it('lets later themes win', () => {
    const config = extendTheme(
      baseTheme,
      { semanticTokens: { text: { display: { lg: { fontSize: 60 } } } } },
      { semanticTokens: { text: { display: { lg: { fontSize: 72 } } } } },
    );

    expect(config.semanticTokens.text.display.lg).toEqual({ fontSize: 72 });
    expect(config.semanticTokens.text.display.md.fontSize).toBe(45);
  });

  it('no longer carries a text category under tokens', () => {
    const config = extendTheme(baseTheme, {
      tokens: { fontSizes: { xl: 20 } },
    });

    expect(config.tokens).not.toHaveProperty('text');
    expect(config.tokens.fontSizes).toEqual({ md: 16, lg: 18, xl: 20 });
  });

  it('surfaces a text group added by a local theme in themed.text.*', () => {
    const config = extendTheme(baseTheme, {
      semanticTokens: { text: { caption: { sm: { fontSize: 'md' } } } },
    });
    const themed = createThemedStyles(config, 'light');

    expectTypeOf(config.semanticTokens.text).toHaveProperty('caption');
    expectTypeOf(themed.text.caption.sm).toBeFunction();
    expectTypeOf(themed.text.display.lg).toBeFunction();
    expect(themed.text.caption.sm()).toEqual({ fontSize: 16 });
  });
});
