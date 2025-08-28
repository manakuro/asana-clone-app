import { useTaskDetail } from '@/components/features/organisms/TaskDetail';
import { SUBTASK_LIST_CONTAINER_ID } from '@/components/features/organisms/TaskDetail/TaskDetailBody/Form/Subtasks';
import { useTasksRouter } from '@/components/features/organisms/Tasks/hooks';
import { IconButton } from '@/components/ui/atoms';
import { useSubtaskIds } from '@/store/entities/task';
import type React from 'react';
import { memo, useCallback, useMemo } from 'react';
import { Icon } from './Icon';

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
      await navigateToTaskDetail(taskId);
    },
    [navigateToTaskDetail, setScrollId, taskId],
  );

  if (!size) return null;

  return (
    <IconButton
      aria-label="The number of subtask"
      icon={<Icon size={size} />}
      variant="ghost"
      size="xs"
      h={5}
      onClick={handleClick}
    />
  );
});
