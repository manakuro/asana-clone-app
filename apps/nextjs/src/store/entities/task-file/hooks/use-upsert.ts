import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { taskFileState } from '../atom';
import type { TaskFile } from '../type';

export const useUpsert = () => {
  const upsert = useAtomCallback(
    useCallback((_, set, input: TaskFile) => {
      set(taskFileState(input.id), input);
    }, []),
  );

  return {
    upsert,
  };
};
