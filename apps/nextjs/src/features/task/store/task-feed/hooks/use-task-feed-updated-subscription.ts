import { useSubscription } from '@apollo/client/react';
import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { TaskFeedUpdatedDocument } from '@/graphql/documents';
import { isULID } from '@/utils/ulid';
import { uuid } from '@/utils/uuid';
import type { TaskFeedUpdatedSubscriptionResponse } from '../type';
import { useTaskFeedResponse } from './use-task-feed-response';

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

  useSubscription(TaskFeedUpdatedDocument, {
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_FEED_UPDATED_SUBSCRIPTION_REQUEST_ID,
    },
    onData: ({ data }) => {
      if (isEqual(data.data, previousData?.data)) return;

      if (data.data) setTaskBySubscription(data.data);
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
