import { cookies } from 'next/headers';
import { TOKEN_COOKIE_NAME } from './const';
import type { StoredToken } from './types';

export async function getStoredToken(): Promise<StoredToken | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(TOKEN_COOKIE_NAME)?.value;
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StoredToken;
  } catch {
    return null;
  }
}

export async function setStoredToken(token: StoredToken) {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_COOKIE_NAME, JSON.stringify(token), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}
