import {
  isTextPreset,
  TEXT_TOKEN_FIELDS,
  type TextTokenTree,
  type ThemeConfig,
  walkTextPresets,
} from '@react-native-rethemed/core/config';

/** Values RN's `TextStyle['fontWeight']` accepts as strings. */
const RN_FONT_WEIGHTS = new Set([
  'normal',
  'bold',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  'ultralight',
  'thin',
  'light',
  'medium',
  'regular',
  'semibold',
  'condensedBold',
  'condensed',
  'heavy',
  'black',
]);

const TEXT_REF_SCALES = {
  fontSize: 'fontSizes',
  lineHeight: 'lineHeights',
  letterSpacing: 'letterSpacings',
  fontWeight: 'fontWeights',
} as const;

/**
 * Top-level preset/group names that would collide with the properties every
 * function already has, since `themed.text` itself is callable.
 */
const RESERVED_TEXT_NAMES = new Set([
  'apply',
  'arguments',
  'bind',
  'call',
  'caller',
  'constructor',
  'length',
  'name',
  'prototype',
  'toString',
]);

const isPrimitive = (value: unknown) =>
  typeof value === 'string' || typeof value === 'number';

const isField = (key: string) =>
  (TEXT_TOKEN_FIELDS as readonly string[]).includes(key);

/**
 * A preset `color`: a color string (both schemes), or `{ light?, dark? }`
 * with at least one string.
 */
function checkTextColor(value: unknown, at: string, problems: string[]) {
  if (typeof value === 'string' && value.length > 0) return;
  const shape = `must be a color string or { light?, dark? } (preset field names such as 'color' can't name a group or preset)`;
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    problems.push(`${at}: ${shape}`);
    return;
  }
  const entries = Object.entries(value);
  const valid =
    entries.length > 0 &&
    entries.every(
      ([k, v]) =>
        (k === 'light' || k === 'dark') &&
        typeof v === 'string' &&
        v.length > 0,
    );
  if (!valid) problems.push(`${at}: ${shape}`);
}

/**
 * Structural checks for the `semanticTokens.text` tree: every node is an
 * object that is either a preset (known fields only; primitives, plus
 * `color` which may be `{ light?, dark? }`) or a group (all objects) —
 * never both, never empty. See `isTextPreset` for how the two are told
 * apart.
 */
function checkTextTree(
  tree: TextTokenTree,
  path: string[],
  problems: string[],
): void {
  for (const [key, node] of Object.entries(tree)) {
    const at = `semanticTokens.text.${[...path, key].join('.')}`;

    if (path.length === 0 && RESERVED_TEXT_NAMES.has(key)) {
      problems.push(
        `${at}: '${key}' is reserved (it collides with a function property of themed.text)`,
      );
      continue;
    }
    if (typeof node !== 'object' || node === null || Array.isArray(node)) {
      problems.push(`${at}: must be a preset or a group object`);
      continue;
    }

    const entries = Object.entries(node);
    if (entries.length === 0) {
      problems.push(`${at}: is empty`);
      continue;
    }

    if (isTextPreset(node)) {
      // Objects under a non-field key are groups/presets nested in a preset.
      const nested = entries
        .filter(([k, v]) => !isField(k) && !isPrimitive(v))
        .map(([k]) => k);
      if (nested.length > 0) {
        const fields = entries
          .filter(([k, v]) => isField(k) || isPrimitive(v))
          .map(([k]) => k);
        problems.push(
          `${at}: mixes preset fields (${fields.join(', ')}) with groups (${nested.join(', ')})`,
        );
        continue;
      }
      for (const [field, value] of entries) {
        if (!isField(field)) {
          problems.push(
            `${at}.${field}: unknown preset field (expected ${TEXT_TOKEN_FIELDS.join(', ')})`,
          );
        } else if (field === 'color') {
          checkTextColor(value, `${at}.color`, problems);
        } else if (!isPrimitive(value)) {
          problems.push(`${at}.${field}: must be a string or a number`);
        }
      }
    } else {
      const fields = entries.filter(([, v]) => isPrimitive(v)).map(([k]) => k);
      if (fields.length > 0) {
        const groups = entries
          .filter(([, v]) => !isPrimitive(v))
          .map(([k]) => k);
        problems.push(
          `${at}: mixes preset fields (${fields.join(', ')}) with groups (${groups.join(', ')})`,
        );
        continue;
      }
      checkTextTree(node as TextTokenTree, [...path, key], problems);
    }
  }
}

/**
 * Checks what the type system can no longer check once token types are
 * generated rather than inferred: every `semanticTokens.text` reference must
 * name a key of the matching `tokens` scale, and every semantic color must
 * define both schemes. Returns human-readable problems (empty when valid).
 */
export function validateTheme(config: ThemeConfig): string[] {
  const problems: string[] = [];
  const tokens = config.tokens ?? {};

  checkTextTree(config.semanticTokens?.text ?? {}, [], problems);

  walkTextPresets(config.semanticTokens?.text, (path, preset) => {
    for (const [field, scaleName] of Object.entries(TEXT_REF_SCALES)) {
      const value = preset[field as keyof typeof preset];
      if (typeof value !== 'string') continue;

      const scale = tokens[scaleName];
      if (scale && Object.hasOwn(scale, value)) continue;
      if (field === 'fontWeight' && RN_FONT_WEIGHTS.has(value)) continue;

      problems.push(
        `semanticTokens.text.${path.join('.')}.${field}: '${value}' is not a key of tokens.${scaleName}` +
          (scale ? '' : ` (tokens.${scaleName} is not defined)`),
      );
    }
  });

  const baseFontSize = config.defaults?.fontSize;
  if (
    typeof baseFontSize === 'string' &&
    !(tokens.fontSizes && Object.hasOwn(tokens.fontSizes, baseFontSize))
  ) {
    problems.push(
      `defaults.fontSize: '${baseFontSize}' is not a key of tokens.fontSizes`,
    );
  }

  for (const [group, colors] of Object.entries(
    config.semanticTokens?.colors ?? {},
  )) {
    for (const [name, value] of Object.entries(colors)) {
      if (typeof value?.light !== 'string' || typeof value?.dark !== 'string') {
        problems.push(
          `semanticTokens.colors.${group}.${name}: must define both 'light' and 'dark' strings`,
        );
      }
    }
  }

  return problems;
}

/**
 * Problems that don't stop codegen. A semantic color named like a primitive
 * (`semanticTokens.colors.red['500']` vs `tokens.colors['red.500']`) is
 * legal — color props resolve the name to the semantic color — but usually
 * an accident, e.g. after `extendTheme` combined two packages.
 */
export function themeWarnings(config: ThemeConfig): string[] {
  const primitives = config.tokens?.colors ?? {};
  const warnings: string[] = [];
  for (const [group, names] of Object.entries(
    config.semanticTokens?.colors ?? {},
  )) {
    for (const name of Object.keys(names)) {
      const token = `${group}.${name}`;
      if (Object.hasOwn(primitives, token)) {
        warnings.push(
          `'${token}' is both a semantic color and a primitive color (tokens.colors); color props resolve it to the semantic color`,
        );
      }
    }
  }
  return warnings;
}
