import type { TeammateTaskFragmentFragment } from '@/graphql/types';

export type TeammateTaskResponse = NonNullable<TeammateTaskFragmentFragment>;
export type {
  TeammateTaskCreatedSubscription as TeammateTaskCreatedSubscriptionResponse,
  TeammateTaskDeletedSubscription as TeammateTaskDeletedSubscriptionResponse,
  TeammateTaskUpdatedSubscription as TeammateTaskUpdatedSubscriptionResponse,
} from '@/graphql/types';
