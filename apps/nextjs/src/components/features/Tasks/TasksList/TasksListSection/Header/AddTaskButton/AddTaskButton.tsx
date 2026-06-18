import { memo, useCallback } from 'react';
import { useTasksTask } from '@/components/features/Tasks/hooks';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Tooltip } from '@/components/ui/tooltip';

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
      showArrow
      content="Add a task to this section"
      aria-label="Add task button"
      size="sm"
      openDelay={500}
    >
      <IconButton
        aria-label="Add task button"
        variant="ghost"
        size="sm"
        onClick={handleClick}
      >
        <Icon icon="plus" color="fg.muted" />
      </IconButton>
    </Tooltip>
  );
});
