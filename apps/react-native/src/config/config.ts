import Constants from 'expo-constants';
import { Platform } from 'react-native';

const resolveDevApiHost = () => {
  const debuggerHost = Constants.expoConfig?.hostUri?.split(':')[0];
  if (!debuggerHost) return undefined;

  // On emulator/USB connections, Metro's adb-reversed localhost is
  // returned, but that reverse only covers Metro's own port (8081) —
  // our custom API port (8082) isn't forwarded, so swap to 10.0.2.2.
  if (Platform.OS === 'android' && debuggerHost === 'localhost') {
    return '10.0.2.2';
  }

  // Physical device over LAN already has the LAN IP
  return debuggerHost;
};

const debuggerHost = resolveDevApiHost();

const API_URL =
  __DEV__ && debuggerHost
    ? `http://${debuggerHost}:8082/api/graphql`
    : (process.env.EXPO_PUBLIC_API_URL as string);

const API_SUBSCRIPTION_URL =
  __DEV__ && debuggerHost
    ? `ws://${debuggerHost}:8082/api/subscription`
    : (process.env.EXPO_PUBLIC_API_SUBSCRIPTION_URL as string);

export const config = {
  APP_VARIANT: process.env.EXPO_PUBLIC_APP_VARIANT as string,
  API_URL,
  API_SUBSCRIPTION_URL,
} as const;
