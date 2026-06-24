import { useQuery } from '@apollo/client/react';
import { useEffect, useMemo } from 'react';
import { FavoriteWorkspaceIdsDocument } from '@/graphql/hooks';
import { useFavoriteWorkspaceIdsResponse } from '@/store/entities/favoriteWorkspaceIds';
import { useMe } from '@/store/entities/me';
import { useWorkspace } from '@/store/entities/workspace';

export const useFavoriteWorkspaceIdsQuery = () => {
  const { me } = useMe();
  const { workspace } = useWorkspace();
  const skip = useMemo(() => !me.id || !workspace.id, [me.id, workspace.id]);
  const { setFavoriteWorkspaceIds } = useFavoriteWorkspaceIdsResponse();

  const queryResult = useQuery(FavoriteWorkspaceIdsDocument, {
    variables: {
      teammateId: me.id,
      workspaceId: workspace.id,
    },
    skip,
  });

  useEffect(() => {
    if (!queryResult.data) return;

    setFavoriteWorkspaceIds(queryResult.data.favoriteWorkspaceIds);
  }, [queryResult.data, setFavoriteWorkspaceIds]);

  return {
    refetch: queryResult.refetch,
    loading: queryResult.loading,
  };
};
