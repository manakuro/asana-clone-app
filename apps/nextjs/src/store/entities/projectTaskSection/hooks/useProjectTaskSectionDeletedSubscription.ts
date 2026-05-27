import { useSubscription } from '@apollo/client/react';
import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { ProjectTaskSectionDeletedDocument } from '@/graphql/hooks';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import type { ProjectTaskSectionDeletedSubscriptionResponse as Response } from '../type';
import { useResetProjectTaskSection } from './useResetProjectTaskSection';

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};
export const PROJECT_TASK_SECTION_DELETED_SUBSCRIPTION_REQUEST_ID = uuid();
export const useProjectTaskSectionDeletedSubscription = (props: Props) => {
  const { resetProjectTaskSection } = useResetProjectTaskSection();

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  );
  const subscriptionResult = useSubscription(
    ProjectTaskSectionDeletedDocument,
    {
      variables: {
        workspaceId: props.workspaceId,
        requestId: PROJECT_TASK_SECTION_DELETED_SUBSCRIPTION_REQUEST_ID,
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
        const data = response.projectTaskSectionDeleted;

        if (isDev()) console.log('Project Task Section deleted!');

        resetProjectTaskSection(data.id);
      },
      [resetProjectTaskSection],
    ),
  );

  return {
    subscriptionResult,
  };
};
