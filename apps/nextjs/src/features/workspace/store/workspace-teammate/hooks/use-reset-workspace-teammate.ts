import { RESET, useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { workspaceTeammateState } from '../atom';

export const useResetWorkspaceTeammate = () => {
  const resetWorkspaceTeammate = useAtomCallback(
    useCallback((_get, set, id: string) => {
      set(workspaceTeammateState(id), RESET);
    }, []),
  );

  const resetWorkspaceTeammates = useAtomCallback(
    useCallback((_get, set, workspaceTeammates: string[]) => {
      workspaceTeammates.forEach((id) => {
        set(workspaceTeammateState(id), RESET);
      });
    }, []),
  );

  return {
    resetWorkspaceTeammate,
    resetWorkspaceTeammates,
  };
};
