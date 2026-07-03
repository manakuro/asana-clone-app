export const isClient = (): boolean => typeof window !== 'undefined';
export const isServer = (): boolean => typeof window === 'undefined';
export const isDev = (): boolean => process.env.NODE_ENV === 'development';
