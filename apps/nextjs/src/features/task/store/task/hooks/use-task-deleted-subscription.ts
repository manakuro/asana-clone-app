import { useSubscription } from '@apollo/client/react';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { useResetProjectTask } from '@/features/project/store/project-task';
import { useDeletedTaskResponse } from '@/features/task/store/deleted-task';
import { useResetTeammateTask } from '@/features/teammate/store/teammate-task';
import { TaskDeletedDocument } from '@/graphql/documents';
import { isDev } from '@/utils/environment';
import { uuid } from '@/utils/uuid';
import type { TaskDeletedSubscriptionResponse as Response } from '../type';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};
export const TASK_DELETED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useTaskDeletedSubscription = (props: Props) => {
  const { setDeletedTask } = useDeletedTaskResponse();
  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  );
  const { resetProjectTasks } = useResetProjectTask();
  const { resetTeammateTask } = useResetTeammateTask();

  const setBySubscription = useCallback(
    async (response: Response) => {
      const data = response.taskDeleted;

      if (isDev()) console.log('Task deleted!');

      if (data.teammateTask.id) {
        resetTeammateTask(data.teammateTask.id);
      }
      if (data.projectTasks?.length) {
        resetProjectTasks(data.projectTasks.map((p) => p.id));
      }
      if (data.deletedTask) {
        setDeletedTask([data.deletedTask], { includeTask: false });
      }
    },
    [resetTeammateTask, resetProjectTasks, setDeletedTask],
  );

  const subscriptionResult = useSubscription(TaskDeletedDocument, {
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_DELETED_SUBSCRIPTION_REQUEST_ID,
    },
    onData: ({ data }) => {
      if (isEqual(data.data, previousData?.data)) return;

      if (data.data) setBySubscription(data.data);
      previousData = data;
    },
    skip: skipSubscription,
  });

  return {
    subscriptionResult,
  };
};
