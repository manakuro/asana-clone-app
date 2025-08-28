import { Flex } from '@/components/ui/atoms';
import {
  useTaskFeedIdsByTaskId,
  useTaskFeedsPinnedIds,
} from '@/store/entities/taskFeed';
import { memo, useMemo } from 'react';
import { FeedListItem } from './FeedListItem';

type Props = {
  taskId: string;
};

export const FEED_LIST_CONTAINER_ID = 'FEED_LIST_CONTAINER_ID';

export const FeedList = memo(function FeedList(props: Props) {
  const { taskFeedIds } = useTaskFeedIdsByTaskId(props.taskId);
  const { taskFeedPinnedIds } = useTaskFeedsPinnedIds(props.taskId);
  const anyFeedIds = useMemo(
    () => !!taskFeedIds.length || !!taskFeedPinnedIds.length,
    [taskFeedIds.length, taskFeedPinnedIds.length],
  );

  return (
    <Flex
      mt={4}
      flexDirection="column"
      id={FEED_LIST_CONTAINER_ID}
      bg={anyFeedIds ? 'gray.50' : 'transparent'}
      flex={1}
    >
      {taskFeedPinnedIds.map((pinnedId) => (
        <FeedListItem
          key={pinnedId}
          taskFeedId={pinnedId}
          taskId={props.taskId}
          isPinned
        />
      ))}
      {taskFeedIds.map((id) => (
        <FeedListItem key={id} taskFeedId={id} taskId={props.taskId} />
      ))}
    </Flex>
  );
});
