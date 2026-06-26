import type React from 'react';
import { memo, useCallback } from 'react';
import { useTasksRouter } from '@/components/features/tasks/hooks';
import { useTasksListContext } from '@/components/features/tasks/tasks-list/provider';
import { CheckIcon } from '@/components/ui/check-icon';
import type { FlexProps } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { TaskDoneTransition } from '@/components/ui/transitions';
import { useTask, useTaskCommand } from '@/store/entities/task';
import { ExpandIcon } from './expand-icon';
import { Feed } from './feed';
import { Like } from './like';
import { MoveTasksBetweenSections } from './move-tasks-between-sections';
import { Subtask } from './subtask';
import { TaskParentName } from './task-parent-name';
import { TasksNameCell } from './tasks-name-cell';
import { TasksNameField } from './tasks-name-field';
import { TasksNameGrabIcon } from './tasks-name-grab-icon';
import { TasksNameGrabIconContainer } from './tasks-name-grab-icon-container';
import { TasksNameContext, useTasksNameContext } from './tasks-name-provider';
import { TasksNameRightContainer } from './tasks-name-right-container';

type Props = FlexProps & {
  taskId: string;
  width: string;
  isSubtask?: boolean;
};

export const TasksName = memo(function TasksName(props: Props) {
  return (
    <TasksNameContext taskId={props.taskId}>
      <Component {...props} />
    </TasksNameContext>
  );
});

const Component = memo(function Component(props: Props) {
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

  const handleClick = useCallback(() => {
    navigateToTaskDetail(task.id);
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
        taskId={props.taskId}
        value={task.name}
        isNew={task.isNew}
        completed={task.completed}
        onChange={handleChangeName}
        deleteTask={handleDeleteTask}
        focusedBorder
        flex={1}
      />
      <Stack direction="row" gap={1} ml={1} mr="auto">
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
        <Text fontSize="xs" color="fg.muted" ml={2}>
          Details
        </Text>
        <Icon icon="chevronRight" color="fg.muted" mt="1px" />
      </TasksNameRightContainer>
    </TasksNameCell>
  );
});
