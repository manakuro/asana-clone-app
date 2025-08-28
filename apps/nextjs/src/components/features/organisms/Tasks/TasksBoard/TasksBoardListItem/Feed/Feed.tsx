import { useTaskDetail } from '@/components/features/organisms/TaskDetail';
import { FEED_LIST_CONTAINER_ID } from '@/components/features/organisms/TaskDetail/TaskDetailBody/Form/FeedList';
import { useTasksRouter } from '@/components/features/organisms/Tasks/hooks';
import { IconButton } from '@/components/ui/atoms';
import { useTaskFeedIdsWithoutFirstByTaskId } from '@/store/entities/taskFeed';
import type React from 'react';
import { memo, useCallback, useMemo } from 'react';
import { Icon } from './Icon';

type Props = {
  taskId: string;
};

export const Feed = memo(function Feed(props: Props) {
  const { taskId } = props;
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
});
