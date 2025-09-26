import { useTaskDetail } from '@/components/features/TaskDetail';
import { FEED_LIST_CONTAINER_ID } from '@/components/features/TaskDetail/TaskDetailBody/Form/FeedList';
import { useTasksRouter } from '@/components/features/Tasks/hooks';
import { IconButton } from '@/components/ui/IconButton';
import { useTaskFeedIdsWithoutFirstByTaskId } from '@/store/entities/taskFeed';
import type React from 'react';
import { useCallback, useMemo } from 'react';
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
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setScrollId(FEED_LIST_CONTAINER_ID);
      await navigateToTaskDetail(taskId);
    },
    [navigateToTaskDetail, setScrollId, taskId],
  );

  if (!size) return null;

  return (
    <IconButton
      aria-label="The number of taskFeed"
      icon={<Icon size={size} />}
      variant="ghost"
      size="xs"
      h={5}
      onClick={handleClick}
    />
  );
}
