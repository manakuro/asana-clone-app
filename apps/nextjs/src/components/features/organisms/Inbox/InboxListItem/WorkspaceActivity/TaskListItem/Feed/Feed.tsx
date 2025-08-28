import { Icon as AtomsIcon, Flex, Text } from '@/components/ui/atoms';
import { useTaskFeedIdsWithoutFirstByTaskId } from '@/store/entities/taskFeed';
import { useMemo } from 'react';

type Props = {
  taskId: string;
};

export function Feed(props: Props) {
  const { taskId } = props;
  const { taskFeedIdsWithoutFirst } =
    useTaskFeedIdsWithoutFirstByTaskId(taskId);
  const size = useMemo(
    () => taskFeedIdsWithoutFirst.length,
    [taskFeedIdsWithoutFirst.length],
  );

  if (!size) return null;

  return (
    <Flex alignItems="center" justifyContent="center" h={5}>
      <Text fontSize="xs" color="text.muted">
        {size}
      </Text>
      <AtomsIcon icon="messageRounded" color="text.muted" ml={1} />
    </Flex>
  );
}
