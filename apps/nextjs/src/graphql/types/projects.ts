import type { ProjectsQuery } from '@/graphql/types';

export type {
  ProjectsLazyQueryHookResult,
  ProjectsQueryHookResult,
} from '@/graphql/hooks';
export type { ProjectsQuery, ProjectsQueryVariables } from '@/graphql/types';

export type ProjectsResponse = ProjectsQuery['projects'];
