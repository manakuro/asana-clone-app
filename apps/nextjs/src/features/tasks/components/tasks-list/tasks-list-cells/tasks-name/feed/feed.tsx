import type React from 'react';
import { useCallback, useMemo } from 'react';
import { IconButton } from '@/components/ui/icon-button';
import { useTaskDetail } from '@/features/task-detail';
import { FEED_LIST_CONTAINER_ID } from '@/features/task-detail/components/task-detail-body/form/feed-list';
import { useTasksRouter } from '@/features/tasks/hooks';
import { useTaskFeedIdsWithoutFirstByTaskId } from '@/store/entities/task-feed';
import { useTasksNameContext } from '../tasks-name-context';
import { Icon } from './icon';

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
