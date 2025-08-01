import { taskIdsByAssigneeIdState } from '@/store/entities/task';
import { taskFilesState } from '@/store/entities/taskFile';
import { atom } from 'jotai';

export const taskFileIdsState = (teammateId: string) =>
  atom<string[]>((get) => {
    const taskFiles = get(taskFilesState);
    const taskIds = get(taskIdsByAssigneeIdState(teammateId));
    return taskFiles.filter((a) => taskIds.includes(a.taskId)).map((a) => a.id);
  });
