import { RESET, useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { taskTagState } from '../atom';

export const useResetTaskTag = () => {
  const resetTaskTag = useAtomCallback(
    useCallback((_, set, id: string) => {
      set(taskTagState(id), RESET);
    }, []),
  );

  const resetTaskTags = useAtomCallback(
    useCallback((_, set, taskTags: string[]) => {
      taskTags.forEach((id) => {
        set(taskTagState(id), RESET);
      });
    }, []),
  );

  return {
    resetTaskTag,
    resetTaskTags,
  };
};
