import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { themeConfig } from './__fixtures__/theme';
import { generate } from './generate';
import { loadTheme } from './load-theme';

const fixture = () =>
  generate({
    config: themeConfig,
    themeImport: { specifier: './theme', exportName: 'themeConfig' },
    command: 'react-native-themed typegen src/__fixtures__/theme.ts',
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
    expect(source).toContain('export type ColorToken = never;');
    expect(source).toContain('export interface ThemedTokens {}');
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
