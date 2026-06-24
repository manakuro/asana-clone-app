import type { TeammateTaskColumnResponse } from '@/graphql/types/teammateTaskColumn';

export type { TeammateTaskColumnResponse } from '@/graphql/types/teammateTaskColumn';

export type TeammateTaskColumn = Omit<TeammateTaskColumnResponse, 'taskColumn'>;
