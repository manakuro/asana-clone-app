import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface UserCredentials {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

const body: UserCredentials = JSON.parse(
  readFileSync(resolve(__dirname, './user.json'), 'utf-8'),
);

const token = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${token}`;

export const fetchToken = (): Promise<Response> =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
