import { atom } from 'jotai';
import { type Task, tasksState } from '@/store/entities/task';
import { createState } from '@/store/util';
import type { TeammateTask } from './type';

export const initialState = (): TeammateTask => ({
  id: '',
  taskId: '',
  teammateId: '',
  teammateTaskSectionId: '',
  workspaceId: '',
  createdAt: '',
  updatedAt: '',
});

export const {
  state: teammateTaskState,
  listState: teammateTasksState,
  idsState: teammateTaskIdsState,
} = createState({ initialState });

export const tasksByTeammateIdState = atom<Task[]>((get) => {
  const tasks = get(tasksState);
  const teammateTasks = get(teammateTasksState);
  const taskIds = teammateTasks.map((t) => t.taskId);

  return tasks.filter((t) => taskIds.includes(t.id));
});

export const tasksByTeammateTaskSectionIdState = (
  teammateTaskSectionId: string,
) =>
  atom<Task[]>((get) => {
    const tasks = get(tasksState);
    const teammateTasks = get(teammateTasksState);
    const taskIds = teammateTasks
      .filter((t) => t.teammateTaskSectionId === teammateTaskSectionId)
      .map((t) => t.taskId);

    return tasks.filter((t) => taskIds.includes(t.id));
  });

export const teammateTaskByTaskIdState = (taskId: string) =>
  atom<TeammateTask>((get) => {
    const teammateTasks = get(teammateTasksState);
    return teammateTasks.find((t) => t.taskId === taskId) || initialState();
  });

export const teammateTaskByTeammateTaskSectionIdState = (
  teammateTaskSectionId: string,
) =>
  atom<TeammateTask[]>((get) => {
    const teammateTasks = get(teammateTasksState);
    return teammateTasks.filter(
      (t) => t.teammateTaskSectionId === teammateTaskSectionId,
    );
  });

export const teammateTasksByIdsState = (ids: string[]) =>
  atom<TeammateTask[]>((get) => {
    const teammateTasks = get(teammateTasksState);
    return teammateTasks.filter((t) => ids.includes(t.id));
  });
