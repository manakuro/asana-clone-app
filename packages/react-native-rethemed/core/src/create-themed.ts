import {
  createContext,
  createElement,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from 'react';
import { Appearance, useColorScheme } from 'react-native';
import {
  type ColorMode,
  type ColorModeStorage,
  createColorModeStore,
} from './color-mode-store';
import { createThemedStyles } from './create-themed-styles';
import {
  type ColorScheme,
  resolveSemanticColors,
} from './resolvers/color-resolver';
import { resolveTextTree } from './text-tree';
import type {
  LooseSchema,
  ThemeConfig,
  ThemedSchema,
  ThemedStyles,
} from './types';

export type { ColorMode, ColorModeStorage, ColorScheme };

const DEFAULT_STORAGE_KEY = 'react-native-rethemed.color-mode';

export type ThemedProviderProps = {
  children?: ReactNode;
  /**
   * Controlled mode: the app owns the scheme and this value is used as-is.
   * When set, `defaultColorMode`/`storage`/`storageKey` are ignored.
   */
  colorScheme?: ColorScheme;
  /** Uncontrolled initial mode. Only read the first time the store is used. */
  defaultColorMode?: ColorMode;
  /** Uncontrolled persistence, e.g. `expo-secure-store` or `AsyncStorage`. */
  storage?: ColorModeStorage;
  storageKey?: string;
};

export type UseThemedResult<S extends ThemedSchema = LooseSchema> = {
  themed: ThemedStyles<S>;
  /** Primitive, scheme-independent tokens exactly as in the config. */
  tokens: S['tokens'];
  /**
   * Semantic tokens with colors (including text preset colors) resolved for
   * the current scheme.
   */
  semanticTokens: S['semanticTokens'];
  colorScheme: ColorScheme;
};

export type UseColorModeResult = {
  mode: ColorMode;
  setMode: (mode: ColorMode) => void;
};

/** RN 0.86 reports `'unspecified'` (and may report `null`); the theme is binary. */
function toColorScheme(value: string | null | undefined): ColorScheme {
  return value === 'dark' ? 'dark' : 'light';
}

/** `Appearance.setColorScheme` is RN 0.73+ only and absent on react-native-web. */
function syncNativeAppearance(mode: ColorMode) {
  if (typeof Appearance?.setColorScheme !== 'function') return;
  Appearance.setColorScheme(mode === 'system' ? 'unspecified' : mode);
}

const warnControlledSetMode = () => {
  if (__DEV__) {
    console.warn(
      '[react-native-rethemed] setMode() was called while <ThemedProvider> is ' +
        'controlled via the `colorScheme` prop. Update that prop instead.',
    );
  }
};

/**
 * Binds a theme config to React: returns a provider plus hooks that read
 * the current scheme from it. Everything (store, contexts, precomputed
 * themes) is scoped to this call, so several instances can coexist.
 *
 * `S` is supplied by the generated `themed.gen.ts`
 * (`@react-native-rethemed/cli codegen`); without it tokens are loosely typed.
 */
export function createThemed<S extends ThemedSchema = LooseSchema>(
  config: ThemeConfig,
) {
  // Precomputed once per scheme so `useThemed()` returns referentially
  // stable objects until the scheme actually changes.
  const build = (colorScheme: ColorScheme) =>
    ({
      themed: createThemedStyles<S>(config, colorScheme),
      tokens: config.tokens ?? {},
      semanticTokens: {
        colors: resolveSemanticColors(config, colorScheme),
        text: resolveTextTree(config.semanticTokens?.text, colorScheme),
      },
      colorScheme,
    }) as UseThemedResult<S>;
  const themes: Record<ColorScheme, UseThemedResult<S>> = {
    light: build('light'),
    dark: build('dark'),
  };

  const store = createColorModeStore();
  // Split so a mode change that keeps the same scheme (e.g. 'system' ->
  // 'light' while the OS is light) doesn't re-render `useThemed` consumers.
  const SchemeContext = createContext<ColorScheme | null>(null);
  const ModeContext = createContext<UseColorModeResult | null>(null);

  function ThemedProvider({
    children,
    colorScheme,
    defaultColorMode = 'system',
    storage,
    storageKey = DEFAULT_STORAGE_KEY,
  }: ThemedProviderProps) {
    const isControlled = colorScheme !== undefined;

    // Hooks run unconditionally so switching between controlled and
    // uncontrolled never changes hook order or remounts children.
    store.init(defaultColorMode);
    const storedMode = useSyncExternalStore(
      store.subscribe,
      store.getSnapshot,
      store.getSnapshot,
    );
    const systemScheme = toColorScheme(useColorScheme());

    useEffect(() => {
      if (isControlled || !storage || !store.beginHydration()) return;
      // The store outlives this provider, so the result is applied even if
      // it resolves after unmount; `hydrate` drops it if the user already
      // picked a mode. `Promise.resolve().then` also catches a sync throw.
      Promise.resolve()
        .then(() => storage.getItem(storageKey))
        .then((saved) => store.hydrate(saved))
        .catch(() => {});
    }, [isControlled, storage, storageKey]);

    useEffect(() => {
      if (!isControlled) syncNativeAppearance(storedMode);
    }, [isControlled, storedMode]);

    const setUncontrolledMode = useCallback(
      (next: ColorMode) => {
        // Sync first: when returning to 'system', RN's `useColorScheme()`
        // keeps reporting the old override until it's reset.
        syncNativeAppearance(next);
        store.setMode(next);
        if (storage) {
          Promise.resolve()
            .then(() => storage.setItem(storageKey, next))
            .catch(() => {});
        }
      },
      [storage, storageKey],
    );

    const scheme: ColorScheme = isControlled
      ? colorScheme
      : storedMode === 'system'
        ? systemScheme
        : storedMode;
    const mode: ColorMode = isControlled ? colorScheme : storedMode;
    const setMode = isControlled ? warnControlledSetMode : setUncontrolledMode;

    const modeValue = useMemo(() => ({ mode, setMode }), [mode, setMode]);

    // `createElement` instead of JSX so consumers type-checking this source
    // (it ships as `.ts`) don't need a `jsx` compiler option.
    return createElement(
      SchemeContext,
      { value: scheme },
      createElement(ModeContext, { value: modeValue }, children),
    );
  }

  function useThemed(): UseThemedResult<S> {
    const scheme = useContext(SchemeContext);
    if (scheme === null) {
      throw new Error(
        'useThemed() must be used within a <ThemedProvider> returned by the ' +
          'same createThemed() call.',
      );
    }
    return themes[scheme];
  }

  function useColorMode(): UseColorModeResult {
    const value = useContext(ModeContext);
    if (value === null) {
      throw new Error(
        'useColorMode() must be used within a <ThemedProvider> returned by ' +
          'the same createThemed() call.',
      );
    }
    return value;
  }

  return { ThemedProvider, useThemed, useColorMode };
}
