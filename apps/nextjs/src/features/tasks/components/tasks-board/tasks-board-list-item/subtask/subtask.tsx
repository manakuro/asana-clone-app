import type React from 'react';
import { memo, useCallback, useMemo } from 'react';
import { IconButton } from '@/components/ui/icon-button';
import { useTaskDetail } from '@/features/task-detail';
import { SUBTASK_LIST_CONTAINER_ID } from '@/features/task-detail/components/task-detail-body/form/subtasks';
import { useTasksRouter } from '@/features/tasks/hooks';
import { useSubtaskIds } from '@/store/entities/task';
import { Icon } from './icon';

type Props = {
  taskId: string;
};

export const Subtask = memo(function Subtask(props: Props) {
  const { taskId } = props;
  const { taskIds } = useSubtaskIds(taskId);
  const size = useMemo(() => taskIds.length, [taskIds.length]);
  const { setScrollId } = useTaskDetail();
  const { navigateToTaskDetail } = useTasksRouter();

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setScrollId(SUBTASK_LIST_CONTAINER_ID);
      navigateToTaskDetail(taskId);
    },
    [navigateToTaskDetail, setScrollId, taskId],
  );

  if (!size) return null;

  return (
    <IconButton
      aria-label="The number of subtask"
      variant="ghost"
      size="xs"
      h={5}
      onClick={handleClick}
    >
      <Icon size={size} />
    </IconButton>
  );
});
