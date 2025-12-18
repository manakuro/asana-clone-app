import { RESET, useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { deletedTaskState } from '../atom';

export const useResetDeletedTask = () => {
  const resetDeletedTask = useAtomCallback(
    useCallback((_get, set, id: string) => {
      set(deletedTaskState(id), RESET);
    }, []),
  );

  const resetDeletedTasks = useAtomCallback(
    useCallback((_get, set, deletedTasks: string[]) => {
      deletedTasks.forEach((id) => {
        set(deletedTaskState(id), RESET);
      });
    }, []),
  );

  return {
    resetDeletedTask,
    resetDeletedTasks,
  };
};
