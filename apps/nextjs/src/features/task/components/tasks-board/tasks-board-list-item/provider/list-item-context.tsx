import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useTasksTaskListStatus } from '@/features/task/hooks';
import { useTask } from '@/features/task/store/task';
import { useTaskListCompletedStatus } from '@/features/task/store/task-list-completed-status';
import { useHover } from '@/hooks/use-hover';
import { createContext } from '@/lib/react/create-context';
import { ROUTE_MY_TASKS_TASK } from '@/router/my-tasks';

type Props = {
  taskId: string;
};

const useValue = (props: Props) => {
  const [selected, setSelected] = useState<boolean>(false);
  const { ref, isHovering } = useHover<HTMLDivElement>();
  const [isOpening, setIsOpening] = useState(true);
  const { task, setTask } = useTask(props.taskId);
  const { taskListStatus } = useTasksTaskListStatus();
  const { isTaskListInComplete, isTaskListCompletedAll } =
    useTaskListCompletedStatus();
  const params = useParams();

  const onOpening = useCallback(() => {
    setIsOpening(true);
  }, []);

  const onClosing = useCallback(() => {
    setIsOpening(false);
  }, []);

  useEffect(() => {
    if (params?.[ROUTE_MY_TASKS_TASK.query.taskId] === props.taskId) {
      setSelected(true);
      return;
    }
    setSelected(false);
  }, [props.taskId, params]);

  const onToggleDone = useCallback(async () => {
    // When incomplete tasks are listed and the user is trying to complete it
    if (isTaskListInComplete(taskListStatus.taskListCompletedStatus)) {
      if (!task.completed) {
        onClosing();
        setTimeout(async () => {
          await setTask({ completed: !task.completed });
        }, 3000);
        return;
      }
    }

    // When completed, tasks are listed and the user is trying to make it as uncompleted
    if (
      !isTaskListInComplete(taskListStatus.taskListCompletedStatus) &&
      !isTaskListCompletedAll(taskListStatus.taskListCompletedStatus)
    ) {
      if (task.completed) {
        onClosing();
        setTimeout(async () => {
          await setTask({ completed: !task.completed });
        }, 3000);
        return;
      }
    }

    await setTask({ completed: !task.completed });
  }, [
    isTaskListCompletedAll,
    isTaskListInComplete,
    onClosing,
    setTask,
    task.completed,
    taskListStatus.taskListCompletedStatus,
  ]);

  return {
    selected,
    isHovering,
    ref,
    isOpening,
    onOpening,
    onClosing,
    onToggleDone,
  };
};
export const { Context, useContext: useTasksBoardListItemContext } =
  createContext(
    useValue,
    '@/components/features/tasks/tasks-board/tasks-board-list-item/provider/list-item-context.tsx',
  );
