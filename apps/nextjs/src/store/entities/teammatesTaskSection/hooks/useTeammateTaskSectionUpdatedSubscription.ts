import { useSubscription } from '@apollo/client/react';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { TeammateTaskSectionUpdatedDocument } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import type { TeammateTaskSectionUpdatedSubscriptionResponse as Response } from '../type';
import { useTeammatesTaskSectionResponse } from './useTeammatesTaskSectionResponse';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
  teammateId: string;
};
export const TEAMMATE_TASK_SECTION_UPDATED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useTeammateTaskSectionUpdatedSubscription = (props: Props) => {
  const { setTeammatesTaskSections } = useTeammatesTaskSectionResponse();

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  );

  const setBySubscription = useCallback(
    (response: Response) => {
      const updated = response.teammateTaskSectionUpdated;

      if (isDev()) console.log('Teammate Task Section updated!');

      setTeammatesTaskSections([updated]);
    },
    [setTeammatesTaskSections],
  );

  const subscriptionResult = useSubscription(
    TeammateTaskSectionUpdatedDocument,
    {
      variables: {
        workspaceId: props.workspaceId,
        teammateId: props.teammateId,
        requestId: TEAMMATE_TASK_SECTION_UPDATED_SUBSCRIPTION_REQUEST_ID,
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
