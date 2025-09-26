import { useTasksTask } from '@/components/features/Tasks/hooks';
import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { Tooltip } from '@/components/ui/Tooltip';
import { useTooltip } from '@/components/ui/Tooltip/useTooltip';
import type { Ref } from 'react';
import { memo, useCallback } from 'react';

type Props = {
  taskSectionId: string;
};

export const AddTaskButton = memo(function AddTaskButton(props: Props) {
  const { ref, isOpen, onClose } = useTooltip();
  const { addTask } = useTasksTask();

  const handleClick = useCallback(async () => {
    onClose();
    addTask({ taskSectionId: props.taskSectionId });
  }, [addTask, onClose, props.taskSectionId]);

  return (
    <Tooltip
      hasArrow
      label="Add task"
      aria-label="Add task button"
      isOpen={isOpen}
    >
      <IconButton
        ref={ref as Ref<HTMLButtonElement>}
        aria-label="Add task button"
        icon={<Icon icon="plus" color="text.muted" />}
        variant="ghost"
        size="sm"
        onClick={handleClick}
      />
    </Tooltip>
  );
});
