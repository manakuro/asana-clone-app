import { useSubscription } from '@apollo/client/react';
import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { TeammateTaskSectionUndeletedAndDeleteTasksDocument } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import { useTeammatesTaskSectionResponse } from '@/store/entities/teammatesTaskSection';
import type { TeammateTaskSectionUndeletedAndDeleteTasksSubscriptionResponse as Response } from '../type';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
  teammateId: string;
};
export const TEAMMATE_TASK_SECTION_UNDELETED_AND_DELETE_TASKS_SUBSCRIPTION_REQUEST_ID =
  uuid();
export const useTeammateTaskSectionUndeletedAndDeleteTasksSubscription = (
  props: Props,
) => {
  const { setTeammatesTaskSections } = useTeammatesTaskSectionResponse();

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  );

  const setBySubscription = useAtomCallback(
    useCallback(
      async (_get, _set, response: Response) => {
        const data = response.teammateTaskSectionUndeletedAndDeleteTasks;

        if (isDev()) console.log('Teammate Task Section undeleted!');

        setTeammatesTaskSections([data.teammateTaskSection], {
          includeTask: false,
        });
      },
      [setTeammatesTaskSections],
    ),
  );

  const subscriptionResult = useSubscription(
    TeammateTaskSectionUndeletedAndDeleteTasksDocument,
    {
      variables: {
        workspaceId: props.workspaceId,
        teammateId: props.teammateId,
        requestId:
          TEAMMATE_TASK_SECTION_UNDELETED_AND_DELETE_TASKS_SUBSCRIPTION_REQUEST_ID,
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
