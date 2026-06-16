import { useSubscription } from '@apollo/client/react';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { TaskTagCreatedDocument } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import type { TaskTagCreatedSubscriptionResponse as Response } from '../type';
import { useTaskTagResponse } from './useTaskTagResponse';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};
export const TASK_TAG_CREATED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useTaskTagCreatedSubscription = (props: Props) => {
  const { setTaskTag } = useTaskTagResponse();

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  );
  useSubscription(TaskTagCreatedDocument, {
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_TAG_CREATED_SUBSCRIPTION_REQUEST_ID,
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
      const data = response.taskTagCreated;

      if (isDev()) console.log('Teammate Task created!');

      setTaskTag([data]);
    },
    [setTaskTag],
  );
};
