import { getExpiredAt } from './get-expired-at';
import { refreshIdToken } from './refresh-id-token';
import { getStoredToken, setStoredToken } from './token-cookie';

type IdTokenResult =
  | { ok: true; idToken: string }
  | { ok: false; error: 'no_session' | 'refresh_failed' };

export async function getIdToken(): Promise<IdTokenResult> {
  const stored = await getStoredToken();

  if (!stored) {
    return { ok: false, error: 'no_session' };
  }

  if (Date.now() < stored.expiresAt) {
    return { ok: true, idToken: stored.idToken };
  }

  try {
    const refreshed = await refreshIdToken(stored.refreshToken);
    const expiresAt = getExpiredAt(refreshed.expiresIn);

    await setStoredToken({
      idToken: refreshed.idToken,
      refreshToken: refreshed.refreshToken,
      expiresAt,
    });

    return { ok: true, idToken: refreshed.idToken };
  } catch (err) {
    console.error('[getIdToken] Failed to refresh id token:', err);
    return { ok: false, error: 'refresh_failed' };
  }
}
