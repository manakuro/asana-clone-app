import { atom } from 'jotai';
import { type Task, taskState, tasksState } from '@/store/entities/task';
import { createState } from '@/store/util';
import type { ProjectTask } from './type';

export const initialState = (): ProjectTask => ({
  id: '',
  projectId: '',
  projectTaskSectionId: '',
  taskId: '',
  createdAt: '',
  updatedAt: '',
});

export const {
  state: projectTaskState,
  listState: projectTasksState,
  idsState: projectTaskIdsState,
} = createState({ initialState });

export const projectIdsByTaskIdState = (taskId: string) =>
  atom<string[]>((get) => {
    const projectTasks = get(projectTasksState);
    return projectTasks
      .filter((p) => p.taskId === taskId)
      .map((p) => p.projectId);
  });

export const projectTaskByTaskIdState = (taskId: string) =>
  atom<ProjectTask>((get) => {
    const projectTasks = get(projectTasksState);
    return projectTasks.find((p) => p.taskId === taskId) || initialState();
  });

export const projectTasksByTaskIdState = (taskId: string) =>
  atom<ProjectTask[]>((get) => {
    const projectTasks = get(projectTasksState);
    return projectTasks.filter((p) => p.taskId === taskId);
  });

export const projectTaskByTaskIdAndProjectIdState = ({
  taskId,
  projectId,
}: {
  taskId: string;
  projectId: string;
}) =>
  atom<ProjectTask>((get) => {
    const projectTasks = get(projectTasksState);
    return (
      projectTasks.find(
        (p) => p.taskId === taskId && p.projectId === projectId,
      ) || initialState()
    );
  });

export const projectTaskIdsByTaskIdState = (taskId: string) =>
  atom<string[]>((get) => {
    const projectTasks = get(projectTasksState);
    return projectTasks.filter((p) => p.taskId === taskId).map((p) => p.id);
  });

export const projectTasksByProjectTaskSectionIdState = (
  projectTaskSectionId: string,
) =>
  atom<ProjectTask[]>((get) => {
    const projectTasks = get(projectTasksState);
    return projectTasks.filter(
      (p) => p.projectTaskSectionId === projectTaskSectionId,
    );
  });

export const tasksByProjectIdState = (projectId: string) =>
  atom<Task[]>((get) => {
    const projectTasks = get(projectTasksState);
    const taskIds = projectTasks
      .filter((p) => p.projectId === projectId)
      .map((p) => p.taskId);
    return taskIds.map((id) => get(taskState(id)));
  });

export const tasksByProjectTaskSectionIdState = (
  projectTaskSectionId: string,
) =>
  atom<Task[]>((get) => {
    const tasks = get(tasksState);
    const projectTasks = get(projectTasksState);
    const taskIds = projectTasks
      .filter((p) => p.projectTaskSectionId === projectTaskSectionId)
      .map((p) => p.taskId);

    return tasks.filter((t) => taskIds.includes(t.id));
  });

export const tasksByProjectTaskSectionIdAndProjectIdState = ({
  projectId,
  projectTaskSectionId,
}: {
  projectId: string;
  projectTaskSectionId: string;
}) =>
  atom<Task[]>((get) => {
    const tasks = get(tasksState);
    const projectTasks = get(projectTasksState);
    const taskIds = projectTasks
      .filter(
        (p) =>
          p.projectTaskSectionId === projectTaskSectionId &&
          p.projectId === projectId,
      )
      .map((p) => p.taskId);

    return tasks.filter((t) => taskIds.includes(t.id));
  });

export const taskIdsByProjectIdState = (projectId: string) =>
  atom<string[]>((get) => {
    const projectTasks = get(projectTasksState);
    return projectTasks
      .filter((p) => p.projectId === projectId)
      .map((p) => p.taskId);
  });

export const projectTasksByIdsState = (ids: string[]) =>
  atom<ProjectTask[]>((get) => {
    const projectTasks = get(projectTasksState);
    return projectTasks.filter((t) => ids.includes(t.id));
  });
