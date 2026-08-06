'use server';

import { adminAuth } from '../admin';
import { getIdToken } from './get-id-token';

export async function getServerAuthUser() {
  const result = await getIdToken();
  if (!result.ok) return null;

  try {
    return await adminAuth.verifyIdToken(result.idToken);
  } catch (err) {
    console.error('[getServerAuthUser] Failed to verify id token:', err);
    return null;
  }
}
