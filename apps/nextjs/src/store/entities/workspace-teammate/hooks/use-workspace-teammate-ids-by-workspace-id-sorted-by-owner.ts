import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { workspaceTeammateIdsByWorkspaceIdSortedByOwnerState } from '../atom';

export const useWorkspaceTeammateIdsByWorkspaceIdSortedByOwner = (
  workspaceId: string,
) => {
  const workspaceTeammateIds = useAtomValue(
    useMemo(
      () => workspaceTeammateIdsByWorkspaceIdSortedByOwnerState(workspaceId),
      [workspaceId],
    ),
  );

  return {
    workspaceTeammateIds,
  };
};
