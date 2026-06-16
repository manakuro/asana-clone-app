import { useSubscription } from '@apollo/client/react';
import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { TaskLikeCreatedDocument } from '@/graphql/hooks';
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

  useSubscription(TaskLikeCreatedDocument, {
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_LIKE_CREATED_SUBSCRIPTION_REQUEST_ID,
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
      (_get, _set, response: Response) => {
        const taskLikeCreated = response.taskLikeCreated;

        if (isDev()) console.log('TaskLike created!: ');

        setTaskLikes([taskLikeCreated]);
      },
      [setTaskLikes],
    ),
  );
};
