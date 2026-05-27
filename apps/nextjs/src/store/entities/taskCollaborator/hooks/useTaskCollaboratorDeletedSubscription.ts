import { useSubscription } from '@apollo/client/react';
import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { TaskCollaboratorDeletedDocument } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import type { TaskCollaboratorDeletedSubscriptionResponse as Response } from '../type';
import { useResetTaskCollaborator } from './useResetTaskCollaborator';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};
export const TASK_COLLABORATOR_DELETED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useTaskCollaboratorDeletedSubscription = (props: Props) => {
  const { resetTaskCollaborator } = useResetTaskCollaborator();

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  );
  const subscriptionResult = useSubscription(TaskCollaboratorDeletedDocument, {
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_COLLABORATOR_DELETED_SUBSCRIPTION_REQUEST_ID,
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
      (_get, _set, response: Response) => {
        const taskCollaboratorDeleted = response.taskCollaboratorDeleted;

        if (isDev()) console.log('Task Collaborator Deleted!: ');

        resetTaskCollaborator(taskCollaboratorDeleted.id);
      },
      [resetTaskCollaborator],
    ),
  );

  return {
    subscriptionResult,
  };
};
