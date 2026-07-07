import type { TaskFile } from '@/store/entities/task-file';

export type MyTaskFileResponse = TaskFile & {
  task: Task;
};

export type Task = {
  id: string;
  name: string;
};
