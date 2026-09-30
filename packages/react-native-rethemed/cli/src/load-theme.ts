import type { ThemeConfig } from '@react-native-rethemed/core/config';
import { createJiti } from 'jiti';

export type LoadedTheme = {
  config: ThemeConfig;
  /** `'default'` or the named export the config was read from. */
  exportName: string;
};

const looksLikeThemeConfig = (value: unknown): value is ThemeConfig =>
  typeof value === 'object' &&
  value !== null &&
  ('tokens' in value || 'semanticTokens' in value);

/**
 * Evaluates a theme file (TS or JS) in plain Node via jiti and returns the
 * exported config. The file — and the theme packages it imports — must only
 * use `@react-native-rethemed/core/config`, never `react-native` at runtime.
 *
 * Export resolution: `exportName` if given, else the default export, else
 * the single export that looks like a `ThemeConfig`.
 */
export async function loadTheme(
  file: string,
  exportName?: string,
): Promise<LoadedTheme> {
  const jiti = createJiti(file, { moduleCache: false, fsCache: false });
  const mod = await jiti.import<Record<string, unknown>>(file);

  if (exportName) {
    const value = mod[exportName];
    if (!looksLikeThemeConfig(value)) {
      throw new Error(
        `Export '${exportName}' of ${file} is not a theme config (expected an object with 'tokens' or 'semanticTokens').`,
      );
    }
    return { config: value, exportName };
  }

  if (looksLikeThemeConfig(mod.default)) {
    return { config: mod.default, exportName: 'default' };
  }

  const candidates = Object.entries(mod).filter(
    ([name, value]) => name !== 'default' && looksLikeThemeConfig(value),
  );
  if (candidates.length === 1) {
    const [[name, value]] = candidates;
    return { config: value as ThemeConfig, exportName: name };
  }

  throw new Error(
    candidates.length === 0
      ? `No theme config export found in ${file}.`
      : `Several theme config exports found in ${file} (${candidates
          .map(([n]) => n)
          .join(', ')}); pick one with --export <name>.`,
  );
}
