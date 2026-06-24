import { useQuery } from '@apollo/client/react';
import { useEffect } from 'react';
import { ProjectBaseColorsDocument } from '@/graphql/hooks';
import type { ProjectBaseColorsQuery } from '@/graphql/types/projectBaseColors';
import { getNodesFromEdges } from '@/shared/apollo/util';
import {
  type ProjectBaseColorResponse,
  useProjectBaseColorsResponse,
} from '@/store/entities/projectBaseColor';

export const useProjectBaseColorsQuery = () => {
  const { setProjectBaseColors } = useProjectBaseColorsResponse();

  const queryResult = useQuery(ProjectBaseColorsDocument);

  useEffect(() => {
    if (!queryResult.data) return;

    const projectBaseColors = getNodesFromEdges<
      ProjectBaseColorResponse,
      ProjectBaseColorsQuery['projectBaseColors']
    >(queryResult.data.projectBaseColors);

    setProjectBaseColors(projectBaseColors);
  }, [queryResult.data, setProjectBaseColors]);

  return {
    refetch: queryResult.refetch,
    loading: queryResult.loading,
  };
};
