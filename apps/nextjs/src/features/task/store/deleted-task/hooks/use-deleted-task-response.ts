import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import {
  type TaskResponse,
  useTasksResponse,
} from '@/features/task/store/task';
import { uniqBy } from '@/utils';
import { deletedTaskState } from '../atom';
import type { DeletedTaskResponse } from '../type';

export const useDeletedTaskResponse = () => {
  const { setTasksFromResponse } = useTasksResponse();

  const setDeletedTask = useAtomCallback(
    useCallback(
      (
        _get,
        set,
        data: DeletedTaskResponse[],
        options?: { includeTask: boolean },
      ) => {
        const includeTask = options?.includeTask ?? true;
        data.forEach((d) => {
          set(deletedTaskState(d.id), d);
        });

        if (!includeTask) return;

        const tasks = data.map<TaskResponse>((d) => ({
          ...d.task,
          taskSectionId: '',
        }));

        setTasksFromResponse(uniqBy(tasks, 'id'));
      },
      [setTasksFromResponse],
    ),
  );

  return {
    setDeletedTask,
  };
};
