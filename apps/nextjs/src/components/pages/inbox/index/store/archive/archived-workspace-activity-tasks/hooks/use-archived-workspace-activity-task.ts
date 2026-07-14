import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { archivedWorkspaceActivityTaskState } from '../atom';

export const useArchivedWorkspaceActivityTask = (
  archivedWorkspaceActivityTaskId: string,
) => {
  const archivedWorkspaceActivityTask = useAtomValue(
    useMemo(
      () => archivedWorkspaceActivityTaskState(archivedWorkspaceActivityTaskId),
      [archivedWorkspaceActivityTaskId],
    ),
  );

  return {
    archivedWorkspaceActivityTask,
  };
};
