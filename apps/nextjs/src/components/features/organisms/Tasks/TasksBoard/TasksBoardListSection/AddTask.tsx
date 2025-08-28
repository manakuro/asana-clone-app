import { useTasksTask } from '@/components/features/organisms/Tasks/hooks';
import { Button, type ButtonProps, Icon } from '@/components/ui/atoms';
import { memo, useCallback } from 'react';

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
      leftIcon={<Icon icon="plus" />}
      variant="ghost"
      size="md"
      fontSize="sm"
      {...rest}
    >
      Add task
    </Button>
  );
});
