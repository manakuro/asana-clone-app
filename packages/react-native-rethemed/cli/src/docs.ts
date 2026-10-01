import type { ThemeConfig } from '@react-native-rethemed/core/config';
import { code } from './emit';
import {
  buildModel,
  colorTable,
  examplePreset,
  lineHeightNote,
  lineHeightRows,
  presetGroups,
  presetTable,
  primitiveColorNote,
  primitiveColorTables,
  scaleTable,
  shadowTable,
  type TokenModel,
} from './model';

export type GenerateDocsOptions = {
  config: ThemeConfig;
  /** Theme file as shown to readers, e.g. `src/theme/themed/theme.ts`. */
  themeFile: string;
  /** Generated bindings as shown to readers, e.g. `src/theme/themed/themed.gen.ts`. */
  genFile: string;
  /** Shown in the header so readers know how to regenerate. */
  command?: string;
};

type Section = { title: string; body: string[] };

/** A literal as it would be written in TS source (`4`, `'md'`). */
const asArg = (key: string) => (/^\d+(\.\d+)?$/.test(key) ? key : `'${key}'`);

/** `title.md` -> `themed.text.title.md`, bracketing non-identifier keys. */
const presetCall = (path: string) =>
  `themed.text${path
    .split('.')
    .map((k) => (/^[A-Za-z_$][\w$]*$/.test(k) ? `.${k}` : `['${k}']`))
    .join('')}`;

/** Picks a readable primitive for the example (not `transparent`). */
function primitiveFor(
  model: TokenModel,
  preferred: string,
): string | undefined {
  const keys = model.primitiveColors.map(([k]) => k);
  return (
    keys.find((k) => k === preferred) ??
    keys.find((k) => k !== 'transparent') ??
    keys[0]
  );
}

const objectArg = (entries: string[]) =>
  entries.length > 0 ? `{ ${entries.join(', ')} }` : '';

/** A primitive color token to cite in prose (`'red.500'`). */
function primitiveExample(model: TokenModel): string | undefined {
  return (
    primitiveColorTables(model.primitiveColors).example ??
    primitiveFor(model, 'white')
  );
}

function usageSection(model: TokenModel, genFile: string): Section {
  const hasSemanticColors = model.colors.length > 0;
  const hasPrimitiveColors = model.primitiveColors.length > 0;
  const hasPresets = model.text.length > 0;
  const hasSemanticTokens = hasSemanticColors || hasPresets;

  // Only real token names from this theme, so the example always
  // type-checks. Categories the theme does not define are left out.
  // Semantic colors are preferred; a primitive stands in when there are none.
  const bg =
    (model.colors.find((c) => c.group === 'bg') ?? model.colors[0])?.token ??
    primitiveFor(model, 'white');
  const fg =
    (model.colors.find((c) => c.group === 'fg') ?? model.colors[0])?.token ??
    primitiveFor(model, 'black');
  const radius =
    model.radii.find(([k]) => k === 'md')?.[0] ??
    model.radii[Math.floor(model.radii.length / 2)]?.[0];
  const spacing =
    model.spacing.find(([, v]) => v >= 16)?.[0] ?? model.spacing[0]?.[0];
  const shadow = model.shadows[0]?.[0];
  const fontSize =
    model.fontSizes.find(([k]) => k === 'md')?.[0] ?? model.fontSizes[0]?.[0];

  const viewArgs = [
    ...(bg !== undefined ? [`backgroundColor: ${asArg(bg)},`] : []),
    ...(radius !== undefined ? [`borderRadius: ${asArg(radius)},`] : []),
    ...(spacing !== undefined ? [`padding: ${asArg(spacing)},`] : []),
    ...(shadow !== undefined ? [`shadow: ${asArg(shadow)},`] : []),
  ];
  const view =
    viewArgs.length > 0
      ? [
          '    <View',
          '      style={themed.view({',
          ...viewArgs.map((l) => `        ${l}`),
          '      })}',
          '    >',
        ]
      : // No View-related tokens: `themed.view()` needs an argument, and a
        // style with nothing in it adds nothing to the example.
        ['    <View>'];

  // Prefer a mid-sized heading (`title.md`) for the example when it exists.
  const presetPath = examplePreset(model.text);
  const textArgs = objectArg([
    ...(!presetPath && fontSize !== undefined
      ? [`fontSize: ${asArg(fontSize)}`]
      : []),
    ...(fg !== undefined ? [`color: ${asArg(fg)}`] : []),
  ]);
  const textCall = `${presetPath ? presetCall(presetPath) : 'themed.text'}(${textArgs})`;

  const primitive = primitiveExample(model);
  const colorRules = [
    hasSemanticColors || hasPrimitiveColors
      ? "- **Colors, radii and spacing are token-only.** Use the names in the tables below; raw values like `'#fff'` or `12` do not type-check. Spacing also accepts `'auto'` and percentages."
      : "- **Radii and spacing are token-only.** Use the names in the tables below; raw values like `12` do not type-check. Spacing also accepts `'auto'` and percentages.",
    '- For a genuine one-off raw value, put it in a second plain style object: `style={[themed.view({ padding: 4 }), { backgroundColor: overlayColor }]}`. Do not add a token for it.',
    hasSemanticColors
      ? `- **Prefer semantic colors** (\`'group.token'\`). They switch with light/dark.${hasPrimitiveColors ? ` Primitive colors (\`'${primitive}'\`) are accepted too, but they are fixed: use them only for values that must not change with the scheme.` : ''}`
      : hasPrimitiveColors
        ? `- **This theme defines no semantic colors:** color props take primitive colors (\`'${primitive}'\`), which are the same in light and dark. Add \`semanticTokens.colors\` to the theme for colors that follow the scheme.`
        : '- **This theme defines no colors**, so `themed.*()` accepts no color values. Put colors in a second plain style object.',
  ];

  const typographyRule = hasPresets
    ? '- **Typography:** prefer the presets `themed.text.<path>(override?)` (see Text presets). `fontSize` / `fontWeight` / `lineHeight` / `letterSpacing` accept a token or a raw value.'
    : '- **Typography:** `fontSize` / `fontWeight` / `lineHeight` / `letterSpacing` accept a token or a raw value. This theme defines no text presets (`semanticTokens.text`).';

  const lineHeightRule = (() => {
    const hasScale = model.lineHeights.length > 0;
    const basics = hasScale
      ? 'a `lineHeight` token is a ratio of `fontSize`; a raw number is absolute.'
      : 'a `lineHeight` number is absolute.';
    const noSplit = 'Do not override `fontSize` in a separate style object.';
    const { ratio, absolute } = model.presetLineHeights;
    // A real size for the examples: a font-size token, else a number.
    const largerSize = asArg(
      model.fontSizes.find(([k]) => k === 'lg')?.[0] ??
        model.fontSizes.at(-1)?.[0] ??
        '18',
    );
    const ratioHow = ratio
      ? `\`${presetCall(ratio)}({ fontSize: ${largerSize} })\` recomputes the line height`
      : '';
    const absoluteHow = absolute
      ? `\`${presetCall(absolute)}({ fontSize: 18, lineHeight: 26 })\` needs \`lineHeight\` too, because its line height is absolute and \`fontSize\` alone keeps it`
      : '';

    if (ratio && absolute) {
      return [
        `- **Line heights:** ${basics} To change a preset's size, pass it in the override. A preset whose line height is a token follows it (${ratioHow}); a preset with an absolute line height does not (${absoluteHow}). ${noSplit}`,
      ];
    }
    if (ratio) {
      return [
        `- **Line heights:** ${basics} To change a preset's size, pass it in the override: ${ratioHow}. ${noSplit}`,
      ];
    }
    if (absolute) {
      return [
        `- **Line heights:** ${basics} The presets use absolute line heights, so to change a preset's size pass both in the override: ${absoluteHow}. ${noSplit}`,
      ];
    }
    if (hasScale) {
      return [
        `- **Line heights:** ${basics} Set \`fontSize\` in the same \`themed.text()\` call (\`themed.text({ ${fontSize !== undefined ? `fontSize: ${asArg(fontSize)}, ` : ''}lineHeight: ${asArg(model.lineHeights[0][0])} })\`) so the line height is computed from it, not in a separate style object.`,
      ];
    }
    return [];
  })();

  const outsideStyleRule = hasSemanticColors
    ? '- Outside `style` (e.g. an icon `color` prop), read resolved values from `useThemed().semanticTokens.colors.<group>.<token>` or `useThemed().tokens`.'
    : '- Outside `style` (e.g. an icon `color` prop), read values from `useThemed().tokens`.';

  return {
    title: 'Usage',
    body: [
      `Get \`themed\`${hasSemanticTokens ? ', `tokens` and `semanticTokens`' : ' and `tokens`'} from \`useThemed()\` (exported by \`${genFile}\`). Values follow the current light/dark scheme, so call it inside the component.`,
      '',
      '```tsx',
      "import { Text, View } from 'react-native';",
      '',
      'function Card() {',
      '  const { themed } = useThemed();',
      '  return (',
      ...view,
      `      <Text style={${textCall}}>Title</Text>`,
      '    </View>',
      '  );',
      '}',
      '```',
      '',
      '### Rules',
      '',
      '- Pass every style through `themed.view()` / `themed.text()` / `themed.image()`. Props without tokens (`flex`, `width`, …) pass through unchanged.',
      ...colorRules,
      typographyRule,
      ...lineHeightRule,
      model.zIndices.length > 0
        ? '- `zIndex` accepts a z-index token or a raw number.'
        : '- `zIndex` takes a raw number (this theme defines no z-index tokens).',
      ...(model.shadows.length > 0
        ? [
            '- **Shadows:** use the virtual `shadow` prop (View and Image). It expands to the platform shadow props and `elevation`.',
          ]
        : []),
      outsideStyleRule,
      '- **Performance:** calling `themed.*()` inline on every render is fine. Built-in components compare `style` by value, and a call costs well under a microsecond. Memoize with `useMemo(() => themed.view({ ... }), [themed])` only when the style must keep the same reference: when it is passed to a `React.memo` component, passed as a list prop such as `contentContainerStyle` / `ListHeaderComponentStyle`, or used as a hook dependency. `themed` itself only changes when the color scheme does.',
      '- Do not edit the generated files. Change the theme file and re-run the codegen command instead.',
    ],
  };
}

function colorSection(model: TokenModel): Section | null {
  if (model.colors.length === 0) return null;
  const groups = [...new Set(model.colors.map((c) => c.group))];
  return {
    title: 'Semantic colors',
    body: [
      "Use as `'<group>.<token>'` on `color`, `backgroundColor`, `border*Color`, `tintColor`, `overlayColor`, `shadowColor`, `textShadowColor`, `textDecorationColor` and `outlineColor`.",
      ...groups.flatMap((group) => [
        '',
        `### ${group}`,
        '',
        ...colorTable(model.colors.filter((c) => c.group === group)),
      ]),
    ],
  };
}

function scaleSection(
  title: string,
  intro: string,
  rows: [string, unknown][],
): Section | null {
  if (rows.length === 0) return null;
  return { title, body: [intro, '', ...scaleTable(rows)] };
}

function shadowSection(model: TokenModel): Section | null {
  if (model.shadows.length === 0) return null;
  return {
    title: 'Shadows',
    body: [
      `Use with the virtual \`shadow\` prop: \`themed.view({ shadow: ${asArg(model.shadows[0][0])} })\`.`,
      '',
      ...shadowTable(model.shadows),
    ],
  };
}

function textSection(model: TokenModel): Section | null {
  const groups = presetGroups(model.text);
  if (groups.length === 0) return null;
  return {
    title: 'Text presets',
    body: [
      `Call a preset by its path: \`themed.text.<path>(override?)\`, e.g. \`${presetCall(examplePreset(model.text) ?? '')}()\`. The override is merged on top and accepts the same tokens as \`themed.text()\`. A cell like \`\` \`lg\` (18) \`\` means the preset references the \`lg\` token, which resolves to 18.`,
      ...groups.flatMap((g) => [
        '',
        ...(g.path ? [`### ${g.path}`, ''] : []),
        ...presetTable(g.presets),
      ]),
    ],
  };
}

function primitiveColorSection(model: TokenModel): Section | null {
  if (model.primitiveColors.length === 0) return null;
  const { lines, example } = primitiveColorTables(model.primitiveColors);
  const token = example ?? primitiveExample(model);
  return {
    title: 'Primitive colors',
    body: [
      `${primitiveColorNote(example)} Use them on the same color props (\`themed.view({ backgroundColor: '${token}' })\`) or read them via \`useThemed().tokens.colors[...]\`.${model.colors.length > 0 ? ' Prefer semantic colors for anything that should follow the scheme.' : ''}`,
      '',
      ...lines,
    ],
  };
}

/**
 * Renders the AI-/human-readable reference for a theme: usage rules plus
 * every token table. Deterministic (no timestamps), so it only changes when
 * the theme does.
 */
export function generateDocs({
  config,
  themeFile,
  genFile,
  command = 'react-native-rethemed codegen',
}: GenerateDocsOptions): string {
  const model = buildModel(config);

  const sections = [
    usageSection(model, genFile),
    colorSection(model),
    primitiveColorSection(model),
    scaleSection(
      'Radii',
      'For `borderRadius` and every corner-radius variant.',
      model.radii,
    ),
    scaleSection(
      'Spacing',
      'For `padding*`, `margin*` (including the logical `*Block*` / `*Inline*` variants), `gap`, `rowGap` and `columnGap`. Positional props (`top`, `left`, `inset`, …) take raw values.',
      model.spacing,
    ),
    scaleSection('Font sizes', 'For `fontSize`.', model.fontSizes),
    scaleSection('Font weights', 'For `fontWeight`.', model.fontWeights),
    scaleSection(
      'Line heights',
      `For \`lineHeight\`. ${lineHeightNote(model)}`,
      lineHeightRows(model),
    ),
    scaleSection(
      'Letter spacings',
      'For `letterSpacing`.',
      model.letterSpacings,
    ),
    shadowSection(model),
    textSection(model),
    scaleSection(
      'z-indices',
      'For `zIndex`, which also accepts a raw number.',
      model.zIndices,
    ),
  ].filter((s): s is Section => s !== null);

  return [
    '<!-- Code generated by @react-native-rethemed/cli. DO NOT EDIT. -->',
    `<!-- Regenerate with: ${command} -->`,
    '',
    '# Theme tokens',
    '',
    `The design tokens of this app's theme (${code(themeFile)}) and how to use them with react-native-rethemed. Always use these tokens instead of hard-coded colors, radii and spacing.`,
    ...sections.flatMap((s) => ['', `## ${s.title}`, '', ...s.body]),
    '',
  ].join('\n');
}
