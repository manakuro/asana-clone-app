import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { useTeammateTaskSectionUndeletedAndKeepTasksSubscription as useSubscription } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import { useTeammatesTaskSectionResponse } from '@/store/entities/teammatesTaskSection';
import {
  type TeammateTaskResponse,
  teammateTasksByIdsState,
  useTeammateTaskResponse,
} from '@/store/entities/teammateTask';
import type { TeammateTaskSectionUndeletedAndKeepTasksSubscriptionResponse as Response } from '../type';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
  teammateId: string;
};
export const TEAMMATE_TASK_SECTION_UNDELETED_AND_KEEP_TASKS_SUBSCRIPTION_REQUEST_ID =
  uuid();
export const useTeammateTaskSectionUndeletedAndKeepTasksSubscription = (
  props: Props,
) => {
  const { setTeammatesTaskSections } = useTeammatesTaskSectionResponse();
  const { setTeammateTask } = useTeammateTaskResponse();

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  );
  const subscriptionResult = useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      teammateId: props.teammateId,
      requestId:
        TEAMMATE_TASK_SECTION_UNDELETED_AND_KEEP_TASKS_SUBSCRIPTION_REQUEST_ID,
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

  const setBySubscription = useAtomCallback(
    useCallback(
      async (get, _set, response: Response) => {
        const data = response.teammateTaskSectionUndeletedAndKeepTasks;

        if (isDev()) console.log('Teammate Task Section undeleted!');

        setTeammatesTaskSections(
          [{ ...data.teammateTaskSection, teammateTasks: [] }],
          {
            includeTeammateTask: false,
          },
        );

        const teammateTasks = get(
          teammateTasksByIdsState(data.teammateTaskIds),
        );

        const newTeammateTasks = teammateTasks.map((t: any) => ({
          ...t,
          teammateTaskSectionId: data.teammateTaskSection.id,
        }));
        setTeammateTask(newTeammateTasks as TeammateTaskResponse[], {
          includeTask: false,
        });
      },
      [setTeammateTask, setTeammatesTaskSections],
    ),
  );

  return {
    subscriptionResult,
  };
};
