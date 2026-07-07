import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { favoriteProjectIdsState } from '../atom';
import type { FavoriteProjectId } from '../type';

export const useUpsert = () => {
  const upsert = useAtomCallback(
    useCallback((_get, set, favoriteProjectId: FavoriteProjectId[]) => {
      set(favoriteProjectIdsState, favoriteProjectId);
    }, []),
  );

  return {
    upsert,
  };
};
