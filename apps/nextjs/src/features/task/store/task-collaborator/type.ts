import type { TaskCollaboratorResponse } from '@/graphql/types/task-collaborator';

export type {
  TaskCollaboratorCreatedSubscriptionResponse,
  TaskCollaboratorDeletedSubscriptionResponse,
  TaskCollaboratorResponse,
} from '@/graphql/types/task-collaborator';

export type TaskCollaborator = Omit<TaskCollaboratorResponse, 'teammate'>;
