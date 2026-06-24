import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { useTasksResponse } from '@/store/entities/task';
import { archivedWorkspaceActivityTaskState } from '../atom';
import type { ArchivedWorkspaceActivityTaskResponse } from '../type';

export const useArchivedWorkspaceActivityTasksResponse = () => {
  const { setTasksFromResponse } = useTasksResponse();

  const setArchivedWorkspaceActivityTasks = useAtomCallback(
    useCallback(
      (_get, set, data: ArchivedWorkspaceActivityTaskResponse[]) => {
        data.forEach((t) => {
          set(archivedWorkspaceActivityTaskState(t.id), t);

          setTasksFromResponse([t.task]);
        });
      },
      [setTasksFromResponse],
    ),
  );

  return {
    setArchivedWorkspaceActivityTasks,
  };
};
