import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { taskFeedLikeState } from '../atom';

export const useTaskTaskFeedLike = (taskFeedLikeId: string) => {
  const taskFeedLike = useAtomValue(
    useMemo(() => taskFeedLikeState(taskFeedLikeId), [taskFeedLikeId]),
  );

  return {
    taskFeedLike,
  };
};
