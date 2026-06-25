import consola from 'consola';
import { spawnSync } from '../util/spawn-sync';

spawnSync('npx hygen new mutationMockHandler');

consola.success('Succeed!');
