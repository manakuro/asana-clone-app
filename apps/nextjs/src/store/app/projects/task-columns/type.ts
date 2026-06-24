import type { TaskColumn } from '@/store/entities/task-column';

export type ProjectTaskColumnResponse = {
  id: string;
  projectId: string;
  taskColumnId: string;
  taskColumn: TaskColumn;
  createdAt: string;
  updatedAt: string;
};

export type ProjectTaskColumn = {
  id: string;
  projectId: string;
  taskColumnId: string;
  createdAt: string;
  updatedAt: string;
};
