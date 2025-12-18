import { RESET, useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { teammateState } from '../atom';

export const useResetTeammate = () => {
  const resetTeammate = useAtomCallback(
    useCallback((_, set, id: string) => {
      set(teammateState(id), RESET);
    }, []),
  );

  const resetTeammates = useAtomCallback(
    useCallback((_, set, teammates: string[]) => {
      teammates.forEach((id) => {
        set(teammateState(id), RESET);
      });
    }, []),
  );

  return {
    resetTeammate,
    resetTeammates,
  };
};
