import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { activityState } from '../atom';
import type { Activity, ActivityResponse } from '../type';

export const useActivitiesResponse = () => {
  const setActivities = useAtomCallback(
    useCallback((_get, set, data: ActivityResponse[]) => {
      data.forEach((a) => {
        set(activityState(a.id), a as Activity);
      });
    }, []),
  );

  return {
    setActivities,
  };
};
