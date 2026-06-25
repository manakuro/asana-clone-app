import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { workspaceTeammateState } from '../atom';
import type { WorkspaceTeammate } from '../type';

export const useUpsert = () => {
  const upsert = useAtomCallback(
    useCallback((_get, set, workspaceTeammate: WorkspaceTeammate) => {
      set(workspaceTeammateState(workspaceTeammate.id), workspaceTeammate);
    }, []),
  );

  return {
    upsert,
  };
};
