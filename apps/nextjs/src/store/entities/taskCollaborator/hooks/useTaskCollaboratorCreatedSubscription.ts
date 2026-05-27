import { useSubscription } from '@apollo/client/react';
import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { TaskCollaboratorCreatedDocument } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import { useTeammateResponse } from '@/store/entities/teammate';
import type { TaskCollaboratorCreatedSubscriptionResponse as Response } from '../type';
import { useTaskCollaboratorResponse } from './useTaskCollaboratorResponse';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};
export const TASK_COLLABORATOR_CREATED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useTaskCollaboratorCreatedSubscription = (props: Props) => {
  const { setTaskCollaborators } = useTaskCollaboratorResponse();
  const { setTeammates } = useTeammateResponse();

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  );
  const subscriptionResult = useSubscription(TaskCollaboratorCreatedDocument, {
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_COLLABORATOR_CREATED_SUBSCRIPTION_REQUEST_ID,
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
        const taskCollaboratorCreated = response.taskCollaboratorCreated;

        if (isDev()) console.log('Task Collaborator Created!: ');

        setTaskCollaborators([taskCollaboratorCreated]);
        setTeammates([taskCollaboratorCreated.teammate]);
      },
      [setTaskCollaborators, setTeammates],
    ),
  );

  return {
    subscriptionResult,
  };
};
