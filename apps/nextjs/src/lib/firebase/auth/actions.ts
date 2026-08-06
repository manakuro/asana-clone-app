'use server';

import { getIdToken } from './get-id-token';

export async function getIdTokenAction(): Promise<
  { ok: true; idToken: string } | { ok: false; error: string }
> {
  return getIdToken();
}
