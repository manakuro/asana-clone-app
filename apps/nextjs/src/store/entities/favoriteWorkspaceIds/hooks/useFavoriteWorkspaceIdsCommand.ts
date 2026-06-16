import { useMutation } from '@apollo/client/react';
import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import {
  CreateFavoriteWorkspaceDocument,
  DeleteFavoriteWorkspaceDocument,
} from '@/graphql/hooks';
import { useMe } from '@/store/entities/me';
import { favoriteWorkspaceIdsState } from '../atom';
import {
  FAVORITE_WORKSPACE_IDS_UPDATED_SUBSCRIPTION_REQUEST_ID,
  useFavoriteWorkspaceIdsUpdatedSubscription,
} from './useFavoriteWorkspaceIdsUpdatedSubscription';
import { useUpsert } from './useUpsert';

export const useFavoriteWorkspaceIdsCommand = () => {
  const { me } = useMe();
  const [createFavoriteWorkspaceMutation] = useMutation(
    CreateFavoriteWorkspaceDocument,
  );
  const [deleteFavoriteWorkspaceMutation] = useMutation(
    DeleteFavoriteWorkspaceDocument,
  );
  const { upsert } = useUpsert();

  useFavoriteWorkspaceIdsUpdatedSubscription({
    teammateId: me.id,
  });

  const deleteFavoriteWorkspaceId = useAtomCallback(
    useCallback(
      async (get, _set, favoriteWorkspaceId: string) => {
        const prev = get(favoriteWorkspaceIdsState);

        upsert(prev.filter((id) => id !== favoriteWorkspaceId));

        const restore = () => {
          upsert(prev);
        };

        try {
          const res = await deleteFavoriteWorkspaceMutation({
            variables: {
              input: {
                teammateId: me.id,
                workspaceId: favoriteWorkspaceId,
                requestId:
                  FAVORITE_WORKSPACE_IDS_UPDATED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          });

          if (res.error) {
            restore();
          }
        } catch (e) {
          restore();
          throw e;
        }
      },
      [deleteFavoriteWorkspaceMutation, me.id, upsert],
    ),
  );

  const addFavoriteWorkspaceId = useAtomCallback(
    useCallback(
      async (get, _set, favoriteWorkspaceId: string) => {
        const prev = get(favoriteWorkspaceIdsState);

        upsert([...prev, favoriteWorkspaceId]);

        const restore = () => {
          upsert(prev);
        };

        try {
          const res = await createFavoriteWorkspaceMutation({
            variables: {
              input: {
                teammateId: me.id,
                workspaceId: favoriteWorkspaceId,
                requestId:
                  FAVORITE_WORKSPACE_IDS_UPDATED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          });

          if (res.error) {
            restore();
          }
        } catch (e) {
          restore();
          throw e;
        }
      },
      [createFavoriteWorkspaceMutation, me.id, upsert],
    ),
  );

  const setFavoriteWorkspaceId = useAtomCallback(
    useCallback(
      async (get, _set, favoriteWorkspaceId: string) => {
        const prev = get(favoriteWorkspaceIdsState);

        const isFavorite = prev.some((id) => id === favoriteWorkspaceId);
        if (isFavorite) {
          await deleteFavoriteWorkspaceId(favoriteWorkspaceId);
          return;
        }

        await addFavoriteWorkspaceId(favoriteWorkspaceId);
      },
      [addFavoriteWorkspaceId, deleteFavoriteWorkspaceId],
    ),
  );

  return {
    setFavoriteWorkspaceId,
  };
};
