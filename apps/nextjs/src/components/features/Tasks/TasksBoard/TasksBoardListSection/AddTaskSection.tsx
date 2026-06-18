import { memo, useCallback } from 'react';
import { useTasksTaskSectionCommand } from '@/components/features/Tasks/hooks';
import { Button } from '@/components/ui/button';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';

export const AddTaskSection = memo(function AddTaskSection() {
  const { addTaskSection } = useTasksTaskSectionCommand();

  const handleClick = useCallback(async () => {
    await addTaskSection();
  }, [addTaskSection]);

  return (
    <Flex w={40} mt={3} ml={2}>
      <Button variant="ghost" onClick={handleClick} size="sm">
        <Icon icon="plus" />
        Add section
      </Button>
    </Flex>
  );
});
