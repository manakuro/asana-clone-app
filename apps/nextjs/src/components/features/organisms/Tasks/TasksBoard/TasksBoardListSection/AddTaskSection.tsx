import { useTasksTaskSectionCommand } from '@/components/features/organisms/Tasks/hooks';
import { Button } from '@/components/ui/atoms/Button';
import { Flex } from '@/components/ui/atoms/Flex';
import { Icon } from '@/components/ui/atoms/Icon';
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
