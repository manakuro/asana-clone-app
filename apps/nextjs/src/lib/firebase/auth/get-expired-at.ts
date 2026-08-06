import { REFRESH_SKEW_MS } from './const';

export function getExpiredAt(expiresIn: string): number {
  return Date.now() + Number(expiresIn) * 1000 - REFRESH_SKEW_MS;
}
