import type React from 'react';
import { useCallback, useMemo } from 'react';
import { useTasksRouter } from '@/components/features/Tasks/hooks';
import { useTaskDetail } from '@/components/features/task-detail';
import { FEED_LIST_CONTAINER_ID } from '@/components/features/task-detail/task-detail-body/form/feed-list';
import { IconButton } from '@/components/ui/icon-button';
import { useTaskFeedIdsWithoutFirstByTaskId } from '@/store/entities/taskFeed';
import { useTasksNameContext } from '../TasksNameProvider';
import { Icon } from './Icon';

export function Feed() {
  const { taskId } = useTasksNameContext();
  const { taskFeedIdsWithoutFirst } =
    useTaskFeedIdsWithoutFirstByTaskId(taskId);
  const size = useMemo(
    () => taskFeedIdsWithoutFirst.length,
    [taskFeedIdsWithoutFirst.length],
  );
  const { setScrollId } = useTaskDetail();
  const { navigateToTaskDetail } = useTasksRouter();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setScrollId(FEED_LIST_CONTAINER_ID);
      navigateToTaskDetail(taskId);
    },
    [navigateToTaskDetail, setScrollId, taskId],
  );

  if (!size) return null;

  return (
    <IconButton
      aria-label="The number of taskFeed"
      variant="ghost"
      size="xs"
      h={5}
      onClick={handleClick}
    >
      <Icon size={size} />
    </IconButton>
  );
}
