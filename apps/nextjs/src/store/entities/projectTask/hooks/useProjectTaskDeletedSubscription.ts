import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { useProjectTaskDeletedSubscription as useSubscription } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import type { ProjectTaskDeletedSubscriptionResponse as Response } from '../type';
import { useResetProjectTask } from './useResetProjectTask';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};
export const PROJECT_TASK_DELETED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useProjectTaskDeletedSubscription = (props: Props) => {
  const { resetProjectTask } = useResetProjectTask();

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  );
  const subscriptionResult = useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId: PROJECT_TASK_DELETED_SUBSCRIPTION_REQUEST_ID,
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
      (_, __, response: Response) => {
        const projectTaskDeleted = response.projectTaskDeleted;

        if (isDev()) console.log('Project Task Deleted!: ');

        resetProjectTask(projectTaskDeleted.id);
      },
      [resetProjectTask],
    ),
  );

  return {
    subscriptionResult,
  };
};
