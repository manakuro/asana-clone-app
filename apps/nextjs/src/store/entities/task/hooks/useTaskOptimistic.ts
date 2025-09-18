import { useAtomCallback } from 'jotai/utils';
import { RESET } from 'jotai/utils';
import { useCallback } from 'react';
import { taskOptimisticState } from '../atom';

export const useTaskOptimistic = () => {
  const setTaskOptimistic = useAtomCallback(
    useCallback((_, set, id: string, name: string) => {
      set(taskOptimisticState(id), {
        name,
      });
    }, []),
  );

  const resetTaskOptimistic = useAtomCallback(
    useCallback((_, set, id: string) => {
      set(taskOptimisticState(id), RESET);
    }, []),
  );

  return {
    setTaskOptimistic,
    resetTaskOptimistic,
  };
};
