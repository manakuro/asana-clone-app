import type { TaskFeedResponse } from '@/graphql/types/taskFeed';

export type {
  CreateTaskFeedInput,
  DeleteTaskFeedInput,
  DeleteTaskFeedResponse,
  TaskFeedCreatedSubscriptionResponse,
  TaskFeedDeletedSubscriptionResponse,
  TaskFeedResponse,
  TaskFeedUpdatedSubscriptionResponse,
  UpdateTaskFeedInput,
} from '@/graphql/types/taskFeed';

export type TaskFeed = TaskFeedResponse;
