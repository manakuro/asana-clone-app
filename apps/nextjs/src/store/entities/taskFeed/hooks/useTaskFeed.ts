import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback, useMemo } from 'react';
import { useUpdateTaskFeedMutation } from 'src/graphql/hooks';
import { useWorkspace } from 'src/store/entities/workspace';
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
  const [updateTaskFeedMutation] = useUpdateTaskFeedMutation();

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

        if (res.errors) {
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
