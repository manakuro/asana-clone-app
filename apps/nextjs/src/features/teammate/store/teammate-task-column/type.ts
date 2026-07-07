import type { TeammateTaskColumnResponse } from '@/graphql/types/teammate-task-column';

export type { TeammateTaskColumnResponse } from '@/graphql/types/teammate-task-column';

export type TeammateTaskColumn = Omit<TeammateTaskColumnResponse, 'taskColumn'>;
