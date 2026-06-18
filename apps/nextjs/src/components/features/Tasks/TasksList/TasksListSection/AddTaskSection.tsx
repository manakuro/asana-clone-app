import { memo, useCallback } from 'react';
import { useTasksListContext } from '@/components/features/Tasks';
import { useTasksTaskSectionCommand } from '@/components/features/Tasks/hooks';
import { Button } from '@/components/ui/button';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';

export const AddTaskSection = memo(function AddTaskSection() {
  const { addTaskSection } = useTasksTaskSectionCommand();
  const { stickyStyle } = useTasksListContext();

  const handleClick = useCallback(async () => {
    await addTaskSection();
  }, [addTaskSection]);

  return (
    <Flex w={40} mt={4} pl={6} css={stickyStyle}>
      <Button
        colorPalette="teal"
        variant="ghost"
        onClick={handleClick}
        size="sm"
      >
        <Icon icon="plus" />
        Add section
      </Button>
    </Flex>
  );
});
