import { useSubscription } from '@apollo/client/react';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { TaskTagDeletedDocument } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import type { TaskTagDeletedSubscriptionResponse as Response } from '../type';
import { useResetTaskTag } from './useResetTaskTag';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};
export const TASK_TAG_DELETED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useTaskTagDeletedSubscription = (props: Props) => {
  const { resetTaskTag } = useResetTaskTag();

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  );
  useSubscription(TaskTagDeletedDocument, {
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_TAG_DELETED_SUBSCRIPTION_REQUEST_ID,
    },
    onData: ({ data }) => {
      if (isEqual(data.data, previousData?.data)) return;

      if (data.data) setBySubscription(data.data);
      previousData = data;
    },
    skip: skipSubscription,
  });

  const setBySubscription = useCallback(
    async (response: Response) => {
      const data = response.taskTagDeleted;

      if (isDev()) console.log('Teammate Task created!');

      resetTaskTag(data.id);
    },
    [resetTaskTag],
  );
};
