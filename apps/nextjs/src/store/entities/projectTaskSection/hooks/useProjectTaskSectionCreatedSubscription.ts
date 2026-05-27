import { useSubscription } from '@apollo/client/react';
import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { ProjectTaskSectionCreatedDocument } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import type { ProjectTaskSectionCreatedSubscriptionResponse as Response } from '../type';
import { useProjectTaskSectionResponse } from './useProjectTaskSectionResponse';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};
export const PROJECT_TASK_SECTION_CREATED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useProjectTaskSectionCreatedSubscription = (props: Props) => {
  const { setProjectsTaskSections } = useProjectTaskSectionResponse();

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  );
  const subscriptionResult = useSubscription(
    ProjectTaskSectionCreatedDocument,
    {
      variables: {
        workspaceId: props.workspaceId,
        requestId: PROJECT_TASK_SECTION_CREATED_SUBSCRIPTION_REQUEST_ID,
      },
      onData: ({ data }) => {
        if (isEqual(data.data, previousData?.data)) return;

        if (data.data) setBySubscription(data.data);
        previousData = data;
      },
      skip: skipSubscription,
    },
  );

  const setBySubscription = useAtomCallback(
    useCallback(
      (_, _set, response: Response) => {
        const updated = response.projectTaskSectionCreated;

        if (isDev()) console.log('Project Task Section created!');

        setProjectsTaskSections([updated]);
      },
      [setProjectsTaskSections],
    ),
  );

  return {
    subscriptionResult,
  };
};
