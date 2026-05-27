import { useSubscription } from '@apollo/client/react';
import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { ProjectTaskUpdatedDocument } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import type { ProjectTaskUpdatedSubscriptionResponse as Response } from '../type';
import { useProjectTaskResponse } from './useProjectTaskResponse';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};
export const PROJECT_TASK_UPDATED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useProjectTaskUpdatedSubscription = (props: Props) => {
  const { setProjectTask } = useProjectTaskResponse();

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  );
  const subscriptionResult = useSubscription(ProjectTaskUpdatedDocument, {
    variables: {
      workspaceId: props.workspaceId,
      requestId: PROJECT_TASK_UPDATED_SUBSCRIPTION_REQUEST_ID,
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
        const projectTaskUpdated = response.projectTaskUpdated;

        if (isDev()) console.log('Project Task Updated!: ');

        setProjectTask([
          {
            ...projectTaskUpdated,
            task: {
              ...projectTaskUpdated.task,
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
