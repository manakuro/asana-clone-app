import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { taskColumnState } from '../atom';
import type { TaskColumnResponse } from '../type';

export const useTaskColumnsResponse = () => {
  const setTaskColumns = useAtomCallback(
    useCallback((_get, set, data: TaskColumnResponse[]) => {
      data.forEach((d) => {
        set(taskColumnState(d.id), d);
      });
    }, []),
  );

  return {
    setTaskColumns,
  };
};
