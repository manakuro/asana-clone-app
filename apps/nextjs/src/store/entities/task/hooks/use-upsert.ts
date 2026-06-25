import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import type { Task } from '@/store/entities/task';
import { taskState } from '../atom';

export const useUpsert = () => {
  const upsert = useAtomCallback(
    useCallback((get, set, task: Task) => {
      const prev = get(taskState(task.id));
      set(taskState(task.id), {
        ...prev,
        ...task,
      });
    }, []),
  );

  return {
    upsert,
  };
};
