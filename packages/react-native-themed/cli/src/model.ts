import {
  isTextPreset,
  RN_DEFAULT_FONT_SIZE,
  resolveBaseFontSize,
  type ShadowToken,
  type TextToken,
  type TextTokenTree,
  type ThemeConfig,
} from '@react-native-themed/core/config';
import { code, orderedEntries, table } from './emit';

/**
 * The evaluated theme flattened into display order — the single view of the
 * tokens that both `themed.gen.ts` and the Markdown docs render from, so the
 * two can never disagree.
 */
export type TokenModel = {
  /** `semanticTokens.colors`, flattened to `'group.token'`. */
  colors: { token: string; group: string; light: string; dark: string }[];
  radii: [string, number][];
  spacing: [string, number][];
  fontSizes: [string, number][];
  fontWeights: [string, unknown][];
  lineHeights: [string, number][];
  letterSpacings: [string, number][];
  shadows: [string, ShadowToken][];
  zIndices: [string, number][];
  /** `tokens.colors` — scheme-independent primitives. */
  primitiveColors: [string, string][];
  /** `semanticTokens.text` as a tree, each preset's cells already rendered. */
  text: TextNode[];
  /** `defaults.fontSize` resolved, for line-height ratios without a fontSize. */
  baseFontSize: { value: number; label: string };
};

/** A node of `semanticTokens.text`: a preset (leaf) or a group. */
export type TextNode =
  | { kind: 'preset'; name: string; path: string; cells: string[] }
  | { kind: 'group'; name: string; path: string; children: TextNode[] };

export const PRESET_FIELDS = [
  'fontSize',
  'lineHeight',
  'letterSpacing',
  'fontWeight',
] as const;

export function buildModel(config: ThemeConfig): TokenModel {
  const tokens = config.tokens ?? {};
  const byValue = (v: number) => v;

  const scaleFor = {
    fontSize: tokens.fontSizes,
    lineHeight: tokens.lineHeights,
    letterSpacing: tokens.letterSpacings,
    fontWeight: tokens.fontWeights,
  } as const;
  const baseFontSize = resolveBaseFontSize(config);
  const fontSizeOf = (preset: TextToken) => {
    const { fontSize } = preset;
    if (typeof fontSize === 'number') return fontSize;
    const scale = tokens.fontSizes;
    return typeof fontSize === 'string' &&
      scale &&
      Object.hasOwn(scale, fontSize)
      ? scale[fontSize]
      : baseFontSize;
  };

  /**
   * `'lg'` -> `` `lg` (18) `` so a table shows what a reference means. A
   * line-height token is a ratio, so it also shows the computed value:
   * `` `short` (×1.375 → 24.75) ``.
   */
  const presetCell = (preset: TextToken, field: keyof typeof scaleFor) => {
    const value = preset[field];
    if (value === undefined) return '–';
    const scale = scaleFor[field] as Record<string, unknown> | undefined;
    if (typeof value === 'string' && scale && Object.hasOwn(scale, value)) {
      if (field === 'lineHeight') {
        const ratio = scale[value] as number;
        return `${code(value)} (×${ratio} → ${round2(fontSizeOf(preset) * ratio)})`;
      }
      return `${code(value)} (${scale[value]})`;
    }
    return String(value);
  };

  const baseKey = config.defaults?.fontSize;
  const baseLabel =
    typeof baseKey === 'string'
      ? `${code(baseKey)} (${baseFontSize})`
      : typeof baseKey === 'number'
        ? String(baseKey)
        : `${RN_DEFAULT_FONT_SIZE} (React Native default)`;

  return {
    colors: Object.entries(config.semanticTokens?.colors ?? {}).flatMap(
      ([group, names]) =>
        Object.entries(names).map(([name, v]) => ({
          token: `${group}.${name}`,
          group,
          light: v.light,
          dark: v.dark,
        })),
    ),
    radii: orderedEntries(tokens.radii, byValue),
    spacing: orderedEntries(tokens.spacing, byValue),
    fontSizes: orderedEntries(tokens.fontSizes, byValue),
    fontWeights: orderedEntries(tokens.fontWeights, (v) => Number(v) || 0),
    lineHeights: orderedEntries(tokens.lineHeights, byValue),
    letterSpacings: orderedEntries(tokens.letterSpacings, byValue),
    shadows: Object.entries(tokens.shadows ?? {}),
    zIndices: orderedEntries(tokens.zIndices, byValue),
    primitiveColors: Object.entries(tokens.colors ?? {}),
    text: textNodes(config.semanticTokens?.text, (preset) =>
      PRESET_FIELDS.map((f) => presetCell(preset, f)),
    ),
    baseFontSize: { value: baseFontSize, label: baseLabel },
  };
}

const round2 = (value: number) => Math.round(value * 100) / 100;

function textNodes(
  tree: TextTokenTree | undefined,
  cells: (preset: TextToken) => string[],
  prefix: string[] = [],
): TextNode[] {
  return Object.entries(tree ?? {})
    .filter(([, node]) => typeof node === 'object' && node !== null)
    .map(([name, node]): TextNode => {
      const path = [...prefix, name];
      return isTextPreset(node)
        ? { kind: 'preset', name, path: path.join('.'), cells: cells(node) }
        : {
            kind: 'group',
            name,
            path: path.join('.'),
            children: textNodes(node as TextTokenTree, cells, path),
          };
    });
}

/**
 * Every group that directly holds presets, with those presets — one table
 * each. The root comes first with path `''` when presets sit at the top.
 */
export function presetGroups(
  nodes: TextNode[],
  path = '',
): { path: string; presets: Extract<TextNode, { kind: 'preset' }>[] }[] {
  const presets = nodes.filter(
    (n): n is Extract<TextNode, { kind: 'preset' }> => n.kind === 'preset',
  );
  return [
    ...(presets.length > 0 ? [{ path, presets }] : []),
    ...nodes.flatMap((n) =>
      n.kind === 'group' ? presetGroups(n.children, n.path) : [],
    ),
  ];
}

/** First preset in definition order, preferring `title.md` for examples. */
export function examplePreset(nodes: TextNode[]): string | undefined {
  const all = presetGroups(nodes).flatMap((g) => g.presets.map((p) => p.path));
  return all.find((p) => p === 'title.md') ?? all[0];
}

/** Line heights are ratios of `fontSize`; show them as `×1.375`. */
export function lineHeightRows(model: TokenModel): [string, string][] {
  return model.lineHeights.map(([k, v]) => [k, `×${v}`]);
}

/** One sentence explaining how a line-height token resolves. */
export function lineHeightNote(model: TokenModel): string {
  return `Ratios of \`fontSize\`: a token resolves to \`fontSize × ratio\`, using the style's own \`fontSize\` or else the default font size, ${model.baseFontSize.label}. A raw number is an absolute line height.`;
}

// ---------------------------------------------------------------------------
// Markdown tables shared by the JSDoc and the docs file
// ---------------------------------------------------------------------------

export function colorTable(rows: TokenModel['colors']): string[] {
  return table(
    ['token', 'light', 'dark'],
    ['left', 'left', 'left'],
    rows.map((c) => [code(c.token), c.light, c.dark]),
  );
}

export function scaleTable(rows: [string, unknown][]): string[] {
  return table(
    ['token', 'value'],
    ['left', 'right'],
    rows.map(([k, v]) => [code(k), String(v)]),
  );
}

export function shadowTable(rows: TokenModel['shadows']): string[] {
  return table(
    ['token', 'offset (x, y)', 'radius', 'opacity', 'elevation', 'color'],
    ['left', 'right', 'right', 'right', 'right', 'left'],
    rows.map(([k, s]) => [
      code(k),
      `${s.shadowOffset?.width ?? 0}, ${s.shadowOffset?.height ?? 0}`,
      String(s.shadowRadius ?? '–'),
      String(s.shadowOpacity ?? '–'),
      String(s.elevation ?? '–'),
      String(s.shadowColor ?? '–'),
    ]),
  );
}

/** Presets as rows, named by their full path (`title.md`). */
export function presetTable(
  presets: Extract<TextNode, { kind: 'preset' }>[],
): string[] {
  return table(
    ['preset', ...PRESET_FIELDS],
    ['left', 'right', 'right', 'right', 'right'],
    presets.map((p) => [code(p.path), ...p.cells]),
  );
}
