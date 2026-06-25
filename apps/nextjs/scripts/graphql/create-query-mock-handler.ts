import consola from 'consola';
import { spawnSync } from '../util/spawn-sync';

const createGraphqlMock = () => {
  spawnSync('npx hygen new queryMockHandler');

  consola.success('Succeed!');
};

createGraphqlMock();
