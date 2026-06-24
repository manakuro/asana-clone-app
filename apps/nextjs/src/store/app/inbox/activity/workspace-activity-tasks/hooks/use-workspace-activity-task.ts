import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { workspaceActivityTaskState } from '../atom';

export const useWorkspaceActivityTask = (workspaceActivityTaskId: string) => {
  const workspaceActivityTask = useAtomValue(
    useMemo(
      () => workspaceActivityTaskState(workspaceActivityTaskId),
      [workspaceActivityTaskId],
    ),
  );

  return {
    workspaceActivityTask,
  };
};
