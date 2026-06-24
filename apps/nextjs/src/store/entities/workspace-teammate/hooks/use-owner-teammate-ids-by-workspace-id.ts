import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { ownerWorkspaceTeammateByWorkspaceIdState } from '../atom';

export const useOwnerTeammateIdsByWorkspaceId = (workspaceId: string) => {
  const workspaceTeammate = useAtomValue(
    useMemo(
      () => ownerWorkspaceTeammateByWorkspaceIdState(workspaceId),
      [workspaceId],
    ),
  );

  return {
    workspaceTeammate,
  };
};
