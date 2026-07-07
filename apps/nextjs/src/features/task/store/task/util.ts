import type { Task } from './type';

// Check to see if the task has been persisted in database.
export const hasTaskBeenPersisted = (task: Task): boolean => {
  return !!task.createdAt;
};
