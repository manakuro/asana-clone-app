import { memo, useCallback } from 'react';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Tooltip } from '@/components/ui/tooltip';
import { useTaskCommand } from '@/store/entities/task';

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
      showArrow
      content="Add a task to this task. SubTasks can have different assignees and due date"
      aria-label="Subtasks button description"
      size="md"
      contentProps={{
        textAlign: 'left',
      }}
    >
      <IconButton
        aria-label="Subtasks button"
        variant="ghost"
        size="sm"
        onClick={handleAddSubtask}
      >
        <Icon icon="subdirectoryRight" color="fg.muted" />
      </IconButton>
    </Tooltip>
  );
});
