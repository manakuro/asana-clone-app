import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { favoriteWorkspaceIdsState } from '../atom';
import type { FavoriteWorkspaceId } from '../type';

export const useUpsert = () => {
  const upsert = useAtomCallback(
    useCallback((_get, set, favoriteWorkspaceId: FavoriteWorkspaceId[]) => {
      set(favoriteWorkspaceIdsState, favoriteWorkspaceId);
    }, []),
  );

  return {
    upsert,
  };
};
