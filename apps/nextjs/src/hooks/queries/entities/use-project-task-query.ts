import { useQuery } from '@apollo/client/react';
import { useEffect, useMemo, useState } from 'react';
import { ProjectTaskDocument } from '@/graphql/hooks';
import { useMountedRef } from '@/hooks';
import {
  type ProjectTaskResponse,
  useProjectTaskResponse,
} from '@/store/entities/projectTask';

export const useProjectTaskQuery = (id: string) => {
  const queryResult = useQuery(ProjectTaskDocument, {
    variables: {
      where: {
        id,
      },
    },
  });
  const { setProjectTask } = useProjectTaskResponse();
  const [loading, setLoading] = useState(true);
  const { mountedRef } = useMountedRef();

  const projectTask = useMemo<ProjectTaskResponse | null>(
    () => queryResult.data?.projectTask || null,
    [queryResult.data?.projectTask],
  );

  useEffect(() => {
    if (!queryResult.data) return;
    if (queryResult.loading) return;
    if (!mountedRef.current) return;
    if (!queryResult.data.projectTask) return;

    setProjectTask([queryResult.data.projectTask]);
    setLoading(false);
  }, [mountedRef, queryResult.data, queryResult.loading, setProjectTask]);

  return {
    refetch: queryResult.refetch,
    loading,
    projectTask,
  };
};
