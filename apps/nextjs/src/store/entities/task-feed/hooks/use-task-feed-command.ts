import { useMutation } from '@apollo/client/react';
import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import {
  CreateTaskFeedDocument,
  DeleteTaskFeedDocument,
  UndeleteTaskFeedDocument,
} from '@/graphql/hooks';
import { uuid } from '@/shared/uuid';
import { useTaskFeedLikeResponse } from '@/store/entities/task-feed-like';
import { useTaskFileResponse } from '@/store/entities/task-file';
import { useWorkspace } from '@/store/entities/workspace';
import { initialState, taskFeedState } from '../atom';
import type { DeleteTaskFeedResponse, TaskFeed } from '../type';
import { useResetTaskFeed } from './use-reset-task-feed';
import { TASK_FEED_CREATED_SUBSCRIPTION_REQUEST_ID } from './use-task-feed-created-subscription';
import { TASK_FEED_DELETED_SUBSCRIPTION_REQUEST_ID } from './use-task-feed-deleted-subscription';
import { useTaskFeedResponse } from './use-task-feed-response';
import { useUpsert } from './use-upsert';

export const useTaskFeedCommand = () => {
  const { upsert } = useUpsert();
  const { workspace } = useWorkspace();
  const [createTaskFeedMutation] = useMutation(CreateTaskFeedDocument);
  const [deleteTaskFeedMutation] = useMutation(DeleteTaskFeedDocument);
  const [undeleteTaskFeedMutation] = useMutation(UndeleteTaskFeedDocument);

  const { resetTaskFeed } = useResetTaskFeed();
  const { setTaskFeed } = useTaskFeedResponse();
  const { setTaskFeedLikes } = useTaskFeedLikeResponse();
  const { setTaskFiles } = useTaskFileResponse();

  const addTaskFeed = useAtomCallback(
    useCallback(
      (
        _get,
        _set,
        input: Pick<TaskFeed, 'taskId' | 'teammateId' | 'description'>,
      ) => {
        const id = uuid();
        upsert({
          ...initialState(),
          ...input,
          id,
        });

        const restore = () => {
          resetTaskFeed(id);
        };

        setTimeout(async () => {
          try {
            const res = await createTaskFeedMutation({
              variables: {
                input: {
                  taskId: input.taskId,
                  teammateId: input.teammateId,
                  description: input.description,
                  requestId: TASK_FEED_CREATED_SUBSCRIPTION_REQUEST_ID,
                  workspaceId: workspace.id,
                },
              },
            });
            if (res.error) {
              restore();
              return;
            }

            const data = res.data?.createTaskFeed;
            if (!data) return '';

            resetTaskFeed(id);
            setTaskFeed([data]);
          } catch (e) {
            restore();
            throw e;
          }
        });

        return id;
      },
      [
        upsert,
        createTaskFeedMutation,
        resetTaskFeed,
        setTaskFeed,
        workspace.id,
      ],
    ),
  );

  const deleteTaskFeed = useAtomCallback(
    useCallback(
      async (get, _set, input: { id: string }) => {
        const prev = get(taskFeedState(input.id));

        resetTaskFeed(input.id);

        const restore = () => {
          setTaskFeed([prev]);
        };

        try {
          const res = await deleteTaskFeedMutation({
            variables: {
              input: {
                id: input.id,
                requestId: TASK_FEED_DELETED_SUBSCRIPTION_REQUEST_ID,
                workspaceId: workspace.id,
              },
            },
          });
          if (res.error) {
            setTaskFeed([prev]);
            return;
          }
          return res.data?.deleteTaskFeed;
        } catch (e) {
          restore();
          throw e;
        }
      },
      [resetTaskFeed, deleteTaskFeedMutation, setTaskFeed, workspace.id],
    ),
  );

  const undeleteTaskFeed = useAtomCallback(
    useCallback(
      async (_get, _set, input: DeleteTaskFeedResponse) => {
        const id = uuid();
        setTaskFeed([{ ...input.taskFeed, id }]);

        const restore = () => {
          resetTaskFeed(input.taskFeed.id);
        };

        try {
          const res = await undeleteTaskFeedMutation({
            variables: {
              input: {
                taskFeed: input.taskFeed,
                taskFeedLikes: input.taskFeedLikes,
                taskFiles: input.taskFiles,
                requestId: '',
                workspaceId: workspace.id,
              },
            },
          });
          if (res.error) {
            restore();
            return;
          }
          const data = res.data?.undeleteTaskFeed;
          if (!data) return;

          resetTaskFeed(id);
          setTaskFeed([data.taskFeed]);
          setTaskFeedLikes(data.taskFeedLikes);
          setTaskFiles(data.taskFiles);
        } catch (e) {
          restore();
          throw e;
        }
      },
      [
        resetTaskFeed,
        setTaskFeed,
        setTaskFeedLikes,
        setTaskFiles,
        undeleteTaskFeedMutation,
        workspace.id,
      ],
    ),
  );

  return {
    addTaskFeed,
    deleteTaskFeed,
    undeleteTaskFeed,
  };
};
