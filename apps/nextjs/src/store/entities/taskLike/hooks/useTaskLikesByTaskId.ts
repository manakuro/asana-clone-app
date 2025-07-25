import { useMemo } from 'react';
import { useAtom } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { RESET } from 'jotai/utils';
import { useCallback } from 'react';
import {
  useCreateTaskLikeMutation,
  useDeleteTaskLikeMutation,
} from 'src/graphql/hooks';
import { uuid } from 'src/shared/uuid';
import { useWorkspace } from 'src/store/entities/workspace';
import { initialState, taskLikeState, taskLikesState } from '../atom';
import { TASK_LIKE_CREATED_SUBSCRIPTION_REQUEST_ID } from './useTaskLikeCreatedSubscription';
import { TASK_LIKE_DELETED_SUBSCRIPTION_REQUEST_ID } from './useTaskLikeDeletedSubscription';
import { useTaskLikeResponse } from './useTaskLikeResponse';
import { useUpsert } from './useUpsert';

export const useTaskLikesByTaskId = (taskId: string) => {
  const { upsert } = useUpsert();
  const [taskLikesAll] = useAtom(taskLikesState);
  const { workspace } = useWorkspace();
  const { setTaskLikes } = useTaskLikeResponse();

  const [createTaskLikeMutation] = useCreateTaskLikeMutation();
  const [deleteTaskLikeMutation] = useDeleteTaskLikeMutation();

  const addTaskLike = useAtomCallback(
    useCallback(
      (_get, set, teammateId: string) => {
        const id = uuid();
        upsert({
          ...initialState(),
          id,
          taskId,
          teammateId,
          workspaceId: workspace.id,
        });

        const restore = () => {
          set(taskLikeState(id), RESET);
        };

        setTimeout(async () => {
          try {
            const res = await createTaskLikeMutation({
              variables: {
                input: {
                  taskId,
                  teammateId,
                  workspaceId: workspace.id,
                  requestId: TASK_LIKE_CREATED_SUBSCRIPTION_REQUEST_ID,
                },
              },
            });
            if (res.errors) {
              restore();
              return;
            }

            const data = res.data?.createTaskLike;
            if (!data) return '';

            set(taskLikeState(id), RESET);
            setTaskLikes([data]);
          } catch (e) {
            restore();
            throw e;
          }
        });

        return id;
      },
      [createTaskLikeMutation, setTaskLikes, taskId, upsert, workspace.id],
    ),
  );

  const deleteTaskLike = useAtomCallback(
    useCallback(
      (get, set, teammateId: string) => {
        const prev = get(taskLikesState);
        const taskLike = prev.find(
          (f) =>
            f.teammateId === teammateId &&
            f.taskId === taskId &&
            f.workspaceId === workspace.id,
        );
        if (!taskLike) return;

        set(taskLikeState(taskLike.id), RESET);

        const restore = () => {
          setTaskLikes([taskLike]);
        };

        setTimeout(async () => {
          try {
            const res = await deleteTaskLikeMutation({
              variables: {
                input: {
                  id: taskLike.id,
                  requestId: TASK_LIKE_DELETED_SUBSCRIPTION_REQUEST_ID,
                  workspaceId: workspace.id,
                },
              },
            });

            if (res.errors) {
              restore();
            }
          } catch (e) {
            restore();
            throw e;
          }
        });
      },
      [deleteTaskLikeMutation, setTaskLikes, taskId, workspace.id],
    ),
  );

  const taskLikes = useMemo(
    () => taskLikesAll.filter((f) => f.taskId === taskId),
    [taskLikesAll, taskId],
  );
  const teammateIds = useMemo(
    () => taskLikes.map((f) => f.teammateId),
    [taskLikes],
  );

  return {
    addTaskLike,
    deleteTaskLike,
    taskLikes,
    teammateIds,
  };
};
