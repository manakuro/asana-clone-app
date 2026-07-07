import { useCallback } from 'react';
import type { FavoriteWorkspaceId } from '../type';
import { useUpsert } from './use-upsert';

export const useFavoriteWorkspaceIdsResponse = () => {
  const { upsert } = useUpsert();

  const setFavoriteWorkspaceIds = useCallback(
    (input: FavoriteWorkspaceId[]) => {
      upsert(input);
    },
    [upsert],
  );

  return {
    setFavoriteWorkspaceIds,
  };
};
