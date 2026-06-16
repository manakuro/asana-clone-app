import { useSubscription } from '@apollo/client/react';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { TeammateTaskSectionDeletedDocument } from '@/graphql/hooks';
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

  const setBySubscription = useCallback(
    (response: Response) => {
      const data = response.teammateTaskSectionDeleted;

      if (isDev()) console.log('Teammate Task Section deleted!');

      resetTeammateTaskSection(data.id);
    },
    [resetTeammateTaskSection],
  );

  const subscriptionResult = useSubscription(
    TeammateTaskSectionDeletedDocument,
    {
      variables: {
        workspaceId: props.workspaceId,
        teammateId: props.teammateId,
        requestId: TEAMMATE_TASK_SECTION_DELETED_SUBSCRIPTION_REQUEST_ID,
      },
      onData: ({ data }) => {
        if (isEqual(data.data, previousData?.data)) return;

        if (data.data) setBySubscription(data.data);
        previousData = data;
      },
      skip: skipSubscription,
    },
  );

  return {
    subscriptionResult,
  };
};
