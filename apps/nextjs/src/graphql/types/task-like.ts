import type { TaskLikesQuery } from '@/graphql/types';

export type TaskLikeResponse = NonNullable<
  EdgesNode<TaskLikesQuery['taskLikes']>
>;

export type {
  TaskLikeCreatedSubscription as TaskLikeCreatedSubscriptionResponse,
  TaskLikeDeletedSubscription as TaskLikeDeletedSubscriptionResponse,
} from '@/graphql/types';
