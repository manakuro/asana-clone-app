import type { ProjectTeammateResponse } from '@/graphql/types/projectTeammate';

export type { ProjectTeammateResponse } from '@/graphql/types/projectTeammate';

export type ProjectTeammate = Omit<ProjectTeammateResponse, 'teammate'>;
