import type { ProjectTaskColumnResponse } from '@/graphql/types/projectTaskColumn';

export type { ProjectTaskColumnResponse } from '@/graphql/types/projectTaskColumn';

export type ProjectTaskColumn = Omit<ProjectTaskColumnResponse, 'taskColumn'>;
