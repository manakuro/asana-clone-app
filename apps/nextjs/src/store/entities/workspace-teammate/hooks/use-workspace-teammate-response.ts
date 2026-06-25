import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { workspaceTeammateState } from '../atom';
import type { WorkspaceTeammateResponse } from '../type';

export const useWorkspaceTeammateResponse = () => {
  const setWorkspaceTeammates = useAtomCallback(
    useCallback((_get, set, data: WorkspaceTeammateResponse[]) => {
      data.forEach((d) => {
        set(workspaceTeammateState(d.id), d);
      });
    }, []),
  );

  return {
    setWorkspaceTeammates,
  };
};
