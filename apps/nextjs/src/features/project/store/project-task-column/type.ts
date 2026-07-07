import type { ProjectTaskColumnResponse } from '@/graphql/types/project-task-column';

export type { ProjectTaskColumnResponse } from '@/graphql/types/project-task-column';

export type ProjectTaskColumn = Omit<ProjectTaskColumnResponse, 'taskColumn'>;
