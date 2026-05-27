import { useSubscription } from '@apollo/client/react';
import isEqual from 'lodash-es/isEqual';
import { useCallback } from 'react';
import { TaskUndeletedDocument } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import { useResetDeletedTask } from '@/store/entities/deletedTask';
import { useProjectTaskResponse } from '@/store/entities/projectTask';
import { useTeammateTaskResponse } from '@/store/entities/teammateTask';
import type { TaskUndeletedSubscriptionResponse as Response } from '../type';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};
export const TASK_UNDELETED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useTaskUndeletedSubscription = (props: Props) => {
  const { setTeammateTask } = useTeammateTaskResponse();
  const { setProjectTask } = useProjectTaskResponse();
  const { resetDeletedTask } = useResetDeletedTask();

  const setBySubscription = useCallback(
    async (response: Response) => {
      const data = response.taskUndeleted;

      if (isDev()) console.log('Task undeleted!');

      if (data.deletedTask) {
        resetDeletedTask(data.deletedTask.id);
      }
      if (data.projectTasks.length) {
        setProjectTask(data.projectTasks, { includeTask: false });
      }
      if (data.teammateTask) {
        setTeammateTask([data.teammateTask]);
      }
    },
    [resetDeletedTask, setProjectTask, setTeammateTask],
  );

  const subscriptionResult = useSubscription(TaskUndeletedDocument, {
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_UNDELETED_SUBSCRIPTION_REQUEST_ID,
    },
    onData: ({ data }) => {
      if (isEqual(data.data, previousData?.data)) return;

      if (data.data) setBySubscription(data.data);
      previousData = data;
    },
  });

  return {
    subscriptionResult,
  };
};
