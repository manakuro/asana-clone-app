import { useQuery } from '@apollo/client/react';
import { useEffect } from 'react';
import { SubTasksDocument } from '@/graphql/hooks';
import type {
  SubTaskResponse,
  SubTasksQuery,
  SubTasksQueryVariables as Variables,
} from '@/graphql/types/subTasks';
import { getNodesFromEdges } from '@/shared/apollo/util';
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
