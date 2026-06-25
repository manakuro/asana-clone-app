import consola from 'consola';
import { spawnSync } from '../util/spawn-sync';
import { getQueryFilenames } from './get-query-filenames';

const createUseQuery = async () => {
  const { paths } = await getQueryFilenames();

  paths.forEach((file) => {
    spawnSync(`npx hygen new useQuery --gqlFile ${file} --noPrompt true`);
  });

  consola.success('Succeed!');
};

createUseQuery();
