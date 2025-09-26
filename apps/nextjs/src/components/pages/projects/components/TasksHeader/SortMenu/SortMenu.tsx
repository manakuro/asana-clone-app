import { SortMenu as TasksHeaderSortMenu } from '@/components/features/Tasks/TasksHeader';
import { useProjectsPageContext } from '@/components/pages/projects/providers/Provider';
import {
  type TaskListSortStatusCodeValue,
  useProjectsTaskListStatus,
} from '@/store/app/projects/taskListStatus';
import { TaskListSortStatusCode } from '@/store/entities/taskListSortStatus';
import { memo, useCallback, useMemo } from 'react';

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
      defaultValue={
        taskListStatus.taskListSortStatus.statusCode ||
        TaskListSortStatusCode.None
      }
    />
  );
});
