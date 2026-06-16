import { useSubscription } from '@apollo/client/react';
import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { ProjectTaskSectionUndeletedAndDeleteTasksDocument } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import { useProjectTaskSectionResponse } from '@/store/entities/projectTaskSection';
import type { ProjectTaskSectionUndeletedAndDeleteTasksSubscriptionResponse as Response } from '../type';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};
export const PROJECT_TASK_SECTION_UNDELETED_AND_DELETE_TASKS_SUBSCRIPTION_REQUEST_ID =
  uuid();
export const useProjectTaskSectionUndeletedAndDeleteTasksSubscription = (
  props: Props,
) => {
  const { setProjectsTaskSections } = useProjectTaskSectionResponse();

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  );
  const subscriptionResult = useSubscription(
    ProjectTaskSectionUndeletedAndDeleteTasksDocument,
    {
      variables: {
        workspaceId: props.workspaceId,
        requestId:
          PROJECT_TASK_SECTION_UNDELETED_AND_DELETE_TASKS_SUBSCRIPTION_REQUEST_ID,
      },
      onData: ({ data }) => {
        if (isEqual(data.data, previousData?.data)) return;

        if (data.data) setBySubscription(data.data);
        previousData = data;
      },
      skip: skipSubscription,
    },
  );

  const setBySubscription = useAtomCallback(
    useCallback(
      async (_, _set, response: Response) => {
        if (isDev()) console.log('Project Task Section undeleted!');

        const projectTaskSection =
          response.projectTaskSectionUndeletedAndDeleteTasks.projectTaskSection;

        setProjectsTaskSections([projectTaskSection], { includeTask: false });
      },
      [setProjectsTaskSections],
    ),
  );

  return {
    subscriptionResult,
  };
};
