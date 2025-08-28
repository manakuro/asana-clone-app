import { useTasksTask } from '@/components/features/organisms/Tasks/hooks';
import { Icon, IconButton } from '@/components/ui/atoms';
import { Tooltip } from '@/components/ui/molecules';
import { useTooltip } from '@/components/ui/molecules/Tooltip/useTooltip';
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
