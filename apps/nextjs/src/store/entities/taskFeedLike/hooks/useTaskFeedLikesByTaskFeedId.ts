import { useMutation } from '@apollo/client/react';
import { useAtom } from 'jotai';
import { RESET, useAtomCallback } from 'jotai/utils';
import { useCallback, useMemo } from 'react';
import {
  CreateTaskFeedLikeDocument,
  DeleteTaskFeedLikeDocument,
} from '@/graphql/hooks';
import { uuid } from '@/shared/uuid';
import { useWorkspace } from '@/store/entities/workspace';
import { initialState, taskFeedLikeState, taskFeedLikesState } from '../atom';
import { TASK_FEED_LIKE_CREATED_SUBSCRIPTION_REQUEST_ID } from './useTaskFeedLikeCreatedSubscription';
import { TASK_FEED_LIKE_DELETED_SUBSCRIPTION_REQUEST_ID } from './useTaskFeedLikeDeletedSubscription';
import { useTaskFeedLikeResponse } from './useTaskFeedLikeResponse';
import { useUpsert } from './useUpsert';

export const useTaskFeedLikesByTaskFeedId = (
  taskFeedId: string,
  taskId: string,
) => {
  const { upsert } = useUpsert();
  const [taskFeedLikesAll] = useAtom(taskFeedLikesState);
  const { workspace } = useWorkspace();
  const { setTaskFeedLikes } = useTaskFeedLikeResponse();

  const [createTaskFeedLikeMutation] = useMutation(CreateTaskFeedLikeDocument);
  const [deleteTaskFeedLikeMutation] = useMutation(DeleteTaskFeedLikeDocument);

  const addTaskFeedLike = useAtomCallback(
    useCallback(
      async (_get, set, teammateId: string) => {
        const id = uuid();
        upsert({
          ...initialState(),
          id,
          taskFeedId,
          teammateId,
          taskId,
        });

        const restore = () => {
          set(taskFeedLikeState(id), RESET);
        };

        setTimeout(async () => {
          try {
            const res = await createTaskFeedLikeMutation({
              variables: {
                input: {
                  teammateId,
                  taskFeedId,
                  taskId,
                  requestId: TASK_FEED_LIKE_CREATED_SUBSCRIPTION_REQUEST_ID,
                  workspaceId: workspace.id,
                },
              },
            });
            if (res.error) {
              restore();
              return;
            }

            const data = res.data?.createTaskFeedLike;
            if (!data) return;

            set(taskFeedLikeState(id), RESET);
            setTaskFeedLikes([data]);
          } catch (e) {
            restore();
            throw e;
          }
        });

        return id;
      },
      [
        createTaskFeedLikeMutation,
        setTaskFeedLikes,
        taskFeedId,
        taskId,
        upsert,
        workspace.id,
      ],
    ),
  );

  const deleteTaskFeedLike = useAtomCallback(
    useCallback(
      async (get, set, teammateId: string) => {
        const prev = get(taskFeedLikesState);
        const taskFeedLike = prev.find(
          (f) => f.teammateId === teammateId && f.taskFeedId === taskFeedId,
        );
        if (!taskFeedLike) return;

        set(taskFeedLikeState(taskFeedLike.id), RESET);

        const restore = () => {
          setTaskFeedLikes([taskFeedLike]);
        };

        setTimeout(async () => {
          try {
            const res = await deleteTaskFeedLikeMutation({
              variables: {
                input: {
                  id: taskFeedLike.id,
                  requestId: TASK_FEED_LIKE_DELETED_SUBSCRIPTION_REQUEST_ID,
                  workspaceId: workspace.id,
                },
              },
            });
            if (res.error) {
              restore();
            }
          } catch (e) {
            restore();
            throw e;
          }
        });
      },
      [deleteTaskFeedLikeMutation, setTaskFeedLikes, taskFeedId, workspace.id],
    ),
  );

  const taskFeedLikes = useMemo(
    () => taskFeedLikesAll.filter((f) => f.taskFeedId === taskFeedId),
    [taskFeedLikesAll, taskFeedId],
  );
  const teammateIds = useMemo(
    () => taskFeedLikes.map((f) => f.teammateId),
    [taskFeedLikes],
  );

  return {
    addTaskFeedLike,
    deleteTaskFeedLike,
    taskFeedLikes,
    teammateIds,
  };
};
