import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { taskFeedState } from '../atom';
import type { TaskFeed } from '../type';

export const useUpsert = () => {
  const upsert = useAtomCallback(
    useCallback((_get, set, taskFeed: TaskFeed) => {
      set(taskFeedState(taskFeed.id), taskFeed);
    }, []),
  );

  return {
    upsert,
  };
};
