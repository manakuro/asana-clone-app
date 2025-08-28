import { TasksListRow } from '@/components/features/organisms/Tasks/TasksList/TasksListRow';
import { CheckIcon, Flex, type FlexProps, Stack } from '@/components/ui/atoms';
import { TaskDoneTransition } from '@/components/ui/molecules';
import { useTask, useTaskCommand } from '@/store/entities/task';
import { memo, useCallback } from 'react';
import { Assignee } from './Assignee';
import { DueDate } from './DueDate';
import { Provider, useSubtasksNameContext } from './Provider';
import { RightItem } from './RightItem';
import { TasksNameCell } from './TasksNameCell';
import { TasksNameField } from './TasksNameField';
import { TasksNameGrabIcon } from './TasksNameGrabIcon';

type Props = FlexProps & {
  taskId: string;
};

export const TasksName = memo(function TasksName(props: Props) {
  return (
    <Provider taskId={props.taskId}>
      <Component {...props} />
    </Provider>
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
          <Stack direction="row" spacing={2} alignItems="center">
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
