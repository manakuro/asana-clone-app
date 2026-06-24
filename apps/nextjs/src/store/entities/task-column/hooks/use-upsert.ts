import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { taskColumnState } from '../atom';
import type { TaskColumn } from '../type';

export const useUpsert = () => {
  const upsert = useAtomCallback(
    useCallback((_get, set, taskColumn: TaskColumn) => {
      set(taskColumnState(taskColumn.id), taskColumn);
    }, []),
  );

  return {
    upsert,
  };
};
