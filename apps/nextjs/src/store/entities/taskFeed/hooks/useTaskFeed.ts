import { useMutation } from '@apollo/client/react';
import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback, useMemo } from 'react';
import { UpdateTaskFeedDocument } from '@/graphql/hooks';
import { useWorkspace } from '@/store/entities/workspace';
import { taskFeedState } from '../atom';
import type { TaskFeed } from '../type';
import { TASK_FEED_UPDATED_SUBSCRIPTION_REQUEST_ID } from './useTaskFeedUpdatedSubscription';
import { useUpsert } from './useUpsert';

export const useTaskFeed = (taskFeedId: string) => {
  const taskFeed = useAtomValue(
    useMemo(() => taskFeedState(taskFeedId), [taskFeedId]),
  );
  const { upsert } = useUpsert();
  const { workspace } = useWorkspace();
  const [updateTaskFeedMutation] = useMutation(UpdateTaskFeedDocument);

  const setTaskFeed = useAtomCallback(
    useCallback(
      async (get, _set, input: Partial<TaskFeed>) => {
        const prev = get(taskFeedState(taskFeed.id));
        upsert({
          ...prev,
          ...input,
        });

        const res = await updateTaskFeedMutation({
          variables: {
            input: {
              id: taskFeedId,
              requestId: TASK_FEED_UPDATED_SUBSCRIPTION_REQUEST_ID,
              workspaceId: workspace.id,
              ...input,
            },
          },
        });

        if (res.error) {
          upsert(prev);
        }
      },
      [taskFeed.id, upsert, updateTaskFeedMutation, taskFeedId, workspace.id],
    ),
  );

  return {
    taskFeed,
    setTaskFeed,
  };
};
