import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { taskFeedLikeState } from '../atom';
import type { TaskFeedLikeResponse } from '../type';

export const useTaskFeedLikeResponse = () => {
  const setTaskFeedLikes = useAtomCallback(
    useCallback((_get, set, data: TaskFeedLikeResponse[]) => {
      data.forEach((d) => {
        set(taskFeedLikeState(d.id), d);
      });
    }, []),
  );

  return {
    setTaskFeedLikes,
  };
};
