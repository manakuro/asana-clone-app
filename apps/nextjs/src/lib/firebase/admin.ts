import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

function getServiceAccount() {
  const base64 = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!base64) {
    throw new Error(
      '[firebase-admin] FIREBASE_SERVICE_ACCOUNT_KEY is not set. Check your .env.local or deployment environment variables.',
    );
  }

  let json: string;
  try {
    json = Buffer.from(base64, 'base64').toString('utf-8');
  } catch (err) {
    console.error(
      '[firebase-admin] Failed to base64-decode FIREBASE_SERVICE_ACCOUNT_KEY.',
      '\nFirst 50 chars:',
      base64.slice(0, 50),
      '\nLength:',
      base64.length,
      '\nOriginal error:',
      err,
    );
    throw new Error(
      '[firebase-admin] Invalid FIREBASE_SERVICE_ACCOUNT_KEY: not valid base64.',
    );
  }

  try {
    return JSON.parse(json);
  } catch (err) {
    console.error(
      '[firebase-admin] Failed to JSON.parse decoded FIREBASE_SERVICE_ACCOUNT_KEY.',
      '\nDecoded first 50 chars:',
      json.slice(0, 50),
      '\nDecoded length:',
      json.length,
      '\nOriginal error:',
      err,
    );
    throw new Error(
      '[firebase-admin] Invalid FIREBASE_SERVICE_ACCOUNT_KEY: decoded value is not valid JSON.',
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
