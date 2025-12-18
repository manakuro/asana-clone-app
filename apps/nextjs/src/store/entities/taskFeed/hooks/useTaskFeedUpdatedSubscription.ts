import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { useTaskFeedUpdatedSubscription as useSubscription } from '@/graphql/hooks';
import { isULID } from '@/shared/ulid';
import { uuid } from '@/shared/uuid';
import type { TaskFeedUpdatedSubscriptionResponse } from '../type';
import { useTaskFeedResponse } from './useTaskFeedResponse';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};

export const TASK_FEED_UPDATED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useTaskFeedUpdatedSubscription = (props: Props) => {
  const { setTaskFeed } = useTaskFeedResponse();

  const skipSubscription = useMemo(
    () => !props.workspaceId || !isULID(props.workspaceId),
    [props.workspaceId],
  );

  useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_FEED_UPDATED_SUBSCRIPTION_REQUEST_ID,
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
    skip: skipSubscription,
  });

  const setTaskBySubscription = useAtomCallback(
    useCallback(
      async (_get, _set, response: TaskFeedUpdatedSubscriptionResponse) => {
        const updated = response.taskFeedUpdated;

        console.log('subscription updated!: ');

        setTaskFeed([updated]);
      },
      [setTaskFeed],
    ),
  );
};
