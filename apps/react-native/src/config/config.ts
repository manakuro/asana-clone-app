export const config = {
  APP_VARIANT: process.env.EXPO_PUBLIC_APP_VARIANT as string,
  API_URL: process.env.EXPO_PUBLIC_API_URL as string,
  API_SUBSCRIPTION_URL: process.env.EXPO_PUBLIC_API_SUBSCRIPTION_URL as string,
} as const;
