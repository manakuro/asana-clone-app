import type { ProjectTaskResponse } from '@/graphql/types/projectTask';

export type {
  ProjectTaskCreatedByTaskIdSubscriptionResponse,
  ProjectTaskCreatedSubscriptionResponse,
  ProjectTaskDeletedSubscriptionResponse,
  ProjectTaskResponse,
  ProjectTaskUpdatedSubscriptionResponse,
} from '@/graphql/types/projectTask';

export type ProjectTask = Omit<ProjectTaskResponse, 'task' | 'project'>;
