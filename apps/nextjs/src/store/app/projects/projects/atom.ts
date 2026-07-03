import { atom } from 'jotai';
import { projectTasksState } from '@/store/entities/project-task';
import { uniq } from '@/utils';

export const projectsProjectIdsState = atom<string[]>((get) => {
  const projectTasks = get(projectTasksState);
  return uniq(projectTasks.map((p) => p.projectId));
});
