import { useMutation } from '@apollo/client/react';
import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import {
  CreateFavoriteProjectDocument,
  DeleteFavoriteProjectDocument,
} from '@/graphql/hooks';
import { useMe } from '@/store/entities/me';
import { favoriteProjectIdsState } from '../atom';
import { FAVORITE_PROJECT_IDS_UPDATED_SUBSCRIPTION_REQUEST_ID } from './useFavoriteProjectIdsUpdatedSubscription';
import { useUpsert } from './useUpsert';

export const useFavoriteProjectIdsCommand = () => {
  const { me } = useMe();
  const [createFavoriteProjectMutation] = useMutation(
    CreateFavoriteProjectDocument,
  );
  const [deleteFavoriteProjectMutation] = useMutation(
    DeleteFavoriteProjectDocument,
  );
  const { upsert } = useUpsert();

  const deleteFavoriteProjectId = useAtomCallback(
    useCallback(
      async (get, _set, favoriteProjectId: string) => {
        const prev = get(favoriteProjectIdsState);

        upsert(prev.filter((id) => id !== favoriteProjectId));

        const restore = () => {
          upsert(prev);
        };

        try {
          const res = await deleteFavoriteProjectMutation({
            variables: {
              input: {
                teammateId: me.id,
                projectId: favoriteProjectId,
                requestId: FAVORITE_PROJECT_IDS_UPDATED_SUBSCRIPTION_REQUEST_ID,
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
      [deleteFavoriteProjectMutation, me.id, upsert],
    ),
  );

  const addFavoriteProjectId = useAtomCallback(
    useCallback(
      async (get, _set, favoriteProjectId: string) => {
        const prev = get(favoriteProjectIdsState);

        upsert([...prev, favoriteProjectId]);

        const restore = () => {
          upsert(prev);
        };

        try {
          const res = await createFavoriteProjectMutation({
            variables: {
              input: {
                teammateId: me.id,
                projectId: favoriteProjectId,
                requestId: FAVORITE_PROJECT_IDS_UPDATED_SUBSCRIPTION_REQUEST_ID,
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
      [createFavoriteProjectMutation, me.id, upsert],
    ),
  );

  const setFavoriteProjectId = useAtomCallback(
    useCallback(
      async (get, _set, favoriteProjectId: string) => {
        const favoriteProjectIds = get(favoriteProjectIdsState);

        const isFavorite = favoriteProjectIds.some(
          (id) => id === favoriteProjectId,
        );
        if (isFavorite) {
          await deleteFavoriteProjectId(favoriteProjectId);
          return;
        }

        await addFavoriteProjectId(favoriteProjectId);
      },
      [addFavoriteProjectId, deleteFavoriteProjectId],
    ),
  );

  return {
    setFavoriteProjectId,
  };
};
