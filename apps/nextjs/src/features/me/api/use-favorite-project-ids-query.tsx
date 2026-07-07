import { useQuery } from '@apollo/client/react';
import { useEffect, useMemo } from 'react';
import { useFavoriteProjectIdsResponse } from '@/features/me/store/favorite-project-ids';
import { useMe } from '@/features/me/store/me';
import { FavoriteProjectIdsDocument } from '@/graphql/documents';

export const useFavoriteProjectIdsQuery = () => {
  const { me } = useMe();
  const skip = useMemo(() => !me.id, [me.id]);
  const { setFavoriteProjectIds } = useFavoriteProjectIdsResponse();

  const queryResult = useQuery(FavoriteProjectIdsDocument, {
    variables: {
      teammateId: me.id,
    },
    skip,
  });

  useEffect(() => {
    if (!queryResult.data) return;

    setFavoriteProjectIds(queryResult.data.favoriteProjectIds);
  }, [queryResult.data, setFavoriteProjectIds]);

  return {
    refetch: queryResult.refetch,
    loading: queryResult.loading,
  };
};
