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
import type { CheckTextRefs, ThemeConfig } from './types';

export type { ColorMode, ColorModeStorage, ColorScheme };

const DEFAULT_STORAGE_KEY = 'react-native-themed.color-mode';

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

type ConfigTokens<T> = T extends { tokens: infer Tk }
  ? Tk
  : Record<string, never>;

/**
 * group -> token -> the config's value for scheme `S`, keeping literal types
 * (e.g. `'#0d9488'`) when the config declares them `as const`.
 */
type ResolvedSemanticColors<T, S extends ColorScheme> = T extends {
  semanticTokens: { colors: infer G };
}
  ? {
      [Group in keyof G]: {
        [Token in keyof G[Group]]: G[Group][Token] extends {
          [K in S]: infer V;
        }
          ? V
          : string;
      };
    }
  : Record<string, never>;

type SemanticText<T> = T extends { semanticTokens: { text: infer Tx } }
  ? Tx
  : Record<string, never>;

type ThemedResultFor<T extends ThemeConfig, S extends ColorScheme> = {
  themed: ReturnType<typeof createThemedStyles<T>>;
  /** Primitive, scheme-independent tokens exactly as in the config. */
  tokens: ConfigTokens<T>;
  /** Semantic tokens with colors resolved for the current scheme. */
  semanticTokens: {
    colors: ResolvedSemanticColors<T, S>;
    text: SemanticText<T>;
  };
  colorScheme: S;
};

/**
 * Discriminated by `colorScheme`: without narrowing, a semantic color is the
 * union of its light and dark values; checking `colorScheme` narrows it to
 * one.
 */
export type UseThemedResult<T extends ThemeConfig> =
  | ThemedResultFor<T, 'light'>
  | ThemedResultFor<T, 'dark'>;

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
      '[react-native-themed] setMode() was called while <ThemedProvider> is ' +
        'controlled via the `colorScheme` prop. Update that prop instead.',
    );
  }
};

/**
 * Binds a theme config to React: returns a provider plus hooks that read
 * the current scheme from it. Everything (store, contexts, precomputed
 * themes) is scoped to this call, so several instances can coexist.
 */
export function createThemed<const T extends ThemeConfig>(
  config: T & CheckTextRefs<T>,
) {
  // Precomputed once per scheme so `useThemed()` returns referentially
  // stable objects until the scheme actually changes.
  const build = <S extends ColorScheme>(colorScheme: S) =>
    ({
      themed: createThemedStyles<T>(config, colorScheme),
      tokens: config.tokens ?? {},
      semanticTokens: {
        colors: resolveSemanticColors(config, colorScheme),
        text: config.semanticTokens?.text ?? {},
      },
      colorScheme,
    }) as ThemedResultFor<T, S>;
  const themes: {
    light: ThemedResultFor<T, 'light'>;
    dark: ThemedResultFor<T, 'dark'>;
  } = {
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

  function useThemed(): UseThemedResult<T> {
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
