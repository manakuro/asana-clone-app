import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback, useMemo } from 'react';
import { deletedTaskState } from '../atom';
import type { DeletedTask } from '../type';

export const useDeletedTask = (deletedTaskId: string) => {
  const deletedTask = useAtomValue(
    useMemo(() => deletedTaskState(deletedTaskId), [deletedTaskId]),
  );

  const setDeletedTask = useAtomCallback(
    useCallback(
      (get, set, input: Partial<DeletedTask>) => {
        const prev = get(deletedTaskState(deletedTask.id));
        const updated = {
          ...prev,
          ...input,
        };
        set(deletedTaskState(deletedTask.id), updated);
      },
      [deletedTask.id],
    ),
  );

  return {
    deletedTask,
    setDeletedTask,
  };
};
