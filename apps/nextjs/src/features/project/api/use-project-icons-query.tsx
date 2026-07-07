import { useQuery } from '@apollo/client/react';
import { useEffect } from 'react';
import {
  type ProjectIconResponse,
  useProjectIconsResponse,
} from '@/features/project/store/project-icon';
import { ProjectIconsDocument } from '@/graphql/documents';
import type { ProjectIconsQuery } from '@/graphql/types/project-icons';
import { getNodesFromEdges } from '@/lib/apollo/util';

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
