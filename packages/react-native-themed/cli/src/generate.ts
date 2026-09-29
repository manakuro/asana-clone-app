import {
  COLOR_KEYS,
  FONT_SIZE_KEYS,
  FONT_WEIGHT_KEYS,
  LETTER_SPACING_KEYS,
  LINE_HEIGHT_KEYS,
  RADIUS_KEYS,
  SPACING_KEYS,
  type TextToken,
  type ThemeConfig,
} from '@react-native-themed/core/config';
import {
  code,
  jsdoc,
  member,
  orderedEntries,
  table,
  typeLiteral,
  union,
} from './emit';

export type GenerateOptions = {
  config: ThemeConfig;
  /** How the generated file imports the theme config. */
  themeImport: {
    /** Module specifier relative to the generated file, e.g. `'./theme'`. */
    specifier: string;
    /** `'default'` or a named export. */
    exportName: string;
  };
  /** Defaults to `'@react-native-themed/core'`. */
  coreSpecifier?: string;
  /** Shown in the header so readers know how to regenerate. */
  command?: string;
};

const INDENT = '  ';

// biome-ignore lint/suspicious/noTemplateCurlyInString: emitted TypeScript, not a template
const SPACING_TYPE = "SpacingToken | 'auto' | `${number}%`";

/**
 * Renders `themed.gen.ts` for an evaluated theme config: token unions, one
 * interface of token-aware style props (each with a JSDoc token table), the
 * typography presets, the exact `useThemed().tokens` / `semanticTokens`
 * shapes, and the `createThemed<ThemedTypes>()` instance itself.
 *
 * Pure: config in, source text out. Output is deterministic so regenerating
 * an unchanged theme is a no-op.
 */
export function generate({
  config,
  themeImport,
  coreSpecifier = '@react-native-themed/core',
  command = 'react-native-themed codegen',
}: GenerateOptions): string {
  const tokens = config.tokens ?? {};
  const semanticColors = config.semanticTokens?.colors ?? {};
  const semanticText = config.semanticTokens?.text ?? {};

  // --- token names, in display order ---------------------------------------
  const colorRows = Object.entries(semanticColors).flatMap(([group, names]) =>
    Object.entries(names).map(
      ([name, v]) => [`${group}.${name}`, v.light, v.dark] as const,
    ),
  );
  const byValue = (v: number) => v;
  const radii = orderedEntries(tokens.radii, byValue);
  const spacing = orderedEntries(tokens.spacing, byValue);
  const fontSizes = orderedEntries(tokens.fontSizes, byValue);
  const fontWeights = orderedEntries(tokens.fontWeights, (v) => Number(v) || 0);
  const lineHeights = orderedEntries(tokens.lineHeights, byValue);
  const letterSpacings = orderedEntries(tokens.letterSpacings, byValue);
  const shadows = Object.entries(tokens.shadows ?? {});
  const typeAlias = (name: string, names: string[]) => {
    const body = union(names);
    return `export type ${name} =${body.startsWith('\n') ? '' : ' '}${body};`;
  };
  const keys = (entries: readonly (readonly [string, ...unknown[]])[]) =>
    entries.map(([k]) => k);

  // --- JSDoc token tables ---------------------------------------------------
  const colorDoc = [
    code('semanticTokens.colors'),
    '',
    ...table(
      ['token', 'light', 'dark'],
      ['left', 'left', 'left'],
      colorRows.map(([k, light, dark]) => [code(k), light, dark]),
    ),
  ];
  const scaleDoc = (source: string, rows: [string, unknown][]) => [
    code(`tokens.${source}`),
    '',
    ...table(
      ['token', 'value'],
      ['left', 'right'],
      rows.map(([k, v]) => [code(k), String(v)]),
    ),
  ];
  const shadowDoc = [
    'Virtual prop: expands to `shadowColor` / `shadowOffset` / `shadowOpacity` / `shadowRadius` / `elevation`.',
    '',
    code('tokens.shadows'),
    '',
    ...table(
      ['token', 'offset (x, y)', 'radius', 'opacity', 'elevation', 'color'],
      ['left', 'right', 'right', 'right', 'right', 'left'],
      shadows.map(([k, s]) => [
        code(k),
        `${s.shadowOffset?.width ?? 0}, ${s.shadowOffset?.height ?? 0}`,
        String(s.shadowRadius ?? '–'),
        String(s.shadowOpacity ?? '–'),
        String(s.elevation ?? '–'),
        String(s.shadowColor ?? '–'),
      ]),
    ),
  ];

  const props = (names: readonly string[], type: string, doc: string[]) =>
    names
      .map((n) => `${jsdoc(doc, INDENT)}\n${INDENT}${n}?: ${type};`)
      .join('\n');

  // --- typography presets ---------------------------------------------------
  const scaleFor = {
    fontSize: tokens.fontSizes,
    lineHeight: tokens.lineHeights,
    letterSpacing: tokens.letterSpacings,
    fontWeight: tokens.fontWeights,
  } as const;
  const presetFields = Object.keys(scaleFor) as (keyof typeof scaleFor)[];
  /** `'lg'` -> `` `lg` (18) `` so the table shows what a reference means. */
  const presetCell = (preset: TextToken, field: keyof typeof scaleFor) => {
    const value = preset[field];
    if (value === undefined) return '–';
    const scale = scaleFor[field] as Record<string, unknown> | undefined;
    if (typeof value === 'string' && scale && Object.hasOwn(scale, value)) {
      return `${code(value)} (${scale[value]})`;
    }
    return String(value);
  };

  const variants = Object.entries(semanticText)
    .map(([role, sizes]) => {
      const sizeEntries = Object.entries(sizes);
      const roleDoc = [
        code(`semanticTokens.text.${role}`),
        '',
        ...table(
          ['size', ...presetFields],
          ['left', 'right', 'right', 'right', 'right'],
          sizeEntries.map(([size, p]) => [
            code(size),
            ...presetFields.map((f) => presetCell(p, f)),
          ]),
        ),
      ];
      const sizeMembers = sizeEntries
        .map(([size, p]) => {
          const doc = [
            code(`semanticTokens.text.${role}.${size}`),
            '',
            ...table(
              presetFields,
              ['right', 'right', 'right', 'right'],
              [presetFields.map((f) => presetCell(p, f))],
            ),
          ];
          return `${jsdoc(doc, INDENT.repeat(2))}\n${INDENT.repeat(2)}${member(size)}: TextVariant;`;
        })
        .join('\n');
      return `${jsdoc(roleDoc, INDENT)}\n${INDENT}${member(role)}: {\n${sizeMembers}\n${INDENT}};`;
    })
    .join('\n');

  // --- useThemed().semanticTokens -------------------------------------------
  const semanticColorType = Object.entries(semanticColors)
    .map(([group, names]) => {
      const inner = INDENT.repeat(3);
      const fields = Object.entries(names)
        .map(([name, v]) => {
          const doc = table(
            ['light', 'dark'],
            ['left', 'left'],
            [[v.light, v.dark]],
          );
          return `${jsdoc(doc, inner)}\n${inner}${member(name)}: string;`;
        })
        .join('\n');
      return `${INDENT.repeat(2)}${member(group)}: {\n${fields}\n${INDENT.repeat(2)}};`;
    })
    .join('\n');

  const themeBinding =
    themeImport.exportName === 'default'
      ? 'themeConfig'
      : themeImport.exportName;
  const themeImportLine =
    themeImport.exportName === 'default'
      ? `import themeConfig from '${themeImport.specifier}';`
      : `import { ${themeImport.exportName} } from '${themeImport.specifier}';`;

  return `// Code generated by @react-native-themed/cli. DO NOT EDIT.
// Regenerate with: ${command}

import type { TextStyle } from 'react-native';
import { createThemed, type TokenizeStyle } from '${coreSpecifier}';
${themeImportLine}

// ---------------------------------------------------------------------------
// Token names
// ---------------------------------------------------------------------------

${typeAlias('ColorToken', keys(colorRows))}
${typeAlias('RadiusToken', keys(radii))}
${typeAlias('SpacingToken', keys(spacing))}
${typeAlias('FontSizeToken', keys(fontSizes))}
${typeAlias('FontWeightToken', keys(fontWeights))}
${typeAlias('LineHeightToken', keys(lineHeights))}
${typeAlias('LetterSpacingToken', keys(letterSpacings))}
${typeAlias('ShadowToken', keys(shadows))}

// ---------------------------------------------------------------------------
// Token-aware style props. Each primitive picks the ones its RN style type
// has (see \`TokenizeStyle\` in core), so e.g. \`color\` never shows on View.
// ---------------------------------------------------------------------------

export interface ThemedStyleProps {
${props(COLOR_KEYS, 'ColorToken', colorDoc)}
${props(RADIUS_KEYS, 'RadiusToken', scaleDoc('radii', radii))}
${props(SPACING_KEYS, SPACING_TYPE, scaleDoc('spacing', spacing))}
${props(FONT_SIZE_KEYS, 'FontSizeToken | number', scaleDoc('fontSizes', fontSizes))}
${props(FONT_WEIGHT_KEYS, "FontWeightToken | TextStyle['fontWeight']", scaleDoc('fontWeights', fontWeights))}
${props(LINE_HEIGHT_KEYS, 'LineHeightToken | number', scaleDoc('lineHeights', lineHeights))}
${props(LETTER_SPACING_KEYS, 'LetterSpacingToken | number', scaleDoc('letterSpacings', letterSpacings))}
${props(['shadow'], 'ShadowToken', shadowDoc)}
}

// ---------------------------------------------------------------------------
// Typography presets: themed.text.<role>.<size>(override?)
// ---------------------------------------------------------------------------

type TextVariant = (
  override?: TokenizeStyle<TextStyle, ThemedStyleProps>,
) => TextStyle;

export interface ThemedTextVariants {
${variants}
}

// ---------------------------------------------------------------------------
// useThemed().tokens / useThemed().semanticTokens
// ---------------------------------------------------------------------------

export interface ThemedTokens ${typeLiteral(tokens, '')}

export interface ThemedSemanticTokens {
  /** Resolved for the current color scheme. */
  colors: {
${semanticColorType}
  };
  text: ${typeLiteral(semanticText, INDENT)};
}

// ---------------------------------------------------------------------------
// Instance
// ---------------------------------------------------------------------------

export interface ThemedTypes {
  style: ThemedStyleProps;
  textVariants: ThemedTextVariants;
  tokens: ThemedTokens;
  semanticTokens: ThemedSemanticTokens;
}

export const { ThemedProvider, useThemed, useColorMode } =
  createThemed<ThemedTypes>(${themeBinding});
`;
}
