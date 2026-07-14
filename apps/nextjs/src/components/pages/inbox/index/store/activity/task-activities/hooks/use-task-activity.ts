import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { taskActivityState } from '../atom';

export const useTaskActivity = (myTaskActivityId: string) => {
  const taskActivity = useAtomValue(
    useMemo(() => taskActivityState(myTaskActivityId), [myTaskActivityId]),
  );

  return {
    taskActivity,
  };
};
