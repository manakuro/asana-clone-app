import { useCallback, useMemo, useState } from 'react';
import { useProjectsPageQuery as useQuery } from '@/graphql/hooks';
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

  const { refetch: refetchQuery } = useQuery({
    variables: {
      projectId: props.projectId,
    },
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (!mountedRef.current) return;

      setProjects(data);
      endLoading();
    },
    skip,
  });

  const startLoading = useCallback(() => {
    setLoading(true);
  }, []);

  const endLoading = useCallback(() => {
    setLoading(false);
  }, []);

  const refetch = useCallback(
    async (variables: Variables) => {
      startLoading();
      setTimeout(async () => {
        await refetchQuery(variables);
      });
    },
    [refetchQuery, startLoading],
  );

  return {
    startLoading,
    refetch,
    loading,
  };
};
