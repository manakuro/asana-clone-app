import type { ProjectTaskFragmentFragment } from '@/graphql/types';

export type ProjectTaskResponse = NonNullable<ProjectTaskFragmentFragment>;
export type {
  ProjectTaskCreatedByTaskIdSubscription as ProjectTaskCreatedByTaskIdSubscriptionResponse,
  ProjectTaskCreatedSubscription as ProjectTaskCreatedSubscriptionResponse,
  ProjectTaskDeletedSubscription as ProjectTaskDeletedSubscriptionResponse,
  ProjectTaskUpdatedSubscription as ProjectTaskUpdatedSubscriptionResponse,
} from '@/graphql/types';
