import type { TaskFeedResponse } from '@/graphql/types/task-feed';

export type {
  CreateTaskFeedInput,
  DeleteTaskFeedInput,
  DeleteTaskFeedResponse,
  TaskFeedCreatedSubscriptionResponse,
  TaskFeedDeletedSubscriptionResponse,
  TaskFeedResponse,
  TaskFeedUpdatedSubscriptionResponse,
  UpdateTaskFeedInput,
} from '@/graphql/types/task-feed';

export type TaskFeed = TaskFeedResponse;
