import { memo, useCallback, useMemo } from 'react';
import { useProjectsPageContext } from '@/components/pages/projects/contexts/context';
import {
  type TaskListSortStatusCodeValue,
  useProjectsTaskListStatus,
} from '@/components/pages/projects/store/projects/task-list-status';
import { SortMenu as TasksHeaderSortMenu } from '@/features/task/components/tasks-header';
import { TaskListSortStatusCode } from '@/features/task/store/task-list-sort-status';

const ITEMS: {
  value: TaskListSortStatusCodeValue;
  text: string;
}[] = [
  {
    value: TaskListSortStatusCode.None,
    text: 'None',
  },
  {
    value: TaskListSortStatusCode.DueDate,
    text: 'Due Date',
  },
  {
    value: TaskListSortStatusCode.Likes,
    text: 'Likes',
  },
  {
    value: TaskListSortStatusCode.Alphabetical,
    text: 'Alphabetical',
  },
  {
    value: TaskListSortStatusCode.Assignee,
    text: 'Assignee',
  },
  {
    value: TaskListSortStatusCode.CreationTime,
    text: 'Creation Time',
  },
  {
    value: TaskListSortStatusCode.Priority,
    text: 'Priority',
  },
];
export const SortMenu = memo(function SortMenu() {
  const { sortBy, isSorted, taskListStatus } = useProjectsTaskListStatus();
  const { startContentLoading, endContentLoading } = useProjectsPageContext();

  const handleChange = useCallback(
    (status: TaskListSortStatusCodeValue) => {
      startContentLoading();
      setTimeout(() => {
        sortBy(status);
        endContentLoading();
      }, 200);
    },
    [endContentLoading, sortBy, startContentLoading],
  );
  const items = useMemo(() => ITEMS, []);

  const text = useMemo<string>(() => {
    if (isSorted('none')) return '';

    return `: ${
      items.find(
        (i) => i.value === taskListStatus.taskListSortStatus.statusCode,
      )?.text
    }`;
  }, [isSorted, items, taskListStatus.taskListSortStatus]);

  return (
    <TasksHeaderSortMenu<TaskListSortStatusCodeValue>
      items={items}
      text={text}
      onChange={handleChange}
      value={
        taskListStatus.taskListSortStatus.statusCode ||
        TaskListSortStatusCode.None
      }
    />
  );
});
