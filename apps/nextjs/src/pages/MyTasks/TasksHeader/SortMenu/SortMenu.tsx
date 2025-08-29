import { SortMenu as TasksHeaderSortMenu } from '@/components/features/organisms/Tasks/TasksHeader';
import { useMyTasksContext } from '@/pages/MyTasks/Provider';
import {
  type TaskListSortStatusCodeValue,
  useMyTasksTaskListStatus,
} from '@/store/app/myTasks/taskListStatus';
import { TaskListSortStatusCode } from '@/store/entities/taskListSortStatus';
import { memo, useCallback, useMemo } from 'react';

type Props = {
  projectSortable?: boolean;
};

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
    value: TaskListSortStatusCode.Project,
    text: 'Project',
  },
];

export const SortMenu = memo(function SortMenu(props: Props) {
  const { sortBy, isSorted, taskListStatus } = useMyTasksTaskListStatus();
  const { startContentLoading, endContentLoading } = useMyTasksContext();

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
  const projectSortable = useMemo(
    () => props.projectSortable ?? true,
    [props.projectSortable],
  );
  const items = useMemo(() => {
    return ITEMS.filter((i) => {
      if (!projectSortable && i.value === TaskListSortStatusCode.Project)
        return false;
      return true;
    });
  }, [projectSortable]);

  const text = useMemo<string>(() => {
    if (isSorted('none')) return '';
    if (!projectSortable && isSorted('project')) return '';

    return `: ${
      items.find(
        (i) => i.value === taskListStatus.taskListSortStatus.statusCode,
      )?.text
    }`;
  }, [
    isSorted,
    items,
    projectSortable,
    taskListStatus.taskListSortStatus.statusCode,
  ]);

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
