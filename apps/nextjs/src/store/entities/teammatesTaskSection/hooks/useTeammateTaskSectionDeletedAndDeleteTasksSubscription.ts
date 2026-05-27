import { useSubscription } from '@apollo/client/react';
import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { TeammateTaskSectionDeletedAndDeleteTasksDocument } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import { useResetTeammateTask } from '@/store/entities/teammateTask';
import type { TeammateTaskSectionDeletedAndDeleteTasksSubscriptionResponse as Response } from '../type';
import { useResetTeammateTaskSection } from './useResetTeammateTaskSection';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
  teammateId: string;
};
export const TEAMMATE_TASK_SECTION_DELETED_AND_DELETE_TASKS_SUBSCRIPTION_REQUEST_ID =
  uuid();
export const useTeammateTaskSectionDeletedAndDeleteTasksSubscription = (
  props: Props,
) => {
  const { resetTeammateTaskSection } = useResetTeammateTaskSection();
  const { resetTeammateTasks } = useResetTeammateTask();

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  );

  const setBySubscription = useAtomCallback(
    useCallback(
      async (_get, _set, response: Response) => {
        const data = response.teammateTaskSectionDeletedAndDeleteTasks;

        if (isDev()) console.log('Teammate Task Section deleted!');

        const teammateTaskSectionId = data.teammateTaskSection.id;
        const teammateTaskIds = data.teammateTaskIds;

        resetTeammateTaskSection(teammateTaskSectionId);
        resetTeammateTasks(teammateTaskIds);
      },
      [resetTeammateTaskSection, resetTeammateTasks],
    ),
  );

  const subscriptionResult = useSubscription(
    TeammateTaskSectionDeletedAndDeleteTasksDocument,
    {
      variables: {
        workspaceId: props.workspaceId,
        teammateId: props.teammateId,
        requestId:
          TEAMMATE_TASK_SECTION_DELETED_AND_DELETE_TASKS_SUBSCRIPTION_REQUEST_ID,
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
