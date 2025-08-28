import { Icon, IconButton } from '@/components/ui/atoms';
import { Tooltip } from '@/components/ui/molecules';
import { useTaskCommand } from '@/store/entities/task';
import { memo, useCallback } from 'react';

type Props = {
  taskId: string;
};

export const SubTasks = memo(function SubTasks(props: Props) {
  const { addSubtask } = useTaskCommand();

  const handleAddSubtask = useCallback(async () => {
    await addSubtask({ taskParentId: props.taskId });
  }, [addSubtask, props.taskId]);

  return (
    <Tooltip
      hasArrow
      label="Add a task to this task. SubTasks can have different assignees and due date"
      aria-label="Subtasks button description"
      size="md"
      textAlign="left"
    >
      <IconButton
        aria-label="Subtasks button"
        icon={<Icon icon="subdirectoryRight" color="text.muted" />}
        variant="ghost"
        size="sm"
        onClick={handleAddSubtask}
      />
    </Tooltip>
  );
});
