import type { ProjectTeammateResponse } from '@/graphql/types/project-teammate';

export type { ProjectTeammateResponse } from '@/graphql/types/project-teammate';

export type ProjectTeammate = Omit<ProjectTeammateResponse, 'teammate'>;
