import { atom } from 'jotai';
import { createState } from '@/store/util';
import type { ArchivedTaskActivityTask } from './type';

export const initialState = (): ArchivedTaskActivityTask => ({
  id: '',
  archivedTaskActivityId: '',
  taskId: '',
  createdAt: '',
  updatedAt: '',
});

export const {
  state: archivedTaskActivityTaskState,
  listState: archivedTaskActivityTasksState,
  idsState: archivedTaskActivityTaskIdsState,
} = createState({ initialState });

export const taskIdsByArchivedTaskActivityIdState = (
  archivedTaskActivityId: string,
) =>
  atom<string[]>((get) => {
    const archivedTaskActivityTasks = get(archivedTaskActivityTasksState);
    return archivedTaskActivityTasks
      .filter((w) => w.archivedTaskActivityId === archivedTaskActivityId)
      .map((w) => w.taskId);
  });
