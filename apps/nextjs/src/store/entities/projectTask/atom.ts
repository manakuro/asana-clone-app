import { selectorFamily } from 'recoil';
import { type Task, taskState, tasksState } from 'src/store/entities/task';
import { createState } from 'src/store/util';
import type { ProjectTask } from './type';

const key = (str: string) => `src/store/entities/projectTask/${str}`;

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
} = createState({ key, initialState });

export const projectIdsByTaskIdState = selectorFamily<string[], string>({
  key: key('projectIdsByTaskIdState'),
  get:
    (taskId) =>
    ({ get }) => {
      const projectTasks = get(projectTasksState);
      return projectTasks
        .filter((p) => p.taskId === taskId)
        .map((p) => p.projectId);
    },
});

export const projectTaskByTaskIdState = selectorFamily<ProjectTask, string>({
  key: key('projectTaskByTaskIdState'),
  get:
    (taskId) =>
    ({ get }) => {
      const projectTasks = get(projectTasksState);
      return projectTasks.find((p) => p.taskId === taskId) || initialState();
    },
});

export const projectTasksByTaskIdState = selectorFamily<ProjectTask[], string>({
  key: key('projectTasksByTaskIdState'),
  get:
    (taskId) =>
    ({ get }) => {
      const projectTasks = get(projectTasksState);
      return projectTasks.filter((p) => p.taskId === taskId);
    },
});

export const projectTaskByTaskIdAndProjectIdState = selectorFamily<
  ProjectTask,
  { taskId: string; projectId: string }
>({
  key: key('projectTaskByTaskIdAndProjectIdState'),
  get:
    ({ taskId, projectId }) =>
    ({ get }) => {
      const projectTasks = get(projectTasksState);
      return (
        projectTasks.find(
          (p) => p.taskId === taskId && p.projectId === projectId,
        ) || initialState()
      );
    },
});

export const projectTaskIdsByTaskIdState = selectorFamily<string[], string>({
  key: key('projectTaskIdsByTaskIdState'),
  get:
    (taskId) =>
    ({ get }) => {
      const projectTasks = get(projectTasksState);
      return projectTasks.filter((p) => p.taskId === taskId).map((p) => p.id);
    },
});

export const projectTasksByProjectTaskSectionIdState = selectorFamily<
  ProjectTask[],
  string
>({
  key: key('projectTaskByProjectTaskSectionIdState'),
  get:
    (projectTaskSectionId) =>
    ({ get }) => {
      const projectTasks = get(projectTasksState);
      return projectTasks.filter(
        (p) => p.projectTaskSectionId === projectTaskSectionId,
      );
    },
});

export const tasksByProjectIdState = selectorFamily<Task[], string>({
  key: key('tasksByProjectIdState'),
  get:
    (projectId: string) =>
    ({ get }) => {
      const projectTasks = get(projectTasksState);
      const taskIds = projectTasks
        .filter((p) => p.projectId === projectId)
        .map((p) => p.taskId);
      return taskIds.map((id) => get(taskState(id)));
    },
});

export const tasksByProjectTaskSectionIdState = selectorFamily<Task[], string>({
  key: key('tasksByProjectTaskSectionIdState'),
  get:
    (projectTaskSectionId) =>
    ({ get }) => {
      const tasks = get(tasksState);
      const projectTasks = get(projectTasksState);
      const taskIds = projectTasks
        .filter((p) => p.projectTaskSectionId === projectTaskSectionId)
        .map((p) => p.taskId);

      return tasks.filter((t) => taskIds.includes(t.id));
    },
});

export const tasksByProjectTaskSectionIdAndProjectIdState = selectorFamily<
  Task[],
  { projectId: string; projectTaskSectionId: string }
>({
  key: key('tasksByProjectTaskSectionIdAndProjectIdState'),
  get:
    ({ projectTaskSectionId, projectId }) =>
    ({ get }) => {
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
    },
});

export const taskIdsByProjectIdState = selectorFamily<string[], string>({
  key: key('taskIdsByProjectIdState'),
  get:
    (projectId: string) =>
    ({ get }) => {
      const projectTasks = get(projectTasksState);
      return projectTasks
        .filter((p) => p.projectId === projectId)
        .map((p) => p.taskId);
    },
});

export const projectTasksByIdsState = selectorFamily<ProjectTask[], string[]>({
  key: key('projectTaskByIdsState'),
  get:
    (ids) =>
    ({ get }) => {
      const projectTasks = get(projectTasksState);
      return projectTasks.filter((t) => ids.includes(t.id));
    },
});
