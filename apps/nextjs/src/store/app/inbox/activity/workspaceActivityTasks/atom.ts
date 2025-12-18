import { atom } from 'jotai';
import { createState } from '@/store/util';
import type { WorkspaceActivityTask } from './type';

export const initialState = (): WorkspaceActivityTask => ({
  id: '',
  workspaceActivityId: '',
  taskId: '',
  createdAt: '',
  updatedAt: '',
});
export const {
  state: workspaceActivityTaskState,
  listState: workspaceActivityTasksState,
  idsState: workspaceActivityTaskIdsState,
} = createState({ initialState });

export const taskIdsByWorkspaceActivityIdState = (
  workspaceActivityId: string,
) =>
  atom((get) => {
    const workspaceActivityTasks = get(workspaceActivityTasksState);
    return workspaceActivityTasks
      .filter((w) => w.workspaceActivityId === workspaceActivityId)
      .map((w) => w.taskId);
  });
