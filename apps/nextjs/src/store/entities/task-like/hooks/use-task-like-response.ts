import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { taskLikeState } from '../atom';
import type { TaskLikeResponse } from '../type';

export const useTaskLikeResponse = () => {
  const setTaskLikes = useAtomCallback(
    useCallback((_get, set, data: TaskLikeResponse[]) => {
      data.forEach((d) => {
        set(taskLikeState(d.id), d);
      });
    }, []),
  );

  return {
    setTaskLikes,
  };
};
