import { atom } from 'jotai';
import { uniq } from '@/shared/utils';
import { projectTasksState } from '@/store/entities/projectTask';

export const projectIdsState = atom<string[]>((get) => {
  const projectTasks = get(projectTasksState);
  return uniq(projectTasks.map((p) => p.projectId));
});
