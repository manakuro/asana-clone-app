import { useAtomValue } from 'jotai';
import { taskIdsState } from '../atom';

export const useTasks = () => {
  const taskIds = useAtomValue(taskIdsState);

  return {
    taskIds,
  };
};
