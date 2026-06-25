import type { WorkspaceTeammateResponse } from '@/graphql/types/workspace-teammate';

export type { WorkspaceTeammateResponse } from '@/graphql/types/workspace-teammate';

export type WorkspaceTeammate = Omit<WorkspaceTeammateResponse, 'teammate'>;
