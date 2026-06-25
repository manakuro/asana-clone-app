import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { useTasksResponse } from '@/store/entities/task';
import { workspaceActivityTaskState } from '../atom';
import type { WorkspaceActivityTaskResponse } from '../type';

export const useWorkspaceActivityTasksResponse = () => {
  const { setTasksFromResponse } = useTasksResponse();

  const setWorkspaceActivityTasks = useAtomCallback(
    useCallback(
      (_get, set, data: WorkspaceActivityTaskResponse[]) => {
        data.forEach((t) => {
          set(workspaceActivityTaskState(t.id), t);

          setTasksFromResponse([t.task]);
        });
      },
      [setTasksFromResponse],
    ),
  );

  return {
    setWorkspaceActivityTasks,
  };
};
