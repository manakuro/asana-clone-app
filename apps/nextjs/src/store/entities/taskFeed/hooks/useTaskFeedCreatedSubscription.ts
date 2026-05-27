import { useSubscription } from '@apollo/client/react';
import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback } from 'react';
import { TaskFeedCreatedDocument } from '@/graphql/hooks';
import { uuid } from '@/shared/uuid';
import type { TaskFeedCreatedSubscriptionResponse } from '../type';
import { useTaskFeedResponse } from './useTaskFeedResponse';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};

export const TASK_FEED_CREATED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useTaskFeedCreatedSubscription = (props: Props) => {
  const { setTaskFeed } = useTaskFeedResponse();

  useSubscription(TaskFeedCreatedDocument, {
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_FEED_CREATED_SUBSCRIPTION_REQUEST_ID,
    },
    onData: ({ data }) => {
      if (isEqual(data.data, previousData?.data)) return;

      if (data.data) setTaskBySubscription(data.data);
      previousData = data;
    },
  });

  const setTaskBySubscription = useAtomCallback(
    useCallback(
      async (_get, _set, response: TaskFeedCreatedSubscriptionResponse) => {
        const updated = response.taskFeedCreated;

        console.log('subscription created! ');

        setTaskFeed([updated]);
      },
      [setTaskFeed],
    ),
  );
};
