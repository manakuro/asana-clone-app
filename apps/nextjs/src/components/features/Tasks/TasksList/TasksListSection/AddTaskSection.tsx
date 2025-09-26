import { useTasksListContext } from '@/components/features/Tasks';
import { useTasksTaskSectionCommand } from '@/components/features/Tasks/hooks';
import { Button } from '@/components/ui/Button';
import { Flex } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { memo, useCallback } from 'react';

export const AddTaskSection = memo(function AddTaskSection() {
  const { addTaskSection } = useTasksTaskSectionCommand();
  const { stickyStyle } = useTasksListContext();

  const handleClick = useCallback(() => {
    addTaskSection();
  }, [addTaskSection]);

  return (
    <Flex w={40} mt={4} pl={6} {...stickyStyle}>
      <Button
        leftIcon={<Icon icon="plus" />}
        colorScheme="teal"
        variant="ghost"
        onClick={handleClick}
        size="sm"
      >
        Add section
      </Button>
    </Flex>
  );
});
