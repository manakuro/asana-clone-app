import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as ExpoRouterThemeProvider,
} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { AppContext } from '@/components/layout/app-context';
import { AppTabs } from '@/components/layout/app-tabs';
import { ThemeProvider } from '@/theme/theme-provider';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <AppContext>
      <ExpoRouterThemeProvider
        value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <ThemeProvider>
          <AppTabs />
        </ThemeProvider>
      </ExpoRouterThemeProvider>
    </AppContext>
  );
}
