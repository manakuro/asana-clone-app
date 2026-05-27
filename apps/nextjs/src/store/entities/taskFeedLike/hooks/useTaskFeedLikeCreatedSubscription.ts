import { useSubscription } from '@apollo/client/react';
import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { TaskFeedLikeCreatedDocument } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import type { TaskFeedLikeCreatedSubscriptionResponse as Response } from '../type';
import { useTaskFeedLikeResponse } from './useTaskFeedLikeResponse';

export const TASK_FEED_LIKE_CREATED_SUBSCRIPTION_REQUEST_ID = uuid();

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};
export const useTaskFeedLikeCreatedSubscription = (props: Props) => {
  const skipSubscription = useMemo(() => {
    return !props.workspaceId;
  }, [props.workspaceId]);

  const { setTaskFeedLikes } = useTaskFeedLikeResponse();

  useSubscription(TaskFeedLikeCreatedDocument, {
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_FEED_LIKE_CREATED_SUBSCRIPTION_REQUEST_ID,
    },
    onData: ({ data }) => {
      if (isEqual(data.data, previousData?.data)) return;

      if (data.data) setBySubscription(data.data);
      previousData = data;
    },
    skip: skipSubscription,
  });

  const setBySubscription = useAtomCallback(
    useCallback(
      async (_get, _set, response: Response) => {
        const taskFeedLikeCreated = response.taskFeedLikeCreated;

        if (isDev()) console.log('TaskFeedLike created!: ');

        setTaskFeedLikes([taskFeedLikeCreated]);
      },
      [setTaskFeedLikes],
    ),
  );
};
