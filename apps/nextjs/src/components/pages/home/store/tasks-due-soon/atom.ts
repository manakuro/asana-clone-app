import { atom } from 'jotai';
import {
  filterByDueDateInFiveDays,
  sortByDueDate,
} from '@/features/task/store/task';
import { tasksByTeammateIdState } from '@/features/teammate/store/teammate-task';

export const taskIdsState = atom<string[]>((get) => {
  let tasks = get(tasksByTeammateIdState);
  tasks = filterByDueDateInFiveDays(tasks);
  tasks = sortByDueDate(tasks);

  return tasks.map((t) => t.id);
});
