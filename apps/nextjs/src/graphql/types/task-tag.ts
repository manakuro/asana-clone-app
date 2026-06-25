import type { TaskTagFragmentFragment } from '@/graphql/types';

export type TaskTagResponse = NonNullable<TaskTagFragmentFragment>;

export type {
  TaskTagCreatedSubscription as TaskTagCreatedSubscriptionResponse,
  TaskTagDeletedSubscription as TaskTagDeletedSubscriptionResponse,
} from '@/graphql/types';
