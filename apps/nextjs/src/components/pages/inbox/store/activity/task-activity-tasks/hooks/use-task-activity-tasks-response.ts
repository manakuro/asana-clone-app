import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { useTasksResponse } from '@/features/task/store/task';
import { taskActivityTaskState } from '../atom';
import type { TaskActivityTaskResponse } from '../type';

export const useTaskActivityTasksResponse = () => {
  const { setTasksFromResponse } = useTasksResponse();

  const setTaskActivityTasks = useAtomCallback(
    useCallback(
      (_get, set, data: TaskActivityTaskResponse[]) => {
        data.forEach((d) => {
          set(taskActivityTaskState(d.id), d);

          setTasksFromResponse([d.task]);
        });
      },
      [setTasksFromResponse],
    ),
  );

  return {
    setTaskActivityTasks,
  };
};
