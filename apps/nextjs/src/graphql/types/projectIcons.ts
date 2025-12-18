import type { ProjectIconsQuery } from '@/graphql/types';

export type {
  ProjectIconsLazyQueryHookResult,
  ProjectIconsQueryHookResult,
} from '@/graphql/hooks';
export type {
  ProjectIconsQuery,
  ProjectIconsQueryVariables,
} from '@/graphql/types';

export type ProjectIconsResponse = ProjectIconsQuery['projectIcons'];
