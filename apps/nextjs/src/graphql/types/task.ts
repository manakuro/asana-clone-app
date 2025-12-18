import type { TaskFragmentFragment } from '@/graphql/types';

export type TaskResponse = NonNullable<TaskFragmentFragment>;
export type {
  TaskAssignedSubscription as TaskAssignedSubscriptionResponse,
  TaskDeletedSubscription as TaskDeletedSubscriptionResponse,
  TaskUnassignedSubscription as TaskUnassignedSubscriptionResponse,
  TaskUndeletedSubscription as TaskUndeletedSubscriptionResponse,
  TaskUpdatedSubscription as TaskUpdatedSubscriptionResponse,
  UndeleteTaskInput,
  UpdateTaskInput,
  UpdateTaskMutationVariables,
} from '@/graphql/types';
