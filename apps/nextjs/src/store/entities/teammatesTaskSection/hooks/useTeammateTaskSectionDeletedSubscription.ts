import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { useTeammateTaskSectionDeletedSubscription as useSubscription } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import type { TeammateTaskSectionDeletedSubscriptionResponse as Response } from '../type';
import { useResetTeammateTaskSection } from './useResetTeammateTaskSection';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
  teammateId: string;
};
export const TEAMMATE_TASK_SECTION_DELETED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useTeammateTaskSectionDeletedSubscription = (props: Props) => {
  const { resetTeammateTaskSection } = useResetTeammateTaskSection();

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  );
  const subscriptionResult = useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      teammateId: props.teammateId,
      requestId: TEAMMATE_TASK_SECTION_DELETED_SUBSCRIPTION_REQUEST_ID,
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
      const data = response.teammateTaskSectionDeleted;

      if (isDev()) console.log('Teammate Task Section deleted!');

      resetTeammateTaskSection(data.id);
    },
    [resetTeammateTaskSection],
  );

  return {
    subscriptionResult,
  };
};
