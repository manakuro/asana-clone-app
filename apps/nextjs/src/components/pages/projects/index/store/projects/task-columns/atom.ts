import { atom } from 'jotai';
import { projectsTaskColumnsByProjectIdState } from '@/features/project/store/project-task-column';

export const projectsTaskColumnIdsState = (projectId: string) =>
  atom<string[]>((get) => {
    const taskColumns = get(projectsTaskColumnsByProjectIdState(projectId));

    return taskColumns
      .filter((t) => !t.disabled)
      .sort((a, b) => (a.order > b.order ? 1 : -1))
      .map((t) => t.id);
  });

export const projectsTaskColumnIdsCustomizableState = (projectId: string) =>
  atom<string[]>((get) => {
    const taskColumns = get(projectsTaskColumnsByProjectIdState(projectId));
    return [...taskColumns]
      .sort((a, b) => (a.order > b.order ? 1 : -1))
      .map((t) => t.id);
  });
