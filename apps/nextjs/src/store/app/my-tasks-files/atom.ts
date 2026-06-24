import { atom } from 'jotai';
import { taskIdsByAssigneeIdState } from '@/store/entities/task';
import { taskFilesState } from '@/store/entities/taskFile';

export const taskFileIdsState = (teammateId: string) =>
  atom<string[]>((get) => {
    const taskFiles = get(taskFilesState);
    const taskIds = get(taskIdsByAssigneeIdState(teammateId));
    return taskFiles.filter((a) => taskIds.includes(a.taskId)).map((a) => a.id);
  });
