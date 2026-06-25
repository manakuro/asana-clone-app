import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { taskTagState } from '../atom';
import type { TaskTagResponse } from '../type';

export const useTaskTagResponse = () => {
  const setTaskTag = useAtomCallback(
    useCallback((get, set, data: TaskTagResponse[]) => {
      data.forEach((d) => {
        const prev = get(taskTagState(d.id));
        set(taskTagState(d.id), {
          ...prev,
          ...d,
        });
      });
    }, []),
  );

  return {
    setTaskTag,
  };
};
