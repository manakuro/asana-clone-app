import { useRecoilCallback } from 'recoil';
import { useTasksResponse } from 'src/store/entities/task';
import { archivedWorkspaceActivityTaskState } from '../atom';
import type { ArchivedWorkspaceActivityTaskResponse } from '../type';

export const useArchivedWorkspaceActivityTasksResponse = () => {
  const { setTasksFromResponse } = useTasksResponse();

  const setArchivedWorkspaceActivityTasks = useRecoilCallback(
    ({ set }) =>
      (data: ArchivedWorkspaceActivityTaskResponse[]) => {
        data.forEach((t) => {
          set(archivedWorkspaceActivityTaskState(t.id), t);

          setTasksFromResponse([t.task]);
        });
      },
    [setTasksFromResponse],
  );

  return {
    setArchivedWorkspaceActivityTasks,
  };
};
