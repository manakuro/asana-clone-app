import type { TeammateTaskResponse } from '@/graphql/types/teammate-task';

export type {
  TeammateTaskCreatedSubscriptionResponse,
  TeammateTaskDeletedSubscriptionResponse,
  TeammateTaskResponse,
  TeammateTaskUpdatedSubscriptionResponse,
} from '@/graphql/types/teammate-task';

export type TeammateTask = Omit<TeammateTaskResponse, 'task'>;
