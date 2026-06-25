import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { taskTagState } from '../atom';
import type { TaskTag } from '../type';

export const useUpsert = () => {
  const upsert = useAtomCallback(
    useCallback((get, set, taskTag: TaskTag) => {
      const prev = get(taskTagState(taskTag.id));
      set(taskTagState(taskTag.id), {
        ...prev,
        ...taskTag,
      });
    }, []),
  );

  return {
    upsert,
  };
};
