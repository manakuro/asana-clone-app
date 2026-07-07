import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { taskLikeState } from '../atom';
import type { TaskLike } from '../type';

export const useUpsert = () => {
  const upsert = useAtomCallback(
    useCallback((_get, set, input: TaskLike) => {
      set(taskLikeState(input.id), input);
    }, []),
  );

  return {
    upsert,
  };
};
