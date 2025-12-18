import isEqual from 'lodash-es/isEqual';
import { useMemo } from 'react';
import { useTeammateTaskUpdatedSubscription as useSubscription } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import type { TeammateTaskUpdatedSubscriptionResponse as Response } from '../type';
import { useTeammateTaskResponse } from './useTeammateTaskResponse';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
  teammateId: string;
};
export const TEAMMATE_TASK_UPDATED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useTeammateTaskUpdatedSubscription = (props: Props) => {
  const { setTeammateTask } = useTeammateTaskResponse();

  const skipSubscription = useMemo(
    () => !props.teammateId || !props.workspaceId,
    [props.teammateId, props.workspaceId],
  );
  const subscriptionResult = useSubscription({
    variables: {
      teammateId: props.teammateId,
      workspaceId: props.workspaceId,
      requestId: TEAMMATE_TASK_UPDATED_SUBSCRIPTION_REQUEST_ID,
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

  const setBySubscription = (response: Response) => {
    const created = response.teammateTaskUpdated;

    if (isDev()) console.log('Teammate Task updated!');

    setTeammateTask([
      {
        ...created,
        task: {
          ...created.task,
          isNew: false,
        },
      },
    ]);
  };

  return {
    subscriptionResult,
  };
};
