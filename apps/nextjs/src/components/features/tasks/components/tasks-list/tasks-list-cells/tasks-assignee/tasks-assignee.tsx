import { memo, useCallback, useState } from 'react';
import { TasksListCell } from '@/components/features/tasks/components/tasks-list/tasks-list-cell';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { useHover } from '@/hooks/use-hover';
import { Content } from './content';

type Props = FlexProps & {
  taskId: string;
  width: string;
};

export const TasksAssignee = memo(function TasksAssignee(props: Props) {
  const { ref, isHovering } = useHover<HTMLDivElement>();
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
