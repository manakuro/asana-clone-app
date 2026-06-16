import { useSubscription } from '@apollo/client/react';
import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { ProjectTaskDeletedDocument } from '@/graphql/hooks';
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
  const subscriptionResult = useSubscription(ProjectTaskDeletedDocument, {
    variables: {
      workspaceId: props.workspaceId,
      requestId: PROJECT_TASK_DELETED_SUBSCRIPTION_REQUEST_ID,
    },
    onData: ({ data }) => {
      if (isEqual(data.data, previousData?.data)) return;

      if (data.data) setBySubscription(data.data);
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
