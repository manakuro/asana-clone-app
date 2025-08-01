import { useTasksListContext } from '@/components/features/organisms/Tasks';
import { useTasksTaskSectionCommand } from '@/components/features/organisms/Tasks/hooks';
import { Button, Flex, Icon } from '@/components/ui/atoms';
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
