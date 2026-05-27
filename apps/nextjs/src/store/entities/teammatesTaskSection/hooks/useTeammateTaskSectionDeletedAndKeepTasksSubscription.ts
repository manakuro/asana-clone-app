import { useSubscription } from '@apollo/client/react';
import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { TeammateTaskSectionDeletedAndKeepTasksDocument } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import {
  type TeammateTaskResponse,
  teammateTaskByTeammateTaskSectionIdState,
  useTeammateTaskResponse,
} from '@/store/entities/teammateTask';
import type { TeammateTaskSectionDeletedAndKeepTasksSubscriptionResponse as Response } from '../type';
import { useResetTeammateTaskSection } from './useResetTeammateTaskSection';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
  teammateId: string;
};
export const TEAMMATE_TASK_SECTION_DELETED_AND_KEEP_TASKS_SUBSCRIPTION_REQUEST_ID =
  uuid();
export const useTeammateTaskSectionDeletedAndKeepTasksSubscription = (
  props: Props,
) => {
  const { resetTeammateTaskSection } = useResetTeammateTaskSection();
  const { setTeammateTask } = useTeammateTaskResponse();

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  );

  const setBySubscription = useAtomCallback(
    useCallback(
      async (get, _set, response: Response) => {
        const data = response.teammateTaskSectionDeletedAndKeepTasks;

        if (isDev()) console.log('Teammate Task Section deleted!');

        const teammateTaskSectionId = data.teammateTaskSection.id;
        const newTeammateTaskSectionId = data.keptTeammateTaskSection.id;

        const teammateTasks = get(
          teammateTaskByTeammateTaskSectionIdState(teammateTaskSectionId),
        );
        const newTeammateTasks = teammateTasks.map((t: any) => ({
          ...t,
          teammateTaskSectionId: newTeammateTaskSectionId,
        }));
        setTeammateTask(newTeammateTasks as TeammateTaskResponse[], {
          includeTask: false,
        });

        resetTeammateTaskSection(teammateTaskSectionId);
      },
      [resetTeammateTaskSection, setTeammateTask],
    ),
  );

  const subscriptionResult = useSubscription(
    TeammateTaskSectionDeletedAndKeepTasksDocument,
    {
      variables: {
        workspaceId: props.workspaceId,
        teammateId: props.teammateId,
        requestId:
          TEAMMATE_TASK_SECTION_DELETED_AND_KEEP_TASKS_SUBSCRIPTION_REQUEST_ID,
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
