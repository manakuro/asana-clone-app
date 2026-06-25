import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { deletedTaskState } from '../atom';
import type { DeletedTask } from '../type';
import { useUpsert } from './use-upsert';

export const useDeletedTaskCommand = () => {
  const { upsert } = useUpsert();

  const setDeletedTaskById = useAtomCallback(
    useCallback(
      (get, _set, taskId: string, input: Partial<DeletedTask>) => {
        const prev = get(deletedTaskState(taskId));
        upsert({
          ...prev,
          ...input,
        });
      },
      [upsert],
    ),
  );

  return {
    setDeletedTaskById,
  };
};
