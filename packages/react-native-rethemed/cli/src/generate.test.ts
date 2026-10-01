import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { themeConfig } from './__fixtures__/theme';
import { generate } from './generate';
import { loadTheme } from './load-theme';

const fixture = () =>
  generate({
    config: themeConfig,
    themeImport: { specifier: './theme', exportName: 'themeConfig' },
    command: 'react-native-rethemed codegen src/__fixtures__/theme.ts',
  });

describe('generate', () => {
  it('matches the committed fixture (also type-checked via usage.ts)', async () => {
    // Update with `vitest -u` after an intentional generator change.
    await expect(fixture()).toMatchFileSnapshot('./__fixtures__/themed.gen.ts');
  });

  it('emits numeric spacing keys as number literals, sorted by value', () => {
    expect(fixture()).toContain(
      "export type SpacingToken =\n  | 0\n  | 'px'\n  | 0.5\n  | 1\n  | 2\n  | 4;",
    );
  });

  it('documents every token prop with its source table', () => {
    const source = fixture();
    expect(source).toMatch(
      /\| `bg\.default` \| #ffffff \| #111111 \|[\s\S]*?backgroundColor\?: ColorToken;/,
    );
    expect(source).toMatch(
      /`tokens\.radii`[\s\S]*?\| `md` \| 6 \|[\s\S]*?borderRadius\?: RadiusToken;/,
    );
  });

  it('shows what a typography preset reference resolves to', () => {
    expect(fixture()).toContain('| `md` (16) | 24 | 0.15 | `semibold` (600) |');
  });

  it('imports a default export under a local name', () => {
    const source = generate({
      config: themeConfig,
      themeImport: { specifier: './theme', exportName: 'default' },
    });
    expect(source).toContain("import themeConfig from './theme';");
    expect(source).toContain('createThemed<ThemedTypes>(themeConfig);');
  });

  it('degrades to `never` for categories the theme does not define', () => {
    const source = generate({
      config: {},
      themeImport: { specifier: './theme', exportName: 'default' },
    });
    expect(source).toContain('export type SemanticColorToken = never;');
    expect(source).toContain('export type PrimitiveColorToken = never;');
    expect(source).toContain('export interface ThemedTokens {}');
  });

  it('accepts primitive and semantic colors in color props', () => {
    const source = fixture();
    expect(source).toContain(
      "export type PrimitiveColorToken = 'white' | 'gray.950';",
    );
    expect(source).toContain(
      'export type ColorToken = SemanticColorToken | PrimitiveColorToken;',
    );
    // Both tables, semantic first, in every color prop's JSDoc.
    expect(source).toMatch(
      /`semanticTokens\.colors`: switch with light\/dark\. Prefer these\.[\s\S]*?`tokens\.colors`: Fixed colors, the same in light and dark\.[\s\S]*?backgroundColor\?: ColorToken;/,
    );
  });

  it('documents preset colors and types them as resolved per scheme', () => {
    const source = fixture();
    expect(source).toContain(
      '| `sm` (14) | – | `wide` (0.4) | – | light: #71717a, dark: #a1a1aa |',
    );
    expect(source).toContain("color: '#71717a' | '#a1a1aa';");
    expect(source).toContain("color: '#fafafa' | undefined;");
    // Presets without a color get no color column.
    expect(source).toMatch(
      /`semanticTokens\.text\.body\.md`\n\s+\*\n\s+\* \| fontSize \| lineHeight \| letterSpacing \| fontWeight \|\n/,
    );
  });

  it('shows a palette as a hue × shade grid', () => {
    const source = generate({
      config: {
        tokens: {
          colors: {
            white: '#ffffff',
            'red.50': '#fef2f2',
            'red.500': '#fb2c36',
            'blue.500': '#2b7fff',
          },
        },
      },
      themeImport: { specifier: './theme', exportName: 'default' },
    });
    expect(source).toContain(
      "A grid cell is the token `'<hue>.<shade>'`, e.g. `'red.500'`.",
    );
    expect(source).toContain(
      [
        '   * | token | value |',
        '   * |:--|:--|',
        '   * | `white` | #ffffff |',
        '   *',
        '   * | hue | 50 | 500 |',
        '   * |:--|:--|:--|',
        '   * | `red` | #fef2f2 | #fb2c36 |',
        '   * | `blue` | – | #2b7fff |',
      ].join('\n'),
    );
  });

  it('explains undefined categories instead of emitting empty tables', () => {
    const source = generate({
      config: { tokens: { radii: { md: 6 } } },
      themeImport: { specifier: './theme', exportName: 'default' },
    });
    expect(source).toMatch(
      /`semanticTokens\.colors` \/ `tokens\.colors`\n {3}\*\n {3}\* Not defined in this theme\. No color token is accepted here[^\n]*\n {3}\*\/\n {2}color\?: ColorToken;/,
    );
    expect(source).toMatch(
      /`tokens\.spacing`\n {3}\*\n {3}\* Not defined in this theme\.\n {3}\*\/\n {2}padding\?:/,
    );
    expect(source).not.toContain('| token | light | dark |');
    expect(source).toContain('colors: {};');
  });
});

describe('loadTheme', () => {
  const file = path.join(import.meta.dirname, '__fixtures__/theme.ts');

  it('picks the single ThemeConfig-looking export', async () => {
    const { config, exportName } = await loadTheme(file);
    expect(exportName).toBe('themeConfig');
    expect(config.tokens?.radii).toEqual({ none: 0, md: 6, full: 9999 });
  });

  it('rejects an export that is not a theme config', async () => {
    await expect(loadTheme(file, 'nope')).rejects.toThrow("Export 'nope' of");
  });
});
