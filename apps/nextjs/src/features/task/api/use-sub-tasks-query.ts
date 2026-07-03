import { useQuery } from '@apollo/client/react';
import { useEffect } from 'react';
import { SubTasksDocument } from '@/graphql/documents';
import type {
  SubTaskResponse,
  SubTasksQuery,
  SubTasksQueryVariables as Variables,
} from '@/graphql/types/sub-tasks';
import { getNodesFromEdges } from '@/lib/apollo/util';
import { type TaskResponse, useTasksResponse } from '@/store/entities/task';

export const useSubTasksQuery = (variables: Variables) => {
  const { setTasksFromResponse } = useTasksResponse();

  const queryResult = useQuery(SubTasksDocument, {
    variables,
  });

  useEffect(() => {
    if (!queryResult.data?.tasks) return;

    const subTasks = getNodesFromEdges<SubTaskResponse, SubTasksQuery['tasks']>(
      queryResult.data.tasks,
    );

    setTasksFromResponse(subTasks as TaskResponse[]);
  }, [queryResult.data?.tasks, setTasksFromResponse]);

  return {
    refetch: queryResult.refetch,
    loading: queryResult.loading,
  };
};
