import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { taskIdsByWorkspaceActivityIdState } from '../atom';

export const useWorkspaceActivityTasksTaskIds = (
  workspaceActivityId: string,
) => {
  const taskIds = useAtomValue(
    useMemo(
      () => taskIdsByWorkspaceActivityIdState(workspaceActivityId),
      [workspaceActivityId],
    ),
  );

  return {
    taskIds,
  };
};
