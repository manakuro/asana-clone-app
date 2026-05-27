import type { ProjectsQuery } from '@/graphql/types';

export type { ProjectsQuery, ProjectsQueryVariables } from '@/graphql/types';

export type ProjectsResponse = ProjectsQuery['projects'];
