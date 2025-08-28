import { useTasksListContext } from '@/components/features/organisms/Tasks/TasksList/Provider';
import { useTasksTask } from '@/components/features/organisms/Tasks/hooks';
import { Flex } from '@/components/ui/atoms';
import { useClickableHoverStyle } from '@/hooks';
import { memo, useCallback } from 'react';

type Props = {
  taskSectionId: string;
};

export const AddTask = memo(function AddTask(props: Props) {
  const { addTask } = useTasksTask();
  const { clickableHoverStyle } = useClickableHoverStyle();
  const { stickyStyle } = useTasksListContext();

  const handleClick = useCallback(() => {
    addTask({ taskSectionId: props.taskSectionId });
  }, [addTask, props.taskSectionId]);

  return (
    <Flex
      h="36px"
      minH="36px"
      fontSize="sm"
      color="text.muted"
      alignItems="center"
      flex={1}
      {...clickableHoverStyle}
      onClick={handleClick}
    >
      <Flex {...stickyStyle} pl="68px" bg="inherit">
        Add task...
      </Flex>
    </Flex>
  );
});
