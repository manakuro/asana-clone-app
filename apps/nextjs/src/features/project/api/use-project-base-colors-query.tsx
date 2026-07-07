import { useQuery } from '@apollo/client/react';
import { useEffect } from 'react';
import {
  type ProjectBaseColorResponse,
  useProjectBaseColorsResponse,
} from '@/features/project/store/project-base-color';
import { ProjectBaseColorsDocument } from '@/graphql/documents';
import type { ProjectBaseColorsQuery } from '@/graphql/types/project-base-colors';
import { getNodesFromEdges } from '@/lib/apollo/util';

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
