import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { useTasksResponse } from '@/features/task/store/task';
import { archivedTaskActivityTaskState } from '../atom';
import type { ArchivedTaskActivityTaskResponse } from '../type';

export const useArchivedTaskActivityTasksResponse = () => {
  const { setTasksFromResponse } = useTasksResponse();

  const setArchivedTaskActivityTasks = useAtomCallback(
    useCallback(
      (_get, set, data: ArchivedTaskActivityTaskResponse[]) => {
        data.forEach((t) => {
          set(archivedTaskActivityTaskState(t.id), t);

          setTasksFromResponse([t.task]);
        });
      },
      [setTasksFromResponse],
    ),
  );

  return {
    setArchivedTaskActivityTasks,
  };
};
