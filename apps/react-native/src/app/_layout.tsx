import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as ExpoRouterThemeProvider,
} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import AppTabs from '@/components/app-tabs';
import { AppContext } from '@/components/layout/app-context';
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
