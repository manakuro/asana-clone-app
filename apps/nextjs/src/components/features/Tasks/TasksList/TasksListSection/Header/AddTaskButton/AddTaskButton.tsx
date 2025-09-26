import { useTasksTask } from '@/components/features/Tasks/hooks';
import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { Tooltip } from '@/components/ui/Tooltip';
import { memo, useCallback } from 'react';

type Props = {
  taskSectionId: string;
};

export const AddTaskButton = memo(function AddTaskButton(props: Props) {
  const { addTask } = useTasksTask();

  const handleClick = useCallback(() => {
    addTask({ taskSectionId: props.taskSectionId });
  }, [addTask, props.taskSectionId]);

  return (
    <Tooltip
      hasArrow
      label="Add a task to this section"
      aria-label="Add task button"
      size="sm"
      openDelay={500}
    >
      <IconButton
        aria-label="Add task button"
        icon={<Icon icon="plus" color="text.muted" />}
        variant="ghost"
        size="sm"
        onClick={handleClick}
      />
    </Tooltip>
  );
});
