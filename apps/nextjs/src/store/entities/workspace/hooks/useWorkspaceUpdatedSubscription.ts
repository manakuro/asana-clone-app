import { useSubscription } from '@apollo/client/react';
import { useAtomCallback } from 'jotai/utils';
import isEqual from 'lodash-es/isEqual';
import { useCallback, useMemo } from 'react';
import { WorkspaceUpdatedDocument } from '@/graphql/hooks';
import { isDescriptionEqual } from '@/shared/editor/isDescriptionEqual';
import { isDev } from '@/shared/environment';
import { uuid } from '@/shared/uuid';
import { workspaceState } from '../atom';
import type { WorkspaceUpdatedSubscriptionResponse as Response } from '../type';
import { useHasDescriptionUpdated } from './useHasDescriptionUpdated';
import { useWorkspaceResponse } from './useWorkspaceResponse';

export const WORKSPACE_UPDATED_SUBSCRIPTION_REQUEST_ID = uuid();

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any;

type Props = {
  workspaceId: string;
};
export const useWorkspaceUpdatedSubscription = (props: Props) => {
  const skipSubscription = useMemo(() => {
    return !props.workspaceId;
  }, [props.workspaceId]);

  const { setWorkspace } = useWorkspaceResponse();
  const { setHasDescriptionUpdated } = useHasDescriptionUpdated();

  useSubscription(WorkspaceUpdatedDocument, {
    variables: {
      id: props.workspaceId,
      requestId: WORKSPACE_UPDATED_SUBSCRIPTION_REQUEST_ID,
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
      async (get, _set, response: Response) => {
        const prev = get(workspaceState);
        const workspaceUpdated = response.workspaceUpdated;

        if (isDev()) console.log('Workspace updated!: ');

        setWorkspace(workspaceUpdated);
        if (
          !isDescriptionEqual(prev.description, workspaceUpdated.description)
        ) {
          if (isDev()) console.log('Workspace description updated!: ');
          setHasDescriptionUpdated((s) => s + 1);
        }
      },
      [setHasDescriptionUpdated, setWorkspace],
    ),
  );
};
