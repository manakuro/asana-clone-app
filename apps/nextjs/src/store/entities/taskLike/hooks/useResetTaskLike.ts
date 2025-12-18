import { RESET, useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { taskLikeState } from '../atom';

export const useResetTaskLike = () => {
  const resetTaskLike = useAtomCallback(
    useCallback((_get, set, id: string) => {
      set(taskLikeState(id), RESET);
    }, []),
  );

  const resetTaskLikes = useAtomCallback(
    useCallback((_get, set, taskLikes: string[]) => {
      taskLikes.forEach((id) => {
        set(taskLikeState(id), RESET);
      });
    }, []),
  );

  return {
    resetTaskLike,
    resetTaskLikes,
  };
};
