import { RESET, useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { useTaskLikeDeletedSubscription as useSubscription } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import { taskLikeState } from '@/store/entities/taskLike';
import type { TaskLikeDeletedSubscriptionResponse as Response } from '../type';

export const TASK_LIKE_DELETED_SUBSCRIPTION_REQUEST_ID = uuid();

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};
export const useTaskLikeDeletedSubscription = (props: Props) => {
  const skipSubscription = useMemo(() => {
    return !props.workspaceId;
  }, [props.workspaceId]);

  useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_LIKE_DELETED_SUBSCRIPTION_REQUEST_ID,
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
    useCallback((_get, set, response: Response) => {
      const taskLikeDeleted = response.taskLikeDeleted;

      if (isDev()) console.log('TaskLike deleted!');

      set(taskLikeState(taskLikeDeleted.id), RESET);
    }, []),
  );
};
