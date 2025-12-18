import { useCallback, useState } from 'react';
import { useProjectsTaskDetailPageLazyQuery as useQuery } from '@/graphql/hooks';
import type { ProjectsTaskDetailPageQueryVariables as Variables } from '@/graphql/types/app/projects';
import { useMountedRef } from '@/hooks';
import {
  type ProjectTaskResponse,
  useProjectTaskResponse,
} from '@/store/entities/projectTask';
import { useTasksResponse } from '@/store/entities/task';

export type UseProjectsTaskDetailPageQueryResult = {
  refetch: (variables: Variables) => Promise<void>;
  loading: boolean;
};

export const useProjectsTaskDetailPageQuery =
  (): UseProjectsTaskDetailPageQueryResult => {
    const [loading, setLoading] = useState(true);
    const { setProjectTask } = useProjectTaskResponse();
    const { setTasksFromResponse } = useTasksResponse();
    const { mountedRef } = useMountedRef();

    const [refetchQuery] = useQuery({
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'no-cache',
      onCompleted: (data) => {
        if (!mountedRef.current) return;

        if (data.projectTask)
          setProjectTask([data.projectTask as ProjectTaskResponse], {
            includeTask: false,
          });
        if (data.task) setTasksFromResponse([data.task]);

        endLoading();
      },
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
          await refetchQuery({
            variables: variables,
          });
        });
      },
      [refetchQuery, startLoading],
    );

    return {
      refetch,
      loading,
    };
  };
