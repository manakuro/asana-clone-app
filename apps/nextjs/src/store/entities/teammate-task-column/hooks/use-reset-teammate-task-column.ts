import { RESET, useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { teammateTaskColumnState } from '../atom';

export const useResetTeammateTaskColumn = () => {
  const resetTeammateTaskColumn = useAtomCallback(
    useCallback((_get, set, id: string) => {
      set(teammateTaskColumnState(id), RESET);
    }, []),
  );

  const resetTeammateTaskColumns = useAtomCallback(
    useCallback((_get, set, teammateTaskColumns: string[]) => {
      teammateTaskColumns.forEach((id) => {
        set(teammateTaskColumnState(id), RESET);
      });
    }, []),
  );

  return {
    resetTeammateTaskColumn,
    resetTeammateTaskColumns,
  };
};
