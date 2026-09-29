import { describe, expect, it } from 'vitest';
import { themeConfig } from './__fixtures__/theme';
import { generateDocs } from './docs';

const fixture = () =>
  generateDocs({
    config: themeConfig,
    themeFile: 'src/__fixtures__/theme.ts',
    genFile: 'src/__fixtures__/themed.gen.ts',
    command:
      'react-native-themed codegen src/__fixtures__/theme.ts --docs src/__fixtures__/themed.md',
  });

describe('generateDocs', () => {
  it('matches the committed fixture', async () => {
    // Update with `vitest -u` after an intentional change.
    await expect(fixture()).toMatchFileSnapshot('./__fixtures__/themed.md');
  });

  it('builds the usage example from real token names', () => {
    const docs = fixture();
    expect(docs).toContain("backgroundColor: 'bg.default',");
    expect(docs).toContain("borderRadius: 'md',");
    expect(docs).toContain('padding: 4,');
    expect(docs).toContain(
      "<Text style={themed.text.title.md({ color: 'fg.default' })}>",
    );
  });

  it('groups semantic colors and resolves preset references', () => {
    const docs = fixture();
    expect(docs).toContain('### bg\n\n| token | light | dark |');
    expect(docs).toContain(
      '| `title.md` | `md` (16) | 24 | 0.15 | `semibold` (600) |',
    );
  });

  it('lists presets of any depth, one table per group', () => {
    const docs = fixture();
    // Top-level presets come first, without a group heading.
    expect(docs).toMatch(
      /## Text presets\n\n[^\n]+\n\n\| preset \|[^\n]+\n\|[^\n]+\n\| `caption` \|/,
    );
    expect(docs).toContain('### heading.display\n\n| preset |');
    expect(docs).toContain(
      '| `heading.display.lg` | 36 | 44 | – | `semibold` (600) |',
    );
  });

  it('omits sections the theme does not define', () => {
    const docs = generateDocs({
      config: { tokens: { radii: { sm: 4 } } },
      themeFile: 'theme.ts',
      genFile: 'themed.gen.ts',
    });
    expect(docs).toContain('## Radii');
    expect(docs).not.toContain('## Semantic colors');
    expect(docs).not.toContain('## Shadows');
    expect(docs).not.toContain('shadow:');
  });
});
