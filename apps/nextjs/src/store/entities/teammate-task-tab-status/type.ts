import type { TeammateTaskTabStatusCode } from '@/graphql/enums';
import type { TeammateTaskTabStatusResponse } from '@/graphql/types/teammate-task-tab-status';

export { TeammateTaskTabStatusCode } from '@/graphql/enums';
export type { TeammateTaskTabStatusResponse } from '@/graphql/types/teammate-task-tab-status';
export type TeammateTaskTabStatusCodeKey =
  keyof typeof TeammateTaskTabStatusCode;

export type TeammateTaskTabStatus = TeammateTaskTabStatusResponse;
