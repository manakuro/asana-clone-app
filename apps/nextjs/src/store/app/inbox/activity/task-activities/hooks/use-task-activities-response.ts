import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { taskActivityState } from '../atom';
import type { TaskActivityResponse } from '../type';

export const useTaskActivitiesResponse = () => {
  const setTaskActivities = useAtomCallback(
    useCallback((_get, set, data: TaskActivityResponse[]) => {
      data.forEach((d) => {
        set(taskActivityState(d.id), d);
      });
    }, []),
  );

  return {
    setTaskActivities,
  };
};
