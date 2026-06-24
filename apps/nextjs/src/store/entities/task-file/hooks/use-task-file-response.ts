import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { taskFileState } from '../atom';
import type { TaskFileResponse } from '../type';

export const useTaskFileResponse = () => {
  const setTaskFiles = useAtomCallback(
    useCallback((_get, set, data: TaskFileResponse[]) => {
      data.forEach((d) => {
        set(taskFileState(d.id), d);
      });
    }, []),
  );

  return {
    setTaskFiles,
  };
};
