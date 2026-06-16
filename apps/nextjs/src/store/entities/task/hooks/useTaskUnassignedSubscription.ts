import { useSubscription } from '@apollo/client/react';
import isEqual from 'lodash-es/isEqual';
import { useCallback } from 'react';
import { TaskUnassignedDocument } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import {
  type TaskUnassignedSubscriptionResponse,
  useTaskCommand,
} from '@/store/entities/task';
import { useResetTeammateTask } from '@/store/entities/teammateTask';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};

export const TASK_UNASSIGNED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useTaskUnassignedSubscription = (props: Props) => {
  const { resetTeammateTask } = useResetTeammateTask();
  const { setTaskById } = useTaskCommand();

  const setBySubscription = useCallback(
    async (response: TaskUnassignedSubscriptionResponse) => {
      const data = response.taskUnassigned;

      if (isDev()) console.log('task unassigned!');

      resetTeammateTask(data.teammateTaskId);
      await setTaskById(data.task.id, { assigneeId: '' });
    },
    [resetTeammateTask, setTaskById],
  );

  useSubscription(TaskUnassignedDocument, {
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_UNASSIGNED_SUBSCRIPTION_REQUEST_ID,
    },
    onData: ({ data }) => {
      if (isEqual(data.data, previousData?.data)) return;

      if (data.data) setBySubscription(data.data);
      previousData = data;
    },
  });
};
