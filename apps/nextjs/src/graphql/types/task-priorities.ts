import type { TaskPrioritiesQuery } from '@/graphql/types';

export type {
  TaskPrioritiesQuery,
  TaskPrioritiesQueryVariables,
} from '@/graphql/types';

export type TaskPriorityResponse = NonNullable<
  EdgesNode<TaskPrioritiesQuery['taskPriorities']>
>;
