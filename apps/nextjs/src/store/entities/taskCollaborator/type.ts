import type { TaskCollaboratorResponse } from '@/graphql/types/taskCollaborator';

export type {
  TaskCollaboratorCreatedSubscriptionResponse,
  TaskCollaboratorDeletedSubscriptionResponse,
  TaskCollaboratorResponse,
} from '@/graphql/types/taskCollaborator';

export type TaskCollaborator = Omit<TaskCollaboratorResponse, 'teammate'>;
