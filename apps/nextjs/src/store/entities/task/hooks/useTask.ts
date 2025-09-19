import { useUpdateTaskMutation } from '@/graphql/hooks';
import {
  formatDueTimeToLocalTimezone,
  formatDueTimeToServerTimezone,
} from '@/shared/date';
import { omit } from '@/shared/utils/omit';
import { useWorkspace } from '@/store/entities/workspace';
import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { taskState } from '../atom';
import type { Task, UpdateTaskInput } from '../type';
import { hasTaskBeenPersisted } from '../util';
import { useHasDescriptionUpdatedValue } from './useHasDescriptionUpdated';
import { TASK_UPDATED_SUBSCRIPTION_REQUEST_ID } from './useTaskUpdatedSubscription';
import { useUpsert } from './useUpsert';

export const useTask = (taskId: string) => {
  const task = useAtomValue(useMemo(() => taskState(taskId), [taskId]));
  const { workspace } = useWorkspace();

  const { upsert } = useUpsert();
  const [updateTaskMutation] = useUpdateTaskMutation();
  const { hasDescriptionUpdated } = useHasDescriptionUpdatedValue({
    taskId,
  });

  const setTask = useAtomCallback(
    useCallback(
      async (get, _, input: Partial<Task>) => {
        const prev = get(taskState(taskId));
        if (!hasTaskBeenPersisted(prev)) return;

        upsert({ ...prev, ...input });

        const restore = () => {
          upsert(prev);
        };

        try {
          const res = await updateTaskMutation({
            variables: {
              input: prepareUpdateTaskInput(taskId, workspace.id, input),
            },
          });

          if (res.errors) {
            restore();
          }
        } catch (e) {
          restore();
          throw e;
        }
      },
      [taskId, updateTaskMutation, upsert, workspace.id],
    ),
  );

  const setTaskName = useAtomCallback(
    useCallback(
      async (get, _set, input: string) => {
        const prev = get(taskState(taskId));
        // Skip when touching input for the first time
        if (prev.isNew && !prev.name && !input) return;
        if (!prev.isNew && prev.name === input) return;

        const isNew = prev.isNew && !!input ? { isNew: false } : {};
        await setTask({ name: input, ...isNew });
      },
      [setTask, taskId],
    ),
  );

  const setTaskDueDate = useAtomCallback(
    useCallback(
      async (_get, _set, input: Date) => {
        await setTask({
          dueDate: formatDueTimeToLocalTimezone(input),
        });
      },
      [setTask],
    ),
  );

  const resetTaskDueDate = useAtomCallback(
    useCallback(async () => {
      await setTask({ dueDate: '' });
    }, [setTask]),
  );

  const isSubtask = useMemo<boolean>(
    () => !!task.taskParentId,
    [task.taskParentId],
  );

  return {
    task,
    setTask,
    setTaskName,
    setTaskDueDate,
    resetTaskDueDate,
    hasDescriptionUpdated,
    isSubtask,
  };
};

const prepareUpdateTaskInput = (
  taskId: string,
  workspaceId: string,
  val: Partial<Task>,
): UpdateTaskInput => {
  let input: UpdateTaskInput = {
    id: taskId,
    workspaceId,
    requestId: TASK_UPDATED_SUBSCRIPTION_REQUEST_ID,
    ...val,
  };
  if (input.dueDate === '') {
    input = omit(input, 'dueDate');
    input.clearDueDate = true;
  }
  if (input.dueTime === '') {
    input = omit(input, 'dueTime');
    input.clearDueDate = true;
  }
  if (input.assigneeId === '') {
    input = omit(input, 'assigneeId');
    input.clearTeammate = true;
  }
  if (input.dueDate) {
    input.dueDate = formatDueTimeToServerTimezone(new Date(input.dueDate));
  }

  return input;
};
