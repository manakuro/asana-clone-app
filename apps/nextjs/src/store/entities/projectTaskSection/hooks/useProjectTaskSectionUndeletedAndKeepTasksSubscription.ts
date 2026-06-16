import { useSubscription } from '@apollo/client/react';
import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { ProjectTaskSectionUndeletedAndKeepTasksDocument } from '@/graphql/hooks';
import type { ProjectTaskResponse } from '@/graphql/types/projectTask';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import {
  projectTasksByIdsState,
  useProjectTaskResponse,
} from '@/store/entities/projectTask';
import { useProjectTaskSectionResponse } from '@/store/entities/projectTaskSection';
import type { ProjectTaskSectionUndeletedAndKeepTasksSubscriptionResponse as Response } from '../type';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};
export const PROJECT_TASK_SECTION_UNDELETED_AND_KEEP_TASKS_SUBSCRIPTION_REQUEST_ID =
  uuid();
export const useProjectTaskSectionUndeletedAndKeepTasksSubscription = (
  props: Props,
) => {
  const { setProjectsTaskSections } = useProjectTaskSectionResponse();
  const { setProjectTask } = useProjectTaskResponse();

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  );
  const subscriptionResult = useSubscription(
    ProjectTaskSectionUndeletedAndKeepTasksDocument,
    {
      variables: {
        workspaceId: props.workspaceId,
        requestId:
          PROJECT_TASK_SECTION_UNDELETED_AND_KEEP_TASKS_SUBSCRIPTION_REQUEST_ID,
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
      async (get, _set, response: Response) => {
        if (isDev()) console.log('Project Task Section deleted!');

        const data = response.projectTaskSectionUndeletedAndKeepTasks;

        setProjectsTaskSections(
          [{ ...data.projectTaskSection, projectTasks: [] }],
          {
            includeProjectTasks: false,
          },
        );

        const projectTasks = get(projectTasksByIdsState(data.projectTaskIds));

        const newProjectTasks = projectTasks.map((t) => ({
          ...t,
          projectTaskSectionId: data.projectTaskSection.id,
        }));
        setProjectTask(newProjectTasks as ProjectTaskResponse[], {
          includeTask: false,
        });
      },
      [setProjectTask, setProjectsTaskSections],
    ),
  );

  return {
    subscriptionResult,
  };
};
