import type { TaskFeedLikeFragmentFragment } from '@/graphql/types';

export type TaskFeedLikeResponse = NonNullable<TaskFeedLikeFragmentFragment>;

export type {
  CreateTaskFeedLikeInput,
  TaskFeedLikeCreatedSubscription as TaskFeedLikeCreatedSubscriptionResponse,
  TaskFeedLikeDeletedSubscription as TaskFeedLikeDeletedSubscriptionResponse,
} from '@/graphql/types';
