import { useSubscription } from '@apollo/client/react';
import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { ProjectUpdatedDocument } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import type { ProjectUpdatedSubscriptionResponse as Response } from '../type';
import { useProjectResponse } from './useProjectResponse';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

export const PROJECT_UPDATED_SUBSCRIPTION_REQUEST_ID = uuid();

type Props = {
  workspaceId: string;
};

export const useProjectUpdatedSubscription = (props: Props) => {
  const { setProjects } = useProjectResponse();

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  );

  useSubscription(ProjectUpdatedDocument, {
    variables: {
      workspaceId: props.workspaceId,
      requestId: PROJECT_UPDATED_SUBSCRIPTION_REQUEST_ID,
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
        const projectUpdated = response.projectUpdated;

        if (isDev()) console.log('Project updated!: ');

        setProjects([projectUpdated]);
      },
      [setProjects],
    ),
  );
};
