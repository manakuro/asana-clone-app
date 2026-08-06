import { config } from '@/config';
import { createIdToken, createRefreshToken } from './createIdToken';
import type { IdToken, RefreshToken } from './types';

const SECURE_TOKEN_URL = 'https://securetoken.googleapis.com/v1/token';

type RefreshResult = {
  idToken: IdToken;
  refreshToken: RefreshToken;
  expiresIn: string;
  userId: string;
};

export async function refreshIdToken(
  refreshToken: string,
): Promise<RefreshResult> {
  const apiKey = config.FIREBASE_API_KEY;
  const res = await fetch(`${SECURE_TOKEN_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Failed to refresh id token: ${res.status} ${errorBody}`);
  }

  const data = await res.json();
  return {
    idToken: createIdToken(data.id_token),
    refreshToken: createRefreshToken(data.refresh_token),
    expiresIn: data.expires_in,
    userId: data.user_id,
  };
}
