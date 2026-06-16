import { useSubscription } from '@apollo/client/react';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { TeammateTaskCreatedDocument } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import type { TeammateTaskCreatedSubscriptionResponse as Response } from '../type';
import { useTeammateTaskResponse } from './useTeammateTaskResponse';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
  teammateId: string;
};
export const TEAMMATE_TASK_CREATED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useTeammateTaskCreatedSubscription = (props: Props) => {
  const { setTeammateTask } = useTeammateTaskResponse();

  const skipSubscription = useMemo(
    () => !props.teammateId || !props.workspaceId,
    [props.teammateId, props.workspaceId],
  );

  const setBySubscription = useCallback(
    async (response: Response) => {
      const created = response.teammateTaskCreated;

      if (isDev()) console.log('Teammate Task created!');

      setTeammateTask([
        {
          ...created,
          task: {
            ...created.task,
            isNew: false,
          },
        },
      ]);
    },
    [setTeammateTask],
  );

  const subscriptionResult = useSubscription(TeammateTaskCreatedDocument, {
    variables: {
      teammateId: props.teammateId,
      workspaceId: props.workspaceId,
      requestId: TEAMMATE_TASK_CREATED_SUBSCRIPTION_REQUEST_ID,
    },
    onData: ({ data }) => {
      if (isEqual(data.data, previousData?.data)) return;

      if (data.data) setBySubscription(data.data);
      previousData = data;
    },
    skip: skipSubscription,
  });

  return {
    subscriptionResult,
  };
};
