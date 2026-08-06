import { config } from '@/config';

const IDENTITY_TOOLKIT_URL =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp';

export async function signUpAnonymousUser() {
  const apiKey = config.FIREBASE_API_KEY;
  const res = await fetch(`${IDENTITY_TOOLKIT_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ returnSecureToken: true }),
  });

  if (!res.ok) throw new Error('Failed to sign up anonymous user');

  return (await res.json()) as Promise<{
    idToken: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
  }>;
}
