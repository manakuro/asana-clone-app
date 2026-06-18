import { memo, useCallback } from 'react';
import { useTasksTask } from '@/components/features/Tasks/hooks';
import { Flex } from '@/components/ui/flex';
import { useClickableHoverStyle } from '@/hooks';

type Props = {
  taskSectionId: string;
};

export const AddTask = memo(function AddTask(props: Props) {
  const { addTask } = useTasksTask();
  const { clickableHoverStyle } = useClickableHoverStyle();

  const handleClick = useCallback(async () => {
    await addTask({ taskSectionId: props.taskSectionId });
  }, [addTask, props.taskSectionId]);

  return (
    <Flex
      h="36px"
      minH="36px"
      fontSize="sm"
      color="fg.muted"
      pl="68px"
      alignItems="center"
      flex={1}
      css={clickableHoverStyle}
      onClick={handleClick}
    >
      Add task...
    </Flex>
  );
});
