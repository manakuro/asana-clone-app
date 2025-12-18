import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { useTeammateTaskSectionCreatedSubscription as useSubscription } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import type { TeammateTaskSectionCreatedSubscriptionResponse as Response } from '../type';
import { useTeammatesTaskSectionResponse } from './useTeammatesTaskSectionResponse';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  teammateId: string;
  workspaceId: string;
};
export const TEAMMATE_TASK_SECTION_CREATED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useTeammateTaskSectionCreatedSubscription = (props: Props) => {
  const { setTeammatesTaskSections } = useTeammatesTaskSectionResponse();

  const skipSubscription = useMemo(
    () => !props.teammateId || !props.workspaceId,
    [props.teammateId, props.workspaceId],
  );
  const subscriptionResult = useSubscription({
    variables: {
      teammateId: props.teammateId,
      workspaceId: props.workspaceId,
      requestId: TEAMMATE_TASK_SECTION_CREATED_SUBSCRIPTION_REQUEST_ID,
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

  const setBySubscription = useCallback(
    (response: Response) => {
      const updated = response.teammateTaskSectionCreated;

      if (isDev()) console.log('Teammate Task Section created!');

      setTeammatesTaskSections([updated]);
    },
    [setTeammatesTaskSections],
  );

  return {
    subscriptionResult,
  };
};
