import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { taskFeedLikeState } from '../atom';
import type { TaskFeedLike } from '../type';

export const useUpsert = () => {
  const upsert = useAtomCallback(
    useCallback((_get, set, taskFeedLike: TaskFeedLike) => {
      set(taskFeedLikeState(taskFeedLike.id), taskFeedLike);
    }, []),
  );

  return {
    upsert,
  };
};
