'use server';

import { getIdToken } from './get-id-token';

export async function getIdTokenAction() {
  return getIdToken();
}
