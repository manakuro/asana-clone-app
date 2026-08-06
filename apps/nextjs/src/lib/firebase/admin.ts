import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

function getServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!raw) {
    throw new Error(
      '[firebase-admin] FIREBASE_SERVICE_ACCOUNT_KEY is not set. Check your .env.local or deployment environment variables.',
    );
  }

  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error(
      '[firebase-admin] Failed to JSON.parse FIREBASE_SERVICE_ACCOUNT_KEY.',
      '\nFirst 50 chars:',
      raw.slice(0, 50),
      '\nLength:',
      raw.length,
      '\nOriginal error:',
      err,
    );
    throw new Error(
      '[firebase-admin] Invalid FIREBASE_SERVICE_ACCOUNT_KEY: not valid JSON.',
    );
  }
}

function createFirebaseAdminApp() {
  const serviceAccount = getServiceAccount();

  try {
    return initializeApp({
      credential: cert(serviceAccount),
    });
  } catch (err) {
    console.error(
      '[firebase-admin] Failed to initialize Firebase Admin app.',
      '\nproject_id:',
      serviceAccount?.project_id,
      '\nclient_email:',
      serviceAccount?.client_email,
      '\nhas private_key:',
      Boolean(serviceAccount?.private_key),
      '\nOriginal error:',
      err,
    );
    throw err;
  }
}

const app = getApps().length ? getApps()[0] : createFirebaseAdminApp();

export const adminAuth = getAuth(app);
