import { useTasksTaskSectionCommand } from '@/components/features/Tasks/hooks';
import { Button } from '@/components/ui/Button';
import { Flex } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { memo, useCallback } from 'react';

export const AddTaskSection = memo(function AddTaskSection() {
  const { addTaskSection } = useTasksTaskSectionCommand();

  const handleClick = useCallback(async () => {
    addTaskSection();
  }, [addTaskSection]);

  return (
    <Flex w={40} mt={3} ml={2}>
      <Button
        leftIcon={<Icon icon="plus" />}
        variant="ghost"
        onClick={handleClick}
        size="sm"
      >
        Add section
      </Button>
    </Flex>
  );
});
