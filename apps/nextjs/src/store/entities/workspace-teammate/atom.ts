import { atom } from 'jotai';
import { createState } from '@/store/util';
import type { WorkspaceTeammate } from './type';

export const initialState = (): WorkspaceTeammate => ({
  id: '',
  workspaceId: '',
  teammateId: '',
  isOwner: false,
  role: '',
  createdAt: '',
  updatedAt: '',
});
export const {
  state: workspaceTeammateState,
  listState: workspaceTeammatesState,
  idsState: workspaceTeammateIdsState,
} = createState({ initialState });

export const teammateIdsByWorkspaceIdState = (workspaceId: string) =>
  atom<string[]>((get) => {
    const workspaces = get(workspaceTeammatesState);
    return workspaces
      .filter((t) => t.workspaceId === workspaceId)
      .map((p) => p.teammateId);
  });

export const workspaceTeammateIdsByWorkspaceIdState = (workspaceId: string) =>
  atom<string[]>((get) => {
    const workspaces = get(workspaceTeammatesState);
    return workspaces
      .filter((t) => t.workspaceId === workspaceId)
      .map((p) => p.id);
  });

export const workspaceTeammateIdsByWorkspaceIdSortedByOwnerState = (
  workspaceId: string,
) =>
  atom<string[]>((get) => {
    const workspaces = get(workspaceTeammatesState);
    return workspaces
      .filter((t) => t.workspaceId === workspaceId)
      .sort((a, b) => {
        if (a.isOwner) return -1;
        if (b.isOwner) return 1;
        return 0;
      })
      .map((p) => p.id);
  });

export const workspaceTeammateIdsByWorkspaceIdSortedByCreatedAtState = (
  workspaceId: string,
) =>
  atom<string[]>((get) => {
    const workspaces = get(workspaceTeammatesState);
    return workspaces
      .filter((t) => t.workspaceId === workspaceId)
      .sort((a, b) => {
        return a.createdAt > b.createdAt ? -1 : 1;
      })
      .map((p) => p.id);
  });

export const ownerWorkspaceTeammateByWorkspaceIdState = (workspaceId: string) =>
  atom<WorkspaceTeammate>((get) => {
    const workspaces = get(workspaceTeammatesState);
    return (
      workspaces.filter((t) => t.workspaceId === workspaceId && t.isOwner)[0] ??
      initialState()
    );
  });

export const workspaceTeammateByWorkspaceIdAndTeammateIdState = ({
  workspaceId,
  teammateId,
}: {
  workspaceId: string;
  teammateId: string;
}) =>
  atom<WorkspaceTeammate>((get) => {
    const workspaces = get(workspaceTeammatesState);
    return (
      workspaces.find(
        (t) => t.workspaceId === workspaceId && t.teammateId === teammateId,
      ) ?? initialState()
    );
  });
