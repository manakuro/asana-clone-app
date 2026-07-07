import type { ProjectResponse } from '@/graphql/types/project';

export type {
  ProjectResponse,
  ProjectUpdatedSubscriptionResponse,
} from '@/graphql/types/project';
export type { ProjectsResponse } from '@/graphql/types/projects';

export type Project = Omit<ProjectResponse, 'projectTeammates'>;
