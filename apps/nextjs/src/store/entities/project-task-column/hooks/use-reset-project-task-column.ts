import { RESET, useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { projectTaskColumnState } from '../atom';

export const useResetProjectTaskColumn = () => {
  const resetProjectTaskColumn = useAtomCallback(
    useCallback((_, set, id: string) => {
      set(projectTaskColumnState(id), RESET);
    }, []),
  );

  const resetProjectTaskColumns = useAtomCallback(
    useCallback((_, set, projectTaskColumns: string[]) => {
      projectTaskColumns.forEach((id) => {
        set(projectTaskColumnState(id), RESET);
      });
    }, []),
  );

  return {
    resetProjectTaskColumn,
    resetProjectTaskColumns,
  };
};
