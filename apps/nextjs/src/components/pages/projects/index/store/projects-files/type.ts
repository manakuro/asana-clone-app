import type { TaskFile } from '@/features/task/store/task-file';

export type ProjectsFileResponse = TaskFile & {
  task: Task;
};

export type Task = {
  id: string;
  name: string;
};
