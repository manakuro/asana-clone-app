import { RESET, useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { taskFeedState } from '../atom';

export const useResetTaskFeed = () => {
  const resetTaskFeed = useAtomCallback(
    useCallback((_get, set, id: string) => {
      set(taskFeedState(id), RESET);
    }, []),
  );

  const resetTaskFeeds = useAtomCallback(
    useCallback((_get, set, teammateTasks: string[]) => {
      teammateTasks.forEach((id) => {
        set(taskFeedState(id), RESET);
      });
    }, []),
  );

  return {
    resetTaskFeed,
    resetTaskFeeds,
  };
};
