import type { TextStyle } from 'react-native';
import { isTextPreset } from './text-tree';
import type { TextTokenTree } from './types';

type TextVariant = (override?: object) => TextStyle;
type TextVariantTree = { [key: string]: TextVariant | TextVariantTree };

/**
 * Builds `themed.text.<path>(override?)` by walking whatever tree
 * `config.semanticTokens.text` defines, at any depth — no hand-written
 * per-variant code. Each preset merges with the caller's override (preset
 * first, override wins) and runs through the same `resolve` as
 * `themed.text()` itself, so presets referencing scale keys (e.g.
 * `fontSize: 'lg'`) resolve exactly like caller-passed tokens.
 *
 * `tree` must already have its preset colors resolved for the scheme (see
 * `resolveTextTree`), so a call only merges and resolves tokens.
 *
 * Typed loosely on purpose; the exact tree shape comes from the generated
 * `themed.gen.ts`.
 */
export function createTextVariants(
  tree: TextTokenTree,
  resolve: (input: object) => TextStyle,
): TextVariantTree {
  const build = (tree: TextTokenTree): TextVariantTree =>
    Object.fromEntries(
      Object.entries(tree)
        .filter(([, node]) => typeof node === 'object' && node !== null)
        .map(([key, node]) => [
          key,
          isTextPreset(node)
            ? (override?: object) => resolve({ ...node, ...override })
            : build(node as TextTokenTree),
        ]),
    );

  return build(tree);
}
