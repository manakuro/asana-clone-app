import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { archivedTaskActivityState } from '../atom';
import type { ArchivedTaskActivityResponse } from '../type';

export const useArchivedTaskActivitiesResponse = () => {
  const setArchivedTaskActivities = useAtomCallback(
    useCallback((_get, set, data: ArchivedTaskActivityResponse[]) => {
      data.forEach((d) => {
        set(archivedTaskActivityState(d.id), d);
      });
    }, []),
  );

  return {
    setArchivedTaskActivities,
  };
};
