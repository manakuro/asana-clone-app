import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { taskIdsByArchivedWorkspaceActivityIdState } from '../atom';

export const useArchivedWorkspaceActivityTasksTaskIds = (
  archivedWorkspaceActivityId: string,
) => {
  const taskIds = useAtomValue(
    useMemo(
      () =>
        taskIdsByArchivedWorkspaceActivityIdState(archivedWorkspaceActivityId),
      [archivedWorkspaceActivityId],
    ),
  );

  return {
    taskIds,
  };
};
