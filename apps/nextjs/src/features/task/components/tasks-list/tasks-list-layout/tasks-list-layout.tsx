import type React from 'react';
import { memo } from 'react';
import { useTasksTaskListStatus } from '@/features/task/hooks';
import { TaskListSortStatusCode } from '@/store/entities/task-list-sort-status';
import { ListBasic } from './list-basic';
import { ListSortByAlphabetical } from './list-sort-by-alphabetical';
import { ListSortByDueDate } from './list-sort-by-due-date';
import { ListSortByLike } from './list-sort-by-like';
import { ListSortByProject } from './list-sort-by-project';

export const TasksListLayout: React.FC = memo(() => {
  const { taskListStatus } = useTasksTaskListStatus();

  switch (taskListStatus.taskListSortStatus) {
    case TaskListSortStatusCode.DueDate: {
      return <ListSortByDueDate />;
    }
    case TaskListSortStatusCode.Likes: {
      return <ListSortByLike />;
    }
    case TaskListSortStatusCode.Alphabetical: {
      return <ListSortByAlphabetical />;
    }
    case TaskListSortStatusCode.Project: {
      return <ListSortByProject />;
    }
    default: {
      return <ListBasic />;
    }
  }
});
