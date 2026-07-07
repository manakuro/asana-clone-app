import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { workspaceTeammateIdsByWorkspaceIdSortedByCreatedAtState } from '../atom';

export const useWorkspaceTeammateIdsByWorkspaceIdSortedByCreatedAt = (
  workspaceId: string,
) => {
  const workspaceTeammateIds = useAtomValue(
    useMemo(
      () =>
        workspaceTeammateIdsByWorkspaceIdSortedByCreatedAtState(workspaceId),
      [workspaceId],
    ),
  );

  return {
    workspaceTeammateIds,
  };
};
