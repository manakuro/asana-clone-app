import type { ProjectTaskFragmentFragment } from 'src/graphql/types';

export type ProjectTaskResponse = NonNullable<ProjectTaskFragmentFragment>;
export type {
  ProjectTaskCreatedSubscription as ProjectTaskCreatedSubscriptionResponse,
  ProjectTaskUpdatedSubscription as ProjectTaskUpdatedSubscriptionResponse,
  ProjectTaskDeletedSubscription as ProjectTaskDeletedSubscriptionResponse,
  ProjectTaskCreatedByTaskIdSubscription as ProjectTaskCreatedByTaskIdSubscriptionResponse,
} from 'src/graphql/types';
