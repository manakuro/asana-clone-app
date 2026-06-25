import { readFileSync } from 'fs';
import { parse } from 'graphql';
import Module from 'module';

const VALID_EXTENSIONS = ['graphql', 'graphqls', 'gql'];

const handleModule = (m: any, filename: string) => {
  const content = readFileSync(filename, 'utf-8');

  m.exports = parse(content);
};

// This lets you import GraphQL file.
VALID_EXTENSIONS.forEach((ext) => {
  if ((Module as any)._extensions[`.${ext}`]) return;
  (Module as any)._extensions[`.${ext}`] = handleModule;
});
