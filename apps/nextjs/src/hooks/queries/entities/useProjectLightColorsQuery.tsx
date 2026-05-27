import { useQuery } from '@apollo/client/react';
import { useEffect } from 'react';
import { ProjectLightColorsDocument } from '@/graphql/hooks';
import type { ProjectLightColorsQuery } from '@/graphql/types/projectLightColors';
import { getNodesFromEdges } from '@/shared/apollo/util';
import {
  type ProjectLightColorResponse,
  useProjectLightColorsResponse,
} from '@/store/entities/projectLightColor';

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
