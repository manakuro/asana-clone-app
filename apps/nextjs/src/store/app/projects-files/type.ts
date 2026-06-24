import type { TaskFile } from '@/store/entities/taskFile';

export type ProjectsFileResponse = TaskFile & {
  task: Task;
};

export type Task = {
  id: string;
  name: string;
};
