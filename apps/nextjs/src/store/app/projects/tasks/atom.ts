import { atom } from 'jotai';
import {
  tasksByProjectIdState,
  tasksByProjectTaskSectionIdAndProjectIdState,
} from '@/store/entities/projectTask';
import { filterByDueDate } from '@/store/entities/task';
import { filterTasks, sortTasks } from '../filters';
import { isTaskListSortStatusState } from '../taskListStatus';

export const taskIdsState = (projectId: string) =>
  atom<string[]>((get) => {
    let tasks = [...get(tasksByProjectIdState(projectId))];
    tasks = sortTasks({ get })(tasks);
    tasks = filterTasks({ get })(tasks);

    switch (true) {
      case get(isTaskListSortStatusState('dueDate')): {
        return tasks.filter((t) => !!t.dueDate).map((t) => t.id);
      }
      default: {
        return tasks.map((t) => t.id);
      }
    }
  });

export const taskIdsByTaskSectionIdState = (params: {
  taskSectionId: string;
  projectId: string;
}) =>
  atom<string[]>((get) => {
    const { taskSectionId, projectId } = params;
    let tasks = get(
      tasksByProjectTaskSectionIdAndProjectIdState({
        projectTaskSectionId: taskSectionId,
        projectId,
      }),
    );
    switch (true) {
      case get(isTaskListSortStatusState('dueDate')): {
        tasks = filterTasks({ get })(tasks);
        return tasks.filter((t) => !t.dueDate).map((t) => t.id);
      }
      default: {
        tasks = tasks.filter((t) => !t.taskParentId);
        tasks = filterTasks({ get })(tasks);
        tasks = sortTasks({ get })(tasks);
        return tasks.map((t) => t.id);
      }
    }
  });

export const taskIdsByDueDateState = (params: {
  dueDate: string;
  projectId: string;
}) =>
  atom<string[]>((get) => {
    const { dueDate, projectId } = params;
    let tasks = get(tasksByProjectIdState(projectId));
    tasks = filterByDueDate(dueDate)(tasks);

    return tasks.map((t) => t.id);
  });

export const taskIdsByProjectIdState = (projectId: string) =>
  atom<string[]>((get) => {
    let tasks = get(tasksByProjectIdState(projectId));
    tasks = filterTasks({ get })(tasks);

    return tasks.map((t) => t.id);
  });
