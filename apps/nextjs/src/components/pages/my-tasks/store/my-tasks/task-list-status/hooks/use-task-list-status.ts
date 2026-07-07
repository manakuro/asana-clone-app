import { useAtomValue } from 'jotai';
import { taskListStatusState } from '../atom';

export const useTaskListStatus = () => {
  const taskListStatus = useAtomValue(taskListStatusState);

  return {
    taskListStatus,
  };
};
