import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { workspaceActivityState } from '../atom';

export const useWorkspaceActivity = (workspaceActivityId: string) => {
  const workspaceActivity = useAtomValue(
    useMemo(
      () => workspaceActivityState(workspaceActivityId),
      [workspaceActivityId],
    ),
  );

  return {
    workspaceActivity,
  };
};
