import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { archivedWorkspaceActivityState } from '../atom';
import type { ArchivedWorkspaceActivityResponse } from '../type';

export const useArchivedWorkspaceActivitiesResponse = () => {
  const setArchivedWorkspaceActivities = useAtomCallback(
    useCallback((_get, set, data: ArchivedWorkspaceActivityResponse[]) => {
      data.forEach((w) => {
        set(archivedWorkspaceActivityState(w.id), w);
      });
    }, []),
  );

  return {
    setArchivedWorkspaceActivities,
  };
};
