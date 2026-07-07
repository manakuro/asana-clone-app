import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback, useMemo } from 'react';
import { taskColumnState } from '../atom';
import type { TaskColumn } from '../type';
import { useUpsert } from './use-upsert';

export const useTaskColumn = (taskColumnId?: string) => {
  const taskColumn = useAtomValue(
    useMemo(() => taskColumnState(taskColumnId || ''), [taskColumnId]),
  );
  const { upsert } = useUpsert();

  const setTaskColumn = useAtomCallback(
    useCallback(
      (get, _set, input: Partial<TaskColumn>) => {
        const prev = get(taskColumnState(taskColumn.id));
        upsert({
          ...prev,
          ...input,
        });
      },
      [upsert, taskColumn.id],
    ),
  );

  return {
    taskColumn,
    setTaskColumn,
  };
};
