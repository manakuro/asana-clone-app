import type { TaskCollaboratorFragmentFragment } from '@/graphql/types';

export type {
  TaskCollaboratorCreatedSubscription as TaskCollaboratorCreatedSubscriptionResponse,
  TaskCollaboratorDeletedSubscription as TaskCollaboratorDeletedSubscriptionResponse,
} from '@/graphql/types';

export type TaskCollaboratorResponse =
  NonNullable<TaskCollaboratorFragmentFragment>;
