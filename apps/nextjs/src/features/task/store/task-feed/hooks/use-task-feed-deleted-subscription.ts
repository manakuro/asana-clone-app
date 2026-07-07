import { useSubscription } from '@apollo/client/react';
import { RESET, useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback } from 'react';
import { taskFeedState } from '@/features/task/store/task-feed';
import { TaskFeedDeletedDocument } from '@/graphql/documents';
import { uuid } from '@/utils/uuid';
import type { TaskFeedDeletedSubscriptionResponse } from '../type';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};

export const TASK_FEED_DELETED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useTaskFeedDeletedSubscription = (props: Props) => {
  useSubscription(TaskFeedDeletedDocument, {
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_FEED_DELETED_SUBSCRIPTION_REQUEST_ID,
    },
    onData: ({ data }) => {
      if (isEqual(data.data, previousData?.data)) return;

      if (data.data) setTaskBySubscription(data.data);
      previousData = data;
    },
  });

  const setTaskBySubscription = useAtomCallback(
    useCallback(
      async (_get, set, response: TaskFeedDeletedSubscriptionResponse) => {
        const data = response.taskFeedDeleted;

        console.log('subscription deleted! ');

        set(taskFeedState(data.taskFeed.id), RESET);
      },
      [],
    ),
  );
};
