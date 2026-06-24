import type { TeammateTaskResponse } from '@/graphql/types/teammateTask';

export type {
  TeammateTaskCreatedSubscriptionResponse,
  TeammateTaskDeletedSubscriptionResponse,
  TeammateTaskResponse,
  TeammateTaskUpdatedSubscriptionResponse,
} from '@/graphql/types/teammateTask';

export type TeammateTask = Omit<TeammateTaskResponse, 'task'>;
