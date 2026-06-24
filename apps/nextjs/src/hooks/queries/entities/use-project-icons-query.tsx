import { useQuery } from '@apollo/client/react';
import { useEffect } from 'react';
import { ProjectIconsDocument } from '@/graphql/hooks';
import type { ProjectIconsQuery } from '@/graphql/types/projectIcons';
import { getNodesFromEdges } from '@/shared/apollo/util';
import {
  type ProjectIconResponse,
  useProjectIconsResponse,
} from '@/store/entities/projectIcon';

export const useProjectIconsQuery = () => {
  const { setProjectIcons } = useProjectIconsResponse();

  const queryResult = useQuery(ProjectIconsDocument);

  useEffect(() => {
    if (!queryResult.data) return;

    const projectIcons = getNodesFromEdges<
      ProjectIconResponse,
      ProjectIconsQuery['projectIcons']
    >(queryResult.data.projectIcons);

    setProjectIcons(projectIcons);
  }, [queryResult.data, setProjectIcons]);

  return {
    refetch: queryResult.refetch,
    loading: queryResult.loading,
  };
};
