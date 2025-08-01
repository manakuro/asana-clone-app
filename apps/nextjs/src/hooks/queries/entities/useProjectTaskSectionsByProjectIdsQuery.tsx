import { useProjectTaskSectionsQuery as useQuery } from '@/graphql/hooks';
import type { ProjectTaskSectionsQuery } from '@/graphql/types';
import type { ProjectTaskSectionResponse } from '@/graphql/types/projectTaskSections';
import { useMountedRef } from '@/hooks';
import { getNodesFromEdges } from '@/shared/apollo/util';
import { useProjectTaskSectionResponse } from '@/store/entities/projectTaskSection';
import { useEffect, useMemo, useState } from 'react';

export const useProjectTaskSectionsByProjectIdsQuery = (
  projectIds: string[],
) => {
  const skip = useMemo(() => !projectIds.length, [projectIds.length]);

  const queryResult = useQuery({
    variables: {
      where: {
        projectIDIn: projectIds,
      },
    },
    fetchPolicy: 'no-cache',
    skip,
  });
  const { setProjectsTaskSections } = useProjectTaskSectionResponse();
  const [loading, setLoading] = useState(queryResult.loading);
  const { mountedRef } = useMountedRef();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!queryResult.data) return;
    if (queryResult.loading) return;
    if (!mountedRef.current) return;

    const projectTaskSections = getNodesFromEdges<
      ProjectTaskSectionResponse,
      ProjectTaskSectionsQuery['projectTaskSections']
    >(queryResult.data.projectTaskSections);

    setProjectsTaskSections(projectTaskSections);
    setLoading(false);
  }, [
    loading,
    mountedRef,
    queryResult.data,
    queryResult.loading,
    setProjectsTaskSections,
  ]);

  return {
    refetch: queryResult.refetch,
    loading,
  };
};
