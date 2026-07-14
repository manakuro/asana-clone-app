import { atom } from 'jotai';
import { taskIdsByProjectIdState } from '@/features/project/store/project-task';
import { taskFilesState } from '@/features/task/store/task-file';

export const taskFileIdsState = (projectId: string) =>
  atom<string[]>((get) => {
    const taskFiles = get(taskFilesState);
    const taskIds = get(taskIdsByProjectIdState(projectId));
    return taskFiles.filter((a) => taskIds.includes(a.taskId)).map((a) => a.id);
  });
