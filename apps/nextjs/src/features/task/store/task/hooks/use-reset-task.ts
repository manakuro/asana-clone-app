import { RESET, useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import type { Task } from '@/features/task/store/task';
import { taskState } from '../atom';

export const useResetTask = () => {
  const resetTask = useAtomCallback(
    useCallback((_, set, id: string) => {
      set(taskState(id), RESET);
    }, []),
  );

  const resetTasks = useAtomCallback(
    useCallback((_, set, tasks: Task[]) => {
      tasks.forEach((t) => {
        set(taskState(t.id), RESET);
      });
    }, []),
  );

  return {
    resetTask,
    resetTasks,
  };
};
