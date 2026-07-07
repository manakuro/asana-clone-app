import { useAtomValue } from 'jotai';
import { taskActivityIdsState } from '../atom';

export const useTaskActivityIds = () => {
  const taskActivityIds = useAtomValue(taskActivityIdsState);

  return {
    taskActivityIds,
  };
};
