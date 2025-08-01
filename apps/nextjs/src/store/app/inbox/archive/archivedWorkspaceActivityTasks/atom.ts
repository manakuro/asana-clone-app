import { createState } from '@/store/util';
import { atom } from 'jotai';
import type { ArchivedWorkspaceActivityTask } from './type';

export const initialState = (): ArchivedWorkspaceActivityTask => ({
  id: '',
  archivedWorkspaceActivityId: '',
  taskId: '',
  createdAt: '',
  updatedAt: '',
});

export const {
  state: archivedWorkspaceActivityTaskState,
  listState: archivedWorkspaceActivityTasksState,
  idsState: archivedWorkspaceActivityTaskIdsState,
} = createState({ initialState });

export const taskIdsByArchivedWorkspaceActivityIdState = (
  archivedWorkspaceActivityId: string,
) =>
  atom<string[]>((get) => {
    const archivedWorkspaceActivityTasks = get(
      archivedWorkspaceActivityTasksState,
    );
    return archivedWorkspaceActivityTasks
      .filter(
        (w) => w.archivedWorkspaceActivityId === archivedWorkspaceActivityId,
      )
      .map((w) => w.taskId);
  });
