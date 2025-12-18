import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { useTaskLikeCreatedSubscription as useSubscription } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import type { TaskLikeCreatedSubscriptionResponse as Response } from '../type';
import { useTaskLikeResponse } from './useTaskLikeResponse';

export const TASK_LIKE_CREATED_SUBSCRIPTION_REQUEST_ID = uuid();

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};
export const useTaskLikeCreatedSubscription = (props: Props) => {
  const skipSubscription = useMemo(() => {
    return !props.workspaceId;
  }, [props.workspaceId]);

  const { setTaskLikes } = useTaskLikeResponse();

  useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_LIKE_CREATED_SUBSCRIPTION_REQUEST_ID,
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
        setBySubscription(data.subscriptionData.data);
      previousData = data;
    },
    skip: skipSubscription,
  });

  const setBySubscription = useAtomCallback(
    useCallback(
      (_get, _set, response: Response) => {
        const taskLikeCreated = response.taskLikeCreated;

        if (isDev()) console.log('TaskLike created!: ');

        setTaskLikes([taskLikeCreated]);
      },
      [setTaskLikes],
    ),
  );
};
