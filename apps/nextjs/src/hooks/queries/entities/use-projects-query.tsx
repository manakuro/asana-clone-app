import { useQuery } from '@apollo/client/react';
import { useEffect } from 'react';
import { ProjectsDocument } from '@/graphql/hooks';
import type { ProjectsQuery } from '@/graphql/types/projects';
import { getNodesFromEdges } from '@/shared/apollo/util';
import {
  type ProjectResponse,
  useProjectResponse,
} from '@/store/entities/project';

export const useProjectsQuery = () => {
  const { setProjects } = useProjectResponse();

  const queryResult = useQuery(ProjectsDocument);

  useEffect(() => {
    if (!queryResult.data) return;

    const projects = getNodesFromEdges<
      ProjectResponse,
      ProjectsQuery['projects']
    >(queryResult.data.projects);

    setProjects(projects);
  }, [queryResult.data, setProjects]);

  return {
    refetch: queryResult.refetch,
    loading: queryResult.loading,
  };
};
