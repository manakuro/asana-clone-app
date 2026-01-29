import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import consola from 'consola';
import { fetchToken } from '../fetchToken/fetchToken.js';
import { downloadSchema } from './downloadSchema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ENDPOINT = process.env.NEXT_PUBLIC_API_URL;
const tokenJsonPath = path.resolve(__dirname, './token.json');

interface TokenData {
  idToken: string;
}

const download = async (): Promise<void> => {
  const token = JSON.parse(fs.readFileSync(tokenJsonPath, 'utf8')) as TokenData;
  consola.info('Access Token: ', token.idToken);

  if (!ENDPOINT) {
    consola.error('NEXT_PUBLIC_API_URL is not defined');
    return;
  }

  try {
    await downloadSchema(
      ENDPOINT,
      path.resolve(__dirname, '../../schema.graphql'),
      { Authorization: `Bearer ${token.idToken}` },
    );
  } catch (err) {
    if (
      err &&
      ((err as Error).stack?.includes('Auth response is status code: 401') ||
        (err as Error).stack?.includes(
          'No introspection query result data found, server responded with:',
        ))
    ) {
      consola.warn('Auth response is status code: 401');
      setupToken().then(download);
    } else if (err) {
      consola.error(err);
    } else {
      consola.success('Schema:download succeed');
    }
  }
};

const setupToken = async (): Promise<void> => {
  const res = await fetchToken();
  const data = await res.json();
  fs.writeFileSync(tokenJsonPath, JSON.stringify(data));
};

if (fs.existsSync(tokenJsonPath)) {
  download();
} else {
  setupToken().then(download);
}
