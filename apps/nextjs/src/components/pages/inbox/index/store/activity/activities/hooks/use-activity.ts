import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { activityState } from '../atom';

export const useActivity = (activityId: string) => {
  const activity = useAtomValue(
    useMemo(() => activityState(activityId), [activityId]),
  );

  return {
    activity,
  };
};
