import consola from 'consola';
import path from 'path';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';
import { spawnSync } from '../util/spawn-sync';
import { getQueryFilenames } from './get-query-filenames';

const argv = yargs(hideBin(process.argv)).argv as unknown as { file: string };

const createMock = async () => {
  if (argv.file) {
    const file = path.resolve('.', argv.file as string);
    spawnSync(`npx hygen new mock --file ${file}`);
    consola.success('Succeed!');
    return;
  }

  const { paths } = await getQueryFilenames();
  paths.forEach((file: string) => {
    spawnSync(`npx hygen new mock --file ${file}`);
  });

  consola.success('Succeed!');
};

createMock();
