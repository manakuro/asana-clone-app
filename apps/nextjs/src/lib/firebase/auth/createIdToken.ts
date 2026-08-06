import type { IdToken, RefreshToken } from './types';

export function createIdToken(value: string): IdToken {
  return value as IdToken;
}

export function createRefreshToken(value: string): RefreshToken {
  return value as RefreshToken;
}
