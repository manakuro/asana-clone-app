import { RESET, useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { taskFileState } from '../atom';

export const useResetTaskFile = () => {
  const resetTaskFile = useAtomCallback(
    useCallback((_get, set, id: string) => {
      set(taskFileState(id), RESET);
    }, []),
  );

  const resetTaskFiles = useAtomCallback(
    useCallback((_get, set, taskFiles: string[]) => {
      taskFiles.forEach((id) => {
        set(taskFileState(id), RESET);
      });
    }, []),
  );

  return {
    resetTaskFile,
    resetTaskFiles,
  };
};
