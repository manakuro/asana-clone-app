import { useTasksListContext } from '@/components/features/organisms/Tasks/TasksList/Provider';
import { useTasksRouter } from '@/components/features/organisms/Tasks/hooks';
import {
  CheckIcon,
  type FlexProps,
  Icon,
  Stack,
  Text,
} from '@/components/ui/atoms';
import { TaskDoneTransition } from '@/components/ui/molecules';
import { useTask, useTaskCommand } from '@/store/entities/task';
import type React from 'react';
import { memo, useCallback } from 'react';
import { ExpandIcon } from './ExpandIcon';
import { Feed } from './Feed';
import { Like } from './Like';
import { MoveTasksBetweenSections } from './MoveTasksBetweenSections';
import { Subtask } from './Subtask';
import { TaskParentName } from './TaskParentName';
import { TasksNameCell } from './TasksNameCell';
import { TasksNameField } from './TasksNameField';
import { TasksNameGrabIcon } from './TasksNameGrabIcon';
import { TasksNameGrabIconContainer } from './TasksNameGrabIconContainer';
import { TasksNameProvider, useTasksNameContext } from './TasksNameProvider';
import { TasksNameRightContainer } from './TasksNameRightContainer';

type Props = FlexProps & {
  taskId: string;
  width: string;
  isSubtask?: boolean;
};

export const TasksName = memo(function TasksName(props: Props) {
  return (
    <TasksNameProvider taskId={props.taskId}>
      <Component {...props} />
    </TasksNameProvider>
  );
});

const Component: React.FC<Props> = memo<Props>((props) => {
  const {
    ref,
    onMarkMenuOpened,
    onMarkMenuClosed,
    onEndTransition,
    onStartTransition,
    isTransitioning,
  } = useTasksNameContext();
  const { navigateToTaskDetail } = useTasksRouter();
  const { deleteTask } = useTaskCommand();
  const { task, setTask, setTaskName } = useTask(props.taskId);
  const { stickyStyle } = useTasksListContext();

  const handleDeleteTask = useCallback(async () => {
    await deleteTask({ taskId: props.taskId });
  }, [deleteTask, props.taskId]);

  const handleClick = useCallback(async () => {
    await navigateToTaskDetail(task.id);
  }, [navigateToTaskDetail, task.id]);

  const handleChangeName = useCallback(
    async (val: string) => {
      await setTaskName(val);
    },
    [setTaskName],
  );
  const handleToggleDone = useCallback(
    async (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation();
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
    },
    [onEndTransition, onStartTransition, setTask, task.completed],
  );

  return (
    <>
      <TasksNameCell
        pl={props.isSubtask ? 12 : 6}
        onClick={handleClick}
        containerStyle={{
          w: props.width,
          minW: '400px',
          maxW: '800px',
          ...stickyStyle,
          bg: 'inherit',
        }}
        ref={ref}
      >
        <TaskDoneTransition isTransitioning={isTransitioning} />
        <TasksNameGrabIconContainer>
          <TasksNameGrabIcon />
        </TasksNameGrabIconContainer>
        <ExpandIcon taskId={props.taskId} />
        <CheckIcon
          completed={task.completed}
          ml={1}
          onClick={handleToggleDone}
          zIndex={2}
          isTransitioning={isTransitioning}
        />
        <TasksNameField
          value={task.name}
          isNew={task.isNew}
          completed={task.completed}
          onChange={handleChangeName}
          deleteTask={handleDeleteTask}
          focusedBorder
          flex={1}
        />
        <Stack direction="row" spacing={1} ml={1} mr="auto">
          <TaskParentName />
          <Like />
          <Feed />
          <Subtask />
        </Stack>
        <TasksNameRightContainer>
          <MoveTasksBetweenSections
            onOpened={onMarkMenuOpened}
            onClosed={onMarkMenuClosed}
            taskId={props.taskId}
          />
          <Text fontSize="xs" color="text.muted" ml={2}>
            Details
          </Text>
          <Icon icon="chevronRight" color="text.muted" mt="1px" />
        </TasksNameRightContainer>
      </TasksNameCell>
    </>
  );
});
