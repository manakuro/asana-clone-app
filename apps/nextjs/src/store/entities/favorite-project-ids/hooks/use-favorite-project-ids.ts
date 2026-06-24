import { useAtomValue } from 'jotai';
import { useCallback } from 'react';
import { favoriteProjectIdsState } from '../atom';

export const useFavoriteProjectIds = () => {
  const ids = useAtomValue(favoriteProjectIdsState);

  const isFavorite = useCallback(
    (id: string) => ids.some((i) => i === id),
    [ids],
  );

  return {
    favoriteProjectIds: ids,
    isFavorite,
  };
};
