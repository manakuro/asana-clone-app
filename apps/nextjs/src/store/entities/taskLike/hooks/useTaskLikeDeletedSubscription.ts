import { useSubscription } from '@apollo/client/react';
import { RESET, useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { TaskLikeDeletedDocument } from '@/graphql/hooks';
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

  useSubscription(TaskLikeDeletedDocument, {
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_LIKE_DELETED_SUBSCRIPTION_REQUEST_ID,
    },
    onData: ({ data }) => {
      if (isEqual(data.data, previousData?.data)) return;

      if (data.data) setBySubscription(data.data);
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
