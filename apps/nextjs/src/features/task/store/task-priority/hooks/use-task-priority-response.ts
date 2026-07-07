import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { taskPriorityState } from '../atom';
import type { TaskPriorityResponse } from '../type';

export const useTaskPriorityResponse = () => {
  const setTaskPriorities = useAtomCallback(
    useCallback((_, set, data: TaskPriorityResponse[]) => {
      data.forEach((p) => {
        set(taskPriorityState(p.id), p);
      });
    }, []),
  );

  return {
    setTaskPriorities,
  };
};
