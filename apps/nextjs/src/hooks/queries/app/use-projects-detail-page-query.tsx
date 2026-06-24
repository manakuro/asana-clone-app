import { useLazyQuery } from '@apollo/client/react';
import { useCallback, useState } from 'react';
import { ProjectsTaskDetailPageDocument } from '@/graphql/hooks';
import type { ProjectsTaskDetailPageQueryVariables as Variables } from '@/graphql/types/app/projects';
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

    const [refetchQuery] = useLazyQuery(ProjectsTaskDetailPageDocument, {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'no-cache',
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
        const result = await refetchQuery({
          variables: variables,
        });
        if (result.data?.projectTask) {
          setProjectTask(
            [result.data.projectTask as unknown as ProjectTaskResponse],
            {
              includeTask: false,
            },
          );
        }
        if (result.data?.task) {
          setTasksFromResponse([result.data.task]);
        }
        endLoading();
      },
      [
        refetchQuery,
        startLoading,
        endLoading,
        setProjectTask,
        setTasksFromResponse,
      ],
    );

    return {
      refetch,
      loading,
    };
  };
