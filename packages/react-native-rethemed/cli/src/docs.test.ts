import { describe, expect, it } from 'vitest';
import { themeConfig } from './__fixtures__/theme';
import { generateDocs } from './docs';

const fixture = () =>
  generateDocs({
    config: themeConfig,
    themeFile: 'src/__fixtures__/theme.ts',
    genFile: 'src/__fixtures__/themed.gen.ts',
    command:
      'react-native-rethemed codegen src/__fixtures__/theme.ts --docs src/__fixtures__/themed.md',
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

  it('adds a color column only to tables with a colored preset', () => {
    const docs = fixture();
    expect(docs).toContain(
      '| `caption` | `sm` (14) | – | `wide` (0.4) | – | light: #71717a, dark: #a1a1aa |',
    );
    expect(docs).toContain(
      '| `heading.page` | `lg` (18) | `short` (×1.375 → 24.75) | – | – | dark: #fafafa |',
    );
    expect(docs).toMatch(
      /### title\n\n\| preset \| fontSize \| lineHeight \| letterSpacing \| fontWeight \|\n/,
    );
  });

  it('explains overriding a preset size for token and absolute line heights', () => {
    // The fixture has both: `title.md` (lineHeight: 24) and `body.md` ('moderate').
    const docs = fixture();
    expect(docs).toContain(
      "A preset whose line height is a token follows it (`themed.text.body.md({ fontSize: 'lg' })` recomputes the line height); a preset with an absolute line height does not (`themed.text.title.md({ fontSize: 18, lineHeight: 26 })` needs `lineHeight` too",
    );
  });

  it('tells to pass lineHeight with fontSize when presets use absolute line heights', () => {
    const docs = generateDocs({
      config: {
        semanticTokens: {
          text: { body: { md: { fontSize: 14, lineHeight: 20 } } },
        },
      },
      themeFile: 'theme.ts',
      genFile: 'themed.gen.ts',
    });
    expect(docs).toContain(
      "- **Line heights:** a `lineHeight` number is absolute. The presets use absolute line heights, so to change a preset's size pass both in the override: `themed.text.body.md({ fontSize: 18, lineHeight: 26 })` needs `lineHeight` too",
    );
    expect(docs).not.toContain('recomputes');
  });

  it('says a token line height follows the overridden size', () => {
    const docs = generateDocs({
      config: {
        tokens: {
          fontSizes: { md: 16, lg: 18 },
          lineHeights: { short: 1.375 },
        },
        semanticTokens: {
          text: { body: { md: { fontSize: 'md', lineHeight: 'short' } } },
        },
      },
      themeFile: 'theme.ts',
      genFile: 'themed.gen.ts',
    });
    expect(docs).toContain(
      "To change a preset's size, pass it in the override: `themed.text.body.md({ fontSize: 'lg' })` recomputes the line height.",
    );
    expect(docs).not.toContain('needs `lineHeight` too');
  });

  it('tells when to memoize a themed style', () => {
    expect(fixture()).toContain(
      'useMemo(() => themed.view({ ... }), [themed])',
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

  it('builds the example from primitives when there are no semantic tokens', () => {
    const docs = generateDocs({
      config: {
        tokens: {
          colors: {
            transparent: '#00000000',
            white: '#ffffff',
            black: '#000000',
            'red.500': '#fb2c36',
          },
          radii: { md: 6 },
          spacing: { 4: 16 },
          fontSizes: { md: 16 },
          lineHeights: { tight: 1.25 },
        },
      },
      themeFile: 'theme.ts',
      genFile: 'themed.gen.ts',
    });
    expect(docs).not.toContain('group.token');
    expect(docs).toContain('const { themed } = useThemed();');
    expect(docs).toContain(
      [
        '    <View',
        '      style={themed.view({',
        "        backgroundColor: 'white',",
        "        borderRadius: 'md',",
        '        padding: 4,',
        '      })}',
        '    >',
        "      <Text style={themed.text({ fontSize: 'md', color: 'black' })}>Title</Text>",
      ].join('\n'),
    );
    expect(docs).toContain(
      "**This theme defines no semantic colors:** color props take primitive colors (`'red.500'`)",
    );
    expect(docs).toContain('This theme defines no text presets');
    expect(docs).not.toContain('Prefer semantic colors');
    expect(docs).not.toContain('(see Text presets)');
    // Primitive colors come right after the usage, as a grid.
    expect(docs).toMatch(
      /### Rules[\s\S]*?\n## Primitive colors\n\nFixed colors, the same in light and dark\. A grid cell is the token `'<hue>\.<shade>'`, e\.g\. `'red\.500'`\. Use them on the same color props \(`themed\.view\(\{ backgroundColor: 'red\.500' \}\)`\)[^\n]*\n\n\| token \| value \|[\s\S]*?\| hue \| 500 \|\n\|:--\|:--\|\n\| `red` \| #fb2c36 \|\n\n## Radii/,
    );
  });

  it('mentions primitive colors next to semantic ones when both exist', () => {
    const docs = fixture();
    expect(docs).toContain(
      "- **Prefer semantic colors** (`'group.token'`). They switch with light/dark. Primitive colors (`'gray.950'`) are accepted too, but they are fixed",
    );
    expect(docs).toMatch(
      /## Semantic colors[\s\S]*?## Primitive colors[\s\S]*?## Radii/,
    );
  });

  it('leaves categories the theme does not define out of the example', () => {
    const docs = generateDocs({
      config: {},
      themeFile: 'theme.ts',
      genFile: 'themed.gen.ts',
    });
    expect(docs).toContain('    <View>\n      <Text');
    expect(docs).toContain('      <Text style={themed.text()}>Title</Text>');
    const example = docs.slice(
      docs.indexOf('```tsx'),
      docs.indexOf('### Rules'),
    );
    expect(example).not.toMatch(
      /backgroundColor:|borderRadius:|padding:|shadow:/,
    );
    expect(docs).toContain('**This theme defines no colors**');
    expect(docs).toContain('`zIndex` takes a raw number');
    expect(docs).not.toContain('**Shadows:**');
    expect(docs).not.toContain('**Line heights:**');
  });
});
