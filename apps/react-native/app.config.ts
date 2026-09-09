import type { ConfigContext, ExpoConfig } from 'expo/config';

const APP_VARIANT = (process.env.APP_VARIANT ?? 'development') as
  | 'development'
  | 'preview';

const FIREBASE_FILES: Record<
  typeof APP_VARIANT,
  { ios: string; android: string }
> = {
  development: {
    ios:
      process.env.GOOGLE_SERVICES_PLIST ??
      './.keys/GoogleService-Info.development.plist',
    android:
      process.env.GOOGLE_SERVICES_JSON ??
      './.keys/google-services.development.json',
  },
  preview: {
    ios:
      process.env.GOOGLE_SERVICES_PLIST ??
      './.keys/GoogleService-Info.preview.plist',
    android:
      process.env.GOOGLE_SERVICES_JSON ??
      './.keys/google-services.preview.json',
  },
};

const BASE_ANDROID_PACKAGE = 'com.manakuroteam.asanacloneapp';
const BASE_IOS_BUNDLE_ID = 'com.manakuroteam.asanacloneapp';

const androidPackage = `${BASE_ANDROID_PACKAGE}.${APP_VARIANT}`;
const iosBundleId = `${BASE_IOS_BUNDLE_ID}.${APP_VARIANT}`;
const firebase = FIREBASE_FILES[APP_VARIANT];

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: `asana-clone-app (${APP_VARIANT})`,
  slug: 'asana-clone-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'asanacloneapp',
  userInterfaceStyle: 'automatic',
  ios: {
    icon: './assets/expo.icon',
    bundleIdentifier: iosBundleId,
    googleServicesFile: firebase.ios,
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './assets/images/android-icon-foreground.png',
      backgroundImage: './assets/images/android-icon-background.png',
      monochromeImage: './assets/images/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: false,
    package: androidPackage,
    googleServicesFile: firebase.android,
  },
  web: {
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#208AEF',
        image: './assets/images/splash-icon.png',
        imageWidth: 76,
      },
    ],
    '@react-native-firebase/app',
    ['expo-build-properties', { ios: { useFrameworks: 'dynamic' } }],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  runtimeVersion: {
    policy: 'fingerprint',
  },
  updates: {
    url: 'https://u.expo.dev/b3c24943-550f-4c3c-b0ba-d596556bc075',
  },
  extra: {
    router: {},
    eas: {
      projectId: 'b3c24943-550f-4c3c-b0ba-d596556bc075',
    },
  },
  owner: 'manakuro-team',
});
