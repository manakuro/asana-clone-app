import type React from 'react';
import { useCallback, useMemo } from 'react';
import { useTaskDetail } from '@/components/features/task-detail';
import { SUBTASK_LIST_CONTAINER_ID } from '@/components/features/task-detail/task-detail-body/form/subtasks';
import { useTasksRouter } from '@/components/features/tasks/hooks';
import { IconButton } from '@/components/ui/icon-button';
import { useSubtaskIds } from '@/store/entities/task';
import { useTasksNameContext } from '../tasks-name-provider';
import { Icon } from './icon';

export function Subtask() {
  const { taskId } = useTasksNameContext();
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
}
