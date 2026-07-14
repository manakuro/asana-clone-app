import { atom } from 'jotai';
import { taskIdsByAssigneeIdState } from '@/features/task/store/task';
import { taskFilesState } from '@/features/task/store/task-file';

export const taskFileIdsState = (teammateId: string) =>
  atom<string[]>((get) => {
    const taskFiles = get(taskFilesState);
    const taskIds = get(taskIdsByAssigneeIdState(teammateId));
    return taskFiles.filter((a) => taskIds.includes(a.taskId)).map((a) => a.id);
  });
