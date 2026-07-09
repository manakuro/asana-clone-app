import { useAtomValue } from 'jotai';
import { taskActivityTaskIdsState } from '../atom';

export const useTaskActivityTaskIds = () => {
  const taskActivityTaskIds = useAtomValue(taskActivityTaskIdsState);

  return {
    taskActivityTaskIds,
  };
};
