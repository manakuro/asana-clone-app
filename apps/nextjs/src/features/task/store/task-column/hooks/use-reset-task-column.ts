import { RESET, useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { taskColumnState } from '../atom';

export const useResetTaskColumn = () => {
  const resetTaskColumn = useAtomCallback(
    useCallback((_get, set, id: string) => {
      set(taskColumnState(id), RESET);
    }, []),
  );

  const resetTaskColumns = useAtomCallback(
    useCallback((_get, set, taskColumns: string[]) => {
      taskColumns.forEach((id) => {
        set(taskColumnState(id), RESET);
      });
    }, []),
  );

  return {
    resetTaskColumn,
    resetTaskColumns,
  };
};
