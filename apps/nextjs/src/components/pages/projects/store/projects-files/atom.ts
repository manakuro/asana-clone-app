import { atom } from 'jotai';
import { taskIdsByProjectIdState } from '@/store/entities/project-task';
import { taskFilesState } from '@/store/entities/task-file';

export const taskFileIdsState = (projectId: string) =>
  atom<string[]>((get) => {
    const taskFiles = get(taskFilesState);
    const taskIds = get(taskIdsByProjectIdState(projectId));
    return taskFiles.filter((a) => taskIds.includes(a.taskId)).map((a) => a.id);
  });
