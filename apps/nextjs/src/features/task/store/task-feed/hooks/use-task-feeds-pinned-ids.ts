import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { taskFeedPinnedIdsState } from '../atom';

export const useTaskFeedsPinnedIds = (taskId: string) => {
  const taskFeedPinnedIds = useAtomValue(
    useMemo(() => taskFeedPinnedIdsState(taskId), [taskId]),
  );

  return {
    taskFeedPinnedIds,
  };
};
