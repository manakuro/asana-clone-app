import { memo, useCallback } from 'react';
import { useTasksTask } from '@/components/features/tasks/hooks';
import { useTasksListContext } from '@/components/features/tasks/tasks-list/provider';
import { Flex } from '@/components/ui/flex';
import { useClickableHoverStyle } from '@/hooks/styles/use-clickable-hover-style';

type Props = {
  taskSectionId: string;
};

export const AddTask = memo(function AddTask(props: Props) {
  const { addTask } = useTasksTask();
  const { clickableHoverStyle } = useClickableHoverStyle();
  const { stickyStyle } = useTasksListContext();

  const handleClick = useCallback(async () => {
    await addTask({ taskSectionId: props.taskSectionId });
  }, [addTask, props.taskSectionId]);

  return (
    <Flex
      h="36px"
      minH="36px"
      fontSize="sm"
      color="fg.muted"
      alignItems="center"
      flex={1}
      css={clickableHoverStyle}
      onClick={handleClick}
    >
      <Flex css={stickyStyle} pl="68px" bg="inherit">
        Add task...
      </Flex>
    </Flex>
  );
});
