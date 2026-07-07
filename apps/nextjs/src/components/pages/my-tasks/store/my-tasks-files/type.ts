import type { TaskFile } from '@/features/task/store/task-file';

export type MyTaskFileResponse = TaskFile & {
  task: Task;
};

export type Task = {
  id: string;
  name: string;
};
