import { useQuery } from '@apollo/client/react';
import { useEffect } from 'react';
import { TaskPrioritiesDocument } from '@/graphql/hooks';
import type { TaskPrioritiesQuery } from '@/graphql/types/taskPriorities';
import { getNodesFromEdges } from '@/shared/apollo/util';
import {
  type TaskPriority,
  useTaskPriorityResponse,
} from '@/store/entities/taskPriority';

export const useTaskPrioritiesQuery = () => {
  const { setTaskPriorities } = useTaskPriorityResponse();

  const queryResult = useQuery(TaskPrioritiesDocument);

  useEffect(() => {
    if (!queryResult.data) return;

    const taskPriorities = getNodesFromEdges<
      TaskPriority,
      TaskPrioritiesQuery['taskPriorities']
    >(queryResult.data.taskPriorities);

    setTaskPriorities(taskPriorities);
  }, [queryResult.data, setTaskPriorities]);

  return {
    refetch: queryResult.refetch,
    loading: queryResult.loading,
  };
};
