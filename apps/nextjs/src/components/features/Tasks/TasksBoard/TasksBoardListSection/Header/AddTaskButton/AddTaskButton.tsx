import type { Ref } from 'react';
import { memo, useCallback } from 'react';
import { useTasksTask } from '@/components/features/Tasks/hooks';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Tooltip } from '@/components/ui/tooltip';
import { useTooltip } from '@/components/ui/tooltip/use-tooltip';

type Props = {
  taskSectionId: string;
};

export const AddTaskButton = memo(function AddTaskButton(props: Props) {
  const { ref, open, onClose } = useTooltip();
  const { addTask } = useTasksTask();

  const handleClick = useCallback(async () => {
    onClose();
    addTask({ taskSectionId: props.taskSectionId });
  }, [addTask, onClose, props.taskSectionId]);

  return (
    <Tooltip
      showArrow
      content="Add task"
      aria-label="Add task button"
      open={open}
    >
      <IconButton
        ref={ref as Ref<HTMLButtonElement>}
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
