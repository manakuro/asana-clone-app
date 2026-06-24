import { useQuery } from '@apollo/client/react';
import { useEffect, useMemo } from 'react';
import { FavoriteProjectIdsDocument } from '@/graphql/hooks';
import { useFavoriteProjectIdsResponse } from '@/store/entities/favoriteProjectIds';
import { useMe } from '@/store/entities/me';

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
