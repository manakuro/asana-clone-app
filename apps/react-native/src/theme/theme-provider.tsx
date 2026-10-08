import type { ColorMode, ColorModeStorage } from '@react-native-rethemed/core';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as RNThemeProvider,
} from 'expo-router/react-navigation';
import type React from 'react';
import { useMemo } from 'react';
import { ThemedProvider, useThemed } from './themed';
import { _deprecated_colors } from './tokens/_deprecated_colors';

type Props = {
  children: React.ReactNode;
  /** Supply to persist the theme choice across launches. Omit and it resets. */
  storage?: ColorModeStorage;
  storageKey?: string;
  defaultMode?: ColorMode;
};

/**
 * Mounts `ThemedProvider` — the app-wide source of truth for light/dark/system —
 * and maps the resolved scheme onto React Navigation's theme.
 *
 * The navigation half is a separate component because it calls
 * `useThemed()`, which has to read that context from *inside* the provider.
 */
export const ThemeProvider = ({
  children,
  storage,
  storageKey,
  defaultMode,
}: Props) => (
  <ThemedProvider
    storage={storage}
    storageKey={storageKey}
    defaultColorMode={defaultMode}
  >
    <NavigationTheme>{children}</NavigationTheme>
  </ThemedProvider>
);

const NavigationTheme = ({ children }: { children: React.ReactNode }) => {
  const { colorScheme } = useThemed();

  // Rebuilding this on every render invalidates every useTheme() consumer
  // app-wide, since ThemeProvider is mounted at the root — memoize on the
  // one thing it actually depends on, and only build the active theme.
  const theme = useMemo(() => {
    if (colorScheme === 'dark') {
      return {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          primary: _deprecated_colors.dark.primary,
          background: _deprecated_colors.dark.background,
          card: _deprecated_colors.dark.card,
          text: _deprecated_colors.dark.text,
          border: _deprecated_colors.dark.border,
          notification: _deprecated_colors.dark.red,
        },
      };
    }

    return {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: _deprecated_colors.light.primary,
        background: _deprecated_colors.light.background,
        card: _deprecated_colors.light.card,
        text: _deprecated_colors.light.text,
        border: _deprecated_colors.light.border,
        notification: _deprecated_colors.light.red,
      },
    };
  }, [colorScheme]);

  return <RNThemeProvider value={theme}>{children}</RNThemeProvider>;
};
