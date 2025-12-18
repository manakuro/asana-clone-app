import { RESET, useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { projectTeammateState } from '../atom';

export const useResetProjectTeammate = () => {
  const resetProjectTeammate = useAtomCallback(
    useCallback((_, set, id: string) => {
      set(projectTeammateState(id), RESET);
    }, []),
  );

  const resetProjectTeammates = useAtomCallback(
    useCallback((_, set, projectTeammates: string[]) => {
      projectTeammates.forEach((id) => {
        set(projectTeammateState(id), RESET);
      });
    }, []),
  );

  return {
    resetProjectTeammate,
    resetProjectTeammates,
  };
};
