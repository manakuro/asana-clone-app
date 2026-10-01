import { describe, expect, it } from 'vitest';
import { createThemedStyles } from './create-themed-styles';
import { defineTheme } from './define-theme';
import { extendTheme } from './extend-theme';
import type { ThemeConfig } from './types';

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

/** Reads a node of the (loosely typed) text tree by path. */
const at = (config: ThemeConfig, ...path: string[]): unknown =>
  path.reduce<unknown>(
    (node, key) => (node as Record<string, unknown> | undefined)?.[key],
    config.semanticTokens?.text,
  );

describe('extendTheme / semanticTokens.text', () => {
  it('overrides a single size while keeping sibling sizes and other roles', () => {
    const config = extendTheme(baseTheme, {
      semanticTokens: { text: { display: { lg: { fontSize: 60 } } } },
    });

    // The preset is replaced whole, not merged field by field.
    expect(at(config, 'display', 'lg')).toEqual({ fontSize: 60 });
    expect(at(config, 'display', 'md')).toEqual({
      fontSize: 45,
      lineHeight: 52,
    });
    expect(at(config, 'display', 'sm')).toEqual({
      fontSize: 36,
      lineHeight: 44,
    });
    expect(at(config, 'body', 'md')).toEqual({ fontSize: 14, lineHeight: 20 });
  });

  it('lets later themes win', () => {
    const config = extendTheme(
      baseTheme,
      { semanticTokens: { text: { display: { lg: { fontSize: 60 } } } } },
      { semanticTokens: { text: { display: { lg: { fontSize: 72 } } } } },
    );

    expect(at(config, 'display', 'lg')).toEqual({ fontSize: 72 });
    expect(at(config, 'display', 'md', 'fontSize')).toBe(45);
  });

  it('merges groups at any depth and replaces presets whole', () => {
    const config = extendTheme(
      {
        semanticTokens: {
          text: {
            heading: {
              display: { lg: { fontSize: 57 }, md: { fontSize: 45 } },
              page: { fontSize: 24 },
            },
          },
        },
      },
      {
        semanticTokens: {
          text: {
            heading: { display: { lg: { fontSize: 60, lineHeight: 64 } } },
          },
        },
      },
    );

    expect(at(config, 'heading', 'display', 'lg')).toEqual({
      fontSize: 60,
      lineHeight: 64,
    });
    expect(at(config, 'heading', 'display', 'md')).toEqual({ fontSize: 45 });
    expect(at(config, 'heading', 'page')).toEqual({ fontSize: 24 });
  });

  it('lets a later preset replace a group and vice versa', () => {
    const toPreset = extendTheme(
      { semanticTokens: { text: { caption: { sm: { fontSize: 12 } } } } },
      { semanticTokens: { text: { caption: { fontSize: 11 } } } },
    );
    expect(at(toPreset, 'caption')).toEqual({ fontSize: 11 });

    const toGroup = extendTheme(
      { semanticTokens: { text: { caption: { fontSize: 11 } } } },
      { semanticTokens: { text: { caption: { sm: { fontSize: 12 } } } } },
    );
    expect(at(toGroup, 'caption')).toEqual({ sm: { fontSize: 12 } });
  });

  it('merges flat token categories one level deep', () => {
    const config = extendTheme(baseTheme, {
      tokens: { fontSizes: { xl: 20 } },
    });

    expect(config.tokens).not.toHaveProperty('text');
    expect(config.tokens?.fontSizes).toEqual({ md: 16, lg: 18, xl: 20 });
  });

  it('surfaces a text group added by a local theme in themed.text.*', () => {
    const config = extendTheme(baseTheme, {
      semanticTokens: { text: { caption: { sm: { fontSize: 'md' } } } },
    });
    const themed = createThemedStyles(config, 'light');

    expect(themed.text.caption.sm()).toEqual({ fontSize: 16 });
    expect(themed.text.display.lg()).toEqual({ fontSize: 57, lineHeight: 64 });
  });
});

describe('extendTheme / defaults', () => {
  it('merges defaults with later themes winning', () => {
    expect(
      extendTheme(baseTheme, { defaults: { fontSize: 'md' } }).defaults,
    ).toEqual({ fontSize: 'md' });
    expect(
      extendTheme(
        { defaults: { fontSize: 'md' } },
        { defaults: { fontSize: 18 } },
      ).defaults,
    ).toEqual({ fontSize: 18 });
    expect(extendTheme(baseTheme, {})).not.toHaveProperty('defaults');
  });
});

describe('extendTheme / text presets with color', () => {
  it('replaces a preset whole, including its color object', () => {
    const merged = extendTheme(
      {
        semanticTokens: {
          text: { caption: { fontSize: 12, color: { light: '#111' } } },
        },
      },
      { semanticTokens: { text: { caption: { fontSize: 13 } } } },
    );
    expect(merged.semanticTokens?.text).toEqual({ caption: { fontSize: 13 } });
  });
});
