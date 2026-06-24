import { RESET, useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { projectTaskState } from '../atom';

export const useResetProjectTask = () => {
  const resetProjectTask = useAtomCallback(
    useCallback((_, set, id: string) => {
      set(projectTaskState(id), RESET);
    }, []),
  );

  const resetProjectTasks = useAtomCallback(
    useCallback((_, set, ids: string[]) => {
      ids.forEach((id) => {
        set(projectTaskState(id), RESET);
      });
    }, []),
  );

  return {
    resetProjectTask,
    resetProjectTasks,
  };
};
