import { TasksListCell } from '@/components/features/organisms/Tasks/TasksList/TasksListCell';
import { Flex, type FlexProps } from '@/components/ui/atoms';
import { useHover } from '@/hooks/useHover';
import { memo, useCallback, useState } from 'react';
import { Content } from './Content';

type Props = FlexProps & {
  taskId: string;
  width: string;
};

export const TasksAssignee = memo(function TasksAssignee(props: Props) {
  const { ref, isHovering } = useHover();
  const [focused, setFocused] = useState(false);

  const handleClick = useCallback(() => {
    setFocused(true);
  }, []);

  const handleUnfocus = useCallback(() => {
    setFocused(false);
  }, []);

  return (
    <TasksListCell
      containerStyle={{
        w: props.width,
        minW: '120px',
        maxW: props.width || '280px',
      }}
      ref={ref}
      cursor="pointer"
      hover
      onClick={handleClick}
    >
      <Flex flex={1} h="full" alignItems="center" maxW="inherit">
        <Content
          taskId={props.taskId}
          isHovering={isHovering}
          focused={focused}
          onUnfocus={handleUnfocus}
        />
      </Flex>
    </TasksListCell>
  );
});
