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
    expect(docs).toContain('const { themed, tokens } = useThemed();');
    expect(docs).toContain(
      [
        '    <View',
        '      style={[',
        '        themed.view({',
        "          borderRadius: 'md',",
        '          padding: 4,',
        '        }),',
        '        { backgroundColor: tokens.colors.white },',
        '      ]}',
        '    >',
        "      <Text style={[themed.text({ fontSize: 'md' }), { color: tokens.colors.black }]}>Title</Text>",
      ].join('\n'),
    );
    expect(docs).toContain('This theme defines no semantic colors');
    expect(docs).toContain('This theme defines no text presets');
    expect(docs).not.toContain('Prefer semantic colors');
    expect(docs).not.toContain('(see Text presets)');
    expect(docs).toContain('pass them in a second plain style object');
  });

  it('leaves categories the theme does not define out of the example', () => {
    const docs = generateDocs({
      config: {},
      themeFile: 'theme.ts',
      genFile: 'themed.gen.ts',
    });
    expect(docs).toContain('    <View style={themed.view()}>');
    expect(docs).toContain('      <Text style={themed.text()}>Title</Text>');
    expect(docs).not.toMatch(/borderRadius:|padding:|shadow:|tokens\.colors/);
    expect(docs).toContain('`zIndex` takes a raw number');
    expect(docs).not.toContain('**Shadows:**');
    expect(docs).not.toContain('**Line heights:**');
  });
});
