import { useSubscription } from '@apollo/client/react';
import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { ProjectTaskCreatedDocument } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import type { ProjectTaskCreatedSubscriptionResponse as Response } from '../type';
import { useProjectTaskResponse } from './useProjectTaskResponse';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};
export const PROJECT_TASK_CREATED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useProjectTaskCreatedSubscription = (props: Props) => {
  const { setProjectTask } = useProjectTaskResponse();

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  );
  const subscriptionResult = useSubscription(ProjectTaskCreatedDocument, {
    variables: {
      workspaceId: props.workspaceId,
      requestId: PROJECT_TASK_CREATED_SUBSCRIPTION_REQUEST_ID,
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
        const projectTaskCreated = response.projectTaskCreated;

        if (isDev()) console.log('Project Task Created!: ');

        setProjectTask([
          {
            ...projectTaskCreated,
            task: {
              ...projectTaskCreated.task,
              // To prevent autofocus on input.
              isNew: false,
            },
          },
        ]);
      },
      [setProjectTask],
    ),
  );

  return {
    subscriptionResult,
  };
};
