import type { SubTasksQuery } from '@/graphql/types';

export type { SubTasksQuery, SubTasksQueryVariables } from '@/graphql/types';
export type SubTaskResponse = NonNullable<EdgesNode<SubTasksQuery['tasks']>>;
