import './enableImportGraphql';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import consola from 'consola';
import { type FragmentDefinitionNode, Kind, parse } from 'graphql';

export const getFragmentFilenames = async () => {
  const dir = path.resolve(__dirname, '../../src/graphql/queries/fragments');
  try {
    const filenames = await fs.readdir(dir);

    const gqlFiles = filenames.filter((f) => isGraphqlFile(f));

    const filesPromises = gqlFiles.map(async (f) => {
      const filePath = path.join(dir, f);
      const content = await fs.readFile(filePath, 'utf-8');
      const parsed = parse(content);
      const definition = parsed.definitions.find(
        (def): def is FragmentDefinitionNode =>
          def.kind === Kind.FRAGMENT_DEFINITION,
      );

      if (!definition) {
        throw new Error(`No fragment definition found in file: ${f}`);
      }

      return {
        file: f,
        type: definition.name.value,
        abs: filePath,
      };
    });

    const files = await Promise.all(filesPromises);

    return {
      filenames: files,
    };
  } catch (error) {
    consola.error('Error processing fragments in directory:', dir, error);
    return { filenames: [] };
  }
};

const isGraphqlFile = (file: string) => {
  return ['.gql', '.graphql'].includes(path.extname(file));
};
