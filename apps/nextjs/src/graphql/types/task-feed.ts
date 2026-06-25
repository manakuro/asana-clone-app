import type {
  DeleteTaskFeedMutation,
  TaskFeedFragmentFragment,
} from '@/graphql/types';

export type TaskFeedResponse = NonNullable<TaskFeedFragmentFragment>;
export type {
  CreateTaskFeedInput,
  DeleteTaskFeedInput,
  TaskFeedCreatedSubscription as TaskFeedCreatedSubscriptionResponse,
  TaskFeedDeletedSubscription as TaskFeedDeletedSubscriptionResponse,
  TaskFeedUpdatedSubscription as TaskFeedUpdatedSubscriptionResponse,
  UpdateTaskFeedInput,
} from '@/graphql/types';

export type DeleteTaskFeedResponse = DeleteTaskFeedMutation['deleteTaskFeed'];
