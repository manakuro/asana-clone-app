import { useQuery } from '@apollo/client/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ProjectsPageDocument } from '@/graphql/hooks';
import type { ProjectsPageQueryVariables as Variables } from '@/graphql/types/app/projects';
import { useMountedRef } from '@/hooks';
import { useProjectsResponse } from '@/store/app/projects';

type Props = {
  projectId: string;
};

export const useProjectsPageQuery = (props: Props) => {
  const skip = useMemo(() => !props.projectId, [props.projectId]);
  const [loading, setLoading] = useState(true);
  const { setProjects } = useProjectsResponse();
  const { mountedRef } = useMountedRef();

  const { data, refetch: refetchQuery } = useQuery(ProjectsPageDocument, {
    variables: {
      projectId: props.projectId,
    },
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    skip,
  });

  const startLoading = useCallback(() => {
    setLoading(true);
  }, []);

  const endLoading = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!mountedRef.current) return;
    if (!data) return;

    setProjects(data);
    endLoading();
  }, [data, endLoading, mountedRef.current, setProjects]);

  const refetch = useCallback(
    async (variables: Variables) => {
      startLoading();
      await refetchQuery(variables);
    },
    [refetchQuery, startLoading],
  );

  return {
    startLoading,
    refetch,
    loading,
  };
};
