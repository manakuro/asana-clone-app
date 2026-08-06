import { config } from '@/config';
import { createIdToken, createRefreshToken } from './createIdToken';
import type { IdToken, RefreshToken } from './types';

const IDENTITY_TOOLKIT_URL =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp';

export async function signUpAnonymousUser(): Promise<{
  idToken: IdToken;
  refreshToken: RefreshToken;
  expiresIn: string;
  localId: string;
}> {
  const apiKey = config.FIREBASE_API_KEY;
  const res = await fetch(`${IDENTITY_TOOLKIT_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ returnSecureToken: true }),
  });

  if (!res.ok) throw new Error('Failed to sign up anonymous user');

  const data = await res.json();
  return {
    idToken: createIdToken(data.idToken),
    refreshToken: createRefreshToken(data.refreshToken),
    expiresIn: data.expiresIn,
    localId: data.localId,
  };
}
