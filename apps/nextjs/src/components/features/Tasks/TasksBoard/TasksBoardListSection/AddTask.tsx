import { memo, useCallback } from 'react';
import { useTasksTask } from '@/components/features/Tasks/hooks';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

type Props = {
  taskSectionId: string;
} & ButtonProps;

export const AddTask = memo(function AddTask(props: Props) {
  const { taskSectionId, ...rest } = props;
  const { addTask } = useTasksTask();

  const handleClick = useCallback(() => {
    addTask({ taskSectionId });
  }, [addTask, taskSectionId]);

  return (
    <Button
      mt={2}
      onClick={handleClick}
      variant="ghost"
      size="md"
      fontSize="sm"
      {...rest}
    >
      <Icon icon="plus" />
      Add task
    </Button>
  );
});
