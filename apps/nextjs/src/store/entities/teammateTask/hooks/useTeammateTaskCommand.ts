import {
  useCreateTeammateTaskMutation,
  useUpdateTeammateTaskMutation,
} from '@/graphql/hooks';
import { uuid } from '@/shared/uuid';
import { useMe } from '@/store/entities/me';
import {
  taskOptimisticState,
  taskState,
  useTaskCommand,
} from '@/store/entities/task';
import { useWorkspace } from '@/store/entities/workspace';
import { useAtomCallback } from 'jotai/utils';
import { RESET } from 'jotai/utils';
import { useCallback } from 'react';
import {
  initialState,
  teammateTaskByTaskIdState,
  teammateTaskState,
} from '../atom';
import type { TeammateTask } from '../type';
import { TEAMMATE_TASK_CREATED_SUBSCRIPTION_REQUEST_ID } from './useTeammateTaskCreatedSubscription';
import { useTeammateTaskResponse } from './useTeammateTaskResponse';
import { TEAMMATE_TASK_UPDATED_SUBSCRIPTION_REQUEST_ID } from './useTeammateTaskUpdatedSubscription';

export const useTeammateTaskCommand = () => {
  const { me } = useMe();
  const { workspace } = useWorkspace();
  const { addTask } = useTaskCommand();
  const [createTeammateTaskMutation] = useCreateTeammateTaskMutation();
  const [updateTeammateTaskMutation] = useUpdateTeammateTaskMutation();
  const { setTeammateTask } = useTeammateTaskResponse();

  const setTeammateTaskByTaskId = useAtomCallback(
    useCallback(
      async (get, set, taskId: string, input: Partial<TeammateTask>) => {
        const prev = get(teammateTaskByTaskIdState(taskId));
        const updated = { ...prev, ...input };
        set(teammateTaskState(prev.id), updated);

        const restore = () => {
          set(teammateTaskState(prev.id), prev);
        };

        try {
          const res = await updateTeammateTaskMutation({
            variables: {
              input: {
                ...input,
                id: prev.id,
                workspaceId: prev.workspaceId,
                requestId: TEAMMATE_TASK_UPDATED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          });
          if (res.errors) {
            set(teammateTaskState(prev.id), prev);
          }
        } catch (e) {
          restore();
          throw e;
        }
      },
      [updateTeammateTaskMutation],
    ),
  );

  const addTeammateTask = useAtomCallback(
    useCallback(
      async (
        get,
        set,
        input: Partial<TeammateTask> & {
          teammateTaskSectionId: string;
          taskParentId?: string;
        },
      ) => {
        const id = uuid();
        const newTaskId = addTask({
          assigneeId: me.id,
          taskParentId: input.taskParentId || '',
        });
        const newTeammateTask = {
          ...initialState(),
          ...input,
          id,
          taskId: newTaskId,
          teammateId: me.id,
        };
        set(teammateTaskState(id), newTeammateTask);

        const restore = () => {
          set(teammateTaskState(id), RESET);
          set(taskState(newTaskId), RESET);
        };

        try {
          const res = await createTeammateTaskMutation({
            variables: {
              input: {
                teammateId: me.id,
                teammateTaskSectionId: input.teammateTaskSectionId,
                workspaceId: workspace.id,
                taskParentId: input.taskParentId ?? null,
                requestId: TEAMMATE_TASK_CREATED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          });
          if (res.errors) {
            restore();
            return '';
          }

          const data = res.data?.createTeammateTask;
          if (!data) return '';

          const optimisticTask = get(taskOptimisticState(newTaskId));
          set(teammateTaskState(id), RESET);
          set(taskState(newTaskId), RESET);
          set(taskOptimisticState(newTaskId), RESET);
          taskOptimisticState.remove(newTaskId);
          setTeammateTask([
            {
              ...data,
              task: {
                ...data.task,
                name: optimisticTask.name,
              },
            },
          ]);

          return data.id;
        } catch (e) {
          restore();
          throw e;
        }
      },
      [
        addTask,
        createTeammateTaskMutation,
        me.id,
        setTeammateTask,
        workspace.id,
      ],
    ),
  );

  return {
    addTeammateTask,
    setTeammateTaskByTaskId,
  };
};
