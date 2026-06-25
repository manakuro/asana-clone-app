import { atom } from 'jotai';
import { createState } from '@/store/util';
import type { ProjectTeammate } from './type';

export const initialState = (): ProjectTeammate => ({
  id: '',
  projectId: '',
  teammateId: '',
  isOwner: false,
  role: '',
  createdAt: '',
  updatedAt: '',
});
export const {
  state: projectTeammateState,
  listState: projectTeammatesState,
  idsState: projectTeammateIdsState,
} = createState({ initialState });

export const teammateIdsByProjectIdState = (projectId: string) =>
  atom<string[]>((get) => {
    const projects = get(projectTeammatesState);
    return projects
      .filter((t) => t.projectId === projectId)
      .map((p) => p.teammateId);
  });

export const projectTeammateIdsByProjectIdState = (projectId: string) =>
  atom<string[]>((get) => {
    const projects = get(projectTeammatesState);
    return projects.filter((t) => t.projectId === projectId).map((p) => p.id);
  });

export const projectTeammateIdsByProjectIdSortedByOwnerState = (
  projectId: string,
) =>
  atom<string[]>((get) => {
    const projects = get(projectTeammatesState);
    return projects
      .filter((t) => t.projectId === projectId)
      .sort((a, b) => {
        if (a.isOwner) return -1;
        if (b.isOwner) return 1;
        return 0;
      })
      .map((p) => p.id);
  });

export const projectTeammateIdsByProjectIdSortedByCreatedAtState = (
  projectId: string,
) =>
  atom<string[]>((get) => {
    const projects = get(projectTeammatesState);
    return projects
      .filter((t) => t.projectId === projectId)
      .sort((a, b) => {
        return a.createdAt > b.createdAt ? -1 : 1;
      })
      .map((p) => p.id);
  });

export const ownerProjectTeammateByProjectIdState = (projectId: string) =>
  atom<ProjectTeammate>((get) => {
    const projects = get(projectTeammatesState);
    return (
      projects.filter((t) => t.projectId === projectId && t.isOwner)[0] ??
      initialState()
    );
  });

export const projectTeammateByProjectIdAndTeammateIdState = ({
  projectId,
  teammateId,
}: {
  projectId: string;
  teammateId: string;
}) =>
  atom<ProjectTeammate>((get) => {
    const projects = get(projectTeammatesState);
    return (
      projects.find(
        (t) => t.projectId === projectId && t.teammateId === teammateId,
      ) ?? initialState()
    );
  });
