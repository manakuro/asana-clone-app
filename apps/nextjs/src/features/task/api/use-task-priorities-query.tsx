import { useQuery } from '@apollo/client/react';
import { useEffect } from 'react';
import { TaskPrioritiesDocument } from '@/graphql/documents';
import type { TaskPrioritiesQuery } from '@/graphql/types/task-priorities';
import { getNodesFromEdges } from '@/lib/apollo/util';
import {
  type TaskPriority,
  useTaskPriorityResponse,
} from '@/store/entities/task-priority';

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
