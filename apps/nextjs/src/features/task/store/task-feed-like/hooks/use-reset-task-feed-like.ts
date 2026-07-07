import { RESET, useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { taskFeedLikeState } from '../atom';

export const useResetTaskFeedLike = () => {
  const resetTaskFeedLike = useAtomCallback(
    useCallback((_get, set, id: string) => {
      set(taskFeedLikeState(id), RESET);
    }, []),
  );

  const resetTaskFeedLikes = useAtomCallback(
    useCallback((_get, set, taskFeedLikes: string[]) => {
      taskFeedLikes.forEach((id) => {
        set(taskFeedLikeState(id), RESET);
      });
    }, []),
  );

  return {
    resetTaskFeedLike,
    resetTaskFeedLikes,
  };
};
