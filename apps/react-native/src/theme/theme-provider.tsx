import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as RNThemeProvider,
} from 'expo-router/react-navigation';
import { useMemo } from 'react';
import { _deprecated_colors } from './_deprecated_colors';
import { type Mode, ModeProvider, type ModeStorage } from './mode-provider';
import { useColorScheme } from './use-color-scheme';

type Props = {
  children: React.ReactNode;
  /** Supply to persist the theme choice across launches. Omit and it resets. */
  storage?: ModeStorage;
  storageKey?: string;
  defaultMode?: Mode;
};

/**
 * Mounts `ModeProvider` — the app-wide source of truth for light/dark/system —
 * and maps the resolved scheme onto React Navigation's theme.
 *
 * The navigation half is a separate component because it calls
 * `useColorScheme()`, which has to read that context from *inside* the provider.
 */
export const ThemeProvider = ({
  children,
  storage,
  storageKey,
  defaultMode,
}: Props) => (
  <ModeProvider
    storage={storage}
    storageKey={storageKey}
    defaultMode={defaultMode}
  >
    <NavigationTheme>{children}</NavigationTheme>
  </ModeProvider>
);

const NavigationTheme = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme();

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
