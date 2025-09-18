import { getDefaultDescription } from '@/shared/prosemirror/getDefaultDescription';
import { createState } from '@/store/util';
import deepEqual from 'fast-deep-equal';
import { atom } from 'jotai';
import { atomFamily, atomWithReset } from 'jotai/utils';
import type { Task } from './type';

export const initialState = (): Task => ({
  assigneeId: '',
  dueDate: '',
  dueTime: '',
  id: '',
  completed: false,
  completedAt: '',
  isNew: false,
  name: '',
  taskParentId: '',
  taskPriorityId: '',
  parentTask: null,
  description: getDefaultDescription(),
  createdBy: '',
  createdAt: '',
  updatedAt: '',
});
export const {
  state: taskState,
  listState: tasksState,
  idsState: taskIdsState,
} = createState({ initialState });

export const taskOptimisticState = atomFamily(() => {
  return atomWithReset({ name: '' });
}, deepEqual);

export const taskIdsByAssigneeIdState = (assigneeId: string) =>
  atom<string[]>((get) => {
    const tasks = get(tasksState);
    return tasks.filter((t) => t.assigneeId === assigneeId).map((t) => t.id);
  });

export const tasksByTaskIdsState = (taskIds: string[]) =>
  atom<Task[]>((get) => {
    const tasks = get(tasksState);
    return tasks.filter((t) => taskIds.includes(t.id));
  });

export const taskIdsByTaskParentIdState = (taskParentId: string) =>
  atom<string[]>((get) => {
    const tasks = get(tasksState);
    return tasks
      .filter((t) => t.taskParentId === taskParentId)
      .map((t) => t.id);
  });

export const createdByIdsByTaskIdsState = (taskIds: string[]) =>
  atom<string[]>((get) => {
    const tasks = get(tasksState);
    return tasks.filter((t) => taskIds.includes(t.id)).map((t) => t.createdBy);
  });
