import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { taskPriorityState } from '../atom';

export const useTaskPriority = (taskPriorityId: string) => {
  const taskPriority = useAtomValue(
    useMemo(() => taskPriorityState(taskPriorityId), [taskPriorityId]),
  );

  return {
    taskPriority,
  };
};
