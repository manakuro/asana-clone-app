import { memo, useCallback } from 'react';
import { CheckIcon } from '@/components/ui/check-icon';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Stack } from '@/components/ui/stack';
import { TaskDoneTransition } from '@/components/ui/transitions';
import { TasksListRow } from '@/features/tasks/components/tasks-list/tasks-list-row';
import { useTask, useTaskCommand } from '@/store/entities/task';
import { Assignee } from './assignee';
import { Context, useSubtasksNameContext } from './context';
import { DueDate } from './due-date';
import { RightItem } from './right-item';
import { TasksNameCell } from './tasks-name-cell';
import { TasksNameField } from './tasks-name-field';
import { TasksNameGrabIcon } from './tasks-name-grab-icon';

type Props = FlexProps & {
  taskId: string;
};

export const TasksName = memo(function TasksName(props: Props) {
  return (
    <Context taskId={props.taskId}>
      <Component {...props} />
    </Context>
  );
});

export const Component = memo(function Component(props: Props) {
  const { ref, isTransitioning, onStartTransition, onEndTransition } =
    useSubtasksNameContext();
  const { deleteTask } = useTaskCommand();
  const { task, setTaskName, setTask } = useTask(props.taskId);

  const handleChange = useCallback(
    async (val: string) => {
      await setTaskName(val);
    },
    [setTaskName],
  );

  const handleDeleteTask = useCallback(async () => {
    await deleteTask({ taskId: props.taskId });
  }, [deleteTask, props.taskId]);

  const handleToggleDone = useCallback(async () => {
    if (!task.completed) {
      onStartTransition();
      setTimeout(async () => {
        await setTask({ completed: !task.completed });
        onEndTransition();
      }, 1000);
      return;
    }

    await setTask({ completed: !task.completed });
    onEndTransition();
  }, [onEndTransition, onStartTransition, setTask, task.completed]);

  return (
    <TasksListRow w="full">
      <TasksNameCell ref={ref} borderRight="none" containerStyle={{ flex: 1 }}>
        <TaskDoneTransition isTransitioning={isTransitioning} />
        <TasksNameGrabIcon />
        <CheckIcon
          completed={task.completed}
          ml={2}
          onClick={handleToggleDone}
          isTransitioning={isTransitioning}
        />
        <TasksNameField
          value={task.name}
          isNew={task.isNew}
          onChange={handleChange}
          deleteTask={handleDeleteTask}
        />
        <Flex alignItems="center" ml="auto">
          <Stack direction="row" gap={2} alignItems="center">
            <RightItem>
              <DueDate taskId={props.taskId} />
            </RightItem>
            <RightItem>
              <Assignee taskId={props.taskId} />
            </RightItem>
          </Stack>
        </Flex>
      </TasksNameCell>
    </TasksListRow>
  );
});
