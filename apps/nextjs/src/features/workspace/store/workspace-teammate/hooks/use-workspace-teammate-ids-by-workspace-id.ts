import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { workspaceTeammateIdsByWorkspaceIdState } from '../atom';

export const useWorkspaceTeammateIdsByWorkspaceId = (workspaceId: string) => {
  const workspaceTeammateIds = useAtomValue(
    useMemo(
      () => workspaceTeammateIdsByWorkspaceIdState(workspaceId),
      [workspaceId],
    ),
  );

  return {
    workspaceTeammateIds,
  };
};
