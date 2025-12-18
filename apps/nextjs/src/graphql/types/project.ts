import type { ProjectFragmentFragment } from '@/graphql/types';

export type ProjectResponse = NonNullable<ProjectFragmentFragment>;
export type {
  ProjectsQuery,
  ProjectUpdatedSubscription as ProjectUpdatedSubscriptionResponse,
} from '@/graphql/types';
