import { useSubscription } from '@apollo/client/react';
import isEqual from 'lodash-es/isEqual';
import { useCallback } from 'react';
import { TaskAssignedDocument } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import type { TaskAssignedSubscriptionResponse } from '@/store/entities/task';
import { useTeammateTaskResponse } from '@/store/entities/teammateTask';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};

export const TASK_ASSIGNED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useTaskAssignedSubscription = (props: Props) => {
  const { setTeammateTask } = useTeammateTaskResponse();

  const setBySubscription = useCallback(
    async (response: TaskAssignedSubscriptionResponse) => {
      const data = response.taskAssigned;

      if (isDev()) console.log('task assigned!');

      setTeammateTask([data.teammateTask]);
    },
    [setTeammateTask],
  );

  useSubscription(TaskAssignedDocument, {
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_ASSIGNED_SUBSCRIPTION_REQUEST_ID,
    },
    onData: ({ data }) => {
      if (isEqual(data.data, previousData?.data)) return;

      if (data.data) setBySubscription(data.data);
      previousData = data;
    },
  });
};
