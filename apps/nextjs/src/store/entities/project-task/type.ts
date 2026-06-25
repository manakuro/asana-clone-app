import type { ProjectTaskResponse } from '@/graphql/types/project-task';

export type {
  ProjectTaskCreatedByTaskIdSubscriptionResponse,
  ProjectTaskCreatedSubscriptionResponse,
  ProjectTaskDeletedSubscriptionResponse,
  ProjectTaskResponse,
  ProjectTaskUpdatedSubscriptionResponse,
} from '@/graphql/types/project-task';

export type ProjectTask = Omit<ProjectTaskResponse, 'task' | 'project'>;
