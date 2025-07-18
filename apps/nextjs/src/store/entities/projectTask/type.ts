import type { ProjectTaskResponse } from 'src/graphql/types/projectTask';

export type {
  ProjectTaskResponse,
  ProjectTaskCreatedSubscriptionResponse,
  ProjectTaskUpdatedSubscriptionResponse,
  ProjectTaskCreatedByTaskIdSubscriptionResponse,
  ProjectTaskDeletedSubscriptionResponse,
} from 'src/graphql/types/projectTask';

export type ProjectTask = Omit<ProjectTaskResponse, 'task' | 'project'>;
