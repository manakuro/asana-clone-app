import { useQuery } from '@apollo/client/react';
import { useEffect } from 'react';
import {
  type ProjectLightColorResponse,
  useProjectLightColorsResponse,
} from '@/features/project/store/project-light-color';
import { ProjectLightColorsDocument } from '@/graphql/documents';
import type { ProjectLightColorsQuery } from '@/graphql/types/project-light-colors';
import { getNodesFromEdges } from '@/lib/apollo/util';

export const useProjectLightColorsQuery = () => {
  const { setProjectLightColors } = useProjectLightColorsResponse();

  const queryResult = useQuery(ProjectLightColorsDocument);

  useEffect(() => {
    if (!queryResult.data) return;

    const projectBaseColors = getNodesFromEdges<
      ProjectLightColorResponse,
      ProjectLightColorsQuery['projectLightColors']
    >(queryResult.data.projectLightColors);

    setProjectLightColors(projectBaseColors);
  }, [queryResult.data, setProjectLightColors]);

  return {
    refetch: queryResult.refetch,
    loading: queryResult.loading,
  };
};
