import type { ThemeConfig } from '@react-native-rethemed/core/config';
import { code, table } from './emit';
import {
  buildModel,
  colorTable,
  examplePreset,
  lineHeightNote,
  lineHeightRows,
  presetGroups,
  presetTable,
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

const firstOf = <T>(rows: [string, T][], fallback: string) =>
  rows[0]?.[0] ?? fallback;

/** A literal as it would be written in TS source (`4`, `'md'`). */
const asArg = (key: string) => (/^\d+(\.\d+)?$/.test(key) ? key : `'${key}'`);

/** `title.md` -> `themed.text.title.md`, bracketing non-identifier keys. */
const presetCall = (path: string) =>
  `themed.text${path
    .split('.')
    .map((k) => (/^[A-Za-z_$][\w$]*$/.test(k) ? `.${k}` : `['${k}']`))
    .join('')}`;

function usageSection(model: TokenModel, genFile: string): Section {
  // Real token names from this theme, so the examples always type-check.
  const bg = model.colors.find((c) => c.group === 'bg')?.token;
  const fg = model.colors.find((c) => c.group === 'fg')?.token;
  const color = bg ?? model.colors[0]?.token ?? 'group.token';
  const textColor = fg ?? model.colors[0]?.token ?? 'group.token';
  const radius = asArg(
    model.radii.find(([k]) => k === 'md')?.[0] ??
      model.radii[Math.floor(model.radii.length / 2)]?.[0] ??
      'md',
  );
  const spacing = asArg(
    model.spacing.find(([, v]) => v >= 16)?.[0] ?? firstOf(model.spacing, '4'),
  );
  const shadow = asArg(firstOf(model.shadows, 'sm'));
  // Prefer a mid-sized heading (`title.md`) for the example when it exists.
  const presetPath = examplePreset(model.text);
  const preset = presetPath ? presetCall(presetPath) : 'themed.text';

  return {
    title: 'Usage',
    body: [
      `Get \`themed\`, \`tokens\` and \`semanticTokens\` from \`useThemed()\` (exported by \`${genFile}\`). Values follow the current light/dark scheme, so call it inside the component.`,
      '',
      '```tsx',
      "import { Text, View } from 'react-native';",
      '',
      'function Card() {',
      '  const { themed } = useThemed();',
      '  return (',
      '    <View',
      '      style={themed.view({',
      `        backgroundColor: '${color}',`,
      `        borderRadius: ${radius},`,
      `        padding: ${spacing},`,
      ...(model.shadows.length > 0 ? [`        shadow: ${shadow},`] : []),
      '      })}',
      '    >',
      `      <Text style={${preset}({ color: '${textColor}' })}>Title</Text>`,
      '    </View>',
      '  );',
      '}',
      '```',
      '',
      '### Rules',
      '',
      '- Pass every style through `themed.view()` / `themed.text()` / `themed.image()`. Props without tokens (`flex`, `width`, …) pass through unchanged.',
      "- **Colors, radii and spacing are token-only.** Use the names in the tables below; raw values like `'#fff'` or `12` do not type-check. Spacing also accepts `'auto'` and percentages.",
      '- For a genuine one-off raw value, put it in a second plain style object: `style={[themed.view({ padding: 4 }), { backgroundColor: overlayColor }]}`. Do not add a token for it.',
      "- **Prefer semantic colors** (`'group.token'`). They switch with light/dark. Primitive colors are fixed and are only for values that must not change with the scheme.",
      '- **Typography:** prefer the presets `themed.text.<path>(override?)` (see Text presets). `fontSize` / `fontWeight` / `lineHeight` / `letterSpacing` accept a token or a raw value.',
      "- **Line heights:** a `lineHeight` token is a ratio of `fontSize`; a raw number is absolute. To change the size of a preset, pass it in the override (`themed.text.<path>({ fontSize: 'lg' })`) so the line height is recomputed. Do not override `fontSize` in a separate style object.",
      '- `zIndex` accepts a z-index token or a raw number.',
      '- **Shadows:** use the virtual `shadow` prop (View and Image). It expands to the platform shadow props and `elevation`.',
      '- Outside `style` (e.g. an icon `color` prop), read resolved values from `useThemed().semanticTokens.colors.<group>.<token>` or `useThemed().tokens`.',
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
  return {
    title: 'Primitive colors',
    body: [
      'Fixed, scheme-independent values, read via `useThemed().tokens.colors[...]`. They are not accepted by `themed.*()`; prefer semantic colors.',
      '',
      ...table(
        ['token', 'value'],
        ['left', 'left'],
        model.primitiveColors.map(([k, v]) => [code(k), v]),
      ),
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
    primitiveColorSection(model),
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
