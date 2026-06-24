import type { WorkspaceTeammateResponse } from '@/graphql/types/workspaceTeammate';

export type { WorkspaceTeammateResponse } from '@/graphql/types/workspaceTeammate';

export type WorkspaceTeammate = Omit<WorkspaceTeammateResponse, 'teammate'>;
