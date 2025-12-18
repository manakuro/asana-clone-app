import type { TaskResponse as Response } from '@/graphql/types/task';

export type {
  TaskAssignedSubscriptionResponse,
  TaskDeletedSubscriptionResponse,
  TaskUnassignedSubscriptionResponse,
  TaskUndeletedSubscriptionResponse,
  TaskUpdatedSubscriptionResponse,
  UpdateTaskInput,
  UpdateTaskMutationVariables,
} from '@/graphql/types/task';

export type TaskResponse = Response;

export type Task = Omit<
  TaskResponse,
  | 'taskFiles'
  | 'taskTags'
  | 'taskCollaborators'
  | 'taskFeeds'
  | 'projectTasks'
  | 'subTasks'
  | 'taskFeedLikes'
  | 'taskLikes'
>;
