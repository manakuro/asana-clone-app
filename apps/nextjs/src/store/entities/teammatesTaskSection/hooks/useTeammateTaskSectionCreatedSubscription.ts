import { useSubscription } from '@apollo/client/react';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { TeammateTaskSectionCreatedDocument } from '@/graphql/hooks';
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

  const setBySubscription = useCallback(
    (response: Response) => {
      const updated = response.teammateTaskSectionCreated;

      if (isDev()) console.log('Teammate Task Section created!');

      setTeammatesTaskSections([updated]);
    },
    [setTeammatesTaskSections],
  );

  const subscriptionResult = useSubscription(
    TeammateTaskSectionCreatedDocument,
    {
      variables: {
        teammateId: props.teammateId,
        workspaceId: props.workspaceId,
        requestId: TEAMMATE_TASK_SECTION_CREATED_SUBSCRIPTION_REQUEST_ID,
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
