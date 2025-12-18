import { atom } from 'jotai';
import { taskIdsByProjectIdState } from '@/store/entities/projectTask';
import { taskFilesState } from '@/store/entities/taskFile';

export const taskFileIdsState = (projectId: string) =>
  atom<string[]>((get) => {
    const taskFiles = get(taskFilesState);
    const taskIds = get(taskIdsByProjectIdState(projectId));
    return taskFiles.filter((a) => taskIds.includes(a.taskId)).map((a) => a.id);
  });
