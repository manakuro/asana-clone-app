import { useCallback } from 'react';
import type { FavoriteProjectId } from '../type';
import { useUpsert } from './use-upsert';

export const useFavoriteProjectIdsResponse = () => {
  const { upsert } = useUpsert();

  const setFavoriteProjectIds = useCallback(
    (input: FavoriteProjectId[]) => {
      upsert(input);
    },
    [upsert],
  );

  return {
    setFavoriteProjectIds,
  };
};
