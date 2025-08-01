import { useUpdateWorkspaceMutation } from '@/graphql/hooks';
import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { workspaceState } from '../atom';
import type { Workspace } from '../type';
import { useUpsert } from './useUpsert';
import { WORKSPACE_UPDATED_SUBSCRIPTION_REQUEST_ID } from './useWorkspaceUpdatedSubscription';

export const useWorkspaceCommand = () => {
  const [updateWorkspaceMutation, { loading: updating }] =
    useUpdateWorkspaceMutation();

  const { upsert } = useUpsert();

  const setWorkspace = useAtomCallback(
    useCallback(
      async (get, _set, input: Partial<Workspace>) => {
        const prev = get(workspaceState);
        const params = {
          ...prev,
          ...input,
        };
        upsert(params);

        const restore = () => {
          upsert(prev);
        };
        try {
          const res = await updateWorkspaceMutation({
            variables: {
              input: {
                id: params.id,
                description: params.description,
                name: params.name,
                requestId: WORKSPACE_UPDATED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          });

          if (res.errors) {
            restore();
          }
        } catch (e) {
          restore();
          throw e;
        }
      },
      [updateWorkspaceMutation, upsert],
    ),
  );

  return {
    setWorkspace,
    updating,
  };
};
