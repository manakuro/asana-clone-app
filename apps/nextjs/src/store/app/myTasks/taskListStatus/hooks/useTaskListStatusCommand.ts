import { useMutation } from '@apollo/client/react';
import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { UpdateTeammateTaskListStatusDocument } from '@/graphql/hooks';
import type { TaskListSortStatusCodeValue } from '@/store/app/myTasks/taskListStatus';
import type { TaskListCompletedStatusCodeValue } from '@/store/entities/taskListCompletedStatus';
import { useWorkspace } from '@/store/entities/workspace';
import { taskListStatusState } from '../atom';
import { useUpsert } from './useUpsert';

export const useTaskListStatusCommand = () => {
  const { upsert } = useUpsert();
  const { workspace } = useWorkspace();

  const [updateTeammateTaskListStatusMutation] = useMutation(
    UpdateTeammateTaskListStatusDocument,
  );

  const setTaskListCompletedStatus = useAtomCallback(
    useCallback(
      async (
        get,
        _set,
        input: { statusCode: TaskListCompletedStatusCodeValue },
      ) => {
        const prev = get(taskListStatusState);

        upsert({
          taskListCompletedStatus: {
            ...prev.taskListCompletedStatus,
            ...input,
          },
        });

        const restore = () => {
          upsert(prev);
        };

        try {
          const res = await updateTeammateTaskListStatusMutation({
            variables: {
              input: {
                id: prev.id,
                taskListCompletedStatusCode: input.statusCode,
                requestId: '',
                workspaceId: workspace.id,
              },
            },
          });
          if (res.error) {
            restore();
            return;
          }
          const data = res.data?.updateTeammateTaskListStatus;
          if (!data) return;

          upsert(data);
        } catch (e) {
          restore();
          throw e;
        }
      },
      [updateTeammateTaskListStatusMutation, upsert, workspace.id],
    ),
  );

  const setTaskListSortStatus = useAtomCallback(
    useCallback(
      async (get, _set, input: { statusCode: TaskListSortStatusCodeValue }) => {
        const prev = get(taskListStatusState);

        upsert({
          taskListSortStatus: {
            ...prev.taskListSortStatus,
            ...input,
          },
        });

        const restore = () => {
          upsert(prev);
        };

        try {
          const res = await updateTeammateTaskListStatusMutation({
            variables: {
              input: {
                id: prev.id,
                taskListSortStatusCode: input.statusCode,
                requestId: '',
                workspaceId: workspace.id,
              },
            },
          });
          if (res.error) {
            restore();
            return;
          }
          const data = res.data?.updateTeammateTaskListStatus;
          if (!data) return;

          upsert(data);
        } catch (e) {
          restore();
          throw e;
        }
      },
      [updateTeammateTaskListStatusMutation, upsert, workspace.id],
    ),
  );

  return {
    setTaskListCompletedStatus,
    setTaskListSortStatus,
  };
};
