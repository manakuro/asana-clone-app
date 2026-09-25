import { useColorMode, useThemed } from './themed';

/**
 * Reads and writes the app-wide theme mode held by `ThemedProvider`.
 *
 * The mode deliberately lives in the provider rather than in this hook: it used
 * to be local `useState` paired with a global `Appearance.setColorScheme` call,
 * so remounting the toggle reset the cycle to `'system'` while the app stayed
 * dark, and two toggles on screen disagreed. Sharing the state also makes the
 * toggle work on web, where `Appearance` is read-only.
 */
export function useColorModeToggle() {
  const { mode, setMode } = useColorMode();
  const { colorScheme } = useThemed();

  const toggleMode = () => {
    switch (mode) {
      case 'light':
        setMode('dark');
        break;
      case 'dark':
        setMode('system');
        break;
      case 'system':
        setMode('light');
        break;
    }
  };

  return {
    isDark: colorScheme === 'dark',
    mode,
    setMode,
    currentMode: colorScheme,
    toggleMode,
  };
}
