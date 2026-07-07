import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { workspaceActivityState } from '../atom';
import type { WorkspaceActivityResponse } from '../type';

export const useWorkspaceActivitiesResponse = () => {
  const setWorkspaceActivities = useAtomCallback(
    useCallback((_get, set, data: WorkspaceActivityResponse[]) => {
      data.forEach((w) => {
        set(workspaceActivityState(w.id), w);
      });
    }, []),
  );

  return {
    setWorkspaceActivities,
  };
};
