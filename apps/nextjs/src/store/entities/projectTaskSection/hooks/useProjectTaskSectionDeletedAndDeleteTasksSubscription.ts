import { useSubscription } from '@apollo/client/react';
import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { ProjectTaskSectionDeletedAndDeleteTasksDocument } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import type { ProjectTaskSectionDeletedAndDeleteTasksSubscriptionResponse as Response } from '../type';
import { useResetProjectTaskSection } from './useResetProjectTaskSection';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};
export const PROJECT_TASK_SECTION_DELETED_AND_DELETED_TASKS_SUBSCRIPTION_REQUEST_ID =
  uuid();
export const useProjectTaskSectionDeletedAndDeleteTasksSubscription = (
  props: Props,
) => {
  const { resetProjectTaskSection } = useResetProjectTaskSection();
  const { resetProjectTaskSections } = useResetProjectTaskSection();

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  );
  const subscriptionResult = useSubscription(
    ProjectTaskSectionDeletedAndDeleteTasksDocument,
    {
      variables: {
        workspaceId: props.workspaceId,
        requestId:
          PROJECT_TASK_SECTION_DELETED_AND_DELETED_TASKS_SUBSCRIPTION_REQUEST_ID,
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
        if (isDev()) console.log('Project Task Section deleted!');

        const projectTaskSection =
          response.projectTaskSectionDeletedAndDeleteTasks.projectTaskSection;
        const projectTaskIds =
          response.projectTaskSectionDeletedAndDeleteTasks.projectTaskIds;

        resetProjectTaskSection(projectTaskSection.id);
        resetProjectTaskSections(projectTaskIds);
      },
      [resetProjectTaskSection, resetProjectTaskSections],
    ),
  );

  return {
    subscriptionResult,
  };
};
