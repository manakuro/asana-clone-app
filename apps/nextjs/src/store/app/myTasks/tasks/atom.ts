import { atom } from 'jotai';
import {
  filterByNoProject,
  filterByProjectTasks,
  filterTasks,
  sortTasks,
} from '@/store/app/myTasks/filters';
import { isTaskListSortStatusState } from '@/store/app/myTasks/taskListStatus';
import { filterByDueDate } from '@/store/entities/task';
import {
  tasksByTeammateIdState,
  tasksByTeammateTaskSectionIdState,
} from '@/store/entities/teammateTask';
import { isTabStatusState } from '@/store/entities/teammateTaskTabStatus';

export const taskIdsState = atom<string[]>((get) => {
  let tasks = get(tasksByTeammateIdState);
  tasks = sortTasks({ get })(tasks);
  tasks = filterTasks({ get })(tasks);

  switch (true) {
    case get(isTabStatusState('List')) &&
      get(isTaskListSortStatusState('dueDate')): {
      return tasks.filter((t) => !!t.dueDate).map((t) => t.id);
    }
    default: {
      return tasks.map((t) => t.id);
    }
  }
});

export const taskIdsByTaskSectionIdState = (params: {
  teammateTaskSectionId: string;
}) =>
  atom<string[]>((get) => {
    const { teammateTaskSectionId } = params;
    let tasks = get(tasksByTeammateTaskSectionIdState(teammateTaskSectionId));
    switch (true) {
      case get(isTabStatusState('List')) &&
        get(isTaskListSortStatusState('dueDate')): {
        tasks = filterTasks({ get })(tasks);
        return tasks.filter((t) => !t.dueDate).map((t) => t.id);
      }
      default: {
        tasks = sortTasks({ get })(tasks);
        tasks = filterTasks({ get })(tasks);
        return tasks.map((t) => t.id);
      }
    }
  });

export const taskIdsByDueDateState = (params: { dueDate: string }) =>
  atom<string[]>((get) => {
    const { dueDate } = params;
    let tasks = get(tasksByTeammateIdState);
    tasks = filterByDueDate(dueDate)(tasks);

    return tasks.map((t) => t.id);
  });

export const taskIdsByProjectIdState = (projectId: string) =>
  atom<string[]>((get) => {
    let tasks = get(tasksByTeammateIdState);
    tasks = filterByProjectTasks({ get, projectId })(tasks);
    tasks = filterTasks({ get })(tasks);

    return tasks.map((t) => t.id);
  });

export const taskIdsWithNoProjectState = atom<string[]>((get) => {
  let tasks = get(tasksByTeammateIdState);
  tasks = filterByNoProject({ get })(tasks);

  return tasks.map((t) => t.id);
});
