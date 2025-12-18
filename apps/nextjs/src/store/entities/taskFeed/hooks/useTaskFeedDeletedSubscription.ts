import { RESET, useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback } from 'react';
import { useTaskFeedDeletedSubscription as useSubscription } from '@/graphql/hooks';
import { uuid } from '@/shared/uuid';
import { taskFeedState } from '@/store/entities/taskFeed';
import type { TaskFeedDeletedSubscriptionResponse } from '../type';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};

export const TASK_FEED_DELETED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useTaskFeedDeletedSubscription = (props: Props) => {
  useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_FEED_DELETED_SUBSCRIPTION_REQUEST_ID,
    },
    onSubscriptionData: (data) => {
      if (
        isEqual(
          data.subscriptionData.data,
          previousData?.subscriptionData?.data,
        )
      )
        return;

      if (data.subscriptionData.data)
        setTaskBySubscription(data.subscriptionData.data);
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
