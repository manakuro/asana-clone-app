const fs = require('fs');
const path = require('path');
const consola = require('consola');
const fetchToken = require('../fetchToken/fetchToken').fetchToken;
const ENDPOINT = process.env.NEXT_PUBLIC_API_URL;
const tokenJsonPath = path.resolve(__dirname, './token.json');
const { downloadSchema } = require('./downloadSchema');

const download = async () => {
  const token = JSON.parse(fs.readFileSync(tokenJsonPath, 'utf8'));
  consola.info('Access Token: ', token.idToken);

  try {
    await downloadSchema(
      ENDPOINT,
      path.resolve(__dirname, '../../schema.graphql'),
      { Authorization: `Bearer ${token.idToken}` },
    );
  } catch (err) {
    if (
      err &&
      (err.stack.includes('Auth response is status code: 401') ||
        err.stack.includes(
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

const setupToken = () =>
  fetchToken()
    .then((res) => res.json())
    .then((res) => {
      fs.writeFileSync(tokenJsonPath, JSON.stringify(res), () =>
        consola.success('Token setup: ', res.idToken),
      );
    });

if (fs.existsSync(tokenJsonPath)) {
  download();
} else {
  setupToken().then(download);
}
