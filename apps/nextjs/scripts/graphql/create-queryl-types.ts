import consola from 'consola';
import { spawnSync } from '../util/spawn-sync';
import { getQueryFilenames } from './get-query-filenames';

const createQuerylTypes = async () => {
  const { paths } = await getQueryFilenames();

  paths.forEach((file) => {
    spawnSync(`npx hygen new queryType --file ${file}`);
  });

  consola.success('Succeed!');
};

createQuerylTypes();
