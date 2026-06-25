import crossSpawn from 'cross-spawn';

export const spawnSync = (command: string) => {
  const [c, ...args] = command.split(' ');
  return crossSpawn.sync(c, args, { stdio: 'inherit' });
};
