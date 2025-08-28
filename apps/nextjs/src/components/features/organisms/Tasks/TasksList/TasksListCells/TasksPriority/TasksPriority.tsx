import { PriorityChip } from '@/components/features/molecules/Chips';
import { TasksListCell } from '@/components/features/organisms/Tasks/TasksList/TasksListCell';
import { Flex, type FlexProps, Icon } from '@/components/ui/atoms';
import { useHover } from '@/hooks/useHover';
import { useTask } from '@/store/entities/task';
import { memo, useCallback, useMemo, useState } from 'react';
import { Menu } from './Menu';

type Props = FlexProps & {
  taskId: string;
  width: string;
};

export const TasksPriority = memo(function TasksPriority(props: Props) {
  const { taskId } = props;
  const { task } = useTask(taskId);
  const [focused, setFocused] = useState(false);
  const { ref, isHovering } = useHover();
  const hasPriority = useMemo(
    () => !!task.taskPriorityId,
    [task.taskPriorityId],
  );

  const showMenuIcon = useMemo(
    () => !hasPriority && isHovering,
    [hasPriority, isHovering],
  );

  const handleOpened = useCallback(() => {
    setFocused(true);
  }, []);

  const handleClosed = useCallback(() => {
    setFocused(false);
  }, []);

  return (
    <TasksListCell
      hover
      cursor="pointer"
      containerStyle={{
        w: props.width,
        minW: '120px',
        maxW: '280px',
        position: 'relative',
      }}
      focused={focused}
      ref={ref}
    >
      <Menu taskId={taskId} onOpened={handleOpened} onClosed={handleClosed}>
        <Flex h="full" flex={1} alignItems="center">
          <PriorityChip taskPriorityId={task.taskPriorityId} />
          {showMenuIcon && (
            <Icon
              ml="auto"
              mt="1px"
              icon="chevronDown"
              color="text.muted"
              size="sm"
            />
          )}
        </Flex>
      </Menu>
    </TasksListCell>
  );
});
