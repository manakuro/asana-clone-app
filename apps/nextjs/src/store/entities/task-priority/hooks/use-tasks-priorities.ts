import { useAtomValue } from 'jotai';
import { taskPrioritiesState } from '../atom';

export const useTasksPriorities = () => {
  const taskPriorities = useAtomValue(taskPrioritiesState);

  return {
    taskPriorities,
  };
};
